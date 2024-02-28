// Taekil Oh
// Feb 27th 2024
// imageOperations.js
// purpose: functions for image operations

const sharp = require('sharp');

// vertical flip
async function verticalFlip(imageData, imageType){
    return new Promise((resolve, reject) => {
        // Extract the Base64 encoded image data from the imageData string
        const base64Data = imageData.split(';base64,').pop();
        const buffer = Buffer.from(base64Data, 'base64');

        sharp(buffer)
            .flip()
            .toBuffer()
            .then(verticalFlippedBuffer => {
                // Convert flipped image buffer to Base64
                const imgeBase64 = verticalFlippedBuffer.toString('base64');
                const imageSrc = `data:${imageType};base64,${imgeBase64}`;
                resolve(imageSrc);
            })
            .catch(err => {
                console.error('Error processing image:', err);
                reject(err);
            });
    });
}

// horizontal flip
async function horizontalFlip(imageData, imageType){
    return new Promise((resolve, reject) => {
        // Extract the Base64 encoded image data from the imageData string
        const base64Data = imageData.split(';base64,').pop();
        const buffer = Buffer.from(base64Data, 'base64');

        sharp(buffer)
            .flop()
            .toBuffer()
            .then(horizontalFlippedBuffer => {
                // Convert flipped image buffer to Base64
                const imgeBase64 = horizontalFlippedBuffer.toString('base64');
                const imageSrc = `data:${imageType};base64,${imgeBase64}`;
                resolve(imageSrc);
            })
            .catch(err => {
                console.error('Error processing image:', err);
                reject(err);
            });
    });
}

// Grey coloring
async function colorToGrey(imageData, imageType){
    return new Promise((resolve, reject) => {
        const base64Data = imageData.split(';base64,').pop();
        const buffer = Buffer.from(base64Data, 'base64');

        sharp(buffer)
            .greyscale()
            .toBuffer()
            .then(greyBuffer => {
                // Convert flipped image buffer to Base64
                const imgeBase64 = greyBuffer.toString('base64');
                const imageSrc = `data:${imageType};base64,${imgeBase64}`;
                resolve(imageSrc);
            })
            .catch(err => {
                console.error('Error processing image:', err);
                reject(err);
            });
    });
}

// right rotating into 90 degree
async function rightRotating(imageData, imageType){
    return new Promise((resolve, reject) => {
        const base64Data = imageData.split(';base64,').pop();
        const buffer = Buffer.from(base64Data, 'base64');

        sharp(buffer)
            .rotate(90) // rorate the image 90 degrees to the right
            .toBuffer()
            .then(rightRotatedBuffer => {
                // Convert flipped image buffer to Base64
                const imgeBase64 = rightRotatedBuffer.toString('base64');
                const imageSrc = `data:${imageType};base64,${imgeBase64}`;
                resolve(imageSrc);
            })
            .catch(err => {
                console.error('Error processing image:', err);
                reject(err)
            });
    });
}

// left rotating into 90 degree
async function leftRotating(imageData, imageType){
    return new Promise((resolve, reject) => {
        const base64Data = imageData.split(';base64,').pop();
        const buffer = Buffer.from(base64Data, 'base64');

        sharp(buffer)
            .rotate(-90) // rorate the image 90 degrees to the left
            .toBuffer()
            .then(rightRotatedBuffer => {
                // Convert flipped image buffer to Base64
                const imgeBase64 = rightRotatedBuffer.toString('base64');
                const imageSrc = `data:${imageType};base64,${imgeBase64}`;
                resolve(imageSrc);
            })
            .catch(err => {
                console.error('Error processing image:', err);
                reject(err)
            });
    })
}

// Generating thumbnail
// thumbnail size: 200 * 200 
async function generatingThumbnail(imageData, imageType){
    return new Promise((resolve, reject) => {
        // Extract the Base64 encoded image data from the imageData string
        const base64Data = imageData.split(';base64,').pop();
        const buffer = Buffer.from(base64Data, 'base64');

        sharp(buffer)
            .resize(200, 200)
            .toBuffer()
            .then(thumbnailBuffer => {
                // Convert thumbnail image buffer to Base64
                const thumbnailImgeBase64 = thumbnailBuffer.toString('base64');
                const thumbnailImageSrc = `data:${imageType};base64,${thumbnailImgeBase64}`;

                // Send the thumbnail image URL back to the client
                resolve(thumbnailImageSrc);
            })
            .catch(err => {
                console.error('Error processing image:', err);
                reject(err);
            });
    });
}

// rotating in user-input angle
async function angleRotating(imageData, imageType, rotationAngle){
    return new Promise((resolve, reject) => {
        // Extract the Base64 encoded image data from the imageData string
        const base64Data = imageData.split(';base64,').pop();
        const buffer = Buffer.from(base64Data, 'base64');

        if(isNaN(rotationAngle)) {
            const error = new Error('Angle not Number');
            console.error('Error processing image: ', error);
            reject(error);
        }

        // Get original image metadata
        sharp(buffer)
            .metadata()
            .then(metadata => {
                const originalWidth = metadata.width;
                const originalHeight = metadata.height;
                // Rotate the image
                sharp(buffer)
                    .rotate(rotationAngle)
                    .toBuffer()
                    .then(angleRotatedBuffer => {
                        sharp(angleRotatedBuffer) // Chain another sharp operation
                            .resize({ fit: 'inside', width: originalWidth, height: originalHeight })
                            .toBuffer()
                            .then(resizedBuffer => {
                                // Convert resized image buffer to Base64
                                const imgeBase64 = resizedBuffer.toString('base64');
                                const imageSrc = `data:${imageType};base64,${imgeBase64}`;
                                resolve(imageSrc);
                            })
                            .catch(err => {
                                console.error('Error processing image:', err);
                                reject(err);
                            });
                })
                .catch(err => {
                    console.error('Error processing image:', err);
                    reject(err);
                });
            })
            .catch(err => {
                console.error('Error processing image:', err);
                reject(err);
            });
    });
}

// resizing by user-input
async function resizing(imageData, imageType, percentage) {
    return new Promise((resolve, reject) => {
        // Extract the Base64 encoded image data from the imageData string
        const base64Data = imageData.split(';base64,').pop();
        const buffer = Buffer.from(base64Data, 'base64');

        if(isNaN(percentage) || percentage <= 0) {
            const error = new Error('No percentage value.');
            console.error('Error image processing:', error);
            reject(error);
        }

        sharp(buffer)
        .metadata()
        .then(metadata => {
            // keep the ratio of width and hieght
                // each value being resized by the given percentage
                const resizeWidth = Math.round(metadata.width * percentage/100);
                const resizeHeight = Math.round(metadata.height * percentage/100);

                // Rotate the image
                sharp(buffer)
                    .resize(resizeWidth, resizeHeight)
                    .toBuffer()
                    .then(resizedBuffer => {
                                // Convert resized image buffer to Base64
                                const resizedImgeBase64 = resizedBuffer.toString('base64');
                                const resizedImageSrc = `data:${imageType};base64,${resizedImgeBase64}`;
                                resolve(resizedImageSrc);
                    })
                    .catch(err => {
                        console.error('Error processing image:', err);
                        reject(err);
                    });
            }).catch(err => {
                console.error('Error processing image:', err);
                reject(err);
            });
    })
}

module.exports = {
    verticalFlip,
    horizontalFlip,
    colorToGrey,
    rightRotating,
    leftRotating,
    generatingThumbnail,
    angleRotating,
    resizing
};



