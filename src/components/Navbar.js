import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';


const Navbar = () => {
    return (
        <div className='nav-container'>
            <div className='navbar'>
                <Link to='/store/best-sellers'>BEST SELLERS</Link>
                <div className='dropdown'>
                    <Link to='/bodycare'>BODYCARE</Link>
                    <div className='dropdown-content'>
                        <div className='links'>
                            <h6>By Category</h6>
                            <Link to='/store/body-cream'>Moisturizers</Link>
                            <Link to='/store/body-soap'>Cleansers</Link>
                            <Link to='/store/body-scrub'>Body Scrubs</Link>
                            <Link to='/store/body-hand'>Handcreams</Link>
                        </div>

                        <div>
                            <Link to='/bodycare' style={{color:'black'}}><h5>Shop All Body Care</h5></Link>
                            <div className='nav-img'>
                                <img src='https://res.cloudinary.com/dgzbojudn/image/upload/v1633739196/ceramidin_myovxf.png' alt='ceramidin'/>
                                <img src='https://res.cloudinary.com/dgzbojudn/image/upload/v1633477927/beautyStore/waterbank-lan_d0i2wi.png' alt='cera'/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='dropdown'>
                    <Link to='/face-care'>FACECARE</Link>
                    <div className='dropdown-content' id='drop-face'>
                        <div className='links'>
                            <h6>By Category</h6>
                            <Link to='/store/face-serum'>Serums</Link>
                            <Link to='/store/face-cleanser'>Cleansers</Link>
                            <Link to='/store/face-mask'>Masks</Link>
                            <Link to='/face-care'>Shop All</Link>
                        </div>
                        <div>
                            <Link to='/face-care' style={{color:'black'}}><h5>Shop All Face Care</h5></Link>
                            <div className='nav-img'>
                                <img src='https://res.cloudinary.com/dgzbojudn/image/upload/v1633715170/cosmetics-products-advertising_1284-32872_ob8mp6.jpg' alt='ceramidin'/>
                                <img src='https://res.cloudinary.com/dgzbojudn/image/upload/v1633715170/beige-color-make-up-cosmetics-set-with-cream_1268-15446_piq5jw.jpg' alt='cera'/>
                            </div>
                        </div>
                    </div>
                </div>
                <Link to='/store/all'>SHOP ALL</Link>
                <Link to='/about'>ABOUT</Link>
            </div>
        </div>
    );
};

export default Navbar;
