// Taekil Oh
// FEB 20 2024
// server.js
// purpose: server-side for image processing functions for RPC calls

const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const {verticalFlip, horizontalFlip, colorToGrey, rightRotating, 
    leftRotating, generatingThumbnail, angleRotating, resizing} = require('./imageOperations');

const app = express();
const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage, 
    limits: {fileSize: 50 * 1024 * 1024}
 });

// set ejs as the templating engine
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({extended: true }));

const swaggerDocument = YAML.load('./openapi.yml');
app.use('/openapi-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// display upload form
app.get('/', (req, res) => {
    res.render('client', {imageSrc:null});
});

// adding the operation to run selected methods and return the image. 
app.post('/applyOperations', express.json({limit: '50mb'}), (req, res) => {
    const imageData = req.body.imageData;
    const imageType = req.body.imageType;
    const operations = req.body.operations;

    // based on the operations order operating the processing methods. 
    if(!imageData) {
        return res.status(400).json({error: "No image data provided"});
    }

    // Extract the base 64
    const base64Data = imageData.split(';base64,').pop();
    const buffer = Buffer.from(base64Data, 'base64');
    
});

// handle image upload and convert to Base64
app.post('/upload', upload.single('image'), (req, res) => {
    if(req.file) {
        
        // convert uplaoded file buffer to Base64
        const imgBase64 = req.file.buffer.toString('base64');
        const imageSrc = `data:${req.file.mimetype};base64, ${imgBase64}`;
        res.json({ imageUrl: imageSrc });
    }else {
        res.status(400).json({error: 'No file uploaded'});
    }
});

// vertical flip
app.post('/verticalFlip', express.json({limit: '50mb'}), (req, res) => {
    const imageData = req.body.imageData;
    const imageType = req.body.imageType;
    if (imageData) {
        verticalFlip(imageData, imageType)
        .then(imageSrc => res.json({ imageUrl: imageSrc }))
        .catch(err => {
            console.error('Error processing image:', err);
            res.status(500).send('Error processing image');
            });
    } else {
        // Handle case where there is no image data in the request
        res.status(400).json({error: "No image data provided."});
    }
});

// horizontal flip
app.post('/horizontalFlip', express.json({limit: '50mb'}), (req, res) => {
    const imageData = req.body.imageData;
    const imageType = req.body.imageType;
    if (imageData) {
        horizontalFlip(imageData, imageType)
        .then(imageSrc => res.json({ imageUrl: imageSrc }))
        .catch(err => {
            console.error('Error processing image:', err);
            res.status(500).send('Error processing image');
            });
    } else {
        // Handle case where there is no image data in the request
        res.status(400).json({error: "No image data provided."});
    }
});

// Grey coloring
app.post('/colorToGrey', express.json({limit: '50mb'}), (req, res) => {
    const imageData = req.body.imageData;
    const imageType = req.body.imageType;
    if (imageData) {
        colorToGrey(imageData, imageType)
        .then(imageSrc => res.json({imageUrl: imageSrc}))
        .catch(err => {
            console.error('Error processing image:', err);
            res.status(500).send('Error processing image');
            });
    } else {
        // Handle case where there is no image data in the request
        res.status(400).json({error: "No image data provided."});
    }
});

// right rotating into 90 degree
app.post('/rightRotating', express.json({limit: '50mb'}), (req, res) => {
    const imageData = req.body.imageData;
    const imageType = req.body.imageType;
    if (imageData) {
        rightRotating(imageData, imageType)
        .then(imageSrc => res.json({imageUrl: imageSrc}))
        .catch(err => {
            console.error('Error processing image:', err);
            res.status(500).send('Error processing image');
            });
    } else {
        // Handle case where there is no image data in the request
        res.status(400).json({error: "No image data provided."});
    }
});

// left rotating into 90 degree
app.post('/leftRotating', express.json({limit: '50mb'}), (req, res) => {
    const imageData = req.body.imageData;
    const imageType = req.body.imageType;
    if (imageData) {
        leftRotating(imageData, imageType)
        .then(imageSrc => res.json({imageUrl: imageSrc}))
        .catch(err => {
            console.error('Error processing image:', err);
            res.status(500).send('Error processing image');
            });
    } else {
        // Handle case where there is no image data in the request
        res.status(400).json({error: "No image data provided."});
    }
});

// Generating thumbnail
// thumbnail size: 200 * 200 
app.post('/generatingThumbnail', express.json({limit: '50mb'}), (req, res) => {
    const imageData = req.body.imageData;
    const imageType = req.body.imageType;
    if (imageData) {
        generatingThumbnail(imageData, imageType)
        .then(thumbnailImageSrc => res.json({thumbnailImageUrl: thumbnailImageSrc}))
        .catch(err => {
            console.error('Error processing image:', err);
            res.status(500).send('Error processing image');
            });
    } else {
        // Handle case where there is no image data in the request
        res.status(400).json({error: "No image data provided."});
    }
});

// rotating in user-input angle
app.post('/angleRotating', express.json({limit: '50mb'}), (req, res) => {
    const imageData = req.body.imageData;
    const imageType = req.body.imageType;
    const rotationAngle = parseInt(req.body.rotationAngle, 10);
    
    // check if rotationAngle is NaN
    if(isNaN(rotationAngle)) {
        return res.status(400).json({error: "Invaild angle"});
    }

    if (imageData) {
        angleRotating(imageData, imageType, rotationAngle)
        .then(imageSrc => res.json({imageUrl: imageSrc}))
        .catch(err => {
            console.error('Error porcessing image:', err);
            res.status(500),send('Error Processing image');
        });
    } else {
        // Handle case where there is no image data in the request
        res.status(400).json({error: "No image data provided."});
    }
});

// resizing by user-input
app.post('/resizing', express.json({limit: '50mb'}), (req, res) => {
    const imageData = req.body.imageData;
    const imageType = req.body.imageType;
    const percentage = parseInt(req.body.percentage, 10);
    if (imageData) {
        resizing(imageData, imageType, percentage)
        .then(resizedImageSrc => res.json({imageUrl: resizedImageSrc }))
        .catch(err => {
            console.error('Error processing image:', err);
            res.status(500).send('Error processing image');
        });
    } else {
        // Handle case where there is no image data in the request
        res.status(400).json({error: "No image data provided."});
    }
});

app.listen(3000, () => console.log('Server Started on http://localhost:3000'));




