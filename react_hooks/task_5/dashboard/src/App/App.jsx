import {
  useCallback,
  useEffect,
  useMemo,
  useState,
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
import AppContext from '../Context/context';

const defaultUser = {
  email: '',
  password: '',
  isLoggedIn: false,
};

export function App() {
  const [displayDrawer, setDisplayDrawer] =
    useState(true);

  const [user, setUser] = useState(defaultUser);

  const [
    listNotifications,
    setListNotifications,
  ] = useState([]);

  const [courses, setCourses] = useState([]);

  /*
   * Fetch notifications when App initially renders.
   */
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

        setListNotifications(
          updatedNotifications,
        );
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

  /*
   * Fetch courses whenever the user state changes.
   */
  useEffect(() => {
    let isMounted = true;

    const fetchCourses = async () => {
      if (!user.isLoggedIn) {
        setCourses([]);
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

        setCourses(coursesData);
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
      setDisplayDrawer(true);
    }, []);

  const handleHideDrawer =
    useCallback(() => {
      setDisplayDrawer(false);
    }, []);

  const logIn = useCallback(
    (email, password) => {
      setUser({
        email,
        password,
        isLoggedIn: true,
      });
    },
    [],
  );

  const logOut = useCallback(() => {
    setUser(defaultUser);
  }, []);

  const markNotificationAsRead =
    useCallback((id) => {
      setListNotifications(
        (previousNotifications) =>
          previousNotifications.filter(
            (notification) =>
              notification.id !== id,
          ),
      );

      globalThis.console.log(
        `Notification ${id} has been marked as read`,
      );
    }, []);

  const contextValue = useMemo(
    () => ({
      user,
      logIn,
      logOut,
    }),
    [user, logIn, logOut],
  );

  return (
    <AppContext.Provider value={contextValue}>
      <div className="App">
        <Notifications
          listNotifications={
            listNotifications
          }
          notifications={listNotifications}
          handleHideDrawer={
            handleHideDrawer
          }
          handleDisplayDrawer={
            handleDisplayDrawer
          }
          displayDrawer={displayDrawer}
          markNotificationAsRead={
            markNotificationAsRead
          }
        />

        <Header />

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

        <Footer />
      </div>
    </AppContext.Provider>
  );
}

export default App;
