// easy

import { getDB } from "../config/db.js";

// Q.1 Find users with age equal to 58.

export const findUsersByAge = async () => {
  const db = getDB();
  if (!db) throw new Error("Database not initialized");

  const col = db.collection("labdata");
  console.log("Data is printing");
  const results = await col.find({ age: 58 }).toArray();
  console.log("Users with age 58:", results);
};

// Q.2 Find users whose isActive is false.

export const findUsersByIsActive = async () => {
  const db = getDB();
  if (!db) throw new Error("Database not initialized");

  const col = db.collection("labdata");
  console.log("Data is printing");
  const results = await col.find({ isActive: false }).toArray();
  const counts = results.length;
  console.log("Users with isActive false:", results);
  console.log("Total users with isPremium true:", counts);
};

// Q.3 Find users whose isPremium is true.

export const findUsersByIsPremium = async () => {
  const db = getDB();
  if (!db) throw new Error("Database not initialized");

  const col = db.collection("labdata");
  console.log("Data is printing");
  const results = await col.find({ isPremium: true }).toArray();
  const counts = results.length;
  console.log("Users with isActive false:", results);
  console.log("Total users with isPremium true:", counts);
};

// Q.4 Find users whose name is "Zoya".

export const findUsersByName = async () => {
  const db = getDB();
  if (!db) throw new Error("Database not initialized");

  const col = db.collection("labdata");
  console.log("Data is printing");
  const results = await col.find({ name: "Zoya" }).toArray();
  const counts = results.length;
  console.log("Users with isActive false:", results);
  console.log("Total users with isPremium true:", counts);
};

// Q.5 Find users whose salary is greater than 150000.

export const findUsersBySalary = async () => {
  const db = getDB();
  if (!db) throw new Error("Database not initialized");

  const filterOptions = { $gt: 150000 };

  const col = db.collection("labdata");
  console.log("Data is printing");
  const results = await col.find({ salary: filterOptions }).toArray();
  const counts = results.length;
  console.log("Users with Salary:", results);
  console.log("Total users with Salary:", counts);
};

// Q.6 Find users whose experience is less than 5.

export const findUsersByExperience = async () => {
  const db = getDB();
  if (!db) throw new Error("Database not initialized");

  const filterOptions = { $lt: 5 };

  const col = db.collection("labdata");
  console.log("Data is printing");
  const results = await col.find({ experience: filterOptions }).toArray();
  const counts = results.length;
  console.log("Users with Experience:", results);
  console.log("Total users with Experience:", counts);
};

// Q.7 Find users whose salary is between 100000 and 200000.

export const findUsersBySalaryBetweenXtoY = async () => {
  const db = getDB();
  if (!db) throw new Error("Database not initialized");

  const filterOptions = { $gt: 100000, $lt: 200000 };

  const col = db.collection("labdata");
  console.log("Data is printing");
  const results = await col.find({ salary: filterOptions }).toArray();
  const counts = results.length;
  console.log("Users with salary is between 100000 and 200000:", results);
  console.log("Total users salary is between 100000 and 200000:", counts);
};

// Q.8 Find users whose isDeleted is not true.

export const findUsersByIsDeleted = async () => {
  const db = getDB();
  if (!db) throw new Error("Database not initialized");

  const filterOptions = { $ne: true };

  const col = db.collection("labdata");
  console.log("Data is printing");
  const results = await col.find({ isDeleted: filterOptions }).toArray();
  const counts = results.length;
  console.log("Users with whose isDeleted is not true:", results);
  console.log("Total users whose isDeleted is not true:", counts);
};

// Q.9 Find users whose email field exists.

export const findUsersByEmailExists = async () => {
  const db = getDB();
  if (!db) throw new Error("Database not initialized");

  const filterOptions = { $exists: true };

  const col = db.collection("labdata");
  console.log("Data is printing");
  const results = await col.find({ email: filterOptions }).toArray();
  const counts = results.length;
  console.log("Users with whose email field exists:", results);
  console.log("Total users whose email field exists:", counts);
};

