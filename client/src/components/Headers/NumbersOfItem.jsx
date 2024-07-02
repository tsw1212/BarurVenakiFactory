import React, { useEffect, useState } from 'react';
import '../../css/header.css';

function NumbersOfItem({ countCartItems }) {
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (countCartItems > 0) {
            setIsAnimating(true);
            setTimeout(() => {
                setIsAnimating(false);
            }, 300);
        }
    }, [countCartItems]);

    return (
        <div className={`numbersOfItem ${isAnimating ? 'animate' : ''}`}>
            {countCartItems}
        </div>
    );
}

export default NumbersOfItem;
