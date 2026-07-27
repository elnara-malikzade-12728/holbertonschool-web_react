import { useEffect } from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import Header from './components/Header/Header.jsx';
import Login from './pages/Login/Login.jsx';
import Footer from './components/Footer/Footer.jsx';
import Notifications from
  './components/Notifications/Notifications.jsx';
import CourseList from
  './pages/CourseList/CourseList.jsx';
import BodySection from
  './components/BodySection/BodySection.jsx';
import BodySectionWithMarginBottom from
  './components/BodySectionWithMarginBottom/BodySectionWithMarginBottom.jsx';

import {
  logout,
} from './features/auth/authSlice.js';
import {
  fetchNotifications,
} from './features/notifications/notificationsSlice.js';
import {
  fetchCourses,
} from './features/courses/coursesSlice.js';

function App() {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(
    (state) => state.auth.isLoggedIn,
  );

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchCourses());
    }
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        event.ctrlKey
        && event.key.toLowerCase() === 'h'
      ) {
        event.preventDefault();
        alert('Logging you out');
        dispatch(logout());
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
  }, [dispatch]);

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
        <Notifications />
      </div>

      <Header />

      <main className="flex flex-1 flex-col">
        {isLoggedIn ? (
          <BodySectionWithMarginBottom
            title="Course list"
          >
            <CourseList />
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
