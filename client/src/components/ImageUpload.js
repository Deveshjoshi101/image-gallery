import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = ({ galleryId, onUpload }) => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setError(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!file) {
            setError('Please select a file to upload');
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        axios.post(`/api/galleries/${galleryId}/images`, formData)
            .then(response => {
                onUpload(response.data);
                setFile(null);
            })
            .catch(error => {
                setError(error.response ? error.response.data.error : 'Error uploading file');
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} />
            <button type="submit">Upload</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
};

export default ImageUpload;
