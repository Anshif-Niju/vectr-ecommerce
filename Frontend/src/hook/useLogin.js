import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../service/api';
import { toast } from 'react-hot-toast';
import { useUser } from '../context/UserContext';

export const useLogin = () => {
  const navigate = useNavigate();
  const { setUser } = useUser(); // ✅ use setUser instead of login

  const [formData, setFormData] = useState({
    email: '',
    pass: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.pass) {
      toast.error('All fields required');
      return;
    }

    try {
      // ✅ Step 1: login
      const res = await api.post('/users/login', {
        email: formData.email,
        password: formData.pass,
      });

      // ✅ Step 2: set cookie token is handled by backend response (set-cookie)
      const userRes = await api.get('/users/me');

      // ✅ Step 4: store user in context
      setUser(userRes.data);

      toast.success('Login successful');

      // ✅ redirect based on role
      if (userRes.data.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/home');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  return { formData, handleChange, handleSubmit };
};
