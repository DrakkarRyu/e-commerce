import React from 'react';
import '../styles/screenLoading.css';

const ScreenLoading = () => {
    return (
        <div className='screenLoading'>
            <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    );
};

export default ScreenLoading;