import dotenv from 'dotenv';
import crypto from 'crypto';
import User from '../models/userModal.js';
import Session from '../models/sessionModal.js';
dotenv.config();

// const firstNames = ["Abhishek", "Rishav", "Rahul", "Saurabh", "Ankit", "Sneha", "Priya", "Neha", "Vikas", "Sumit", "Aditya", "Pooja", "Karan", "Deepak", "Sunita", "Rohan"];
// const lastNames = ["Singh", "Raj", "Sharma", "Verma", "Gupta", "Malhotra", "Khan", "Das", "Joshi", "Chawla", "Yadav", "Mishra", "Pandey", "Iyer"];
// const cities = ["Delhi", "Mumbai", "Bangalore", "Patna", "Pune", "Kolkata", "Chennai", "Hyderabad", "Lucknow", "Jaipur"];
// const domains = ["gmail.com", "outlook.com", "xynapse.ai", "yahoo.com", "proton.me"];
// const genders = ["Male", "Female"];
// const roles = ["user", "moderator", "admin"];

// const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
// const generateRandomPhone = () => "9" + Math.floor(Math.random() * 900000000 + 100000000); 
// const generateRandomString = (len) => crypto.randomBytes(len).toString('hex').substring(0, len);

// const SEED_COUNT = 50000; 
// const BATCH_SIZE = 5000;
// const PRE_HASHED_PASSWORD = "$2b$12$L9T7.pC.fM8V/rJ1VpX0uO0Gv5FqH6F/4Y8mG3W4E.fG.W.G.G.G"; 

// export const seedCustomHeavyUsers = async () => {
//     try {

//         for (let i = 0; i < SEED_COUNT / BATCH_SIZE; i++) {
//             const users = [];
//             for (let j = 0; j < BATCH_SIZE; j++) {
//                 const currentId = (i * BATCH_SIZE) + j;
//                 const fName = getRandom(firstNames);
//                 const lName = getRandom(lastNames);
//                 const userNameClean = `${fName.toLowerCase()}.${lName.toLowerCase()}${currentId}`;

//                 users.push({
//                     name: `${fName} ${lName}`,
//                     email: `${userNameClean}@${getRandom(domains)}`,
//                     isDisabled: Math.random() > 0.95, 
//                     image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userNameClean}`, 
//                     password: PRE_HASHED_PASSWORD,
//                     googleAuth: false,
                    
//                     failedLoginAttempts: Math.floor(Math.random() * 4),
//                     lockUntil: null,
//                     tokenVersion: Math.floor(Math.random() * 5),
//                     passwordChangedAt: new Date(Date.now() - Math.floor(Math.random() * 1000000000)),
//                     passwordHistory: [
//                         { password: PRE_HASHED_PASSWORD, changedAt: new Date() },
//                         { password: PRE_HASHED_PASSWORD, changedAt: new Date() }
//                     ],
//                     isTwoFactorEnabled: Math.random() > 0.7,
                    
//                     gender: getRandom(genders),
//                     phone: generateRandomPhone(),
//                     country: "India",
//                     city: getRandom(cities),
                    
//                     socialMedia: {
//                         linkedin: `https://linkedin.com/in/${userNameClean}`,
//                         github: `https://github.com/${userNameClean}`,
//                         twitter: `https://twitter.com/${userNameClean}`
//                     },
                    
//                     referralCode: `XYN${currentId}${generateRandomString(4).toUpperCase()}`,
//                     lastActivity: new Date(),
//                     role: getRandom(roles)
//                 });
//             }
//             await User.insertMany(users, { ordered: false });
//             console.log(`📦 Batch ${i + 1} Done: ${ (i + 1) * BATCH_SIZE } users added.`);
//         }

//         console.log("✅ 50,000 Realistic Heavy Documents Seeded!");
//         process.exit();
//     } catch (error) {
//         console.error("Seeding Error:", error.message);
//         process.exit(1);
//     }
// }

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const devices = ["iPhone 15", "Samsung S24", "MacBook Pro", "Windows Desktop", "Pixel 8", "iPad Air"];
const browsers = ["Chrome/122.0.0", "Safari/17.1", "Firefox/119.0", "Edge/120.0"];

export const seedSessions = async() => {
    try {
        const userIds = await User.find({}, '_id').lean();
        console.log(`Found ${userIds.length} users. Creating sessions...`);

        const sessions = [];
        const BATCH_SIZE = 5000;

        for (let i = 0; i < userIds.length; i++) {
            // Har user ke liye 1-2 session random
            const sessionCount = Math.random() > 0.7 ? 2 : 1; 

            for (let s = 0; s < sessionCount; s++) {
                const device = getRandom(devices);
                const browser = getRandom(browsers);

                sessions.push({
                    user: userIds[i]._id,
                    refreshTokenHash: crypto.createHash('sha256').update(crypto.randomBytes(20)).digest('hex'),
                    deviceId: crypto.randomBytes(8).toString('hex'),
                    deviceName: device,
                    ipAddress: `192.168.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`,
                    userAgent: `Mozilla/5.0 (${device}; OS X 10_15_7) ${browser}`,
                    isRevoked: false,
                    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 Days expiry
                    lastUsedAt: new Date()
                });
            }

            // Batch insert to keep memory clean
            if (sessions.length >= BATCH_SIZE) {
                await Session.insertMany(sessions);
                console.log(`📦 Inserted ${sessions.length} sessions...`);
                sessions.length = 0; 
            }
        }

        if (sessions.length > 0) await Session.insertMany(sessions);

        console.log("✅ Sessions Seeded! Now Identity DB is complete.");
        process.exit();
    } catch (error) {
        console.error("Session Seeding Failed:", error.message);
        process.exit(1);
    }
}