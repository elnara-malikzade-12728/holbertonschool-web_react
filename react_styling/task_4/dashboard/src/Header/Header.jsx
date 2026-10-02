import holbertonLogo from '../assets/holberton-logo.jpg';

function Header() {
  return (
    <header
      className="App-header flex flex-col items-center min-[912px]:flex-row"
    >
      <img
        src={holbertonLogo}
        alt="holberton logo"
        className="h-64 w-64 object-cover min-[912px]:h-64 min-[912px]:w-60"
      />

      <h1
        className="text-center text-4xl leading-[48px] font-bold text-main min-[520px]:text-4xl min-[912px]:text-5xl"
      >
        School Dashboard
      </h1>
    </header>
  );
}

export default Header;