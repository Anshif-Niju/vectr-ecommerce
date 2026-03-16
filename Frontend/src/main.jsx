import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { UserProvider } from './context/UserContext';
import { CartProvider } from './context/CartContext';
import { StatsProvider } from './context/StatsContext';
import { WishlistProvider } from './context/WishlistContext';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <UserProvider>
    <StatsProvider>
      <CartProvider>
        <WishlistProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </WishlistProvider>
      </CartProvider>
    </StatsProvider>
  </UserProvider>
  // </StrictMode>,
);
