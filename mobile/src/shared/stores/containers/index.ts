import {Container} from '../../types/Container';
import {Reducer, SimpleAction} from '../index';
import {CONTAINER_ACTION_SET} from './mutations';

export const PREFIX = '@containers/';

export interface State {
  containers: Container[];
}

export const initialState: State = {
  containers: [],
};

export const reducer: Reducer<State> = (input: State, action: SimpleAction) => {
  switch (action.type) {
    case CONTAINER_ACTION_SET:
      return {
        containers: action.payload,
      };
  }

  return input;
};
