import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../service/productService';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Feedback from '../components/Feedback';
import HomeCard from '../components/HomeCard';
import video from '../assets/video/Video.mp4';
import { homeStyles } from './Tailwind/Tailwind';

function Home() {
  const [product, setProduct] = useState([]);
  const [hoveredSide, setHoveredSide] = useState(null);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getProducts({ isActive: true, limit: 6 });
      setProduct(res);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const idleId = window.requestIdleCallback(() => setShowVideo(true), { timeout: 1200 });

      return () => {
        window.cancelIdleCallback(idleId);
      };
    }

    const timeoutId = window.setTimeout(() => setShowVideo(true), 500);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  const getLeftWidth = () => {
    if (hoveredSide === 'left') return 'md:w-[75%]';
    if (hoveredSide === 'right') return 'md:w-[25%]';
    return 'md:w-[50%]';
  };

  const getRightWidth = () => {
    if (hoveredSide === 'right') return 'md:w-[75%]';
    if (hoveredSide === 'left') return 'md:w-[25%]';
    return 'md:w-[50%]';
  };

  return (
    <>
      <Navbar />

      <div className={homeStyles.container}>
        {/* HERO SECTION */}
        <section className={homeStyles.heroSection}>
          <div className={homeStyles.heroBlurTop}></div>
          <div className={homeStyles.heroBlurBottom}></div>

          <div className={homeStyles.heroGrid}>
            <div className={homeStyles.heroTextContent}>
              <h1 className={homeStyles.heroTitle}>
                Dominate the Future of Gaming
                <span className={homeStyles.heroTitleSpan}>Power. Performance. Precision.</span>
              </h1>
              <p className={homeStyles.heroDescription}>
                Discover next-gen gaming laptops built for ultra FPS, RTX graphics, and esports
                performance. Buy premium rigs or explore powerful setups built for serious gamers.
              </p>

              <div className={homeStyles.heroBtnWrapper}>
                <button className={homeStyles.heroPrimaryBtn}>
                  <Link to="/shop" className={homeStyles.heroLink}>
                    Shop Now
                    <span className={homeStyles.heroArrow}>→</span>
                  </Link>
                </button>
              </div>
            </div>

            <div className={homeStyles.heroVideoWrapper}>
              <div className={homeStyles.heroVideoBlur}></div>
              {showVideo ? (
                <video
                  src={video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className={homeStyles.heroVideo}
                />
              ) : (
                <div className={homeStyles.heroVideoPlaceholder}></div>
              )}
            </div>
          </div>
        </section>

        {/* SPLIT SECTION */}
        <div className={homeStyles.splitSection}>
          {/* LEFT SIDE - BUY */}
          <div
            className={`${homeStyles.splitLeft} ${getLeftWidth()} w-full`}
            onMouseEnter={() => setHoveredSide('left')}
            onMouseLeave={() => setHoveredSide(null)}
          >
            <div
              className={homeStyles.splitBgImage}
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop')",
              }}
            ></div>
            <div className={homeStyles.splitOverlayLeft}></div>
            <div className={homeStyles.splitContent}>
              <h1 className={homeStyles.splitTitleLeft}>Buy Gear</h1>
              <p className={homeStyles.splitDescLeft}>Own the ultimate battlestation.</p>
              <Link to="/shop" className={homeStyles.splitBtn}>
                Shop Now
              </Link>
            </div>
          </div>

          {/* RIGHT SIDE - EXPLORE */}
          <div
            className={`${homeStyles.splitRight} ${getRightWidth()} w-full`}
            onMouseEnter={() => setHoveredSide('right')}
            onMouseLeave={() => setHoveredSide(null)}
          >
            <div
              className={homeStyles.splitBgImage}
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1531297425971-ec8ca8bc7c29?q=80&w=2070&auto=format&fit=crop')",
              }}
            ></div>
            <div className={homeStyles.splitOverlayRight}></div>
            <div className={homeStyles.splitContent}>
              <h1 className={homeStyles.splitTitleRight}>Explore</h1>
              <p className={homeStyles.splitDescRight}>Enter the game world</p>
              <Link to="/cart" className={homeStyles.splitBtn}>
                Go to cart
              </Link>
            </div>
          </div>
        </div>

        {/* FEATURES SECTION */}
        <section className={homeStyles.featuresSection}>
          <div className={homeStyles.featuresGrid}>
            {['Buy New Devices', 'Explore Gaming', 'Fast Delivery', 'Secure Payments'].map(
              (item) => (
                <div key={item} className={homeStyles.featureItem}>
                  <div className={homeStyles.featureDot}></div>
                  <p className={homeStyles.featureText}>{item}</p>
                </div>
              ),
            )}
          </div>
        </section>

        {/* PRODUCT SECTION */}
        <section className={homeStyles.productSection}>
          <div className={homeStyles.productHeader}>
            <span className={homeStyles.productBadge}>New Arrivals</span>
            <h2 className={homeStyles.productTitle}>Trending Electronics</h2>
            <div className={homeStyles.productUnderline}></div>
          </div>

          <div className={homeStyles.productGrid}>
            {product.map((p) => (
              <HomeCard key={p._id || p.id} product={p} />
            ))}
          </div>
        </section>

        {/* CTA SECTION */}
        <section className={homeStyles.ctaSection}>
          <div className={homeStyles.ctaBg}></div>
          <div className={homeStyles.ctaBlur}></div>
          <div className={homeStyles.ctaContent}>
            <h2 className={homeStyles.ctaTitle}>Explore Your Favs</h2>
            <p className={homeStyles.ctaDesc}>
              Buy your Machine. Upgrade anytime. The smartest way to own tech.
            </p>
            <Link to="/wishlist" className={homeStyles.ctaBtn}>
              Explore Wishlist
            </Link>
          </div>
        </section>

        {/* ANIMATION homeStyles */}
        <style>{`
          .animate-fadeIn {
            animation: fadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }
        `}</style>

        <Feedback />
        <Footer />
      </div>
    </>
  );
}

export default Home;
