import { useState } from 'react';
import React from 'react';
import '../styles/Galery.css'

const Galery = ({ images = [] }) => {

    const [currentImage, setCurrentImage] = useState(1);
    const percent = 100 / images.length;

    const listStyles = {
        width: `${100 * images.length}%`,
        transform: `translateX(-${(currentImage - 1) * percent}%)`
    }

    return (
        <div className="images-gallery">
            <div className="gallery">
                <div className="button-gallery left">
                    <button 
                        onClick={() => setCurrentImage(currentImage-1)}
                        disabled={currentImage <= 1}
                    >
                        <i className="fa-solid fa-circle-chevron-left"></i>
                    </button>
                </div>
                <div className="button-gallery right">
                    <button 
                        onClick={() => setCurrentImage(currentImage+1)}
                        disabled={currentImage >= images.length}
                    >
                        <i className="fa-solid fa-circle-chevron-right"></i>
                    </button>
                </div>
                
                <ul className="images-list" style={listStyles}>
                {
                    images.map(image => (
                        <li key={image}>
                            <img src={image} alt="" />
                        </li>
                    ))
                }
                </ul>
            </div>

            <ul className="images-preview">
                {
                    images.map((image, i) => (
                        <li 
                            key={image} 
                            className={currentImage === i+1 ? 'selected' : ''}
                        >
                            <img 
                                src={image} 
                                alt="" 
                                onClick={() => setCurrentImage(i+1)}
                            />
                        </li>
                    ))
                }
            </ul>

        </div>
    );
};

export default Galery;