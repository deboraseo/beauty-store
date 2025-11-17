import { useCallback } from 'react';
import { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import api from '../configs/api';
import ProductThumb from '../components/ProductThumb';
import './ShowAll.css';


const Type = (props) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filtered, setFiltered] = useState([]);
    const { type } = props.match.params;

    useEffect(() => {
       getAll()
    }, [])

    const getAll = async() => {
        try{
            const result = await api.get('/product/all');
            setProducts(result.data);
            setLoading(true);
        } catch(error) {
            console.error(error);
        };
    };

    const filteredProducts = useCallback(() => {
        const filteredProduct = products.filter(el => el.category === type.slice(0, 4) && el.type === type.slice(5));
        setFiltered(filteredProduct);
    }, [products, type]);

    useEffect(() => {
        filteredProducts();
    }, [filteredProducts, products, type]);

    return (
        <div className='showall'>
           {loading ? (
               products.length ? <>
                <section className='products-part'>
                    <h3>{type.slice(5).toUpperCase() + 'S'}</h3>
                    <div className='result'>
                        <p>{'('+ filtered.length +')'} Results</p> 
                    </div>

                    <div>
                        <ul className='products-list'>
                            {filtered.map(el => (
                                <ProductThumb key={el._id} product={el} />
                            ))}
                        </ul>
                    </div>
            </section>      
            </> : ''
           ) :
           (
            (<div className='spinner'>
                <Spinner animation="border" role="status" className='loader'></Spinner>    
            </div>)
           )}
                 
        </div>
    );
};

export default Type;