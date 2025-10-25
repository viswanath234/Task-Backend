import { checkSchema } from "express-validator";

export const getTasksValidator = checkSchema({
  limit: {
    in: ["query"],
    optional: true,
    isInt: {
      options: { min: 1 },
      errorMessage: "Limit must be a positive integer",
    },
    toInt: true,
  },
  page: {
    in: ["query"],
    optional: true,
    isInt: { options: { min: 1 } },
    toInt: true,
  },
  order: {
    in: ["query"],
    optional: true,
    isIn: { options: [["asc", "desc"]] },
  },
});
