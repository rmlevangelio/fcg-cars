import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

export interface AppState {
  form: any,
}

export const reducers = combineReducers<AppState>({
  form: formReducer,
});
