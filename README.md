ReadMe.md for Image Processing Service (v2)----------------
Purpose:
Technologies:
Supported Image Formats:
    * JPG/JPEG (Tested)
    * PNG (Tested)
    * GIF 
    * TIFF
Limitations:
    * Maximum File Size: 50 MB
    * Image are not saved on the server after processing
Key Features:
    * Imporved server efficiency: 
    Version2 avoids saving images In memory or on the server, 
    improving performance and reducing storage requirements. 
    * Streamlined client communication: 
    all image data is transferred directly from the client to 
    the server without intermediate buffers, enhancing efficiency. 
Getting Started:
Run the server:
    * Ensure you have Node.js and npm installed. 
    * Clone or donwload the server codebase. 
    * Run npm install to install dependencies. 
    * Start the server using node server.js
Use the API:
    * Refer to the provided API documentation (if available) 
    for specific endpoint details.
    * Examples might include:
    Uploading an image: Make a POST request to /upload with 
    the image file in the request body.
    Vertically flipping an image: Make a POST request to 
    /verticalFlip with the image data in Base64 format.

