import { Component } from 'react';
import holbertonLogo from '../assets/holberton-logo.jpg';
import AppContext from '../Context/context';

class Header extends Component {
  static contextType = AppContext;

  handleLogout = (event) => {
    event.preventDefault();
    this.context.logOut();
  };

  render() {
    const { user } = this.context;

    return (
      <>
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
              -mt-20
              h-100
              w-100
              object-contain
              min-[520px]:h-80
              min-[520px]:w-80
              min-[912px]:h-40
              min-[912px]:w-40
            "
          />

          <h1
            className="
              -mt-20
              text-center
              text-3xl
              font-bold
              text-main
              min-[520px]:text-3xl
              min-[912px]:ml-5
              min-[912px]:mt-0
              min-[912px]:text-4xl
            "
          >
            School Dashboard
          </h1>
        </header>

        {user.isLoggedIn && (
          <div
            id="logoutSection"
            className="
              px-3
              pb-2
              text-center
              text-xs
              min-[912px]:px-5
              min-[912px]:text-left
            "
          >
            Welcome {user.email}{' '}
            <a
              href="#logout"
              onClick={this.handleLogout}
              className="cursor-pointer underline"
            >
              (logout)
            </a>
          </div>
        )}
      </>
    );
  }
}

export default Header;
