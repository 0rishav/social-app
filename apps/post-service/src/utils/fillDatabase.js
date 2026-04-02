import crypto from "crypto";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserSchema from "../../../identity-service/src/models/userModal.js"; 
import Comment from "../models/commentModel.js";
import Reply from "../models/replyCommentModel.js";

dotenv.config();

const techReplies = [
    "Exactly! I was thinking the same about the event loop behavior.",
    "Could you provide a code snippet for that aggregation pipeline?",
    "I disagree. Redis would be a better choice for this specific caching layer.",
    "Actually, the latest Node.js version handles this internally now.",
    "Wait, wouldn't that cause a race condition in a distributed environment?",
    "Thanks for the clarification, this saved me hours of debugging!",
    "Interesting point, but how does it scale horizontally?"
];

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

export async function seedReplies() {
    let identityConn;
    try {
        console.log("🔗 Connecting to Identity DB for Replies...");
        identityConn = await mongoose.createConnection(process.env.IDENTITY_MONGO_URI).asPromise();
        const IdentityUser = identityConn.model("User", UserSchema.schema);

        console.log("🔍 Fetching User IDs and Parent Comment IDs...");
        
        // Memory optimize: Sirf 1-2 Lakh comments ka sample lete hain replies ke liye
        const userIds = await IdentityUser.find({}, "_id").lean();
        const commentIds = await Comment.find({}, "commentId").limit(200000).lean(); 

        console.log(`📊 Status -> Users: ${userIds.length}, Comments for replies: ${commentIds.length}`);

        if (userIds.length === 0 || commentIds.length === 0) {
            console.error("❌ ERROR: Data missing! Pehle Comments toh seed karle bhsdike.");
            return;
        }

        const TOTAL_REPLIES = 500000; // 5 Lakh replies
        const BATCH_SIZE = 10000; 

        console.log(`🔥 Starting 5 Lakh Replies Blast...`);
        console.time("⏱️ Seeding Time");

        for (let i = 0; i < TOTAL_REPLIES / BATCH_SIZE; i++) {
            const operations = [];

            for (let j = 0; j < BATCH_SIZE; j++) {
                const randomComment = getRandom(commentIds);
                const randomUser = getRandom(userIds);

                operations.push({
                    insertOne: {
                        document: {
                            replyId: crypto.randomUUID(),
                            commentId: randomComment.commentId, // Asli linked commentId
                            authorId: randomUser._id.toString(),
                            content: getRandom(techReplies),
                            likesCount: Math.floor(Math.random() * 200),
                            isDeleted: false,
                            createdAt: new Date(),
                            updatedAt: new Date()
                        }
                    }
                });
            }

            await Reply.bulkWrite(operations, { ordered: false });
            
            const progress = (((i + 1) * BATCH_SIZE) / TOTAL_REPLIES * 100).toFixed(2);
            process.stdout.write(`\r✅ Progress: ${progress}% | Total: ${(i + 1) * BATCH_SIZE} Replies Done`);
        }

        console.timeEnd("⏱️ Seeding Time");
        console.log("\n🏆 5 Lakh Replies Seeded successfully!");

    } catch (error) {
        console.error("\n❌ Seeding Failed:", error);
    } finally {
        if (identityConn) await identityConn.close();
    }
}