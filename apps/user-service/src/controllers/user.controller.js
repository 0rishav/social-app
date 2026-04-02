import { CatchAsyncError } from "../middlewares/CatchAsyncError.js";
import { createUserService, findUsersByAge, getActiveUsersCountService } from "../services/user.service.js";

export const registerUser = CatchAsyncError(async (req, res) => {
  const userId = await createUserService(req.body);

  res.status(201).json({
    success: true,
    message: "User registered",
    userId,
  });
});

export const getUsersByAge = CatchAsyncError(async (req, res) => {  
  let { minAge, maxAge, isActive } = req.query;

  minAge = parseInt(minAge, 10);
  maxAge = parseInt(maxAge, 10);

  if (isNaN(minAge) || isNaN(maxAge)) {
    return res.status(400).json({
      success: false,
      message: "Invalid minAge or maxAge",
    });
  }

  if (isActive !== undefined) {
    isActive = isActive === "true";
  }

  const users = await findUsersByAge(minAge, maxAge, isActive);

  res.status(200).json({
    success: true,
    message: "Users retrieved by age",
    users,
  });
});

export const getUsersByAgeExplain = async (req, res) => {
  try {
    const { minAge, maxAge } = req.query;

    // validation
    if (!minAge || !maxAge) {
      return res.status(400).json({
        success: false,
        message: "minAge and maxAge are required",
      });
    }

    const min = parseInt(minAge);
    const max = parseInt(maxAge);

    if (isNaN(min) || isNaN(max)) {
      return res.status(400).json({
        success: false,
        message: "minAge and maxAge must be numbers",
      });
    }

    const explainData = await findUsersByAge(min, max);

    res.status(200).json({
      success: true,
      message: "Explain plan fetched",
      data: explainData,
    });
  } catch (err) {
    console.error("Controller Error:", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getActiveUsersCountExplain = CatchAsyncError(async (req, res) => {
  const { minAge, maxAge } = req.query;

  const min = minAge ? parseInt(minAge) : undefined;
  const max = maxAge ? parseInt(maxAge) : undefined;

  const result = await getActiveUsersCountService(min, max);

  res.status(200).json({
    success: true,
    message: min && max 
      ? `Active users count between ages ${min}-${max} fetched`
      : "Active users count fetched",
    data: result,
  });
});