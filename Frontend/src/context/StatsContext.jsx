import { createContext, useContext, useState, useEffect } from 'react';
import api from '../service/api';

const StatsContext = createContext();

export function StatsProvider({ children }) {
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
        const [userRes, productRes, ordersRes] = await Promise.all([
          api.get('/users'),
          api.get('/products'),
          api.get('/Bookings'),
        ]);
        const usersData = userRes.data;
        const productData = productRes.data;
        const bookingData = ordersRes.data;

        const orderProduct = bookingData.flatMap((item) => item.product);

        const filterUser = usersData.filter((user) => user.role !== 'admin');

        const revenue = orderProduct.reduce(
          (total, item) => total + item.price * item.size || 0,
          0,
        );

        setStats({
          users: filterUser,
          product: productData,
          orders: bookingData,
          totalUsers: filterUser.length,
          totalRevenue: revenue,
          totalOrders: bookingData.length,
          totalProducts: productData.length,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

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
