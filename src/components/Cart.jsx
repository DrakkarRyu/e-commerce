import React from 'react';
import '../styles/Cart.css'

const Cart = ({isCartOpen}) => {
    return (
        <div className={`cart-modal ${isCartOpen ? 'open' : ''}`}>
            My Cart
        </div>
    );
};

export default Cart;