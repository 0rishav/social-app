import bcrypt from "bcrypt";
import ErrorHandler from "../utils/ErrorHandler.js";
import { getDB } from "../config/db.js";

// insertOne

export const createUserService = async ({ name, email, password }) => {
  console.time("Total createUserService");

  try {
    if (!name || !email || !password) {
      throw new ErrorHandler("All fields are required", 400);
    }

    const db = getDB();
    if (!db) {
      throw new ErrorHandler("Database not initialized", 500);
    }

    const normalizedEmail = email.toLowerCase().trim();

    console.time("findOne user");
    const existingUser = await db.collection("users").findOne({
      email: normalizedEmail,
    });
    console.timeEnd("findOne user");

    if (existingUser) {
      throw new ErrorHandler("User already exists", 409);
    }

    console.time("bcrypt hash password");
    const hashedPassword = await bcrypt.hash(password, 12);
    console.timeEnd("bcrypt hash password");

    const userDoc = {
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,

      role: "user",
      isVerified: false,
      loginCount: 0,
      interests: [],
      stats: {
        followers: 0,
        following: 0,
        posts: 0,
      },

      createdAt: new Date(),
      updatedAt: new Date(),
    };

    console.time("insertOne user");
    const { insertedId } = await db.collection("users").insertOne(userDoc);
    console.timeEnd("insertOne user");

    console.timeEnd("Total createUserService");

    return {
      _id: insertedId,
      name: userDoc.name,
      email: userDoc.email,
    };
  } catch (err) {
    if (!(err instanceof ErrorHandler)) {
      err = new ErrorHandler(
        err.message || "Internal Server Error",
        err.statusCode || 500,
      );
    }
    throw err;
  }
};

// find

export const findUsersByAge = async (minAge, maxAge, isActive) => {
  const db = getDB();
  if (!db) throw new Error("Database not initialized");

  const col = db.collection("labdata");

  const query = {
    age: { $gte: minAge, $lte: maxAge },
  };

  if (typeof isActive === "boolean") {
    query.isActive = isActive;
  }

  console.time("first run");
  const usersFirst = await col.find(query).toArray();
  console.timeEnd("first run");

  console.time("second run");
  const usersSecond = await col.find(query).toArray();
  console.timeEnd("second run");

  return { usersFirst, usersSecond };
};

export const updateUserService = async ({ email, updateData }) => {
  console.time("Total updateUserService");

  try {
    if (!email || !updateData) {
      throw new ErrorHandler("Email and update data required", 400);
    }

    const db = getDB();
    if (!db) throw new ErrorHandler("Database not initialized", 500);

    const normalizedEmail = email.toLowerCase().trim();

    console.time("findOne user for update");
    const existingUser = await db.collection("labdata").findOne({
      email: normalizedEmail,
    });
    console.timeEnd("findOne user for update");

    if (!existingUser) {
      throw new ErrorHandler("User not found", 404);
    }

    const updateObj = {};

    if (updateData.salary) {
      updateObj.$inc = { salary: updateData.salary };
    }

    if (updateData.isActive !== undefined) {
      updateObj.$set = { isActive: updateData.isActive };
    }

    if (updateData.newTag) {
      updateObj.$addToSet = { tags: updateData.newTag };
    }

    if (updateData.incrementPosts) {
      updateObj.$inc = {
        ...updateObj.$inc,
        "stats.posts": updateData.incrementPosts,
      };
    }

    updateObj.$set = { ...updateObj.$set, updatedAt: new Date() };

    console.time("updateOne user");
    const result = await db
      .collection("labdata")
      .updateOne({ email: normalizedEmail }, updateObj);
    console.timeEnd("updateOne user");

    console.timeEnd("Total updateUserService");

    return {
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount,
    };
  } catch (err) {
    if (!(err instanceof ErrorHandler)) {
      err = new ErrorHandler(
        err.message || "Internal Server Error",
        err.statusCode || 500,
      );
    }
    throw err;
  }
};

// aggreagtion && Pipeline

// Q.1 Active users ka count

