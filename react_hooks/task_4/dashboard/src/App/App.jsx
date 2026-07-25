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

  const [user, setUser] =
    useState(defaultUser);

  const [listNotifications, setListNotifications] =
    useState([]);

  const [courses, setCourses] =
    useState([]);

  useEffect(() => {
    let isMounted = true;

    axios
      .get('/notifications.json')
      .then((response) => {
        if (!isMounted) {
          return;
        }

        const notificationList =
          Array.isArray(response.data)
            ? response.data
            : [];

        const updatedNotifications =
          notificationList.map(
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
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!user.isLoggedIn) {
      setCourses([]);
      return undefined;
    }

    let isMounted = true;

    axios
      .get('/courses.json')
      .then((response) => {
        if (!isMounted) {
          return;
        }

        const courseList =
          Array.isArray(response.data)
            ? response.data
            : [];

        setCourses(courseList);
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, [user.isLoggedIn]);

  const handleDisplayDrawer = useCallback(() => {
    setDisplayDrawer(true);
  }, []);

  const handleHideDrawer = useCallback(() => {
    setDisplayDrawer(false);
  }, []);

  const logIn = useCallback((email, password) => {
    setUser({
      email,
      password,
      isLoggedIn: true,
    });
  }, []);

  const logOut = useCallback(() => {
    setUser({
      email: '',
      password: '',
      isLoggedIn: false,
    });
  }, []);

  const markNotificationAsRead = useCallback((id) => {
    setListNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );

    console.log(
      `Notification ${id} has been marked as read`
    );
  }, []);

  const contextValue = useMemo(() => ({
    user,
    logOut,
  }), [user, logOut]);

  return (
    <AppContext.Provider value={contextValue}>
      <div className="App">
        <Notifications
          listNotifications={listNotifications}
          handleHideDrawer={handleHideDrawer}
          handleDisplayDrawer={handleDisplayDrawer}
          displayDrawer={displayDrawer}
          markNotificationAsRead={markNotificationAsRead}
        />

        <Header />

        {!user.isLoggedIn ? (
          <BodySectionWithMarginBottom
            title="Log in to continue"
          >
            <Login logIn={logIn} />
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