// Q.10 Find users whose tags array has exactly 1 element.

export const findUsersByTagsArrayLength = async () => {
  const db = getDB();
  if (!db) throw new Error("Database not initialized");

  const filterOptions = { $size: 1 };

  const col = db.collection("labdata");
  console.log("Data is printing");
  const results = await col.find({ tags: filterOptions }).toArray();
  const counts = results.length;
  console.log("Users with whose email field exists:", results);
  console.log("Total users whose email field exists:", counts);
};

// medium

// Q.11 Find users whose age > 30 AND salary > 100000.

export const findUsersByAgeAndSalary = async () => {
  const db = getDB();
  if (!db) throw new Error("Database not initialized");

  const filterOptions = {
    age: { $gt: 30 },
    salary: { $gt: 100000 },
  };

  const col = db.collection("labdata");

  const results = await col.find(filterOptions).toArray();
  console.log("Users age > 30 AND salary > 100000:", results);
  console.log("Count:", results.length);
};

// Q.12 Find users whose age < 30 OR experience > 10.

export const findUsersByAgeOrExperience = async () => {
  const db = getDB();
  if (!db) throw new Error("Database not initialized");

  const filterOptions = {
    age: { $gt: 30 },
    experience: { $gt: 10 },
  };

  const col = db.collection("labdata");

  const results = await col.find(filterOptions).toArray();
  console.log("Users whose age < 30 OR experience > 10:", results);
  console.log("Users Count whose age < 30 OR experience > 10:", results.length);
};

// Q.13 Find users whose name is not "Zoya".
export const findUsersByNameNotZoya = async () => {
  const db = getDB();
  if (!db) throw new Error("Database not initialized");

  const filterOptions = {
    name: { $ne: "Zoya" },
  };

  const col = db.collection("labdata");

  const results = await col.find(filterOptions).toArray();
  console.log("Users whose name is not Zoya:", results);
  console.log("Users Count whose name is not Zoya:", results.length);
};

// Q.14 Find users whose tags array does not include backend.
export const findUsersByTagsNotBackend = async () => {
  const db = getDB();
  if (!db) throw new Error("Database not initialized");

  const filterOptions = {
    tags: { $ne: "backend" },
  };

  const col = db.collection("labdata");

  const results = await col.find(filterOptions).toArray();
  console.log("Users whose tags array does not include backend:", results);
  console.log(
    "Users Count whose tags array does not include backend:",
    results.length,
  );
};

// Q.15 Find users whose skills array includes node or mongo.

export const findUsersBySkillsNodeOrMongo = async () => {
  const db = getDB();
  if (!db) throw new Error("Database not initialized");

  const filterOptions = {
    skills: { $in: ["node", "mongo"] },
  };

  const col = db.collection("labdata");

  const results = await col.find(filterOptions).toArray();
  console.log("Users whose tags array does not include backend:", results);
  console.log(
    "Users Count whose tags array does not include backend:",
    results.length,
  );
};

// Q.16 Find users who are not deleted AND isActive is true.

export const findUsersCreatedInLast7Days = async () => {
  const db = getDB();
  if (!db) throw new Error("Database not initialized");
  const filterOptions = {
    isDeleted: { $ne: true },
    isActive: true,
  };

  const col = db.collection("labdata");

  const results = await col.find(filterOptions).toArray();
  console.log("Users whose tags array does not include backend:", results);
  console.log(
    "Users Count whose tags array does not include backend:",
    results.length,
  );
};

// Q.17 Find users whose optionalField exists.

export const findUsersByOptionalFieldExists = async () => {
  const db = getDB();
  if (!db) throw new Error("Database not initialized");
  const filterOptions = {
    optionalField: { $exists: true },
  };

  const col = db.collection("labdata");

  const results = await col.find(filterOptions).toArray();
  console.log("Users whose tags array does not include backend:", results);
  console.log(
    "Users Count whose tags array does not include backend:",
    results.length,
  );
};

