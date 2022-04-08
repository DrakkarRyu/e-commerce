import React from 'react';
import '../styles/screenLoading.css';

const ScreenLoading = () => {
    return (
        <div className='screenLoading'>
            <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    );
};

export default ScreenLoading;