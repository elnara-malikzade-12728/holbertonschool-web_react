import {
  useCallback,
  useEffect,
  useReducer,
} from 'react';
import axios from 'axios';

import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import Notifications from
  '../Notifications/Notifications';
import CourseList from
  '../CourseList/CourseList';
import BodySection from
  '../BodySection/BodySection';
import BodySectionWithMarginBottom from
  '../BodySection/BodySectionWithMarginBottom';
import {
  getLatestNotification,
} from '../utils/utils';
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
      console.log(
        `Notification ${id} has been marked as read`,
      );

      dispatch({
        type:
          APP_ACTIONS.MARK_NOTIFICATION_READ,
        payload: id,
      });
    }, []);

  useEffect(() => {
    let isMounted = true;

    axios
      .get('/notifications.json')
      .then((response) => {
        if (!isMounted) {
          return;
        }

        const data = Array.isArray(
          response.data,
        )
          ? response.data
          : [];

        const formattedNotifications =
          data.map((notification) => {
            if (notification.id === 3) {
              return {
                ...notification,
                html: {
                  __html:
                    getLatestNotification(),
                },
              };
            }

            return notification;
          });

        dispatch({
          type:
            APP_ACTIONS.SET_NOTIFICATIONS,
          payload: formattedNotifications,
        });
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!user.isLoggedIn) {
      return undefined;
    }

    let isMounted = true;

    axios
      .get('/courses.json')
      .then((response) => {
        if (!isMounted) {
          return;
        }

        dispatch({
          type: APP_ACTIONS.SET_COURSES,
          payload: Array.isArray(
            response.data,
          )
            ? response.data
            : [],
        });
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, [user.isLoggedIn]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        event.ctrlKey
        && event.key.toLowerCase() === 'h'
      ) {
        event.preventDefault();
        alert('Logging you out');
        logOut();
      }
    };

    document.addEventListener(
      'keydown',
      handleKeyDown,
    );

    return () => {
      document.removeEventListener(
        'keydown',
        handleKeyDown,
      );
    };
  }, [logOut]);

  return (
    <div
      className="
        App
        flex
        min-h-screen
        flex-col
        px-5
      "
    >
      <div id="root-notifications">
        <Notifications
          notifications={notifications}
          displayDrawer={displayDrawer}
          handleDisplayDrawer={
            handleDisplayDrawer
          }
          handleHideDrawer={
            handleHideDrawer
          }
          markNotificationAsRead={
            markNotificationAsRead
          }
        />
      </div>

      <Header
        user={user}
        logOut={logOut}
      />

      <main className="flex flex-1 flex-col">
        {user.isLoggedIn ? (
          <BodySectionWithMarginBottom
            title="Course list"
          >
            <CourseList
              courses={courses}
            />
          </BodySectionWithMarginBottom>
        ) : (
          <Login logIn={logIn} />
        )}

        <BodySection
          title="News from the School"
        >
          <p>
            Holberton School News goes here
          </p>
        </BodySection>
      </main>

      <Footer user={user} />
    </div>
  );
}

export default App;
