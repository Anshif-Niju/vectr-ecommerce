import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import api from '../service/api';
import { feedbackStyles } from './Tailwind/tailwind';

function Feedback() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [message, setMessage] = useState('');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const emptyField = Object.values(formData).some(
      (values) => values.trim() == '',
    );

    if (emptyField) {
      toast.error('Please fill all fields');
      return;
    }
    if (!emailRegex.test(formData.email)) {
      formData.email = '';
      toast.error('Invalid email');
      return;
    }

    await api.post('/Feedback', formData);
    setFormData({
      name: '',
      email: '',
      message: '',
    });
    toast.success('Your Valuable Feedback Added,Thank you');
  };

  return (
    <section id="feedback" className={feedbackStyles.section}>
      <div className={feedbackStyles.card}>
        <div className={feedbackStyles.decorativeBlob}></div>

        <h2 className={feedbackStyles.title}>We Value Your Feedback</h2>

        <p className={feedbackStyles.subtitle}>
          Help us improve Vectr Tech experience
        </p>

        {message && (
          <p className={feedbackStyles.statusMsg(message === 'Invalid email')}>
            {message}
          </p>
        )}

        <form className={feedbackStyles.form} onSubmit={handleSubmit}>
          <div>
            <label className={feedbackStyles.label}>Your Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className={feedbackStyles.input}
            />
          </div>

          <div>
            <label className={feedbackStyles.label}>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={feedbackStyles.input}
            />
          </div>

          <div>
            <label className={feedbackStyles.label}>Your Feedback</label>
            <textarea
              rows="4"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Share your thoughts with us..."
              className={feedbackStyles.textarea}
            ></textarea>
          </div>

          <button type="submit" className={feedbackStyles.submitBtn}>
            Submit Feedback
          </button>
        </form>
      </div>
    </section>
  );
}

export default Feedback;
