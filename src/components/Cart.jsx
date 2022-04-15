import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../styles/Cart.css'
import { purchaseCartThunk, removeProductCart } from '../redux/actions';

const Cart = ({ isCartOpen }) => {

    const cart = useSelector(state => state.cart)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let total = 0;

    if(cart?.length > 0){
        if(cart?.length > 1){
            total = cart?.reduce((initial, current) => {
                if(typeof initial === 'number'){
                    return initial + (current.price * current.productsInCart?.quantity)
                } else {
                    return (initial.price * initial.productsInCart?.quantity) + (current.price*current.productsInCart?.quantity)
                }
            });
        } else {
            total = cart?.[0].price * cart?.[0].productsInCart.quantity
        }
    }

    const checkout = () => {
        dispatch(purchaseCartThunk());
        navigate('/Purchases');
    }
    return (
        <div className={`cart-modal ${isCartOpen ? 'open' : ''}`}>
            My Cart
            <ul className='cart-list'>
                {
                    cart.map(cart => (
                        <li key={cart.id} onClick={() => navigate(`/products/${cart.id}`)}>
                            <div className='Prices'>
                                <h3>{cart.title}</h3>
                                <p>quantity: {cart.productsInCart.quantity}</p>
                                <span className='label'>Total: </span>
                                <b>$ {cart.price * cart.productsInCart?.quantity}</b>
                            <div className='Delete-Button'>
                                <button onClick={() => dispatch(removeProductCart(cart.id))}>Delete</button>
                            </div>
                            </div>
                        </li>
                    ))
                }
            </ul>
            <div className='Checkout'>
                <div className='total'>
                    <span className='label'>Total</span>
                    <b>$ {total}</b>
                </div>
                <button className='buy-button' onClick={checkout} disabled={!Boolean(cart)}>
                    Checkout
                </button>
            </div>
        </div>
    );
};

export default Cart;