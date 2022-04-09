import React, { useState } from 'react';

const NavBar = () => {

    const [isLoginOpen, setIsLoginOpen] = useState(false);

    return (
        <div>
            <nav>
                <strong>Product app</strong>
                <button onClick={() => setIsLoginOpen(!isLoginOpen)}>Login</button>
            </nav>
            {
                isLoginOpen &&
                <form action="" className='login'>
                    <input type="email" placeholder='email' />
                    <input type="password" placeholder='password' />
                    <button>Submit</button>
                </form>
            }
        </div>
    );
};

export default NavBar;