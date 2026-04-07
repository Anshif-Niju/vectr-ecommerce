import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CheckoutCard from '../components/CheckoutCard';
import { useCart } from '../context/CartContext';
import { toast } from 'react-hot-toast';
import { checkoutStyles } from './Tailwind/Tailwind';
import { createOrder } from '../service/orderService';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Checkout() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    city: '',
    address: '',
  });
  const [payment, setPayment] = useState(null);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const { cart, totalPrice, resetCart } = useCart();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const placeOrder = async () => {
    if (isPlacingOrder) {
      return;
    }

    const trimmedFormData = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      number: formData.number.replace(/\D/g, ''),
      city: formData.city.trim(),
      address: formData.address.trim(),
    };

    const emptyField = Object.values(trimmedFormData).some((value) => value === '');

    if (emptyField) {
      toast.error('Fill all the fields');
      return;
    }
    if (trimmedFormData.name.length < 2) {
      toast.error('Enter your full name');
      return;
    }
    if (!emailRegex.test(trimmedFormData.email)) {
      toast.error('Enter a valid email address');
      return;
    }
    if (trimmedFormData.number.length < 10 || trimmedFormData.number.length > 15) {
      toast.error('Phone number must be 10 to 15 digits');
      return;
    }
    if (trimmedFormData.city.length < 2) {
      toast.error('Enter your city name');
      return;
    }
    if (trimmedFormData.address.length < 10) {
      toast.error('Please enter your full address with at least 10 characters');
      return;
    }
    if (payment == null) {
      toast.error('Select payment Option');
      return;
    }
    if (cart.length === 0) {
      toast.error('Cart is empty');
      return;
    }
    try {
      setIsPlacingOrder(true);
      await createOrder({ address: trimmedFormData, paymentMethod: payment });

      resetCart();
      toast.success('Order Placed Successfully');
      navigate('/myorders');
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'Failed to place order');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className={checkoutStyles.container}>
        <div className={checkoutStyles.headerWrapper}>
          <h1 className={checkoutStyles.title}>Checkout</h1>
          <div className={checkoutStyles.titleUnderline}></div>
        </div>

        <CheckoutCard />

        <div className={checkoutStyles.mainGrid}>
          {/* SHIPPING FORM */}
          <div className={checkoutStyles.formWrapper}>
            <form onSubmit={(e) => e.preventDefault()}>
              <h2 className={checkoutStyles.sectionTitle}>Shipping Details</h2>

              <div className={checkoutStyles.inputGrid}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className={checkoutStyles.inputField}
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className={checkoutStyles.inputField}
                />
                <input
                  type="text"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className={checkoutStyles.inputField}
                />
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  className={checkoutStyles.inputField}
                />
              </div>

              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Full Address"
                className={checkoutStyles.textField}
                rows="4"
              ></textarea>
            </form>
          </div>

          {/* PAYMENT METHOD */}
          <div className={checkoutStyles.paymentWrapper}>
            <h2 className={checkoutStyles.paymentTitle}>Payment Method</h2>

            <div className={checkoutStyles.paymentList}>
              {/* COD */}
              <label className={checkoutStyles.paymentLabel}>
                <div className={checkoutStyles.paymentTextWrapper}>
                  <input
                    type="radio"
                    name="payment"
                    onChange={() => setPayment('COD')}
                    className={checkoutStyles.paymentRadio}
                  />
                  <div>
                    <p className={checkoutStyles.paymentMainText}>Cash on Delivery</p>
                    <p className={checkoutStyles.paymentSubText}>Pay when product arrives</p>
                  </div>
                </div>
                <span className={checkoutStyles.paymentBadge}>COD</span>
              </label>

              {/* CARD */}
              <label className={checkoutStyles.paymentLabel}>
                <div className={checkoutStyles.paymentTextWrapper}>
                  <input
                    type="radio"
                    name="payment"
                    onChange={() => setPayment('CARD')}
                    className={checkoutStyles.paymentRadio}
                  />
                  <div>
                    <p className={checkoutStyles.paymentMainText}>Credit / Debit Card</p>
                    <p className={checkoutStyles.paymentSubText}>Visa, MasterCard, RuPay</p>
                  </div>
                </div>
                <span className={checkoutStyles.paymentBadge}>CARD</span>
              </label>

              {/* UPI */}
              <label className={checkoutStyles.paymentLabel}>
                <div className={checkoutStyles.paymentTextWrapper}>
                  <input
                    type="radio"
                    name="payment"
                    onChange={() => setPayment('UPI')}
                    className={checkoutStyles.paymentRadio}
                  />
                  <div>
                    <p className={checkoutStyles.paymentMainText}>UPI Payment</p>
                    <p className={checkoutStyles.paymentSubText}>GPay, PhonePe, Paytm</p>
                  </div>
                </div>
                <span className={checkoutStyles.paymentBadge}>UPI</span>
              </label>
            </div>
          </div>

          {/* ORDER SUMMARY */}
          <div className={checkoutStyles.summaryWrapper}>
            <h2 className={checkoutStyles.sectionTitle}>Order Summary</h2>
            <div className={checkoutStyles.totalRow}>
              <p>Total</p>
              <p className={checkoutStyles.totalPrice}>{totalPrice}</p>
            </div>
            <button
              onClick={placeOrder}
              className={checkoutStyles.placeOrderBtn}
              disabled={isPlacingOrder}
            >
              {isPlacingOrder ? 'Placing Order...' : 'Place Order'}
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Checkout;
