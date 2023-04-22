import { AuthorizationStatus } from '../../constants/const';
import { UserData } from '../../types/state';
import { UserInfo } from '../../types/userInfo';
import { makeMockUser } from '../../utils/mocks';
import { checkAuthAction, loginAction, logoutAction } from '../asyncActions';
import { userData } from './user';

const mockUser: Omit<UserInfo, 'token'> = makeMockUser();

describe('Reducer: userData', () => {
  let state: UserData;

  beforeEach(() => {
    state = {
      userInfo: undefined,
      authorizationStatus: AuthorizationStatus.Unknown,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(userData.reducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual({
      userInfo: undefined,
      authorizationStatus: AuthorizationStatus.Unknown,
    });
  });

  describe('checkAuthAction test', () => {
    it('should update authorizationStatus to \'AUTH\' if checkAuthAction fulfilled', () => {
      expect(userData.reducer(state, { type: checkAuthAction.fulfilled.type, payload: mockUser }))
        .toEqual({userInfo: mockUser, authorizationStatus: AuthorizationStatus.Auth});
    });
    it('should update authorizationStatus to \'NO_AUTH\' if checkAuthAction rejected', () => {
      expect(userData.reducer(state, { type: checkAuthAction.rejected.type }))
        .toEqual({userInfo: undefined, authorizationStatus: AuthorizationStatus.NoAuth});
    });
  });

  describe('loginAction test', () => {
    it('should update authorizationStatus to \'AUTH\' if loginAction fulfilled', () => {
      expect(userData.reducer(state, { type: loginAction.fulfilled.type }))
        .toEqual({userInfo: undefined, authorizationStatus: AuthorizationStatus.Auth});
    });
    it('should update authorizationStatus to \'NO_AUTH\' if loginAction rejected', () => {
      expect(userData.reducer(state, { type: loginAction.rejected.type }))
        .toEqual({userInfo: undefined, authorizationStatus: AuthorizationStatus.NoAuth});
    });
  });

  describe('logoutAction test', () => {
    it('should update authorizationStatus to \'NO_AUTH\' if logoutAction fulfilled', () => {
      expect(userData.reducer(state, { type: logoutAction.fulfilled.type }))
        .toEqual({userInfo: undefined, authorizationStatus: AuthorizationStatus.NoAuth});
    });
  });
});
