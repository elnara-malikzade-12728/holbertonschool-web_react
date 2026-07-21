import { Component } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Notifications from '../Notifications/Notifications';
import CourseList from '../CourseList/CourseList';
import { getLatestNotification } from '../utils/utils';
import BodySection from '../BodySection/BodySection';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import AppContext from '../Context/context';

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

class App extends Component {
  constructor(props) {
    super(props);

    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
    this.markNotificationAsRead =
      this.markNotificationAsRead.bind(this);

    this.state = {
      displayDrawer: false,
      user: {
        email: '',
        password: '',
        isLoggedIn: false,
      },
      logOut: this.logOut,
      notifications: notificationsList,
      courses: coursesList,
    };
  }

  componentDidMount() {
    document.addEventListener(
      'keydown',
      this.handleKeyDown,
    );
  }

  componentWillUnmount() {
    document.removeEventListener(
      'keydown',
      this.handleKeyDown,
    );
  }

  handleDisplayDrawer = () => {
    this.setState({
      displayDrawer: true,
    });
  };

  handleHideDrawer = () => {
    this.setState({
      displayDrawer: false,
    });
  };

  handleKeyDown = (event) => {
    if (event.ctrlKey && event.key === 'h') {
      window.alert('Logging you out');
      this.logOut();
    }
  };

  logIn(email, password) {
    this.setState({
      user: {
        email,
        password,
        isLoggedIn: true,
      },
    });
  }

  logOut() {
    this.setState({
      user: {
        email: '',
        password: '',
        isLoggedIn: false,
      },
    });
  }

  markNotificationAsRead(id) {
    console.log(
      `Notification ${id} has been marked as read`,
    );

    this.setState((prevState) => ({
      notifications: prevState.notifications.filter(
        (notification) => notification.id !== id,
      ),
    }));
  }

  render() {
    const {
      displayDrawer,
      user,
      notifications,
      courses,
    } = this.state;

    return (
      <AppContext.Provider value={this.state}>
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
                this.handleDisplayDrawer
              }
              handleHideDrawer={
                this.handleHideDrawer
              }
              markNotificationAsRead={
                this.markNotificationAsRead
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
                  logIn={this.logIn}
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
                ipsum Lorem ipsum dolor sit amet consectetur,
                adipisicing elit. Similique, asperiores
                architecto blanditiis fuga doloribus sit illum
                aliquid ea distinctio minus accusantium,
                impedit quo voluptatibus ut magni dicta.
                Recusandae, quia dicta?
              </p>
            </BodySection>
          </main>

          <Footer />
        </div>
      </AppContext.Provider>
    );
  }
}

export default App;
