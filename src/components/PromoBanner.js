import React from 'react';
import './PromoBanner.css';
import { ImTruck } from 'react-icons/im';

const PromoBanner = () => {
    return (
        <div>
            <div className="promo-banner">
                <span>Get up to 50% off on selected products. Plus, Free shipping!</span>
                <span><ImTruck color='white' margin-top='5px' size='20'/></span>
            </div>
        </div>
    );
};

export default PromoBanner;
