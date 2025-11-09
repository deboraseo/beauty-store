import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import api from '../configs/api';
import './Review.css';
import { CgGirl } from 'react-icons/cg';
import { RiCloseFill } from 'react-icons/ri';


const Review = (props) => {
    //console.log('props', props);
    const [reviewsList, setReviewsList] = useState([]);
    const [mod, setMod] = useState(false);
    const [review, setReview] = useState('');
    //console.log('review',review);
    // const [error, setError] = useState('');
    const token = localStorage.getItem('token');

    const getReviews = useCallback(async() => {
        try {
            const result = await api.get(`/review/${props.id}`);
            console.log('review result', result.data);
            setReviewsList(result.data);
        } catch(error) {
            console.error(error);
            // setError(error.response.data.message);
        };
    }, [props.id]);

    useEffect(() => {
        getReviews();
    }, [getReviews]);

    const toggle = () => {
        setMod(!mod);
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            await api.post(`/review/${props.id}`, { review });
            console.log('review submit', review);
            setReview('');
            getReviews();
            setMod(false);
        } catch(error) {
            console.error(error.response);
        }
    };

    return (
        <div>
            <div className='review'>      
                <article>
                    <h4>Reviews {'(' + reviewsList.length + ')'}</h4>
                    <button onClick={toggle}>Write a Review</button>
                </article>

                {reviewsList.length ? (
                  <ul className='review-container'>
                    {reviewsList.map((el) => 
                    
                    <li kew={el._id}>
                        <p>"{el.review}"</p>
                        <span><CgGirl size={'20'}/>  {el.user_id.name}</span>
                        {el.createdAt &&
                        <span style={{fontSize: '0.9rem', marginLeft: '20px'}}>{el.createdAt.slice(0, 10)}</span>}
                        <hr/>
                    </li>)}
                  </ul>) : null}
                  
                {/* <div  className={ mod ? 'dark' : '' }> */}
                <div>
                    {!mod ? '' : ( <>
                    {token ? (<>
                        <form className='m' onSubmit={handleSubmit}>
                            <RiCloseFill style={{margin: '2% 92%'}} onClick={toggle}/>
                            <div className='rev-container'>
                                <h5 style={{fontWeight: 'bold'}}>Please share your experience</h5>
                                <p>Your feedback will help other shoppers make good choices, and we'll use it to improve our products.</p>
                                <div>
                                    <p>Review *</p> 
                                    <textarea value={review} onChange={(e)=> setReview(e.target.value)}/>
                                </div>
                                <p style={{fontSize: '0.8rem'}}>Make your review great: Describe what you liked, what you didn’t like, and other key things shoppers should know.</p>
                                <button type='submit'>SUBMIT</button>  
                            </div>
                        </form></>) : 
                        (<>
                            <div className='go-login'>
                                <RiCloseFill onClick={toggle} id='close-btn-small'/>
                                <h5>Please login to write a review.</h5>
                                <Link to='/signup'>LOGIN</Link>
                            </div>
                        </>)
                    }
                    </>)}          
                </div>                
            </div>
            
        </div>
    );
};

export default Review;