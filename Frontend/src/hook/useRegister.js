import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { registerUser } from '../service/sessionService';

export const useRegister = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const [formData, setFormData] = useState({
    username: '', // ✅ changed from name
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // ✅ frontend validation (keep this)
    if (!formData.username || formData.username.length < 3) {
      setError('Name must be at least 3 characters');
      toast.error('Name must be at least 3 characters');
      return;
    }

    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      toast.error('Please enter a valid email address');
      return;
    }

    if (!formData.password || formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      toast.error('Password must be at least 6 characters');
      return;
    }

    try {
      await registerUser(formData);

      toast.success('Registration Successful');
      navigate('/login');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return { formData, handleChange, handleSubmit, error };
};
