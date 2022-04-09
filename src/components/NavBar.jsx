import axios from 'axios';
import React, { useState } from 'react';
import '../styles/NavBar.css';

const NavBar = () => {

    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const login = e => {
        e.preventDefault();
        const credentials = { email, password }
        axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/users/login', credentials)
            .then(res => localStorage.setItem("token", res.data.data.token));
    }

    return (
        <div className='navbar'>
            <nav>
                <strong>Product app</strong>
                <button onClick={() => setIsLoginOpen(!isLoginOpen)}>Login</button>
            </nav>
            {
                <form onSubmit={login} className={`login ${isLoginOpen ? 'open' : ''}`}>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder='email' />
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder='password' />
                    <button>Submit</button>
                </form>
            }
        </div>
    );
};

export default NavBar;