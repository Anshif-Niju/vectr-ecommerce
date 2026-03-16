import { Link } from 'react-router-dom';
import { useLogin } from '../hook/useLogin';
import { loginStyles } from './Tailwind/Tailwind';

function Login() {
  const { formData, handleChange, handleSubmit, error } = useLogin();

  return (
    <div className={loginStyles.container}>
      {/* Decorative Blurs */}
      <div className={loginStyles.blurTop}></div>
      <div className={loginStyles.blurBottom}></div>

      <div className={loginStyles.card}>
        <div className="text-center mb-8">
          <h2 className={loginStyles.headerTitle}>Welcome Back</h2>
          <p className={loginStyles.headerSubtitle}>Login to your account</p>
        </div>

        <form onSubmit={handleSubmit} className={loginStyles.form}>
          <div className="group">
            <label className={loginStyles.label}>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              name="email"
              value={formData.email || ''} 
              onChange={handleChange}
              className={loginStyles.input}
            />
          </div>

          <div className="group">
            <label className={loginStyles.label}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              name="pass"
              value={formData.pass || ''}
              onChange={handleChange}
              className={loginStyles.input}
            />
          </div>

          {error && <p className={loginStyles.errorMsg}>{error}</p>}

          <div className={loginStyles.forgotLinkWrapper}>
            <Link to="/forget" className={loginStyles.forgotLink}>
              Forgot password?
            </Link>
          </div>

          <button type="submit" className={loginStyles.submitBtn}>
            Login
          </button>
        </form>

        <p className={loginStyles.footerText}>
          Don’t have an account?{' '}
          <Link to="/register" replace className={loginStyles.registerLink}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
