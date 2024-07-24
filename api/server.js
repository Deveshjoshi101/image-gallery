const express = require('express');
const app = express();
const cors = require('cors');
const galleryRoutes = require('./src/routes/galleryRoutes');
const imageRoutes = require('./src/routes/imageRoutes');
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // If you're making cross-origin requests

// Use gallery routes
app.use('/api/galleries', galleryRoutes);
// Use image routes
app.use('/api/images', imageRoutes);

// Default route for testing
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Error handling for 404
app.use((req, res) => {
    res.status(404).send('Not Found');
});

// Error handling for 500
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
