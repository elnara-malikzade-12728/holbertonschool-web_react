import {
  useCallback,
  useEffect,
  useState,
} from 'react';
import axios from 'axios';

import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import Notifications from '../Notifications/Notifications';
import CourseList from '../CourseList/CourseList';
import BodySection from '../BodySection/BodySection';
import BodySectionWithMarginBottom from
  '../BodySection/BodySectionWithMarginBottom';
import { getLatestNotification } from '../utils/utils';

function App() {
  const [displayDrawer, setDisplayDrawer] =
    useState(true);

  const [notifications, setNotifications] =
    useState([]);

  const [courses, setCourses] = useState([]);

  const [user, setUser] = useState({
    email: '',
    password: '',
    isLoggedIn: false,
  });

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
    setUser({
      email: '',
      password: '',
      isLoggedIn: false,
    });

    setCourses([]);
  }, []);

  const markNotificationAsRead =
    useCallback((id) => {
      console.log(
        `Notification ${id} has been marked as read`,
      );

      setNotifications(
        (previousNotifications) =>
          previousNotifications.filter(
            (notification) =>
              String(notification.id)
              !== String(id),
          ),
      );
    }, []);

  useEffect(() => {
    let isMounted = true;

    axios
      .get('/notifications.json')
      .then((response) => {
        if (!isMounted) {
          return;
        }

        const loadedNotifications =
          Array.isArray(response.data)
            ? response.data
            : [];

        const formattedNotifications =
          loadedNotifications.map(
            (notification) => {
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
            },
          );

        setNotifications(
          formattedNotifications,
        );
      })
      .catch(() => null);

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

        const loadedCourses =
          Array.isArray(response.data)
            ? response.data
            : [];

        setCourses(loadedCourses);
      })
      .catch(() => null);

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

      <Footer
        user={user}
      />
    </div>
  );
}

export default App;
