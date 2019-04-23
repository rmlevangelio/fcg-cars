import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import CarsReducer from '../containers/Cars/state/ducks';
import { IState } from './interfaces';

export interface AppState {
  carsApp: IState;
  form: any,
}

export const reducers = combineReducers<AppState>({
  carsApp: CarsReducer,
  form: formReducer,
});
