import { getCurrentYear, getFooterCopy } from '../utils/utils';

function Footer() {
  return (
    <footer
      className="
        App-footer
        mt-auto
        border-t-2
        border-main
        py-2
        text-center
        text-[13px]
        italic
        min-[520px]:text-[12px]
        min-[912px]:text-[10px]
      "
    >
      <p>
        Copyright {getCurrentYear()} - {getFooterCopy(false)}
      </p>
    </footer>
  );
}

export default Footer;
