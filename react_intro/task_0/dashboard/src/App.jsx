import './App.css';
import holbertonLogo from './assets/holberton-logo.jpg';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={holbertonLogo} alt="holberton logo" />
        <h1>School Dashboard</h1>
      </header>

      <div className="App-body">
        <p>Login to access the full dashboard</p>
      </div>

      <div className="App-footer">
        <p>Copyright 2024 - holberton School</p>
      </div>
    </div>
  );
}

export default App;
