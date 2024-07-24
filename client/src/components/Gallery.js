import React, { useState, useEffect } from 'react';
import { fetchImagesByGalleryId, uploadImages, deleteImage } from '../api/galleryApi';

const Gallery = ({ galleryId }) => {
    const [images, setImages] = useState([]);
    const [newImages, setNewImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadImages = async () => {
            setLoading(true);
            try {
                const imagesData = await fetchImagesByGalleryId(galleryId);
                setImages(imagesData);
                // console.log(images);
            } catch (error) {
                console.error('Error loading images:', error);
            } finally {
                setLoading(false);
            }
        };

        loadImages();
    }, [galleryId]);

    const handleFileChange = (e) => {
        setNewImages([...e.target.files]);
    };

    const handleUpload = async () => {
        try {
            await uploadImages(galleryId, newImages);
            const updatedImages = await fetchImagesByGalleryId(galleryId);
            setImages(updatedImages);
            setNewImages([]);
        } catch (error) {
            console.error('Error uploading images:', error);
        }
    };

    const handleDelete = async (imageId) => {
        try {
            await deleteImage(imageId);
            const updatedImages = await fetchImagesByGalleryId(galleryId);
            setImages(updatedImages);
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };

    return (
        <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Gallery {galleryId}</h1>
            {loading ? (
                <p className="text-gray-600">Loading images...</p>
            ) : (
                <div>
                    <h2 className="text-xl font-semibold mb-2">Existing Images</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
                        {images.map((image, index) => (
                            <div key={index} className="relative">
                                <img
                                    src={image.file_path}
                                    alt={image.filename}
                                    className="w-full h-32 object-cover rounded-lg"
                                />
                                <button
                                    onClick={() => handleDelete(image.id)}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 text-xs hover:bg-red-600"
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                    <h2 className="text-xl font-semibold mb-2">Add New Images</h2>
                    <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="mb-4 p-2 border border-gray-300 rounded-lg"
                    />
                    <button
                        onClick={handleUpload}
                        className="bg-indigo-500 text-white p-2 rounded-lg hover:bg-indigo-600"
                    >
                        Upload
                    </button>
                </div>
            )}
        </div>
    );
};

export default Gallery;
