import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Fetch all galleries
export const fetchGalleries = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/galleries`);
        return response.data;
    } catch (error) {
        console.error('Error fetching galleries:', error);
        throw error;
    }
};

// Create a new gallery
export const createGallery = async (name) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/galleries/create`, { name });
        return response.data;
    } catch (error) {
        console.error('Error creating gallery:', error);
        throw error;
    }
};

// Upload images to a specific gallery
export const uploadImages = async (galleryId, images) => {
    try {
        const formData = new FormData();
        images.forEach(image => {
            formData.append('images', image);
        });

        await axios.post(`${API_BASE_URL}/images/${galleryId}/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    } catch (error) {
        console.error('Error uploading images:', error);
        throw error;
    }
};

// Fetch images by gallery ID
export const fetchImagesByGalleryId = async (galleryId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/images/${galleryId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching images:', error);
        throw error;
    }
};

// Delete an image
export const deleteImage = async (imageId) => {
    try {
        await axios.delete(`${API_BASE_URL}/images/${imageId}`);
    } catch (error) {
        console.error('Error deleting image:', error);
        throw error;
    }
};
