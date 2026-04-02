import { BSON } from 'bson';
import Post from '../models/postModel.js';

export const startPostConsumer = async (kafka) => {
    const consumer = kafka.consumer({ 
        groupId: 'post-group',
        sessionTimeout: 60000, // Load zyada hai toh timeout badha do
        heartbeatInterval: 20000,
        // 🔥 Prefetching: Ek baar mein zyada data uthao
        maxBytesPerPartition: 10 * 1024 * 1024, // 10MB per partition
        maxBytes: 50 * 1024 * 1024, // 50MB total batch
    });

    await consumer.connect();
    await consumer.subscribe({ topic: 'post-writes', fromBeginning: false }); // Fresh data pe focus

    await consumer.run({
        eachBatchAutoResolve: false,
        eachBatch: async ({ batch, resolveOffset, heartbeat, commitOffsetsIfNecessary }) => {
            const messages = batch.messages;
            if (messages.length === 0) return;

            try {
                const chunkSize = 500; // 15k ke liye 500-1000 ka chunk better hai
                const chunkPromises = [];

                for (let i = 0; i < messages.length; i += chunkSize) {
                    const msgChunk = messages.slice(i, i + chunkSize);
                    
                    // 🔥 Optimization: Deserialization aur DB Write ek saath chunk level pe
                    const processChunk = async (items) => {
                        const ops = items.map(msg => ({
                            insertOne: { document: BSON.deserialize(msg.value) }
                        }));
                        
                        return Post.bulkWrite(ops, { 
                            ordered: false,
                            // extreme speed ke liye writeConcern hum background mein chhod sakte hain
                            writeConcern: { w: 1 } 
                        });
                    };

                    chunkPromises.push(processChunk(msgChunk));
                    
                    // Kafka ko zinda hone ka signal
                    if (i % 1000 === 0) await heartbeat(); 
                }

                // 3. Parallel Execution
                await Promise.all(chunkPromises);
                console.log(`📦 [Worker ${process.pid}] Saved ${messages.length} posts to DB`);

                // 4. Offset Commit
                const lastMsg = messages[messages.length - 1];
                resolveOffset(lastMsg.offset);
                await commitOffsetsIfNecessary();

            } catch (error) {
                console.error(`❌ Consumer Error [Worker ${process.pid}]:`, error.message);
            }
        }
    });
};