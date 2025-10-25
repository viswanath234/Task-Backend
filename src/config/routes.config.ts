import { Application } from "express";
import { TasksRouter } from "../tasks/tasks.router";
import { container } from "./container";

export function addRoutes(app: Application): Application {
  const tasksRouter = container.get<TasksRouter>(TasksRouter);

  app.use("/tasks", tasksRouter.router);

  return app;
}
