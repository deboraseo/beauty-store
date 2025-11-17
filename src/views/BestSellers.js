import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import api from '../configs/api';
import './ShowAll.css';

const BestSellers = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getAll = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const result = await api.get('/product/all');
            setProducts(result.data);
        } catch (error) {
            console.error('Error fetching products:', error);
            setError('Falha ao carregar produtos. Tente novamente.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getAll();
    }, [getAll]);

    const heart = '♥';
    const emptyheart = '♡';

    const rating = (number) => {
        return heart.repeat(number).padEnd(5, emptyheart);
    };

    const formatPrice = (price) => {
        return (price / 100).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        });
    };

    const filtered = products.filter(el => el.rating === 5);

    if (loading) {
        return (
            <div className='showall'>
                <div className='spinner'>
                    <Spinner animation="border" role="status" className='loader' />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className='showall'>
                <section className='products-part'>
                    <div className='error-message'>
                        <p>{error}</p>
                        <button onClick={getAll}>Tentar novamente</button>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div className='showall'>
            <section className='products-part'>
                <h3>BEST SELLERS</h3>
                <div className='result'>
                    <p>({filtered.length}) {filtered.length === 1 ? 'Resultado' : 'Resultados'}</p>
                </div>

                {filtered.length === 0 ? (
                    <div className='no-results'>
                        <p>Nenhum produto com avaliação 5 estrelas encontrado.</p>
                    </div>
                ) : (
                    <div>
                        <ul className='products-list'>
                            {filtered.map(el => (
                                <li key={el._id} className='prd-card' id='showall-card'>
                                    <Link to={`/product-detail/${el._id}`}>
                                        <img
                                            src={el.image_one}
                                            alt={`${el.brand} - ${el.name}`}
                                            loading="lazy"
                                        />
                                        <div>
                                            <h6>{el.brand}</h6>
                                            <p className='product-name'>{el.name}</p>
                                            <p className='rating-hearts' aria-label={`Rating: ${el.rating} de 5 estrelas`}>
                                                {rating(el.rating)}
                                            </p>
                                            <p className='product-price'>{formatPrice(el.price)}</p>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </section>
        </div>
    );
};

export default BestSellers;