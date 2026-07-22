import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import axios from 'axios';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Notifications from '../Notifications/Notifications';
import CourseList from '../CourseList/CourseList';
import { getLatestNotification } from '../utils/utils';
import BodySection from '../BodySection/BodySection';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import AppContext from '../Context/context';

const defaultUser = {
  email: '',
  password: '',
  isLoggedIn: false,
};

function App() {
  const [displayDrawer, setDisplayDrawer] =
    useState(true);

  const [user, setUser] = useState(defaultUser);

  const [notifications, setNotifications] =
    useState([]);

  const [courses, setCourses] = useState([]);

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

        const updatedNotifications =
          response.data.map((notification) => {
            if (Number(notification.id) === 3) {
              return {
                ...notification,
                html: {
                  __html: getLatestNotification(),
                },
              };
            }

            return notification;
          });

        setNotifications(updatedNotifications);
      } catch (error) {
        if (
          typeof process !== 'undefined'
          && process.env.NODE_ENV
            === 'development'
        ) {
          console.error(
            'Error fetching notifications:',
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

    if (!user.isLoggedIn) {
      setCourses([]);

      return () => {
        isMounted = false;
      };
    }

    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          '/courses.json',
        );

        if (isMounted) {
          setCourses(response.data);
        }
      } catch (error) {
        if (
          typeof process !== 'undefined'
          && process.env.NODE_ENV
            === 'development'
        ) {
          console.error(
            'Error fetching courses:',
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
    setUser(defaultUser);
  }, []);

  const markNotificationAsRead = useCallback(
    (id) => {
      console.log(
        `Notification ${id} has been marked as read`,
      );

      setNotifications((previousNotifications) =>
        previousNotifications.filter(
          (notification) =>
            String(notification.id)
            !== String(id),
        ),
      );
    },
    [],
  );

  const contextValue = useMemo(
    () => ({
      user,
      logOut,
    }),
    [user, logOut],
  );

  return (
    <AppContext.Provider value={contextValue}>
      <div
        className="
          App
          flex
          min-h-screen
          w-full
          flex-col
          px-3
          min-[520px]:px-5
          min-[912px]:px-0
        "
      >
        <div className="root-notifications">
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

        <Header />

        <main className="flex flex-1 flex-col">
          {user.isLoggedIn ? (
            <BodySectionWithMarginBottom title="Course list">
              <CourseList courses={courses} />
            </BodySectionWithMarginBottom>
          ) : (
            <BodySectionWithMarginBottom title="Log in to continue">
              <Login
                email={user.email}
                password={user.password}
                logIn={logIn}
              />
            </BodySectionWithMarginBottom>
          )}

          <BodySection title="News from the School">
            <p
              className="
                break-words
                text-[11px]
                leading-relaxed
                min-[520px]:text-xs
                min-[912px]:text-[8px]
              "
            >
              ipsum Lorem ipsum dolor sit amet
              consectetur, adipisicing elit.
              Similique, asperiores architecto
              blanditiis fuga doloribus sit illum
              aliquid ea distinctio minus
              accusantium, impedit quo
              voluptatibus ut magni dicta.
              Recusandae, quia dicta?
            </p>
          </BodySection>
        </main>

        <Footer />
      </div>
    </AppContext.Provider>
  );
}

export default App;
