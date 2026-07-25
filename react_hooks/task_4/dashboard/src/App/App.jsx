import {
  useCallback,
  useMemo,
  useState,
} from 'react';

import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import Notifications from '../Notifications/Notifications';
import CourseList from '../CourseList/CourseList';
import BodySection from '../BodySection/BodySection';
import BodySectionWithMarginBottom from
  '../BodySectionWithMarginBottom/BodySectionWithMarginBottom';
import AppContext, {
  user as defaultUser,
} from '../Context/context';
import {
  getLatestNotification,
} from '../utils/utils';

const notificationsList = [
  {
    id: 1,
    type: 'default',
    value: 'New course available',
  },
  {
    id: 2,
    type: 'urgent',
    value: 'New resume available',
  },
  {
    id: 3,
    type: 'urgent',
    html: {
      __html: getLatestNotification(),
    },
  },
];

const coursesList = [
  {
    id: 1,
    name: 'ES6',
    credit: 60,
  },
  {
    id: 2,
    name: 'Webpack',
    credit: 20,
  },
  {
    id: 3,
    name: 'React',
    credit: 40,
  },
];

function App() {
  const [
    displayDrawer,
    setDisplayDrawer,
  ] = useState(true);

  const [
    user,
    setUser,
  ] = useState(defaultUser);

  const [
    notifications,
    setNotifications,
  ] = useState(notificationsList);

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
              notification.id !== id,
          ),
      );
    }, []);

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

        <Header />

        <main className="flex flex-1 flex-col">
          {user.isLoggedIn ? (
            <BodySectionWithMarginBottom
              title="Course list"
            >
              <CourseList
                courses={coursesList}
              />
            </BodySectionWithMarginBottom>
          ) : (
            <BodySectionWithMarginBottom
              title="Log in to continue"
            >
              <Login logIn={logIn} />
            </BodySectionWithMarginBottom>
          )}

          <BodySection
            title="News from the School"
          >
            <p>
              Holberton School News goes here
            </p>
          </BodySection>
        </main>

        <Footer />
      </div>
    </AppContext.Provider>
  );
}

export default App;