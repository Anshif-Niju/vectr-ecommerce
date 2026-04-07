import { Link } from 'react-router-dom';
import { notFoundStyles } from './Tailwind/Tailwind';

function NotFound() {
  return (
    <div className={notFoundStyles.container}>
      <div className={notFoundStyles.blurTop}></div>
      <div className={notFoundStyles.blurBottom}></div>

      <h1 className={notFoundStyles.logo}>
        Vectr<span className={notFoundStyles.logoDot}>.</span>
      </h1>

      <div className={notFoundStyles.errorWrapper}>
        <div className={notFoundStyles.errorCode}>404</div>
        <div className={notFoundStyles.iconOverlay}>{/* Icon placeholder */}</div>
      </div>

      <h2 className={notFoundStyles.title}>Oops! Page Not Found</h2>

      <Link to="/" className={notFoundStyles.homeBtn}>
        Go to Homepage
      </Link>
    </div>
  );
}

export default NotFound;
