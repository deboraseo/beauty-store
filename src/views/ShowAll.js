import { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import api from '../configs/api';
import ProductThumb from '../components/ProductThumb';
import './ShowAll.css';


const ShowAll = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

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

    return (
        <div className='showall'>
           {loading ? (
               products.length ? <>
                <section className='products-part'>
                    <h3>ALL PRODUCTS</h3>
                    <div className='result'>
                        <p>{'('+ products.length +')'} Results</p> 
                    </div>

                    <div>
                        <ul className='products-list'>
                            {products.map(el => (
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

export default ShowAll;