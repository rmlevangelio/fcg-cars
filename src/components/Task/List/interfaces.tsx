export interface ITaskList {
  tasks: ITask[];
  showModal: () => void;
  refetch: () => void;
  updateTask: (v) => Promise<any>;
}

export interface ITask {
  id: string;
  taskType: string;
  comment: string;
  completed: boolean;
}
