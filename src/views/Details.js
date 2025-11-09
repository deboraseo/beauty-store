import { useState, useEffect, useCallback } from 'react';
import api from '../configs/api';
import './Details.css';
import Review from '../components/Review';


const Details = (props) => {
    const [product, setProduct] = useState({});
    const [qty, setQty] = useState(1);
    const [toggleImg, setToggleImg] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    const checkIfIsFavorite = useCallback(() => {
        const filtered = props.list.filter(el => el._id === props.match.params.id);

        if(filtered.length > 0) {
            return true;
        }
        return false;
    }, [props.list, props.match.params.id]);

    useEffect(() => {
        const oneProduct = async() => {
            const result = await api.get(`/product/${props.match.params.id}`);
            setProduct(result.data);
        };
        oneProduct();
    }, [props.match.params.id]);

    useEffect(() => {
        setIsFavorite(checkIfIsFavorite());
    }, [checkIfIsFavorite, product]);


    const heart = '♥';
    const emptyheart = '♡'

    const rating = (number) => {
        return heart.repeat(number).padEnd(5, emptyheart);
    };

    const handleInput = (e) => {
        e.preventDefault();
        
        const newqty = parseInt(e.target.value);
        setQty(newqty);
    };

    const addToCart = async(el) => {
        try {
            await api.post(`/cart/${el}`, {qty});
            props.getCart();
        }catch(error){
            console.error(error);
        }
    };

    const highlights = [
        {
            key: 'Vegan',
            label: 'Vegan',
            icon: 'https://res.cloudinary.com/dgzbojudn/image/upload/v1634241913/beautyStore/3901573_nirqxb.png'
        },
        {
            key: 'Parabens',
            label: 'Paraben Free',
            icon: 'https://res.cloudinary.com/dgzbojudn/image/upload/v1634241913/beautyStore/3637654_wizijw.png'
        },
        {
            key: 'Redness',
            label: 'Redness',
            icon: 'https://res.cloudinary.com/dgzbojudn/image/upload/v1634241914/beautyStore/4771256_cnzxhv.png'
        },
        {
            key: 'Cruelty',
            label: 'Cruelty Free',
            icon: 'https://res.cloudinary.com/dgzbojudn/image/upload/v1634241914/beautyStore/4807799_ehdv9u.png'
        },
        {
            key: 'Sili',
            label: 'Silicone Free',
            icon: 'https://res.cloudinary.com/dgzbojudn/image/upload/v1634241913/beautyStore/3901485_rpri91.png'
        },
        {
            key: 'Sali',
            label: 'Salicylic Acid',
            icon: 'https://res.cloudinary.com/dgzbojudn/image/upload/v1634241914/beautyStore/salycilic_ivodnl.png'
        }
    ];

    return (
        <div className='details'>
        {product ? <>
           <div className='det-container'>
                <div className='btnn-container'>
                   <img src={product.image_one} alt={product.name} onClick={() => setToggleImg(false)}/>
                   <img src={product.image_two} alt="second" onClick={() => setToggleImg(true)}/>
                </div>
               
                <div className='img-toggle'>
                {!toggleImg ?    
                  <img src={product.image_one} className='img-size' alt={product.name}/>
                  :
                  <img src={product.image_two} className='img-size' alt="second-image"/>
                }
                </div>
               
                <div>
                    <div className={isFavorite ? 'heart fill-color' : 'heart'} onClick={()=> props.add(product._id)}></div>   
                </div>
                
                <div className='description-d'>
                    <h3>{product.brand}</h3>
                    <h6>{product.name}</h6>
                    <span className='d-rating'>{rating(product.rating)} {product.rating + '.0'}</span>
                    <p style={{fontWeight:'bold'}}>${product.price / 100 + '.00'}</p>
                    <p>{product.description}</p> 
                    <p style={{fontWeight:'bold'}}>Skin type: {product.skin_type}</p>
                    <p style={{fontWeight:'bold'}}>Size: {product.size}</p>
                    <span>Qty:</span>
                    <input type='number' onChange={handleInput} value={qty}></input>
                    <button onClick={()=>addToCart(product._id)}>ADD TO BAG</button>
                </div>   
           </div>

            {product.ingredients && highlights.some(highlight => product.ingredients.includes(highlight.key)) && (
                <div className='high'>
                    <hr/>
                    <h4>Highlights</h4>
                    <div>
                        <ul className='highlights'>
                           {highlights
                               .filter(highlight => product.ingredients.includes(highlight.key))
                               .map(highlight => (
                                   <li key={highlight.key}>
                                       <img src={highlight.icon} alt={highlight.label.toLowerCase()} />
                                       <span> {highlight.label}</span>
                                   </li>
                               ))
                           }
                        </ul>
                    </div>
                </div>
            )}

            <div>
                <hr/>
                <Review  id={props.match.params.id} />
            </div>
        
         </>  : '' }           
        </div>
    );
};

export default Details;

