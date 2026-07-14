import { Component, Fragment } from 'react';
import './App.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Notifications from '../Notifications/Notifications';
import CourseList from '../CourseList/CourseList';
import { getLatestNotification } from '../utils/utils';

class App extends Component {
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

    const { isLoggedIn = false } = this.props;

    return (
      <Fragment>
        <div className="App">
          <div className="root-notifications">
            <Notifications
              notifications={notificationsList}
              displayDrawer
            />
          </div>

          <Header />

          {isLoggedIn ? (
            <CourseList courses={coursesList} />
          ) : (
            <Login />
          )}

          <Footer />
        </div>
      </Fragment>
    );
  }
}

export default App;
