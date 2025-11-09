import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../configs/api';
import './MyList.css';


const MyList = (props) => {
    const [list, setList] = useState([]);
    const user = localStorage.getItem('userName');
    //console.log('list', list)

    useEffect(() => {
       setList(props.list);
    }, [props.list]);

    const moveToCart = async(el)=> {
        try {
            await api.post(`/my-list-cart/${el}`);
            props.getList();
            props.getCart();
        }catch(error){
            console.error(error);
        }
    };

    const deleteFav = async(el)=> {
        try {
           await api.delete(`/my-list/${el}`);
           props.getList(); 
        } catch (error) {
           console.error(error);
        }
    }


    return (
        <div>
            <div className='my-list'>
            {user ? 
            (<> <h3>Favorites</h3>
                 {list.length ? 
                    (<>
                        <ul>
                            {list.map(el => <>
                            <li key={el._id}>
                                <img src={el.image_one} alt={el.name}/>
                                <div className='description'>
                                    <Link to={`product-detail/${el._id}`}>
                                        <h6>{el.brand}</h6>
                                        <p>{el.name}</p>
                                    </Link>
                                    <p>Size:{el.size}</p>
                                    <p>Price:${el.price / 100 + '.00'}</p>
                                </div>
                                <div className='desc-btn'>
                                    <button onClick={()=> moveToCart(el._id)}>Add to Cart</button>
                                    <button id='delete-btn' onClick={()=> deleteFav(el._id)}>Delete</button>
                                </div>   
                            </li>
                            </>)}
                        </ul>
                    </>)
                 : ''}    
            </>)
             : ( <h5 style={{margin: '50px'}}>Please Login to Add to Favorites List.</h5> )}
            </div>
        </div>
    );
};

export default MyList;