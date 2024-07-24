const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');
const upload = require('../middlewares/multerConfig'); // Ensure multer config is correctly imported

// Route to upload images
router.post('/:galleryId/upload', upload.array('images'), imageController.uploadImages);

// Route to fetch images for a specific gallery
router.get('/:galleryId', imageController.getImagesByGalleryId);

// Route to delete an image
router.delete('/:imageId', imageController.deleteImage);

module.exports = router;
