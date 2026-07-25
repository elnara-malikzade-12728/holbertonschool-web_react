export const APP_ACTIONS = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  TOGGLE_DRAWER: 'TOGGLE_DRAWER',
  MARK_NOTIFICATION_READ:
    'MARK_NOTIFICATION_READ',
  SET_NOTIFICATIONS: 'SET_NOTIFICATIONS',
  SET_COURSES: 'SET_COURSES',
};

const defaultUser = {
  email: '',
  password: '',
  isLoggedIn: false,
};

export const initialState = {
  displayDrawer: true,
  user: defaultUser,
  notifications: [],
  courses: [],
};

export function appReducer(
  state = initialState,
  action = {},
) {
  switch (action.type) {
    case APP_ACTIONS.LOGIN: {
      const email =
        action.email ??
        action.payload?.email ??
        '';

      const password =
        action.password ??
        action.payload?.password ??
        '';

      return {
        ...state,
        user: {
          email,
          password,
          isLoggedIn: true,
        },
      };
    }

    case APP_ACTIONS.LOGOUT:
      return {
        ...state,
        user: {
          ...defaultUser,
        },
        courses: [],
      };

    case APP_ACTIONS.TOGGLE_DRAWER: {
      const displayDrawer =
        action.displayDrawer ??
        action.payload ??
        !state.displayDrawer;

      return {
        ...state,
        displayDrawer,
      };
    }

    case APP_ACTIONS.SET_NOTIFICATIONS: {
      const notifications =
        action.notifications ??
        action.payload ??
        [];

      return {
        ...state,
        notifications: [...notifications],
      };
    }

    case APP_ACTIONS.MARK_NOTIFICATION_READ: {
      const notificationId =
        action.id ??
        action.notificationId ??
        action.payload;

      return {
        ...state,
        notifications:
          state.notifications.filter(
            (notification) =>
              notification.id !==
              notificationId,
          ),
      };
    }

    case APP_ACTIONS.SET_COURSES: {
      const courses =
        action.courses ??
        action.payload ??
        [];

      return {
        ...state,
        courses: [...courses],
      };
    }

    default:
      return state;
  }
}
