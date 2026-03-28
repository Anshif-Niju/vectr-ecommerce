import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import api from '../../service/api';

function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    pass: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await api.post('/users/login', {
        email: formData.email,
        password: formData.pass,
      });

      localStorage.setItem('token', res.data.jwt_token);

      // Check if user is admin
      const userRes = await api.get('/users/me');
      if (userRes.data.role !== 'admin') {
        throw new Error('Access denied. Admin only.');
      }

      toast.success('Admin login successful!');
      navigate('/admin/dashboard');
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || 'Login failed';
      setError(errorMessage);
      toast.error(errorMessage);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F1FAEE] px-4 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-[#457b9d]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-80 h-80 bg-[#1D3557]/10 rounded-full blur-3xl"></div>

      <div className="w-full max-w-md bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-blue-900/10 relative z-10 border border-slate-100">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-black text-[#1D3557] tracking-tight">
            Welcome Back Admin
          </h2>
          <p className="text-slate-400 mt-2 font-medium">
            Login to your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="group">
            <label className="block text-sm font-bold text-[#1D3557] mb-2 ml-1">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 text-[#1D3557] font-bold placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#457b9d] focus:border-transparent transition-all duration-300"
              required
            />
          </div>

          <div className="group">
            <label className="block text-sm font-bold text-[#1D3557] mb-2 ml-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              name="pass"
              value={formData.pass}
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 text-[#1D3557] font-bold placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#457b9d] focus:border-transparent transition-all duration-300"
              required
            />
          </div>

          {error && (
            <p className="text-center text-xs font-bold text-red-500 bg-red-50 py-2 rounded">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#457b9d] hover:bg-[#1D3557] disabled:bg-slate-400 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Login as Admin'}
          </button>
        </form>

        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-[#457b9d] hover:text-[#1D3557] font-bold transition-colors duration-300"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
