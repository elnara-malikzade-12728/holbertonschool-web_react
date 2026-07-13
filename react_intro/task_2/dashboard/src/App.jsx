import './App.css';
import holbertonLogo from './assets/holberton-logo.jpg';
import Notifications from './Notifications';
import { getCurrentYear, getFooterCopy } from './utils';

function App() {
  return (
    <div className="App">
      <div className="root-notifications">
        <Notifications />
      </div>

      <header className="App-header">
        <img src={holbertonLogo} alt="holberton logo" />
        <h1>School Dashboard</h1>
      </header>

      <div className="App-body">
        <p>Login to access the full dashboard</p>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
          />

          <button type="button">OK</button>
      </div>

      <div className="App-footer">
        <p>
          Copyright {getCurrentYear()} - {getFooterCopy(false)}
        </p>
      </div>
    </div>
  );
}

export default App;
