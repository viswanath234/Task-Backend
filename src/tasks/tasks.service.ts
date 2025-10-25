import { injectable } from "inversify";
import { Task } from "./task.schema";
import { ITask } from "./task.interface";
import { FilterQuery, Model } from "mongoose";
import { ITaskPagination } from "./interfaces/taskPagination.interface";

@injectable()
export class TasksService {
  private taskModel: Model<ITask> = Task;

  public async createTask(taskData: ITask) {
    return await new this.taskModel(taskData).save();
  }

  public async findById(_id: string) {
    return await this.taskModel.findById(_id);
  }

  public async findActive(pagination: ITaskPagination) {
    return await this.taskModel
      .find({
        status: { $in: ["todo", "in-progress"] },
      })
      .limit(pagination.limit)
      .skip(pagination.page - 1)
      .sort({ createdAt: pagination.order === "asc" ? 1 : -1 });
  }

  public async findAll(pagination: ITaskPagination) {
    return await this.taskModel
      .find()
      .limit(pagination.limit)
      .skip(pagination.page - 1)
      .sort({ createdAt: pagination.order === "asc" ? 1 : -1 });
  }

  public async countDocuments(filter?: FilterQuery<ITask>) {
    return await this.taskModel.countDocuments(filter);
  }
}
