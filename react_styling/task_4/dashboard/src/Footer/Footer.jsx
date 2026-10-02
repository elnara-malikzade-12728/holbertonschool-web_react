import { getCurrentYear, getFooterCopy } from '../utils/utils';

function Footer() {
  return (
    <footer
      className="App-footer mt-auto border-t-[3px] border-main py-1.5 text-center text-xs italic min-[912px]:border-t-4 min-[912px]:py-4 min-[912px]:text-xl"
    >
      <p>
        Copyright {getCurrentYear()} - {getFooterCopy(false)}
      </p>
    </footer>
  );
}

export default Footer;
