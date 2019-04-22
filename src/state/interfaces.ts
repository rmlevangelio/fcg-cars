import { ITask } from "../components/Task/interfaces";

export interface IPublicProps {
  tasks: ITask[];
  makeOptions: String[];
}

export interface IStateMeta {
  isLoading: boolean;
  isLoaded: boolean;
}

export interface IState {
  data: IPublicProps;
  meta: IStateMeta;
}