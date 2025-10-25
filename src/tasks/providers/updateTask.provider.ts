import { inject, injectable } from "inversify";
import { IPartialTaskWithId, ITask } from "../task.interface";
import { TasksService } from "../tasks.service";
import { Document } from "mongoose";

@injectable()
export class UpdateTaskProvider {
  constructor(@inject(TasksService) private tasksService: TasksService) {}

  public async updateTask(
    update: IPartialTaskWithId
  ): Promise<Document | never> {
    const task: (Document & ITask) | null = await this.tasksService.findById(
      update._id
    );

    if (!task) {
      throw new Error("Task not found");
    }

    task.title = update.title ? update.title : task.title;
    task.description = update.description
      ? update.description
      : task.description;
    task.status = update.status ? update.status : task.status;
    task.priority = update.priority ? update.priority : task.priority;
    task.dueDate = update.dueDate ? update.dueDate : task.dueDate;

    return await task.save();
  }
}
