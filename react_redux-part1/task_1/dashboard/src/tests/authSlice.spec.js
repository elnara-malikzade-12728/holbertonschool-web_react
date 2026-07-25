import authReducer, {
  initialState,
  login,
  logout,
} from '../features/auth/authSlice';

describe('authSlice', () => {
  test('returns the initial state by default', () => {
    expect(
      authReducer(undefined, {
        type: undefined,
      }),
    ).toEqual({
      user: {
        email: '',
        password: '',
      },
      isLoggedIn: false,
    });
  });

  test('updates state correctly with login action', () => {
    const credentials = {
      email: 'student@example.com',
      password: 'password123',
    };

    const state = authReducer(
      initialState,
      login(credentials),
    );

    expect(state).toEqual({
      user: {
        email: 'student@example.com',
        password: 'password123',
      },
      isLoggedIn: true,
    });
  });

  test('resets state correctly with logout action', () => {
    const loggedInState = {
      user: {
        email: 'student@example.com',
        password: 'password123',
      },
      isLoggedIn: true,
    };

    const state = authReducer(
      loggedInState,
      logout(),
    );

    expect(state).toEqual(initialState);
  });
});
