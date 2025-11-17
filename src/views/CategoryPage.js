import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../configs/api';
import './CategoryPage.css';
import CategoryProductList from '../components/CategoryProductList';
import ProductFilters from '../components/ProductFilters';

const CategoryPage = () => {
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [checked, setChecked] = useState(null);
    const [loading, setLoading] = useState(false);

    // Detecta a categoria pela URL
    const isFaceCare = location.pathname.includes('face-care');
    const category = isFaceCare ? 'face' : 'body';
    const categoryTitle = isFaceCare ? 'Face Care' : 'Body Care';
    const categoryPath = isFaceCare ? '/face-care' : '/bodycare';

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async() => {
        try {
            const result = await api.get('/product/all');
            setProducts(result.data);
            setLoading(true);
        } catch(error) {
            console.error(error.response);
        }
    };

    const handleRatingChange = (value) => {
        setChecked(value);
    };

    return (
        <div className='page-margin'>
            <ProductFilters
                categoryTitle={categoryTitle}
                categoryPath={categoryPath}
                products={products}
                onRatingChange={handleRatingChange}
                loading={loading}
            />

            <CategoryProductList category={category} radio={checked}/>
        </div>
    );
};

export default CategoryPage;
