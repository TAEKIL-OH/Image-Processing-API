# Image Processing Service (v2)

## Purpose

## Technologies

## Supported Image Formats

- JPG/JPEG (Tested)
- PNG (Tested)
- GIF
- TIFF

## Limitations

- Maximum File Size: 50 MB
- Images are not saved on the server after processing

## Key Features

- **Improved server efficiency:** Version 2 avoids saving images 
in memory or on the server, improving performance and reducing storage requirements.
- **Streamlined client communication:** All image data is transferred directly 
from the client to the server without intermediate buffers, enhancing efficiency.

## Getting Started

### Run the server

1. Ensure you have Node.js and npm installed.
2. Clone or download the server codebase.
3. Run `npm install` to install dependencies.
4. Start the server using `node server.js`.

### Use the API

Refer to the provided API documentation (if available) for specific 
endpoint details. Examples might include:

- **Uploading an image:** Make a POST request to `/upload` with the image file 
in the request body.
- **Vertically flipping an image:** Make a POST request to `/verticalFlip` 
with the image data in Base64 format.
