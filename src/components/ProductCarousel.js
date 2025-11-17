import React, { useRef } from 'react';
import './ProductCarousel.css';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ProductThumb from './ProductThumb';
import SkeletonCard from './SkeletonCard';


const ProductCarousel = (props) => {
    const newData = props.data.slice(8, 30);
    const isLoading = !props.data || props.data.length === 0;

    const carouselRef = useRef(null);

    const handleLeftClick = (e) => {
        e.preventDefault();
        carouselRef.current.scrollLeft -= carouselRef.current.offsetWidth;
    }

    const handleRightClick = (e) => {
        e.preventDefault();
        carouselRef.current.scrollLeft += carouselRef.current.offsetWidth;
    }

    return (
        <div className='product-carousel'>
            <h2>{props.title}</h2>
            <div className='carousel-container' ref={carouselRef}>
                <ul className='carousel-list'>
                    {isLoading ? (
                        <SkeletonCard count={5} cardClassName='carousel-card' />
                    ) : (
                        newData.map(el => (
                            <ProductThumb key={el._id} product={el} cardClassName='carousel-card' />
                        ))
                    )}
                </ul>
            </div>
            {!isLoading && (
                <div className='carousel-buttons'>
                    <button className='btn-left' onClick={handleLeftClick}><FiChevronLeft/></button>
                    <button className='btn-right' onClick={handleRightClick}><FiChevronRight/></button>
                </div>
            )}
        </div>
    );
};

export default ProductCarousel;
