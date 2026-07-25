export const APP_ACTIONS = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  TOGGLE_DRAWER: 'TOGGLE_DRAWER',
  SET_NOTIFICATIONS:
    'SET_NOTIFICATIONS',
  MARK_NOTIFICATION_READ:
    'MARK_NOTIFICATION_READ',
  SET_COURSES: 'SET_COURSES',
};

export const initialState = {
  displayDrawer: true,

  user: {
    email: '',
    password: '',
    isLoggedIn: false,
  },

  notifications: [],

  courses: [],
};

export function appReducer(
  state,
  action,
) {
  switch (action.type) {
    case APP_ACTIONS.LOGIN:
      return {
        ...state,

        user: {
          email:
            action.email ??
            action.payload?.email ??
            '',

          password:
            action.password ??
            action.payload?.password ??
            '',

          isLoggedIn: true,
        },
      };

    case APP_ACTIONS.LOGOUT:
      return {
        ...state,

        user: {
          email: '',
          password: '',
          isLoggedIn: false,
        },

        courses: [],
      };

    case APP_ACTIONS.TOGGLE_DRAWER:
      return {
        ...state,

        displayDrawer:
          action.displayDrawer ??
          action.payload ??
          false,
      };

    case APP_ACTIONS.SET_NOTIFICATIONS:
      return {
        ...state,

        notifications:
          action.notifications ??
          action.payload ??
          [],
      };

    case APP_ACTIONS
      .MARK_NOTIFICATION_READ:
      return {
        ...state,

        notifications:
          state.notifications.filter(
            (notification) =>
              notification.id !==
              (
                action.id ??
                action.payload
              ),
          ),
      };

    case APP_ACTIONS.SET_COURSES:
      return {
        ...state,

        courses:
          action.courses ??
          action.payload ??
          [],
      };

    default:
      return state;
  }
}
