import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../service/api';
import { toast } from 'react-hot-toast';

export const useForget = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    pass: '',
    rePass: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ basic validation
    if (!formData.email || !formData.pass || !formData.rePass) {
      toast.error("All fields required");
      return;
    }

    if (formData.pass !== formData.rePass) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      // ✅ call backend API
      await api.post('/users/reset-password', {
        email: formData.email,
        password: formData.rePass,
      });

      toast.success("Password updated successfully");
      navigate('/login');

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Reset failed"
      );
    }
  };

  return { formData, handleChange, handleSubmit };
};