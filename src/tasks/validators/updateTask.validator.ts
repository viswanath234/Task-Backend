import { checkSchema } from "express-validator";

export const updateTaskValidator = checkSchema({
  _id: {
    in: ["body"],
    notEmpty: true,
    isMongoId: true,
    errorMessage: "Valid task ID is required",
  },
  title: {
    in: ["body"],
    optional: true,
    errorMessage: "Title is required",
    isString: true,
    isLength: {
      options: { max: 100 },
      errorMessage: "Title cannot exceed 100 characters",
    },
    trim: true,
  },
  description: {
    in: ["body"],
    optional: true,
    errorMessage: "Description is required",
    isString: true,
    trim: true,
  },
  status: {
    in: ["body"],
    optional: true,
    isIn: {
      options: [["todo", "in-progress", "completed"]],
      errorMessage: "Status must be one of: todo, in-progress, completed",
    },
  },
  priority: {
    in: ["body"],
    optional: true,
    isIn: {
      options: [["low", "medium", "high"]],
    },
  },
  dueDate: {
    in: ["body"],
    optional: true,
    isISO8601: true,
  },
});
