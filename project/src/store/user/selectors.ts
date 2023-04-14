import { AuthorizationStatus, NameSpace } from '../../constants/const';
import { State } from '../../types/state';
import { UserInfo } from '../../types/userInfo';

export const getUser = (state: State): Omit<UserInfo, 'token'> | undefined =>
  state[NameSpace.User].userInfo;
export const getAuthorizationStatus = (state: State): AuthorizationStatus =>
  state[NameSpace.User].authorizationStatus;
