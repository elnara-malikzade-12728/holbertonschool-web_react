import {
  useCallback,
  useEffect,
  useReducer,
} from 'react';
import axios from 'axios';

import Notifications from '../Notifications/Notifications';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Login from '../Login/Login';
import CourseList from '../CourseList/CourseList';
import { getLatestNotification } from '../utils/utils';
import BodySectionWithMarginBottom from
  '../BodySection/BodySectionWithMarginBottom';
import BodySection from '../BodySection/BodySection';

import {
  APP_ACTIONS,
  appReducer,
  initialState,
} from './appReducer';

function App() {
  const [state, dispatch] = useReducer(
    appReducer,
    initialState,
  );

  const {
    displayDrawer,
    user,
    notifications,
    courses,
  } = state;

  useEffect(() => {
    let isMounted = true;

    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          '/notifications.json',
        );

        if (!isMounted) {
          return;
        }

        const dataPayload =
          response.data?.notifications ??
          response.data;

        const notificationsData =
          Array.isArray(dataPayload)
            ? dataPayload
            : [];

        const updatedNotifications =
          notificationsData.map(
            (notification) => {
              if (notification.id !== 3) {
                return notification;
              }

              return {
                ...notification,
                type: 'urgent',
                html: {
                  __html:
                    getLatestNotification(),
                },
              };
            },
          );

        dispatch({
          type: APP_ACTIONS.SET_NOTIFICATIONS,
          payload: updatedNotifications,
        });
      } catch (error) {
        if (
          process.env.NODE_ENV ===
          'development'
        ) {
          console.error(
            'Unable to fetch notifications:',
            error,
          );
        }
      }
    };

    fetchNotifications();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchCourses = async () => {
      if (!user.isLoggedIn) {
        dispatch({
          type: APP_ACTIONS.SET_COURSES,
          payload: [],
        });

        return;
      }

      try {
        const response = await axios.get(
          '/courses.json',
        );

        if (!isMounted) {
          return;
        }

        const dataPayload =
          response.data?.courses ??
          response.data;

        const coursesData =
          Array.isArray(dataPayload)
            ? dataPayload
            : [];

        dispatch({
          type: APP_ACTIONS.SET_COURSES,
          payload: coursesData,
        });
      } catch (error) {
        if (
          process.env.NODE_ENV ===
          'development'
        ) {
          console.error(
            'Unable to fetch courses:',
            error,
          );
        }
      }
    };

    fetchCourses();

    return () => {
      isMounted = false;
    };
  }, [user.isLoggedIn]);

  const handleDisplayDrawer =
    useCallback(() => {
      dispatch({
        type: APP_ACTIONS.TOGGLE_DRAWER,
        payload: true,
      });
    }, []);

  const handleHideDrawer =
    useCallback(() => {
      dispatch({
        type: APP_ACTIONS.TOGGLE_DRAWER,
        payload: false,
      });
    }, []);

  const logIn = useCallback(
    (email, password) => {
      dispatch({
        type: APP_ACTIONS.LOGIN,
        payload: {
          email,
          password,
        },
      });
    },
    [],
  );

  const logOut = useCallback(() => {
    dispatch({
      type: APP_ACTIONS.LOGOUT,
    });
  }, []);

  const markNotificationAsRead =
    useCallback((id) => {
      dispatch({
        type:
          APP_ACTIONS.MARK_NOTIFICATION_READ,
        payload: id,
      });

      console['log'](
        `Notification ${id} has been marked as read`,
      );
    }, []);

  return (
    <div className="App">
      <Notifications
        listNotifications={notifications}
        notifications={notifications}
        handleHideDrawer={handleHideDrawer}
        handleDisplayDrawer={
          handleDisplayDrawer
        }
        displayDrawer={displayDrawer}
        markNotificationAsRead={
          markNotificationAsRead
        }
      />

      <Header
        user={user}
        logOut={logOut}
      />

      {!user.isLoggedIn ? (
        <BodySectionWithMarginBottom
          title="Log in to continue"
        >
          <Login
            logIn={logIn}
            email={user.email}
            password={user.password}
          />
        </BodySectionWithMarginBottom>
      ) : (
        <BodySectionWithMarginBottom
          title="Course list"
        >
          <CourseList courses={courses} />
        </BodySectionWithMarginBottom>
      )}

      <BodySection title="News from the School">
        <p>
          Holberton School news goes here
        </p>
      </BodySection>

      <Footer user={user} />
    </div>
  );
}

export { App };
export default App;
