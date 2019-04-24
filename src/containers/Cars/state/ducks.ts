import { ITask } from '../../../components/Task/List/interfaces';
import { IState } from '../../../state/interfaces';


const initialState: IState = {
  data: {
    tasks: [],
    makeOptions: [],
    car: null,
  },
  meta: {
    isLoading: false,
    isLoaded: false,
  }
};

// Action
export const ADD_TASK = 'CarsApp/ADD_TASK';
export const TOGGLE_TASK = 'CarsApp/TOGGLE_TASK';
export const FETCH_TASKS = 'CarsApp/FETCH_TASKS';

export const FETCH_MODEL_OPTIONS = 'CarsApp/FETCH_MODEL_OPTIONS';

// Reducer
export default function reducer(state: IState = initialState, action: any) {
  switch(action.type) {
    case ADD_TASK:
      return {
        ...state, 
        data: {
          ...state.data, 
          tasks: [
            ...state.data.tasks,
            action.payload
          ],
        }
      };
    case TOGGLE_TASK: {
      return { ...state, data: { ...state.data, tasks: [ ...state.data.tasks, action.payload ]}};
    }
    default:
      return state;
  }
}

// Action Creators
export function addTask(task) {
  return { type: ADD_TASK, payload: task };
}

export function toggleTask(task) {
  return { type: TOGGLE_TASK, payload: task };
}

export function fetchTasks() {
  return { type: FETCH_TASKS };
}
