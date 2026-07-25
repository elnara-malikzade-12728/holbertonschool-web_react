import { useSelector } from 'react-redux';

import {
  getCurrentYear,
  getFooterCopy,
} from '../../utils/utils';

function Footer() {
  const isLoggedIn = useSelector(
    (state) => state.auth.isLoggedIn,
  );

  return (
    <footer
      className="
        App-footer
        mx-3
        mt-auto
        border-t-2
        border-main
        px-2
        py-2
        text-center
        text-[9px]
        italic
        min-[520px]:mx-5
        min-[520px]:text-[10px]
        min-[912px]:mx-9
        min-[912px]:text-[7px]
      "
    >
      <p>
        Copyright {getCurrentYear()} -{' '}
        {getFooterCopy(false)}

        {isLoggedIn && (
          <>
            {' | '}
            <a
              href="#contact"
              className="
                text-purple-400
                no-underline
                hover:text-red-700
                active:text-red-600
              "
            >
              Contact us
            </a>
          </>
        )}
      </p>
    </footer>
  );
}

export default Footer;
