import { useState } from 'babel-plugin-react-html-attrs';
import React from 'react';

const useCounter = () => {

    const [counter, setCounter] = useState(0);
    const increment = () => setCounter(counter+1);
    const decrement = () => setCounter(counter-1);

    return (
        <div>
            <button onClick={decrement}>-</button>
            <div>{counter}</div>
            <button onClick={increment}>+</button>
        </div>
    );
};

export default useCounter;