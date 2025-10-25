import { inject, injectable } from "inversify";
import { TasksService } from "../tasks.service";
import { ITaskPagination } from "../interfaces/taskPagination.interface";
import { ITask } from "../task.interface";

@injectable()
export class GetTasksProvider {
  constructor(@inject(TasksService) private taskService: TasksService) {}

  public async findAllTasks(pagination: Partial<ITaskPagination>): Promise<{
    data: ITask[];
    meta: {};
  }> {
    const tasks: ITask[] = await this.taskService.findActive({
      limit: pagination.limit ?? 10,
      page: pagination.page ?? 1,
      order: pagination.order ?? "asc",
    });
    const totalTasks: number = await this.taskService.countDocuments();
    const completedTasks: number = await this.taskService.countDocuments({
      status: "completed",
    });
    const todoTasks: number = await this.taskService.countDocuments({
      status: "todo",
    });
    const inProgressTasks: number = await this.taskService.countDocuments({
      status: "in-progress",
    });

    return {
      data: tasks,
      meta: { totalTasks, completedTasks, todoTasks, inProgressTasks },
    };
  }
}
