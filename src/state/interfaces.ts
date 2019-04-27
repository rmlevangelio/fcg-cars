import { ITask } from '../components/Task/List/interfaces';

export interface IPublicProps {
  tasks: ITask[];
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
