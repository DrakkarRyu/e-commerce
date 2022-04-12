import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginThunk } from '../redux/actions';
import '../styles/NavBar.css';
import Cart from './Cart';

const NavBar = () => {

    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const [isCartOpen, setIsCartOpen] = useState(false);
    const dispatch = useDispatch();
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

    return (
        <div className='navbar'>
            <nav>
                <strong>Product app</strong>
                <button onClick={() => setIsLoginOpen(!isLoginOpen)}>Login</button>
                <button onClick={() => setIsCartOpen(!isCartOpen)}>Cart</button>
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