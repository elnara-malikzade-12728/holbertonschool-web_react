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

    // const notificationsList = [];

    const coursesList = [
      { id: 1, name: 'ES6', credit: 60 },
      { id: 2, name: 'Webpack', credit: 20 },
      { id: 3, name: 'React', credit: 40 },
    ];

    const { isLoggedIn } = this.props;

    return (
      <Fragment>
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
              notifications={notificationsList}
              displayDrawer= {true}
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
              <p
                className="
                  break-words
                  text-[15px]
                  leading-relaxed
                  min-[520px]:text-xs
                  min-[912px]:text-[8px]
                "
              >
                ipsum Lorem ipsum dolor sit amet consectetur, adipisicing
                elit. Similique, asperiores architecto blanditiis fuga
                doloribus sit illum aliquid ea distinctio minus accusantium,
                impedit quo voluptatibus ut magni dicta. Recusandae, quia
                dicta?
              </p>
            </BodySection>
          </main>

          <Footer />
        </div>
      </Fragment>
    );
  }
}

export default App;