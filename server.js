// Taekil Oh
// FEb 20 2024
// server.js
// purpose: server-side for image processing functions for RPC calls

const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

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
        // Extract the Base64 encoded image data from the imageData string
        const base64Data = imageData.split(';base64,').pop();
        const buffer = Buffer.from(base64Data, 'base64');

        sharp(buffer)
            .flip()
            .toBuffer()
            .then(flippedBuffer => {
                // Convert flipped image buffer to Base64
                const imgBase64 = flippedBuffer.toString('base64');
                const imageSrc = `data:${imageType};base64,${imgBase64}`;
                res.json({ imageUrl: imageSrc });
            })
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
        // Extract the Base64 encoded image data from the imageData string
        const base64Data = imageData.split(';base64,').pop();
        const buffer = Buffer.from(base64Data, 'base64');

        sharp(buffer)
            .flop()
            .toBuffer()
            .then(flippedBuffer => {
                // Convert flipped image buffer to Base64
                const imgBase64 = flippedBuffer.toString('base64');
                const imageSrc = `data:${imageType};base64,${imgBase64}`;
                res.json({ imageUrl: imageSrc });
            })
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
        // Extract the Base64 encoded image data from the imageData string
        const base64Data = imageData.split(';base64,').pop();
        const buffer = Buffer.from(base64Data, 'base64');

        sharp(buffer)
            .greyscale()
            .toBuffer()
            .then(flippedBuffer => {
                // Convert flipped image buffer to Base64
                const imgBase64 = flippedBuffer.toString('base64');
                const imageSrc = `data:${imageType};base64,${imgBase64}`;
                res.json({ imageUrl: imageSrc });
            })
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
        // Extract the Base64 encoded image data from the imageData string
        const base64Data = imageData.split(';base64,').pop();
        const buffer = Buffer.from(base64Data, 'base64');

        sharp(buffer)
            .rotate(90) // rorate the image 90 degrees to the right
            .toBuffer()
            .then(flippedBuffer => {
                // Convert flipped image buffer to Base64
                const imgBase64 = flippedBuffer.toString('base64');
                const imageSrc = `data:${imageType};base64,${imgBase64}`;
                res.json({ imageUrl: imageSrc });
            })
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
        // Extract the Base64 encoded image data from the imageData string
        const base64Data = imageData.split(';base64,').pop();
        const buffer = Buffer.from(base64Data, 'base64');

        sharp(buffer)
            .rotate(-90) // rorate the image 90 degrees to the left
            .toBuffer()
            .then(flippedBuffer => {
                // Convert flipped image buffer to Base64
                const imgBase64 = flippedBuffer.toString('base64');
                const imageSrc = `data:${imageType};base64,${imgBase64}`;
                res.json({ imageUrl: imageSrc });
            })
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




