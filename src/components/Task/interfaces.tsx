export interface ITaskList {
  carId: string;
  // toggleTask: (selectedTask) => any;
}

export interface ITask {
  id: string;
  taskType: string;
  comment: string;
  completed: boolean;
}
