import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../service/api';
import WishlistButton from '../components/WishlistButton';
import AddCart from '../components/AddCartButton';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { productStyles } from './Tailwind/Tailwind';

function ProductDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSingleItem = async () => {
      try {
        const res = await api.get(`products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSingleItem();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F1FAEE] flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-[#457b9d] border-t-transparent rounded-full animate-spin mb-4"></div>
        <div className="text-[#1D3557] text-xl font-bold animate-pulse">
          Loading Product...
        </div>
        <button
          className="mt-6 text-[#457b9d] font-bold hover:underline"
          onClick={() => navigate('/shop')}
        >
          ← Go back to Shop
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F1FAEE] flex flex-col items-center justify-center text-[#1D3557]">
        <h2 className="text-3xl font-black mb-4">Product not found 😕</h2>
        <button
          onClick={() => navigate('/shop')}
          className="text-[#457b9d] font-bold underline hover:text-[#1D3557] transition-colors"
        >
          ← Go back to Shop
        </button>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className={productStyles.container}>
        <div className={productStyles.blurEffect}></div>

        <div className={productStyles.navWrapper}>
          <button
            onClick={() => navigate('/shop')}
            className={productStyles.navBtn}
          >
            <span>←</span> Back to Shop
          </button>
          <button
            onClick={() => navigate('/home')}
            className={productStyles.navBtn}
          >
            Back to Home <span>→</span>
          </button>
        </div>

        <div className={productStyles.mainGrid}>
          {/* IMAGE SIDE */}
          <div className={productStyles.imgContainer}>
            <div className={productStyles.imgDecoration}></div>
            <img
              loading="lazy"
              src={product.img}
              alt={product.name}
              className={productStyles.mainImg}
            />
          </div>

          {/* CONTENT SIDE */}
          <div className="space-y-8">
            <div>
              <span className={productStyles.badge}>
                {product.category || 'Electronics'}
              </span>
              <h1 className={productStyles.title}>{product.name}</h1>
            </div>

            <p className={productStyles.description}>{product.description}</p>
            <h2 className={productStyles.price}>{product.price}</h2>

            <div className="flex flex-col gap-2">
              <label className={productStyles.qtyLabel}>Quantity</label>
              <div className={productStyles.qtyControlWrapper}>
                <button
                  className={productStyles.qtyBtn}
                  onClick={() => {
                    if (qty === 1) return setMsg('Minimum size reached');
                    setMsg('');
                    setQty((prev) => prev - 1);
                  }}
                >
                  -
                </button>
                <span className={productStyles.qtyValue}>{qty}</span>
                <button
                  className={productStyles.qtyBtnPlus}
                  onClick={() => {
                    if (qty === 10) return setMsg('Maximum size reached');
                    setMsg('');
                    setQty((prev) => prev + 1);
                  }}
                >
                  +
                </button>
                <WishlistButton product={product} />
              </div>
              {msg && <p className={productStyles.errorMsg}>{msg}</p>}
            </div>

            <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-200">
              <AddCart product={product} qty={qty} />
            </div>

            {/* SPECIFICATIONS */}
            <div className={productStyles.specsCard}>
              <h3 className={productStyles.specsTitle}>
                <svg
                  className="w-5 h-5 text-[#457b9d]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                  ></path>
                </svg>
                Specifications
              </h3>
              <ul className={productStyles.specsList}>
                <li className={productStyles.specsItem}>
                  <span className={productStyles.bullet}></span> Processor:
                  Intel i7
                </li>
                <li className={productStyles.specsItem}>
                  <span className={productStyles.bullet}></span> RAM: 16GB
                </li>
                <li className={productStyles.specsItem}>
                  <span className={productStyles.bullet}></span> Storage: 512GB
                  SSD
                </li>
                <li className={productStyles.specsItem}>
                  <span className={productStyles.bullet}></span> Display: 13.6″
                  Retina
                </li>
                <li className={productStyles.specsItem}>
                  <span className={productStyles.bullet}></span> Battery: Up to
                  18 hours
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProductDetails;
