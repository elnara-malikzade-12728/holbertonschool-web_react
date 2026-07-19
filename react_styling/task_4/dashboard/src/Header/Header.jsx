import holbertonLogo from '../assets/holberton-logo.jpg';

function Header() {
  return (
    <header
      className="
        flex
        items-center
        justify-start
        px-2
        py-3
        min-[520px]:px-4
        min-[912px]:px-5
      "
    >
      <img
        src={holbertonLogo}
        alt="holberton logo"
        className="
          h-24
          w-24
          shrink-0
          object-contain
          min-[520px]:h-28
          min-[520px]:w-28
          min-[912px]:h-32
          min-[912px]:w-32
        "
      />

      <h1
        className="
          ml-3
          text-[24px]
          font-bold
          text-main
          min-[520px]:ml-4
          min-[520px]:text-[26px]
          min-[912px]:ml-5
          min-[912px]:text-[28px]
        "
      >
        School dashboard
      </h1>
    </header>
  );
}

export default Header;
