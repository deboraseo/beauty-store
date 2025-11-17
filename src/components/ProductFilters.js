import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import './ProductFilters.css';

const initialState = {
    btnOne: false,
    btnTwo: false,
    btnThree: false
};

const ProductFilters = ({ categoryTitle, categoryPath, products, onRatingChange, loading }) => {
    const [button, setButton] = useState(initialState);

    const handleButton = (key, value) => {
        setButton({...button, [key]: !value});
    };

    const filterBrand = products.map(el => el.brand);
    const byBrand = filterBrand.filter((el, index) => filterBrand.indexOf(el) === index).slice(1, 7);

    if (!loading) {
        return (
            <div className='spinner'>
                <Spinner animation="border" role="status" className='loader'></Spinner>
            </div>
        );
    }

    return (
        <section className='filter'>
            <ul className='filter-list'>
                <Link to={categoryPath}><h3>{categoryTitle}</h3></Link>
                <h6>Filters</h6>

                {/* Filtro por tipo de pele */}
                <li>
                    <div className='list'>
                        <Link to="#">By Skin Type</Link>
                        <div className={button.btnOne ? 'menu-toggle active': 'menu-toggle'} onClick={() => handleButton('btnOne', button.btnOne)}>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    {!button.btnOne ? '' :
                        <ul>
                            <li><Link to={`${categoryPath}?name=oily`}>Oily</Link></li>
                            <li><Link to={`${categoryPath}?name=dry`}>Dry</Link></li>
                            <li><Link to={`${categoryPath}?name=sensitive`}>Sensitive</Link></li>
                            <li><Link to={`${categoryPath}?name=all`}>Normal</Link></li>
                        </ul>
                    }
                </li>
                <hr/>

                {/* Filtro por marca */}
                <li>
                    <div className='list'>
                        <Link to="#">By Brand</Link>
                        <div className={button.btnTwo ? 'menu-toggle active': 'menu-toggle'} onClick={() => handleButton('btnTwo', button.btnTwo)}>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    {!button.btnTwo ? '' :
                        <ul>
                            {byBrand.map((el, index) => (
                                <li key={index}>
                                    <Link to={`${categoryPath}?brand=${el}`}>{el}</Link>
                                </li>
                            ))}
                        </ul>
                    }
                </li>
                <hr/>

                {/* Filtro por rating */}
                <li>
                    <div className='list'>
                        <Link to="#">By Rating</Link>
                        <div className={button.btnThree ? 'menu-toggle active': 'menu-toggle'} onClick={() => handleButton('btnThree', button.btnThree)}>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    {!button.btnThree ? '' :
                        <ul className='rating-check'>
                            <li>
                                <input type='radio' name='rating' value='5' onChange={(e) => onRatingChange(e.target.value)}/>
                                <span> ♥♥♥♥♥ 5.0</span>
                            </li>
                            <li>
                                <input type='radio' name='rating' value='4' onChange={(e) => onRatingChange(e.target.value)}/>
                                <span> ♥♥♥♥♡ 4.0</span>
                            </li>
                            <li>
                                <input type='radio' name='rating' value='3' onChange={(e) => onRatingChange(e.target.value)}/>
                                <span> ♥♥♥♡♡ 3.0</span>
                            </li>
                            <li>
                                <input type='radio' name='rating' value={null} onChange={(e) => onRatingChange(e.target.value)}/>
                                <span> All Ratings</span>
                            </li>
                        </ul>
                    }
                </li>
                <hr/>
            </ul>
        </section>
    );
};

export default ProductFilters;
