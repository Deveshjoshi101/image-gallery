import React, { useState, useEffect } from 'react';
import { fetchGalleries, createGallery } from '../api/galleryApi';
import Gallery from './Gallery';

const HomePage = () => {
    const [galleries, setGalleries] = useState([]);
    const [selectedGalleryId, setSelectedGalleryId] = useState('');
    const [newGalleryName, setNewGalleryName] = useState('');

    useEffect(() => {
        const loadGalleries = async () => {
            try {
                const galleriesData = await fetchGalleries();
                setGalleries(galleriesData);
            } catch (error) {
                console.error('Error fetching galleries:', error);
            }
        };

        loadGalleries();
    }, []);

    const handleCreateGallery = async () => {
        if (!newGalleryName) return;

        try {
            const { galleryId } = await createGallery(newGalleryName);
            setGalleries([...galleries, { id: galleryId, name: newGalleryName }]);
            setNewGalleryName('');
        } catch (error) {
            console.error('Error creating gallery:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Home Page</h1>

            <div className="max-w-lg mx-auto mb-8 bg-white p-6 shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold mb-4 text-gray-700">Select a Gallery</h2>
                <select
                    onChange={(e) => setSelectedGalleryId(e.target.value)}
                    value={selectedGalleryId}
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
                >
                    <option value="">Select Gallery</option>
                    {galleries.map(gallery => (
                        <option key={gallery.id} value={gallery.id}>
                            {gallery.name}
                        </option>
                    ))}
                </select>
                {selectedGalleryId && <Gallery galleryId={selectedGalleryId} />}
            </div>

            <div className="max-w-lg mx-auto bg-white p-6 shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold mb-4 text-gray-700">Create New Gallery</h2>
                <input
                    type="text"
                    value={newGalleryName}
                    onChange={(e) => setNewGalleryName(e.target.value)}
                    placeholder="Enter gallery name"
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm mb-4"
                />
                <button
                    onClick={handleCreateGallery}
                    className="w-full bg-blue-500 text-white p-3 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Create Gallery
                </button>
            </div>
        </div>
    );
};

export default HomePage;
