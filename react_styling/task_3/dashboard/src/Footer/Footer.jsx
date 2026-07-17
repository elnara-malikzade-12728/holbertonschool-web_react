import { getCurrentYear, getFooterCopy } from '../utils/utils';

function Footer() {
  return (
    <footer
      className="
        App-footer
        mt-auto
        border-t-2
        border-main
        pt-1
        text-center
        text-[10px]
        italic
      "
    >
      <p>
        Copyright {getCurrentYear()} - {getFooterCopy(false)}
      </p>
    </footer>
  );
}

export default Footer;
