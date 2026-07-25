import {
  useDispatch,
  useSelector,
} from 'react-redux';

import holbertonLogo from '../../assets/holberton-logo.jpg';
import {
  logout,
} from '../../features/auth/authSlice.js';

function Header() {
  const dispatch = useDispatch();

  const {
    user,
    isLoggedIn,
  } = useSelector((state) => state.auth);

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(logout());
  };

  return (
    <header
      className="
        flex
        flex-col
        items-center
        justify-center
        min-[912px]:flex-row
        min-[912px]:justify-start
        min-[912px]:px-5
      "
    >
      <img
        src={holbertonLogo}
        alt="holberton logo"
        className="
          -mt-10
          h-100
          w-100
          object-contain
          min-[520px]:h-80
          min-[520px]:w-80
          min-[912px]:h-40
          min-[912px]:w-40
        "
      />

      <div
        className="
          flex
          flex-col
          items-center
          min-[912px]:ml-5
          min-[912px]:flex-row
          min-[912px]:items-center
          min-[912px]:gap-3
        "
      >
        <h1
          className="
            -mt-20
            text-center
            text-3xl
            font-bold
            text-main
            min-[520px]:text-3xl
            min-[912px]:mt-0
            min-[912px]:text-4xl
          "
        >
          School Dashboard
        </h1>

        {isLoggedIn && (
          <div
            id="logoutSection"
            className="
              whitespace-nowrap
              text-xs
              min-[912px]:text-sm
            "
          >
            Welcome {user.email}{' '}

            <a
              href="#logout"
              onClick={handleLogout}
              className="
                cursor-pointer
                text-purple-700
                transition-colors
                hover:text-red-600
                active:text-red-600
              "
            >
              (logout)
            </a>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
