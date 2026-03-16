import { footerStyles } from './Tailwind/tailwind';

function Footer() {
  return (
    <footer className={footerStyles.footer}>
      <div className={footerStyles.container}>
        <p className={footerStyles.textBase}>
          © 2026 <span className={footerStyles.brand}>Vectr</span>.
          <span className={footerStyles.rights}>All rights reserved.</span>
          <span className={footerStyles.developerWrapper}>
            Designed and Developed by
            <span className={footerStyles.developerName}>Anshif P.</span>
          </span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
