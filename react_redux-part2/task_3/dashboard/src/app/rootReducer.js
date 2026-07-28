import { combineReducers } from '@reduxjs/toolkit';

import authReducer from '../features/auth/authSlice.js';
import notificationsReducer from '../features/notifications/notificationsSlice.js';
import coursesReducer from '../features/courses/courseSlice.js';

const rootReducer = combineReducers({
  auth: authReducer,
  notifications: notificationsReducer,
  courses: coursesReducer,
});

export default rootReducer;
