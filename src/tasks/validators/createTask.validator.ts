import { checkSchema } from "express-validator";

export const createTaskValidator = checkSchema({
  title: {
    in: ["body"],
    notEmpty: true,
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
    notEmpty: true,
    errorMessage: "Description is required",
    isString: true,
    trim: true,
  },
  status: {
    in: ["body"],
    notEmpty: true,
    isIn: {
      options: [["todo", "in-progress", "completed"]],
      errorMessage: "Status must be one of: todo, in-progress, completed",
    },
  },
  priority: {
    in: ["body"],
    notEmpty: true,
    isIn: {
      options: [["low", "medium", "high"]],
    },
  },
  dueDate: {
    in: ["body"],
    notEmpty: true,
    isISO8601: true,
  },
});
