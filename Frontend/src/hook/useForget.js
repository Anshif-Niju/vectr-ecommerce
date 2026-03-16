import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../service/api';
import { getUserByEmail } from '../service/authService';

export const useForget = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    pass: '',
    rePass: '',
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

    try {
      const res = await getUserByEmail(formData.email);

      if (res.length === 0) {
        setError('The email is not valid');
        return;
      }

      const id = res[0].id;

      await api.patch(`/users/${id}`, {
        password: formData.rePass,
      });

      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };
  return { formData, handleChange, handleSubmit, error };
};
