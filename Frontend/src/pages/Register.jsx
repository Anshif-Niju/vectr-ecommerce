import { Link } from 'react-router-dom';
import { useRegister } from '../hook/useRegister';
import { registerStyles } from './Tailwind/Tailwind';

function Register() {
  const { formData, handleChange, handleSubmit, error } = useRegister();

  return (
    <div className={registerStyles.container}>
      {/* Decorative Background Elements */}
      <div className={registerStyles.blurRight}></div>
      <div className={registerStyles.blurLeft}></div>

      <div className={registerStyles.card}>
        <div className="text-center mb-8">
          <h2 className={registerStyles.headerTitle}>Create Account</h2>
          <p className={registerStyles.headerSubtitle}>
            Join the future of tech rental
          </p>
        </div>

        <form onSubmit={handleSubmit} className={registerStyles.form}>
          <div className={registerStyles.inputGroup}>
            <input
              type="text"
              name="username"
              placeholder="Full Name"
              value={formData.username}
              onChange={handleChange}
              className={registerStyles.input}
              required
            />
          </div>

          <div className={registerStyles.inputGroup}>
            <input
              type="text"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className={registerStyles.input}
            />
          </div>

          <div className={registerStyles.inputGroup}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              minLength="4"
              value={formData.password}
              onChange={handleChange}
              className={registerStyles.input}
              required
            />
          </div>

          <div className={registerStyles.footerFlex}>
            <p className={registerStyles.footerText}>
              Already have an account?{' '}
              <Link to="/login" className={registerStyles.loginLink}>
                Login
              </Link>
            </p>

            {error && (
              <span className={registerStyles.errorBadge}>{error}</span>
            )}
          </div>

          <button type="submit" className={registerStyles.submitBtn}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
