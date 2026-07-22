import {
  useCallback,
  useMemo,
  useState,
} from 'react';
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
  const [displayDrawer, setDisplayDrawer] =
    useState(true);

  const [user, setUser] = useState(defaultUser);

  const [notifications, setNotifications] =
    useState(notificationsList);

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
      setNotifications((previousNotifications) =>
        previousNotifications.filter(
          (notification) => notification.id !== id,
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
            handleHideDrawer={handleHideDrawer}
            markNotificationAsRead={
              markNotificationAsRead
            }
          />
        </div>

        <Header />

        <main className="flex flex-1 flex-col">
          {user.isLoggedIn ? (
            <BodySectionWithMarginBottom title="Course list">
              <CourseList courses={coursesList} />
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
              accusantium, impedit quo voluptatibus
              ut magni dicta. Recusandae, quia
              dicta?
            </p>
          </BodySection>
        </main>

        <Footer />
      </div>
    </AppContext.Provider>
  );
}

export default App;
