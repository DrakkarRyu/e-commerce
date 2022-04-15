import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPurchasesThunk } from '../redux/actions';
import { History, PurchaseItem } from '../components';

const Purchases = () => {

    const purchases = useSelector(state => state.purchases);
    const dispatch = useDispatch();
    useEffect(() => dispatch(getPurchasesThunk()), [dispatch])

    return (
        <section className='containerPurchases'>
            <History currentPage='Purchases' />
            <h1>My Purchases</h1>
            {
                purchases?.length ? (
                    purchases?.map(purchase => (
                        <PurchaseItem purchase={purchase} key={purchase.id} />
                    ))
                ) : (
                    <p className='message'>
                        You haven't bougth anything yet. <Link to='/'>See Products</Link>
                    </p>
                )
            }
        </section>
    );
};

export default Purchases;