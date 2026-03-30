import { Link } from 'react-router-dom';
import { cardStyles } from './Tailwind/tailwind';

function HomeCard({ product }) {
  const productId = product._id || product.id;
  const { img, name, smallDes, price } = product;

  return (
    <div key={productId} className={cardStyles.container(productId)}>
      {/* Image Section */}
      <div className={cardStyles.imageWrapper}>
        <img loading="lazy" className={cardStyles.image} src={img} alt={name} />
        <div className={cardStyles.imageOverlay}></div>
      </div>

      {/* Content Section */}
      <div className={cardStyles.contentWrapper}>
        <h3 className={cardStyles.title}>{name}</h3>
        <p className={cardStyles.description}>{smallDes}</p>

        {/* Footer Section */}
        <div className={cardStyles.footer}>
          <span className={cardStyles.price}>{price}</span>

          <button className={cardStyles.button}>
            <Link to={`/itemDetail/${productId}`}>View</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomeCard;
