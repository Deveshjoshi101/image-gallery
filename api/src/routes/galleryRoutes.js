const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');

// Route to fetch all galleries
router.get('/', galleryController.getAllGalleries);

// Route to create a new gallery
router.post('/create', (req, res, next) => {
    console.log('Received POST request to /create');
    next();
}, galleryController.createGallery);


module.exports = router;
