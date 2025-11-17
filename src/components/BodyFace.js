import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './BodyFace.css';
import api from '../configs/api';

// Hook customizado para query params
const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const BodyFace = (props) => {
    const query = useQuery();
    const skin = query.get('name');
    const byBrand = query.get('brand');
    const { radio, category } = props;

    const [products, setProducts] = useState([]);
    const [skinType, setSkinType] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getProducts = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const result = await api.get('/product/all');
            const filtered = result.data.filter(el => el.category === category);
            setProducts(filtered);
            setSkinType(filtered);
        } catch (error) {
            console.error('Error fetching products:', error);
            setError('Falha ao carregar produtos. Tente novamente.');
        } finally {
            setLoading(false);
        }
    }, [category]);

    useEffect(() => {
        getProducts();
    }, [getProducts]);

    useEffect(() => {
        const applyFilters = () => {
            let filtered = [...products];

            // Filtro por tipo de pele
            if (skin) {
                filtered = filtered.filter(el => el.skin_type === skin);
            }

            // Filtro por marca
            if (byBrand) {
                filtered = filtered.filter(el => el.brand === byBrand);
            }

            // Filtro por rating
            if (radio) {
                filtered = filtered.filter(el => el.rating === Number(radio));
            }

            setSkinType(filtered);
        };

        applyFilters();
    }, [skin, byBrand, radio, products]);


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

    if (loading) {
        return (
            <div className='b-page'>
                <section className='products-part'>
                    <div className='loading-message'>
                        <p>Carregando produtos...</p>
                    </div>
                </section>
            </div>
        );
    }

    if (error) {
        return (
            <div className='b-page'>
                <section className='products-part'>
                    <div className='error-message'>
                        <p>{error}</p>
                        <button onClick={getProducts}>Tentar novamente</button>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div className='b-page'>
            <section className='products-part'>
                <div className='result'>
                    <p>({skinType.length}) {skinType.length === 1 ? 'Resultado' : 'Resultados'}</p>
                </div>

                {skinType.length === 0 ? (
                    <div className='no-results'>
                        <p>Nenhum produto encontrado com os filtros selecionados.</p>
                    </div>
                ) : (
                    <div>
                        <ul className='products-list'>
                            {skinType.map(el => (
                                <li key={el._id} className='prd-card'>
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

export default BodyFace;