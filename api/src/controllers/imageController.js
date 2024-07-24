const pool = require('../config/db');
const path = require('path');
const fs = require('fs');

exports.uploadImages = (req, res) => {
    const galleryId = req.params.galleryId;
    const files = req.files;

    if (!files || files.length === 0) {
        return res.status(400).json({ error: 'No files uploaded' });
    }

    const imagePromises = files.map(file => {
        const filePath = path.join('uploads', galleryId, file.filename);
        return new Promise((resolve, reject) => {
            pool.query('INSERT INTO images (gallery_id, filename, file_path) VALUES (?, ?, ?)', [galleryId, file.originalname, filePath], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    });

    Promise.all(imagePromises)
        .then(() => {
            res.status(200).json({ message: 'Files uploaded successfully' });
        })
        .catch(err => {
            console.error('Error uploading files:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
};

exports.getImagesByGalleryId = (req, res) => {
    const galleryId = req.params.galleryId;

    pool.query('SELECT * FROM images WHERE gallery_id = ?', [galleryId], (err, results) => {
        if (err) {
            console.error('Error fetching images:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).json(results);
    });
};

exports.deleteImage = (req, res) => {
    const imageId = parseInt(req.params.imageId);

    // Fetch the image record from the database
    pool.query('SELECT * FROM images WHERE id = ?', [imageId], (err, results) => {
        if (err) {
            console.error('Error fetching image record:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Image not found' });
        }

        const image = results[0];
        const filePath = path.join(__dirname, '../', image.file_path);

        // Log the file path for debugging
        console.log(`Attempting to delete file at: ${filePath}`);

        // Delete the file from the server
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error('Error deleting image file:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            // Delete the record from the database
            pool.query('DELETE FROM images WHERE id = ?', [imageId], (err) => {
                if (err) {
                    console.error('Error deleting image record:', err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }

                res.status(200).json({ message: 'Image deleted successfully' });
            });
        });
    });
};

