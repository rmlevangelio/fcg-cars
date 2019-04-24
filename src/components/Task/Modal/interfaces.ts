import { InjectedFormProps } from 'redux-form';

export enum TaskType {
  'ADD_DOCUMENT',
  'WASH_CAR',
  'ADD_PAYMENT_DETAILS'
}

export interface IAddTaskPublicProps {
  show: boolean;
  carId: string;
  handleClose: () => void;
}

export interface IAddTaskFormValues {
  taskType: TaskType;
  comment: string;
}

export type AddTaskProps =
  & IAddTaskPublicProps
  ;

export type AddTaskPropsWithForm =
  & IAddTaskPublicProps
  & InjectedFormProps<IAddTaskFormValues, AddTaskProps>
