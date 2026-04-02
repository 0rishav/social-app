import { connectDB } from "./db";

export const createCollections = async () => {
  const db = connectDB();

  await db.createCollection("users", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["name", "email", "password"],
        properties: {
          name: { bsonType: "string" },
          email: { bsonType: "string" },
          password: { bsonType: "string" },
          age: { bsonType: "int" },
          isVerified: { bsonType: "bool" },
          roles: { bsonType: "array" },
          interests: { bsonType: "array" },
          address: { bsonType: "object" },
          loginHistory: { bsonType: "array" },
          stats: { bsonType: "object" },
          createdAt: { bsonType: "date" },
        },
      },
    },
  });
};
