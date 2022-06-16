import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { addToCartThunk, getProductsThunk } from '../redux/actions';
import '../styles/ProductDetails.css'
import { Galery } from '../components';

const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const products = useSelector(state => state.products);
    const productInfo = products.find(product => product.id === Number(id));
    const [productsFiltered, setProductsFiltered] = useState([]);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => dispatch(getProductsThunk()), [dispatch]);
    useEffect(() => {
        if (productInfo) {
            axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products?category=${productInfo?.category.id}`)
                .then(res => setProductsFiltered(res.data.data.products));
        }
    }, [dispatch, productInfo])

    const addToCart = () => {
        const products = {
            id,
            quantity
        }
        dispatch(addToCartThunk(products))
    } 

    return (
        <section className='productDetails'>
            <Link to='/'>Home</Link>
            <div className='cart'>
                <div className='input-container'>
                    <label htmlFor="quantity">quantity</label>
                    <button onClick={() => setQuantity(quantity-1)} disabled={quantity <= 1}>-</button>
                    <input type="text" id='quantity' value={quantity} onChange={e => setQuantity(e.target.value)}/>
                    <button onClick={() => setQuantity(quantity+1)}>+</button>
                </div>
                    <button onClick={addToCart}>add to cart</button>
            </div>
            <h1>{productInfo?.title}</h1>
            <Galery images={productInfo?.productImgs} />
            <p>{productInfo?.description}</p>
            <h3>${productInfo?.price}</h3>
            <ul className='Recomendations'>
                Also we recommend you...
                {
                    productsFiltered.map(product => (
                        <li className='card' key={product.id}>
                            <Link to={`/products/${product.id}`}>
                                <h2>{product.title}</h2>
                                <div className='images-hover'>
                                    <img className='over' src={product.productImgs?.[0]} alt="" />
                                    <img src={product.productImgs?.[2]} alt="" />
                                </div>
                                <h3>${product.price}</h3>
                            </Link>
                        </li>
                    ))}
            </ul>
        </section>
    );
};

export default ProductDetails;