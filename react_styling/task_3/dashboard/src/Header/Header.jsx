import holbertonLogo from '../assets/holberton-logo.jpg';

function Header() {
  return (
    <header
      className="App-header flex items-center"
    >
      <img
        src={holbertonLogo}
        alt="holberton logo"
        className="h-64 w-60 object-cover"
      />
      
      <h1
        className="text-main text-5xl font-bold"
      >
        School Dashboard
      </h1>      
    </header>
  );
}

export default Header;
