import React, { useCallback } from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import api from '../configs/api';
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

    const heart = '♥';
    const emptyheart = '♡'

    const rating = (number) => {
        return heart.repeat(number).padEnd(5, emptyheart);
    }

    useEffect(() => {
        filteredProducts();
    }, [filteredProducts, products, type]);

    const filteredProducts = useCallback(() => {
        const filteredProduct = products.filter(el => el.category === type.slice(0, 4) && el.type === type.slice(5));
        setFiltered(filteredProduct);
    }, [products, type]);

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
                        <ul className='the-ul'>
                            {filtered.map(el => <>
                            <li key={el._id} className='prd-card' id='showall-card'> 
                                <Link to={`/product-detail/${el._id}`}>
                                <img src={el.image_one} alt='body product'/>
                                <div>
                                    <p style={{fontWeight: 'bold'}}>{el.brand}</p>
                                    <p className='the-p'>{el.name}</p>
                                    <p>{rating(el.rating)}</p>
                                    <p style={{fontWeight: 'bold'}}>{'$'+ (el.price / 100) + '.00'}</p>
                                </div>
                                </Link>
                            </li></>)
                            }
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