export const getActiveUsersCountService = async (minAge, maxAge) => {
  const db = getDB();
  if (!db) throw new ErrorHandler("Database not initialized", 500);

  const collection = db.collection("labdata");

  const pipeline = [
    {
      $match: {
        isActive: true,
        age: { $gte: minAge, $lte: maxAge },
      },
    },
    {
      $count: "activeUsers",
    },
  ];

  const explanation = await collection
    .aggregate(pipeline)
    .explain("executionStats");
  console.log(
    "Aggregation Execution Plan:",
    JSON.stringify(explanation, null, 2),
  );

  const result = await collection.aggregate(pipeline).toArray();

  return {
    activeUsers: result[0]?.activeUsers || 0,
    executionStats: explanation.executionStats,
  };
};

// Q.2 Average salary of active users by country

export const getAverageUsersSalary = async (country, minAge, maxAge) => {
  const db = getDB();
  if (!db) throw new ErrorHandler("Database not initialized", 500);

  const collection = db.collection("labdata");

  const pipeline = [
    {
      $match: {
        isActive: true,
        "profile.location.country": country,
        age: { $gte: minAge, $lte: maxAge },
      },
    },
    {
      $group: {
        _id: "$profile.location.country",
        averageSalary: { $avg: "$salary" },
        totalUsers: { $sum: 1 },
      },
    },
  ];

  const explanation = await collection
    .aggregate(pipeline)
    .explain("executionStats");
  console.log(
    "Aggregation Execution Plan:",
    JSON.stringify(explanation, null, 2),
  );

  const result = await collection.aggregate(pipeline).toArray();

  return {
    country: result[0]?._id || country,
    averageSalary: result[0]?.averageSalary || 0,
    totalUsers: result[0]?.totalUsers || 0,
    executionStats: explanation.executionStats,
  };
};

// Q.3 Top 5 cities with highest number of users

export const getTopCitiesByUsers = async () => {
  const db = getDB();
  if (!db) throw new ErrorHandler("Database not initialized", 500);

  const collection = db.collection("labdata");

  const pipeline = [
    {
      $group: {
        _id: "$profile.location.city",
        totalUsers: { $sum: 1 },
      },
    },
    {
      $sort: { totalUsers: -1 },
    },
    {
      $limit: 5,
    },
  ];

  const explanation = await collection
    .aggregate(pipeline)
    .explain("executionStats");
  console.log(
    "Aggregation Execution Plan:",
    JSON.stringify(explanation, null, 2),
  );

  const result = await collection.aggregate(pipeline).toArray();

  return {
    topCities: result,
    executionStats: explanation.executionStats,
  };
};

// Q.4 Users ke name aur email ka simplified list

export const getUsersNameEmailList = async () => {
  const db = getDB();
  if (!db) throw new ErrorHandler("Database not initialized", 500);

  const collection = db.collection("labdata");

  const pipeline = [
    {
      $project: {
        _id: 0,
        name: 1,
        email: 1,
      },
    },
  ];

  const explanation = await collection
    .aggregate(pipeline)
    .explain("executionStats");
  console.log(
    "Aggregation Execution Plan:",
    JSON.stringify(explanation, null, 2),
  );

  const result = await collection.aggregate(pipeline).toArray();

  return {
    users: result,
    executionStats: explanation.executionStats,
  };
};

// Q.5 Skills comma-separated string

export const getUsersSkillsString = async () => {
  const db = getDB();
  const collection = db.collection("labdata");

  const pipeline = [
    {
      $project: {
        _id: 0,
        name: 1,
        skillsString: {
          $reduce: {
            input: "$skills",
            initialValue: "",
            in: {
              $concat: [
                "$$value",
                { $cond: [{ $eq: ["$$value", ""] }, "", ", "] },
                "$$this",
              ],
            },
          },
        },
      },
    },
  ];

  const result = await collection.aggregate(pipeline).toArray();
  return result;
};

// Q.6 Senior field create (experience > 10)

export const getUsersWithSeniorField = async () => {
  const db = getDB();
  const collection = db.collection("labdata");

  const pipeline = [
    {
      $addFields: {
        senior: { $gt: ["$experience", 10] },
      },
    },
    {
      $project: {
        _id: 0,
        name: 1,
        experience: 1,
        senior: 1,
      },
    },
  ];

  const result = await collection.aggregate(pipeline).toArray();
  return result;
};

// Q.7 Average salary by city

