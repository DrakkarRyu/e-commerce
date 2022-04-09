import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsThunk, getCategoriesThunk, filterCategoryThunk, filterSearchThunk } from '../redux/actions';
import { Link } from 'react-router-dom';

const Home = () => {

    const dispatch = useDispatch();
    const products = useSelector(state => state.products);
    const categories = useSelector(state => state.categories);
    const [search, setSearch] = useState("");

    useEffect(() => {
        dispatch(getProductsThunk());
        dispatch(getCategoriesThunk());
    }, [dispatch]);

    const searchProducts = e => {
        e.preventDefault();
        dispatch(filterSearchThunk(search));
    }

    return (
        <div className='HomePage'>
            <h1>Home Page</h1>
            <form onSubmit={searchProducts}>
                <input type="text" placeholder='Search' value={search} onChange={e => setSearch(e.target.value)} />
                <button>Search</button>
            </form>
            {
                categories.map(category => (
                    <button key={category.id} onClick={() => dispatch(filterCategoryThunk(category.id))}>
                        {category.name}
                    </button>
                ))
            }
            <ul>
                {
                    products.length === 0 ? (
                        <p>Sorry we didn't found any product with these words</p>
                    ) : (
                        products.map(product => (
                            <li key={product.id}>
                                <Link to={`/product/${product.id}`}>
                                    <h2>{product.title}</h2>
                                    <img src={product.productImgs?.[0]} alt="" />
                                    <img src={product.productImgs?.[1]} alt="" />
                                    <img src={product.productImgs?.[2]} alt="" />
                                    <h3>${product.price}</h3>
                                </Link>
                            </li>
                        )))
                }
            </ul>
        </div>
    );
};

export default Home; 