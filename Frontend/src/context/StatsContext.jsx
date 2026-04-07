import { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from './UserContext';
import { getAllOrders, updateOrderStatus as saveOrderStatus } from '../service/orderService';
import { getProducts } from '../service/productService';
import { getUsers, updateUser } from '../service/userService';

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

        const [usersData, productData, ordersData] = await Promise.all([
          getUsers(),
          getProducts(),
          getAllOrders(),
        ]);

        const filterUser = usersData.filter((user) => user.role !== 'admin');

        const revenue = ordersData.reduce((total, order) => total + order.totalPrice, 0);

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
      const userToUpdate = stats.users.find((u) => (u._id || u.id) === userID);

      if (!userToUpdate) return;

      const newStatus = !userToUpdate.isActive;

      await updateUser(userID, { isActive: newStatus });

      setStats((prevStats) => ({
        ...prevStats,
        users: prevStats.users.map((user) =>
          (user._id || user.id) === userID ? { ...user, isActive: newStatus } : user,
        ),
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const updatedOrder = await saveOrderStatus(orderId, status);

      setStats((prevStats) => ({
        ...prevStats,
        orders: prevStats.orders.map((order) =>
          (order._id || order.id) === orderId ? updatedOrder : order,
        ),
      }));

      return updatedOrder;
    } catch (error) {
      console.log('Error updating order status:', error);
      throw error;
    }
  };

  return (
    <StatsContext.Provider value={{ stats, toggleActive, updateOrderStatus, setStats }}>
      {children}
    </StatsContext.Provider>
  );
}

export const useStats = () => useContext(StatsContext);
