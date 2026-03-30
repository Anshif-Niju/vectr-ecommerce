import { createContext, useContext, useState, useEffect } from 'react';
import api from '../service/api';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setUser(null);
        sessionStorage.removeItem('user');
        setLoading(false);
        return;
      }

      try {
        const normalizedToken = token.replace(/^Bearer\s+/i, '').trim();
        const res = await api.get('/users/me', {
          headers: {
            Authorization: `Bearer ${normalizedToken}`,
          },
        });
        setUser(res.data);
        sessionStorage.setItem('user', JSON.stringify(res.data));
      } catch (error) {
        console.log('Auth failed', error);
        localStorage.removeItem('token');
        setUser(null);
        sessionStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('user');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
