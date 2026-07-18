import holbertonLogo from '../assets/holberton-logo.jpg';

function Header() {
  return (
    <header
      className="
        App-header
        flex
        items-center
        p-0
        
      "
    >
      <img
        src={holbertonLogo}
        alt="holberton logo"
        className="h-[90px] w-auto -ml-3"
      />
      
      <h1
        className="
          -ml-10
          text-main
          text-[20px]
          font-bold
        "
      >
        School Dashboard
      </h1>      
    </header>
  );
}

export default Header;
