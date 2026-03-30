import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../service/api';
import { toast } from 'react-hot-toast';
import { useUser } from '../context/UserContext';

export const useLogin = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const [formData, setFormData] = useState({
    email: '',
    pass: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
      const res = await api.post('/users/login', {
        email: formData.email,
        password: formData.pass,
      });

      const tokenFromServer = res.data.jwt_token || '';
      const normalizedToken = tokenFromServer.replace(/^Bearer\s+/i, '').trim();
      localStorage.setItem('token', normalizedToken);

      const userRes = await api.get('/users/me', {
        headers: {
          Authorization: `Bearer ${normalizedToken}`,
        },
      });

      setUser(userRes.data);
      sessionStorage.setItem('user', JSON.stringify(userRes.data));

      toast.success('Login successful');

      if (userRes.data.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/home');
      }
    } catch (error) {
      localStorage.removeItem('token');
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  return { formData, handleChange, handleSubmit, error };
};
