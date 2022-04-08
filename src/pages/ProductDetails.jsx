import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductsThunk } from '../redux/actions';

const ProductDetails = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const products = useSelector(state => state.products);
    useEffect (() => dispatch(getProductsThunk()),[]);
    const productInfo = products.find(product => product.id === Number(id));

    return (
        <div>
            <h1>{productInfo.title}</h1>
            <img src={productInfo.productImgs?.[0]} alt="" />
            <img src={productInfo.productImgs?.[1]} alt="" />
            <img src={productInfo.productImgs?.[2]} alt="" />
            <p>{productInfo.description}</p>
            <h3>${productInfo.price}</h3>
        </div>
    );
};

export default ProductDetails;