export const getAvgSalaryByCity = async () => {
  const db = getDB();
  const collection = db.collection("labdata");

  const pipeline = [
    {
      $group: {
        _id: "$profile.location.city",
        avgSalary: { $avg: "$salary" },
        count: { $sum: 1 },
      },
    },
    {
      $sort: { avgSalary: -1 },
    },
  ];

  const result = await collection.aggregate(pipeline).toArray();
  return result;
};

// Q.8 Total followers per country

export const getFollowerPerCountry = async () => {
  const db = getDB();
  const collection = db.collection("labdata");

  const pipeline = [
    {
      $group: {
        _id: "$profile.location.country",
        totalFollowers: { $sum: "$stats.followers" },
      },
    },
    {
      $sort: { totalFollowers: -1 },
    },
  ];

  const result = await collection.aggregate(pipeline).toArray();
  return result;
};

// Q.9 Premium users per skill

export const getPremiumUsersPerSkill = async () => {
  const db = getDB();
  const collection = db.collection("labdata");

  const pipeline = [
    {
      $match: { isPremium: true, isDeleted: false },
    },

    {
      $unwind: "$skills",
    },

    {
      $group: {
        _id: "$skills",
        premiumUserCount: { $sum: 1 },
      },
    },
    {
      $sort: { premiumUserCount: -1 },
    },
  ];

  const result = await collection.aggregate(pipeline).toArray();
  return result;
};

// Q. 10 Count of users per individual skill

export const getUsersPerIndividualSkill = async () => {
  const db = getDB();
  const collection = db.collection("labdata");

  const pipeline = [
    {
      $addFields: {
        skills: { $setUnion: ["$skills", []] },
      },
    },

    { $unwind: "$skills" },

    {
      $group: {
        _id: "$skills",
        users: { $addToSet: "$_id" },
      },
    },

    {
      $project: {
        _id: 0,
        skill: "$_id",
        userCount: { $size: "$users" },
      },
    },

    { $sort: { userCount: -1 } },
  ];

  return await collection.aggregate(pipeline).toArray();
};

// Q.11 Average salary per tag

export const getAverageSalaryPerTag = async () => {
  const db = getDB();
  const collection = db.collection("labdata");

  const pipeline = [
    {
      $addFields: {
        tags: { $setUnion: ["$tags", []] },
      },
    },

    { $unwind: "$tags" },

    {
      $group: {
        _id: "$tags",
        users: { $addToSet: "$_id" },
        averageSalary: { $avg: "$salary" },
      },
    },

    {
      $project: {
        _id: 0,
        tag: "$_id",
        userCount: { $size: "$users" },
        averageSalary: 1,
      },
    },

    { $sort: { userCount: -1 } },
  ];

  return await collection.aggregate(pipeline).toArray();
};

// Q.12 Users having both node & mongo

export const getUsersWithNodeAndMongo = async () => {
  const db = getDB();
  const collection = db.collection("labdata");

  const pipeline = [
    {
      $match: {
        skills: { $all: ["node", "mongo"] },
      },
    },
    {
      $project: {
        _id: 0,
        name: 1,
        skills: 1,
      },
    },
  ];

  // const pipeline = [
  //   {
  //     $match: {
  //       $expr: {
  //         $eq: [
  //           { $size: { $setIntersection: ["$skills", ["node", "mongo"]] } },
  //           2
  //         ]
  //       }
  //     }
  //   }
  // ];

  return await collection.aggregate(pipeline).toArray();
};

// LAYER-4 Q.20 Top 5 skills by number of users

export const getTopSkills = async () => {
  const db = getDB();
  const collection = db.collection("labdata");

  const pipeline = [
    {
      $match: {
        age: { $gt: 40, $lt: 60 },
        isActive: true,
      },
    },

    { $unwind: "$skills" },

    // Step 1: make each (skill,user) unique
    {
      $group: {
        _id: { skill: "$skills", user: "$_id" },
      },
    },

    // Step 2: count users per skill
    {
      $group: {
        _id: "$_id.skill",
        count: { $sum: 1 },
      },
    },

    { $sort: { count: -1 } },
    { $limit: 5 },
  ];

  console.time("getTopSkillsTotalTime"); // Start total timer
  const result = await collection
    .aggregate(pipeline)
    .explain("allPlansExecution");
  console.timeEnd("getTopSkillsTotalTime"); // End total timer

  console.log(result);
};






