import {PREFIX, State} from './index';
import {Container} from '../../types/Container';

export const CONTAINER_ACTION_SET = PREFIX + 'set';

type Action<Data> = (input: State, data: Data) => State;

export const setContainers: Action<Container[]> = (
  currentState,
  newContainers,
) => {
  return {
    ...currentState,
    containers: newContainers,
  };
};
