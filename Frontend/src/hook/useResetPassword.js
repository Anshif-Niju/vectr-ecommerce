import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { resetPassword } from '../service/sessionService';

export const useResetPassword = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ email: '', pass: '', rePass: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.pass || !formData.rePass) {
      const message = 'All fields required';
      setError(message);
      toast.error(message);
      return;
    }

    if (formData.pass !== formData.rePass) {
      const message = 'Passwords do not match';
      setError(message);
      toast.error(message);
      return;
    }

    try {
      await resetPassword({ email: formData.email, password: formData.rePass });

      toast.success('Password updated successfully');
      navigate('/login');
    } catch (requestError) {
      const message = requestError.response?.data?.message || 'Reset failed';
      setError(message);
      toast.error(message);
    }
  };

  return { formData, handleChange, handleSubmit, error };
};
