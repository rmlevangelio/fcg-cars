import { combineReducers } from 'redux';

import CarsReducer from '../containers/Cars/state/ducks';
import { IState } from './interfaces';

export interface AppState {
  carsApp: IState;
}

export const reducers = combineReducers<AppState>({
  carsApp: CarsReducer,
});
