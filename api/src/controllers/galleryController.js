const pool = require('../config/db');

exports.createGallery = (req, res) => {
    console.log('Request body:', req.body);
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'Gallery name is required' });
    }

    pool.query('INSERT INTO galleries (name) VALUES (?)', [name], (err, results) => {
        if (err) {
            console.error('Error creating gallery:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        const newGalleryId = results.insertId;
        res.status(201).json({ message: 'Gallery created successfully', galleryId: newGalleryId, name });
    });
};


exports.getAllGalleries = (req, res) => {
    pool.query('SELECT * FROM galleries', (err, results) => {
        if (err) {
            console.error('Error fetching galleries:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).json(results);
    });
};
