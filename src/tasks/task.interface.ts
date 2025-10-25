export interface ITask {
  title: string;
  description: string;
  status: "todo" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  dueDate: Date;
}

export interface IPartialTaskWithId extends Partial<ITask> {
  _id: string;
}
