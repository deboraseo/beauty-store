import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Caroussel from '../components/Caroussel';
import ProductCarousel from '../components/ProductCarousel';
import api from '../configs/api';
import './Home.css';


const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async() => {
        try {
            const result = await api.get('/product/all');
            setProducts(result.data);
        } catch(error) {
            console.error(error.response);
        }
    }

    const bestSell = products.filter(el => el.rating >= 4).slice(30, 50);

    const choosen = products.filter(el => el.rating === 4);

    return (
        <div className='home'>
           <Caroussel/>
           <ProductCarousel data={products} title={'New In'} spantext={'NEW'}/>
           <div className='banner'>
               <article className='banner-art'>
                <img src="https://res.cloudinary.com/dgzbojudn/image/upload/v1634313455/beautyStore/hydralife-p-1-duo-europe-mood-franch-claim-en-1440-x-616_wnedsj.webp" alt='laneige'/>
                <Link to="/store/all" id="left">SHOP ALL</Link>
               </article>
               <article className='banner-art'>
                <img src="https://res.cloudinary.com/dgzbojudn/image/upload/v1634313454/beautyStore/capture-youth5_1440_1200_zmxhoj.webp" alt="ceramidin"/>
                <Link to="/store/best-sellers" id="right">BEST SELLERS</Link>
               </article>
           </div>
           <ProductCarousel data={bestSell} title={'Selling Fast'}/>
           <ProductCarousel data={choosen} title={'Choosen for you'} />
        </div>
    );
};

export default Home;