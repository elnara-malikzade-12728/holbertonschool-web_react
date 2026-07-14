import { Fragment } from 'react';
import './App.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Notifications from '../Notifications/Notifications';
import { getLatestNotification } from '../utils/utils';

function App() {
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

  return (
    <Fragment>
      <div className="App">
        <div className="root-notifications">
          <Notifications notifications={notificationsList} />
        </div>

        <Header />
        <Login />
        <Footer />
      </div>
    </Fragment>
  );
}

export default App;
