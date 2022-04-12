import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../styles/Cart.css'
import { removeProductCart } from '../redux/actions';

const Cart = ({ isCartOpen }) => {

    const cart = useSelector(state => state.cart)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <div className={`cart-modal ${isCartOpen ? 'open' : ''}`}>
            My Cart
            <ul className='cart-list'>
                {
                    cart.map(cart => (
                        <li key={cart.id} onClick={() => navigate(`/product/${cart.id}`)}>
                            <h3>{cart.title}</h3>
                            <p>${cart.price}</p>
                            <p>quantity: {cart.productsInCart.quantity}</p>
                            <button onClick={() => dispatch(removeProductCart(cart.id))}>Delete</button>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default Cart;