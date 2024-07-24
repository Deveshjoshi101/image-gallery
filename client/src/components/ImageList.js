import React from 'react';

const ImageList = ({ images, onDelete }) => {
    return (
        <div>
            {images.map(image => (
                <div key={image.id}>
                    <img src={`/${image.path}`} alt={image.filename} width="100" />
                    <button onClick={() => onDelete(image.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default ImageList;
