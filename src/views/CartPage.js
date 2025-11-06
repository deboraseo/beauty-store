import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import api from '../configs/api';
import './CartPage.css';


const CartPage = (props) => {

    const [cart, setCart] = useState([]);

    useEffect(() => {
        setCart(props.cartData);  
    }, [props.cartData]);

    const removeProduct = async(id) => {
        try {
            await api.delete(`/cart/${id}`);
            props.getCart();
        }catch(error){
            console.error(error);
        }
    };

    const handleQty = async(el, e) => {
        const qty = parseInt(e.target.value);
   
        try {
            await api.put(`/cart/${el}`, {qty});
            props.getCart();
        }catch(error){
            console.error(error);
        }
    }

    const sumItems = useMemo(()=> cart.map(el => el.qty).reduce((acc, curr) => acc + curr, 0), [cart]);

    const sumPrice = useMemo(()=> cart.map(el => el.product_id.price * el.qty).reduce((acc, curr) => acc + curr, 0) / 100, [cart]);

    return (
        <div className='cart-first'>
            <h4>My Shopping Bag</h4>

            <div className='cartpage-container'>
                <ul className='cart-page'>
                {cart.map(el => <>
                    <hr/>
                    <li key={el.product_id._id}>
                        <img src={el.product_id.image_one} alt='products'/>
                        <div className='p-list'>
                            <p style={{fontWeight: 'bold'}}>{el.product_id.brand}</p>
                            <Link to={`/product-detail/${el.product_id._id}`}><p>{el.product_id.name}</p></Link> 
                            <span>Price:${el.product_id.price / 100 + '.00'} </span>
                            
                            <div className='cartpage-btn'>
                                <input type='number' value={el.qty} onChange={(e)=>handleQty(el.product_id._id, e)}/>
                                <button className='remove-btn' onClick={()=>removeProduct(el.product_id._id)}>Remove</button>    
                            </div>
                        </div>

                        <div className='price'>
                            <span style={{fontWeight: 'bold'}}> ${el.product_id.price * el.qty / 100 + '.00'}</span> 
                        </div>  
                    </li> 
                    </>)}
                    
                    <div className='subtotal'>
                    {cart.length ? <>
                    {/* <span>Subtotal: {cart.map(el => el.qty).reduce((acc, curr) => acc + curr)} items</span> */}
                    <span>Subtotal: {sumItems} items</span>
                    </>
                    : ''}
                    </div>
                </ul>

                <div className='sub-container'>
                    <div className='sub'>
                        <p>Subtotal:</p>
                        {/* <span>${cart.map(el => el.product_id.price * el.qty).reduce((acc, curr) => acc + curr, 0) / 100 + '.00'}</span> */}
                        <span>${sumPrice + '.00'}</span>
                    </div>
                    
                    <div className='sub'>
                        <p>Shipping: </p>
                        <span>Free</span>
                    </div>

                    <div className='sub'>
                        <p>Coupon: </p>
                        <span>Add</span>
                    </div>
                    <hr/>
                    <div className='sub' style={{fontWeight: 'bold'}}>
                        <p>Total:</p>
                        {/* <p>${cart.map(el => el.product_id.price * el.qty).reduce((acc, curr) => acc + curr, 0) / 100 + '.00'}</p>     */}
                        <p>${sumPrice + '.00'}</p>
                    </div>
                    <button>Checkout</button>
                </div>            
            </div>

        </div>   
    );
};

export default CartPage;