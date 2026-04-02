import { getDB } from "../config/db.js";

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;
const randBool = () => Math.random() > 0.5;

const names = [
  "Aarav",
  "Vivaan",
  "Aditya",
  "Arjun",
  "Kabir",
  "Rohan",
  "Ishaan",
  "Aryan",
  "Vihaan",
  "Krishna",
  "Meera",
  "Anaya",
  "Diya",
  "Sara",
  "Aisha",
  "Myra",
  "Riya",
  "Zoya",
  "Anika",
  "Saanvi",
];

const domains = [
  "gmail.com",
  "yahoo.com",
  "outlook.com",
  "mail.com",
  "test.com",
];

const cities = [
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Berlin",
  "NYC",
  "Tokyo",
  "Paris",
  "Toronto",
];

const countries = ["India", "Germany", "USA", "Japan", "France", "Canada"];

const skillsPool = [
  "node",
  "mongo",
  "redis",
  "aws",
  "cpp",
  "react",
  "docker",
  "kafka",
];

const tagsPool = [
  "backend",
  "scaling",
  "api",
  "microservice",
  "cloud",
  "security",
  "devops",
  "ai",
];

const bios = [
  "Love coding",
  "Backend engineer",
  "DB optimizer",
  "System design nerd",
  "Scaling freak",
];

export const generateLabData = async () => {
  const db = getDB();
  const col = db.collection("labdata");

  //   if (await col.countDocuments()) {
  //     console.log("Lab data exists");
  //     return;
  //   }

  console.log("🚀 Generating realistic operator dataset...");

  const BATCH = 1000;
  const TOTAL = 600000;

  for (let i = 0; i < TOTAL; i += BATCH) {
    const docs = [];

    for (let j = 0; j < BATCH; j++) {
      const name = pick(names);
      const email = `${name.toLowerCase()}${randInt(1, 9999)}@${pick(domains)}`;

      docs.push({
        name,
        email,
        age: randInt(18, 60),
        isActive: randBool(),
        salary: randInt(30000, 200000),
        experience: randInt(0, 15),
        createdAt: new Date(Date.now() - randInt(0, 1000000000)),

        tags: Array.from({ length: randInt(1, 5) }, () => pick(tagsPool)),
        skills: Array.from({ length: randInt(1, 4) }, () => pick(skillsPool)),

        profile: {
          bio: pick(bios),
          location: {
            city: pick(cities),
            country: pick(countries),
          },
        },

        stats: {
          followers: randInt(0, 10000),
          following: randInt(0, 5000),
          posts: randInt(0, 2000),
        },

        description:
          "system design mongodb redis scaling backend " + pick(tagsPool),

        optionalField: randBool() ? pick(tagsPool) : null,
        isPremium: randBool(),
        isDeleted: randBool(),
      });
    }

    await col.insertMany(docs);
    console.log(`Inserted ${i + BATCH}/${TOTAL}`);
  }

  console.log("✅ Realistic lab dataset ready");
};

export const trimLabData = async () => {
  const db = getDB();
  if (!db) throw new Error("Database not initialized");

  const col = db.collection("labdata");

  const total = await col.countDocuments();
  console.log(`Total documents before trim: ${total}`);

  const keep = 2000;
  const toDelete = total - keep;

  if (toDelete <= 0) {
    console.log("No documents need to be deleted, already under 6 lakh.");
    return;
  }

  console.log(`Deleting last ${toDelete} documents...`);

  const docsToDelete = await col
    .find({})
    .sort({ _id: -1 })
    .limit(toDelete)
    .project({ _id: 1 })
    .toArray();

  const ids = docsToDelete.map((doc) => doc._id);

  const batchSize = 50000;
  for (let i = 0; i < ids.length; i += batchSize) {
    const batchIds = ids.slice(i, i + batchSize);
    const result = await col.deleteMany({ _id: { $in: batchIds } });
    console.log(`Deleted batch: ${result.deletedCount} documents`);
  }

  const remaining = await col.countDocuments();
  console.log(`Total documents after trim: ${remaining}`);
};
