import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import api from '../service/api';

export const useRegister = () => {
  const navigate = useNavigate();

  const nameRegex = /^[A-Za-z ]{2,}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
   
  const lastActive=new Date().toDateString();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    lastActive:lastActive,
    role: 'user',
    isActive:true
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

    if (!nameRegex.test(formData.name)) {
      toast.error('Invalid name');
      return;
    }

    if (!emailRegex.test(formData.email)) {
      toast.error('Invalid email');
      return;
    }
    if (formData.password == '') {
      toast.error('Please enter password');
      return;
    }

    try {
      const res = await api.get(`/users?email=${formData.email}`);
      if (res.data.length > 0) {
        toast.error('The email is already taken');
        return;
      }

      await api.post('/users', formData);
      toast.success("Registration Succeful")
      navigate('/login');
    } catch (error) {
      console.log('Oops!' + error);
    }
  };
  return { formData, handleChange, handleSubmit, error };
};
