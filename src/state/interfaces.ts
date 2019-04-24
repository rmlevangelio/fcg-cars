import { ITask } from '../components/Task/List/interfaces';

export interface IPublicProps {
  tasks: ITask[];
  makeOptions: String[];
  car: any;
}

export interface IStateMeta {
  isLoading: boolean;
  isLoaded: boolean;
}

export interface IState {
  data: IPublicProps;
  meta: IStateMeta;
}
