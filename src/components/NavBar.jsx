import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCartThunk, loginThunk, setLoginMessage } from '../redux/actions';
import '../styles/NavBar.css';
import Cart from './Cart';

const NavBar = () => {

    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const [isCartOpen, setIsCartOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const login = e => {
        e.preventDefault();
        const credentials = { email, password }
            dispatch(loginThunk(credentials))
        .then(res => {
                localStorage.setItem("token", res.data.data.token);
                setLoginError("");
                setIsLoginOpen(false);
            })
            .catch(error => {
                setLoginError(error.response.data.message);
            })
    }

    const openCart = () => {
        if(localStorage.getItem("token")){
            setIsCartOpen(!isCartOpen);
            dispatch(getCartThunk());
        } else {
            dispatch(setIsLoginOpen(true))
            dispatch(setLoginMessage("You have to Log In to access to your cart"))
        };
    }

    const openPurchases = () => {
        if(localStorage.getItem("token")){
            navigate("/Purchases");
        } else {
            dispatch(setIsLoginOpen(true))
            dispatch(setLoginMessage("You have to Log In to access to your purchases"))
        };
    }


    return (
        <div className='navbar'>
            <nav>
                
                <button onClick={() => setIsLoginOpen(!isLoginOpen)}>Login</button>
                <button onClick={openPurchases}>Open Purchase</button>
                <button onClick={openCart}>Cart</button>
            </nav>
            {
                <form onSubmit={login} className={`login ${isLoginOpen ? 'open' : ''}`}>
                    {
                        localStorage.getItem("token") ? (
                            <button onClick={() => localStorage.setItem("token", "")} type="button">Log out</button>
                        ) : (
                            <>
                                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder='email' />
                                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder='password' />
                                <button>Submit</button>
                                <p>{loginError}</p>
                            </>
                        )
                    }
                </form>
            }
            <Cart isCartOpen={isCartOpen}/>
        </div>
    );
};

export default NavBar;