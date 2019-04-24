import { DataProps, OperationVariables } from 'react-apollo';

export interface ITaskList extends DataProps<{}, {}> {
  carId: string;
  tasks: ITask[];
  loading: boolean;
  refetch: () => void;
  updateTask: (v) => Promise<any>;
}

export interface ITask {
  id: string;
  taskType: string;
  comment: string;
  completed: boolean;
}
