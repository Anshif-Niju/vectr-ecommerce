import { createContext, useContext, useState, useEffect } from 'react';
import api from '../service/api';
import { useUser } from './UserContext';

const StatsContext = createContext();

export function StatsProvider({ children }) {
  const { user } = useUser();
  const [stats, setStats] = useState({
    users: [],
    product: [],
    orders: [],
    ordersProduct: [],
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Only fetch admin data if user is authenticated and is admin
        if (!user || user.role !== 'admin') {
          return;
        }

        const [userRes, productRes, ordersRes] = await Promise.all([
          api.get('/users'),
          api.get('/products'),
          api.get('/orders'),
        ]);
        const usersData = userRes.data;
        const productData = productRes.data;
        const ordersData = ordersRes.data;

        const filterUser = usersData.filter((user) => user.role !== 'admin');

        const revenue = ordersData.reduce(
          (total, order) => total + order.totalPrice,
          0,
        );

        setStats({
          users: filterUser,
          product: productData,
          orders: ordersData,
          totalUsers: filterUser.length,
          totalRevenue: revenue,
          totalOrders: ordersData.length,
          totalProducts: productData.length,
        });
      } catch (error) {
        console.log('Error fetching admin stats:', error);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  const toggleActive = async (userID) => {
    try {
      const userToUpdate = stats.users.find((u) => u.id == userID);

      if (!userToUpdate) return;

      const newStatus = !userToUpdate.isActive;

      await api.patch(`users/${userID}`, {
        isActive: newStatus,
      });

      setStats((prevStats) => ({
        ...prevStats,
        users: prevStats.users.map((user) =>
          user.id === userID ? { ...user, isActive: newStatus } : user,
        ),
      }));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <StatsContext.Provider value={{ stats, toggleActive, setStats }}>
      {children}
    </StatsContext.Provider>
  );
}

export const useStats = () => useContext(StatsContext);
