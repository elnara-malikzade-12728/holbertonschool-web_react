import { Component, Fragment } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Notifications from '../Notifications/Notifications';
import CourseList from '../CourseList/CourseList';
import { getLatestNotification } from '../utils/utils';
import BodySection from '../BodySection/BodySection';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';

class App extends Component {
  static defaultProps = {
    isLoggedIn: false,
    logOut: () => {},
  };

  handleKeyDown = (event) => {
    if (
      'key' in event
      && event.ctrlKey
      && event.key === 'h'
    ) {
      window.alert('Logging you out');
      this.props.logOut();
    }
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
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
      { id: 1, name: 'ES6', credit: 60 },
      { id: 2, name: 'Webpack', credit: 20 },
      { id: 3, name: 'React', credit: 40 },
    ];

    const { isLoggedIn } = this.props;

    return (
      <Fragment>
        <div className="App flex min-h-screen w-full flex-col px-5">
          <div className="root-notifications">
            <Notifications
              notifications={notificationsList}
              displayDrawer
            />
          </div>

          <Header />

          <main className="flex flex-1 flex-col">
            {isLoggedIn ? (
              <BodySectionWithMarginBottom title="Course list">
                <CourseList courses={coursesList} />
              </BodySectionWithMarginBottom>
            ) : (
              <BodySectionWithMarginBottom title="Log in to continue">
                <Login />
              </BodySectionWithMarginBottom>
            )}
            <BodySection title="News from the School">
              <p>Holberton School news goes here</p>
            </BodySection>
          </main>

          <Footer />
        </div>
      </Fragment>
    );
  }
}

export default App;
