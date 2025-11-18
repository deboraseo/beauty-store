import { Link } from 'react-router-dom';
import { rating, formatPrice } from '../utils/productUtils';
import './ProductThumb.css';

const ProductThumb = ({ product, cardClassName = 'prd-card' }) => {
    return (
        <li className={cardClassName}>
            <Link to={`/product-detail/${product._id}`}>
                <img
                    src={product.image_one}
                    alt={`${product.brand} - ${product.name}`}
                    loading="lazy"
                />
                <div>
                    <h6>{product.brand}</h6>
                    <p className='product-name'>{product.name}</p>
                    <p className='rating-hearts' aria-label={`Rating: ${product.rating} de 5 estrelas`}>
                        {rating(product.rating)}
                    </p>
                    <p className='product-price'>{formatPrice(product.price)}</p>
                </div>
            </Link>
        </li>
    );
};

export default ProductThumb;
