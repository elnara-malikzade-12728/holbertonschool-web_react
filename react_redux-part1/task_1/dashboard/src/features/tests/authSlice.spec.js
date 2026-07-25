import authReducer, {
  login,
  logout,
} from '../auth/authSlice';

describe('authSlice', () => {
  const expectedInitialState = {
    user: {
      email: '',
      password: '',
    },
    isLoggedIn: false,
  };

  test('Should return the initial state by default', () => {
    const state = authReducer(undefined, {
      type: 'unknown',
    });

    expect(state).toEqual(expectedInitialState);
  });

  test('Should update the state correctly with login action', () => {
    const credentials = {
      email: 'student@example.com',
      password: 'password123',
    };

    const state = authReducer(
      expectedInitialState,
      login(credentials),
    );

    expect(state.user.email).toBe(
      'student@example.com',
    );
    expect(state.user.password).toBe(
      'password123',
    );
    expect(state.isLoggedIn).toBe(true);

    expect(state).toEqual({
      user: {
        email: 'student@example.com',
        password: 'password123',
      },
      isLoggedIn: true,
    });
  });

  test('Should reset the state correctly with logout action', () => {
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

    expect(state.user.email).toBe('');
    expect(state.user.password).toBe('');
    expect(state.isLoggedIn).toBe(false);
    expect(state).toEqual(expectedInitialState);
  });
});
