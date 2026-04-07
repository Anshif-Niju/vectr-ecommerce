import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useUser } from '../context/UserContext';
import { clearAuthToken, loginUser } from '../service/sessionService';

export const useLogin = (options = {}) => {
  const { adminOnly = false, successMessage = 'Login successful' } = options;
  const navigate = useNavigate();
  const { setUser } = useUser();

  const [formData, setFormData] = useState({ email: '', pass: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');

    if (!formData.email || !formData.pass) {
      setError('All fields required');
      toast.error('All fields required');
      return;
    }

    try {
      const { user } = await loginUser({ email: formData.email, password: formData.pass });

      if (adminOnly && user.role !== 'admin') {
        clearAuthToken();
        setUser(null);
        throw new Error('Access denied. Admin only.');
      }

      setUser(user);

      toast.success(successMessage);

      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/home');
      }
    } catch (error) {
      clearAuthToken();
      const errorMessage = error.response?.data?.message || error.message || 'Login failed';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return { formData, handleChange, handleSubmit, error };
};
