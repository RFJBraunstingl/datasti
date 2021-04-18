import {createStore} from 'redux';
import {
  initialState as initialContainerState,
  State as ContainerState,
  PREFIX as CONTAINER_ACTION_PREFIX,
  reducer as containerReducer,
} from './containers';

export type Reducer<StateType> = (
  input: StateType,
  action: SimpleAction,
) => StateType;

export interface State {
  containers: ContainerState;
}

const initialState: State = {
  containers: initialContainerState,
};

export interface SimpleAction {
  type: string;
  payload: any;
}

function rootReducer(state: State = initialState, action: SimpleAction): State {
  let actionType = action.type;

  if (actionType.startsWith(CONTAINER_ACTION_PREFIX)) {
    return {
      ...state,
      containers: containerReducer(state.containers, action.payload),
    };
  }

  return state;
}

const store = createStore(rootReducer);

export default store;
