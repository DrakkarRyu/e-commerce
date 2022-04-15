import React from 'react';
import { Link } from 'react-router-dom';

const History = ({currentPage}) => {
    return (
        <div className='history'>
            <Link to='/'>Home</Link>
            <div className='separator'></div>
            <b>{currentPage}</b>
        </div>
    );
};

export default History;