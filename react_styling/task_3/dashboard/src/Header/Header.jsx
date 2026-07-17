import holbertonLogo from '../assets/holberton-logo.jpg';

function Header() {
  return (
    <header
      className="
        App-header
        flex
        items-center
        border-b-2
        border-main
        p-0
      "
    >
      <img
        src={holbertonLogo}
        alt="holberton logo"
        className="h-[90px] w-auto -ml-10"
      />

      <h1
        className="
          -ml-10
          text-main
          text-[10px]
        "
      >
        School Dashboard
      </h1>
    </header>
  );
}

export default Header;
