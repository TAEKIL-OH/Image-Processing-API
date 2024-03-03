// Taekil Oh
// Feb 27th 2024
// imageOperations.js
// purpose: functions for image operations
// The imageData parameter expects a Base64 encoded string of the image, typically in the format 'data:[<MIME-type>];base64,[<base64-data>].
The imageType should be a valid MIME type of the image (e.g., 'image/jpeg', 'image/png').

const sharp = require('sharp');

// vertical flip
async function verticalFlip(imageData, imageType){
    /*
    verticalFlip(imageData, imageType)
    Purpose: Flips the image vertically.
    Parameters:
        imageData: Base64 encoded string of the image.
        imageType: MIME type of the image.
    Returns: A Promise that resolves to the Base64 encoded string 
    of the vertically flipped image.
    */
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
    /*
    horizontalFlip(imageData, imageType)
    Purpose: Flips the image horizontally.
    Parameters: Same as verticalFlip.
    Returns: A Promise that resolves to the Base64 encoded 
    string of the horizontally flipped image.
    */
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
    /*
    colorToGrey(imageData, imageType)
    Purpose: Converts the image to grayscale.
    Parameters: Same as verticalFlip.
    Returns: A Promise that resolves to the Base64 encoded string 
    of the grayscale image.
    */
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
    /*
    rightRotating(imageData, imageType)
    Purpose: Rotates the image 90 degrees to the right.
    Parameters: Same as verticalFlip.
    Returns: A Promise that resolves to the Base64 encoded 
    string of the right-rotated image.
    */
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
    /*
    leftRotating(imageData, imageType)
    Purpose: Rotates the image 90 degrees to the left.
    Parameters: Same as verticalFlip.
    Returns: A Promise that resolves to the Base64 encoded string 
    of the left-rotated image.
    */
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
    /*
    generatingThumbnail(imageData, imageType)
    Purpose: Generates a thumbnail of the image with dimensions 200x200 pixels.
    Parameters: Same as verticalFlip.
    Returns: A Promise that resolves to the Base64 encoded string of 
    the thumbnail image.
    */
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
    /*
    angleRotating(imageData, imageType, rotationAngle)
    Purpose: Rotates the image by a specified angle.
    Parameters:
        imageData and imageType: Same as above.
        rotationAngle: The angle in degrees to rotate the image.
    Returns: A Promise that resolves to the Base64 encoded string of the rotated
    image.
     */
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
    /*
    resizing(imageData, imageType, percentage)
    Purpose: Resizes the image by a specified percentage while keeping the aspect ratio.
    Parameters:
        imageData and imageType: Same as above.
        percentage: The percentage to resize the image.
        Returns: A Promise that resolves to the Base64 encoded string of 
        the resized image.
     */
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



