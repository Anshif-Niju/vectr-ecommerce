import { Link } from 'react-router-dom';
import { useForget } from '../hook/useForget';
import { forgetStyles } from './Tailwind/Tailwind';

function Forget() {
  const { formData, handleChange, handleSubmit, error } = useForget();

  return (
    <div className={forgetStyles.container}>
      <div className={forgetStyles.blurTop}></div>
      <div className={forgetStyles.blurBottom}></div>

      <div className={forgetStyles.card}>
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className={forgetStyles.headerTitle}>Reset Password</h2>
          <p className={forgetStyles.headerSubtitle}>
            Create a new secure password
          </p>
        </div>

        <form onSubmit={handleSubmit} className={forgetStyles.form}>
          <div className="group">
            <label className={forgetStyles.label}>Email</label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              onChange={handleChange}
              value={formData.email}
              className={forgetStyles.input}
            />
          </div>

          <div className="group">
            <label className={forgetStyles.label}>New Password</label>
            <input
              name="pass"
              type="password"
              placeholder="••••••••"
              onChange={handleChange}
              value={formData.pass}
              className={forgetStyles.input}
            />
          </div>

          <div className="group">
            <label className={forgetStyles.label}>Re-enter Password</label>
            <input
              name="rePass"
              type="password"
              placeholder="••••••••"
              onChange={handleChange}
              value={formData.rePass}
              className={forgetStyles.input}
            />
          </div>

          {error && <p className={forgetStyles.errorMsg}>{error}</p>}

          <button type="submit" className={forgetStyles.submitBtn}>
            Reset Password
          </button>
        </form>

        <div className={forgetStyles.footerWrapper}>
          <p className={forgetStyles.footerText}>Remember your password?</p>
          <Link to="/login" className={forgetStyles.footerLink}>
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Forget;
