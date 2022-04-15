import React from 'react';
import { useNavigate } from 'react-router-dom';

const PurchaseItem = ({ purchase }) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(purchase.createAt).toLocaleDateString('en-us', options);
    const navigate = useNavigate();

    return (
        <div className='purchase-item'>
            <div className='header'>
                <b>{date}</b>
            </div>
            <ul className='purchase-products'>
                {
                    purchase.cart.products.map(productItem => (
                        <li key={productItem.id} onClick={() => navigate(`/products/${productItem.id}`)} className='productItem'>
                            <div className='name'>{productItem.title}</div>
                            <div className='quantity'><div className='boox'>{productItem.productsInCart.quantity}</div></div>
                            <div className='price'>$ {productItem.price}</div>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default PurchaseItem;