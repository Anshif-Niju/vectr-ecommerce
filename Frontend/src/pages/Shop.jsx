import { useState, useEffect } from 'react';
import api from '../service/api';
import ProductCard from '../components/ShopCards';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { shopStyles } from './Tailwind/Tailwind';

function Shop() {
  const [product, setProduct] = useState([]);
  const [originalProduct, setOriginalProduct] = useState([]);
  const [search, setSearch] = useState('');
  const [selectCategory, setSelectCategory] = useState('all');

  useEffect(() => {
    const fetchProduct = async () => {
      let url = '/products?isActive=true';
      if (selectCategory !== 'all') {
        url = `/products?isActive=true&category=${selectCategory}`;
      }
      const res = await api.get(url);
      setProduct(res.data);
      setOriginalProduct(res.data);
    };

    fetchProduct();
  }, [selectCategory]);

  const sortMinToMax = () => {
    const sorted = [...product].sort(
      (a, b) => Number(a.price) - Number(b.price),
    );
    setProduct(sorted);
  };

  const sortMaxToMin = () => {
    const sorted = [...product].sort(
      (a, b) => Number(b.price) - Number(a.price),
    );
    setProduct(sorted);
  };

  const sortDefault = () => {
    setProduct(originalProduct);
  };

  const filterProduct = product.filter((item) => {
    return item.name.toLowerCase().startsWith(search.toLowerCase());
  });

  return (
    <>
      <Navbar />
      <div className={shopStyles.container}>
        {/* Header */}
        <div className={shopStyles.headerWrapper}>
          <span className={shopStyles.topBadge}>Premium Gear</span>
          <h1 className={shopStyles.title}>
            Shop <span className={shopStyles.accentText}>Devices</span>
          </h1>
          <div className={shopStyles.underline}></div>
        </div>

        {/* Controls */}
        <div className={shopStyles.controlsWrapper}>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={shopStyles.searchInput}
          />

          <div className={shopStyles.selectWrapper}>
            <select
              onChange={(e) => {
                if (e.target.value === 'low') sortMinToMax();
                if (e.target.value === 'high') sortMaxToMin();
                if (e.target.value === 'default') sortDefault();
              }}
              className={shopStyles.selectInput}
            >
              <option value="default">Default Sort</option>
              <option value="low">Low to High</option>
              <option value="high">High to Low ↓</option>
            </select>
            <div className={shopStyles.selectIconWrapper}>
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>

          <div className={shopStyles.categoryGroup}>
            {['All', 'Acer', 'Dell', 'Lenovo', 'Asus'].map((item, index) => {
              const isSelected = selectCategory === item.toLowerCase();
              return (
                <button
                  key={index}
                  onClick={() => setSelectCategory(item.toLowerCase())}
                  className={shopStyles.categoryBtn(isSelected)}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>

        {/* Products Grid */}
        <div className={shopStyles.grid}>
          {filterProduct.map((product) => (
            <ProductCard key={product._id || product.id} product={product} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Shop;
