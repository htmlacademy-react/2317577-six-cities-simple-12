import {store} from '../store';
import {setError} from '../store/action';

export const handleError = (message: string): void => {
  store.dispatch(setError(message));
};
