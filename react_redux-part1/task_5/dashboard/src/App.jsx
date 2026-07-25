import {
  useCallback,
  useEffect,
  useReducer,
} from 'react';
import axios from 'axios';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import Header from './components/Header/Header';
import Login from './pages/Login/Login';
import Footer from './components/Footer/Footer';
import Notifications from
  './components/Notifications/Notifications';
import CourseList from
  './pages/CourseList/CourseList';
import BodySection from
  './components/BodySection/BodySection';
import BodySectionWithMarginBottom from
  './components/BodySectionWithMarginBottom/BodySectionWithMarginBottom';
import {
  logout,
} from './features/auth/authSlice.js';
import {
  getLatestNotification,
} from './utils/utils';
import {
  APP_ACTIONS,
  appReducer,
  initialState,
} from './appReducer';

function App() {
  const [state, appDispatch] = useReducer(
    appReducer,
    initialState,
  );

  const reduxDispatch = useDispatch();

  const isLoggedIn = useSelector(
    (reduxState) =>
      reduxState.auth.isLoggedIn,
  );

  const {
    displayDrawer,
    notifications,
    courses,
  } = state;

  const handleDisplayDrawer =
    useCallback(() => {
      appDispatch({
        type: APP_ACTIONS.TOGGLE_DRAWER,
        displayDrawer: true,
      });
    }, []);

  const handleHideDrawer =
    useCallback(() => {
      appDispatch({
        type: APP_ACTIONS.TOGGLE_DRAWER,
        displayDrawer: false,
      });
    }, []);

  const logOut = useCallback(() => {
    reduxDispatch(logout());

    appDispatch({
      type: APP_ACTIONS.SET_COURSES,
      courses: [],
    });
  }, [reduxDispatch]);

  const markNotificationAsRead =
    useCallback((id) => {
      console.log(
        `Notification ${id} has been marked as read`,
      );

      appDispatch({
        type:
          APP_ACTIONS.MARK_NOTIFICATION_READ,
        id,
      });
    }, []);

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

        const data =
          response.data?.notifications ??
          response.data;

        const fetchedNotifications =
          Array.isArray(data) ? data : [];

        const updatedNotifications =
          fetchedNotifications.map(
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

        appDispatch({
          type:
            APP_ACTIONS.SET_NOTIFICATIONS,
          notifications:
            updatedNotifications,
        });
      } catch (error) {
        if (isMounted) {
          appDispatch({
            type:
              APP_ACTIONS.SET_NOTIFICATIONS,
            notifications: [],
          });
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
      if (!isLoggedIn) {
        appDispatch({
          type: APP_ACTIONS.SET_COURSES,
          courses: [],
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

        const data =
          response.data?.courses ??
          response.data;

        const fetchedCourses =
          Array.isArray(data) ? data : [];

        appDispatch({
          type: APP_ACTIONS.SET_COURSES,
          courses: fetchedCourses,
        });
      } catch (error) {
        if (isMounted) {
          appDispatch({
            type: APP_ACTIONS.SET_COURSES,
            courses: [],
          });
        }
      }
    };

    fetchCourses();

    return () => {
      isMounted = false;
    };
  }, [isLoggedIn]);

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
          listNotifications={
            notifications
          }
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

      <Header />

      <main className="flex flex-1 flex-col">
        {isLoggedIn ? (
          <BodySectionWithMarginBottom
            title="Course list"
          >
            <CourseList courses={courses} />
          </BodySectionWithMarginBottom>
        ) : (
          <BodySectionWithMarginBottom
            title="Log in to continue"
          >
            <Login />
          </BodySectionWithMarginBottom>
        )}

        <BodySection
          title="News from the School"
        >
          <p
            className="
              text-sm
              min-[912px]:text-xs
            "
          >
            Holberton School News goes here
          </p>
        </BodySection>
      </main>

      <Footer />
    </div>
  );
}

export { App };
export default App;
