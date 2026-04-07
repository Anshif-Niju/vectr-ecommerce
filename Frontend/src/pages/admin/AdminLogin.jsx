import { Link } from 'react-router-dom';
import { useLogin } from '../../hook/useLogin';
import { adminLoginStyles } from './Tailwind/AdminTailwind';

function AdminLogin() {
  const { formData, handleChange, handleSubmit, error } = useLogin({
    adminOnly: true,
    successMessage: 'Admin login successful!',
  });

  return (
    <div className={adminLoginStyles.container}>
      <div className={adminLoginStyles.blurTop}></div>
      <div className={adminLoginStyles.blurBottom}></div>

      <div className={adminLoginStyles.card}>
        <div className={adminLoginStyles.header}>
          <h2 className={adminLoginStyles.title}>Welcome Back Admin</h2>
          <p className={adminLoginStyles.subtitle}>Login to your account</p>
        </div>

        <form onSubmit={handleSubmit} className={adminLoginStyles.form}>
          <div className={adminLoginStyles.group}>
            <label className={adminLoginStyles.label}>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={adminLoginStyles.input}
              required
            />
          </div>

          <div className={adminLoginStyles.group}>
            <label className={adminLoginStyles.label}>Password</label>
            <input
              type="password"
              placeholder="Password"
              name="pass"
              value={formData.pass}
              onChange={handleChange}
              className={adminLoginStyles.input}
              required
            />
          </div>

          {error && <p className={adminLoginStyles.error}>{error}</p>}

          <button type="submit" className={adminLoginStyles.button}>
            Login as Admin
          </button>
        </form>

        <div className={adminLoginStyles.footer}>
          <Link to="/login" className={adminLoginStyles.footerLink}>
            Back to User Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
