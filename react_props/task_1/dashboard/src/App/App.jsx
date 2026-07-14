import './App.css';
import { Fragment } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Notifications from '../Notifications/Notifications';

function App() {
  return (
    <Fragment>
      <div className="App">
        <div className="root-notifications">
          <Notifications />
        </div>
        <Header />
        <Login />
        <Footer />
      </div>
    </Fragment>
  );
}

export default App;
