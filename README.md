# Image Processing Service (v2)
Welcome to the Image Processing Application Programming Interface (API) 
for seamless image manipulation. 
This solution enhances the user experience with an intuitive and 
efficient interface, powered by server-side processing for real-time image editing.
This version introduces a revolutionary feature allowing users to select multiple 
editing operations via operation box and apply them simultaneously, streamlining 
the image editing process for a more efficient workflow.
Key Features are User-Friendly Interface, Real-Time Manipulation, Efficient 
RPC Interactions, Batch Operation Application. 
Limitations by file and image size ensure system performance and stability. 
File Size Limit is that Uploaded images 
must not exceed 50 MB in size. Memory Storage Limit is that the system employs 
memory storage to temporarily save 
image buffers, capped at 1024 * 1024 pixels.
For more detailed information, including access to our project's source code, 
documentation, and implementation 
details, please visit the GitHub repository.
https://github.com/TAEKIL-OH/cs5200_ip_api_V2
Contact Information is toh3@seattleu.edu
## Technologies
Server Setup and Libraries are Express.js, Multer, Sharp, and Swagger UI Express &YAMLjs. 
Express.js is utilized as the core framework to handle HTTP requests and responses, 
facilitating RESTful API architecture. Multer is Integrated for parsing `multipart/form-data` requests, 
enabling image uploads. Sharp is chosen for its performance and flexibility in image processing tasks, 
supporting operations like resizing, cropping, and format conversion. Swagger UI Express & YAMLjs are tools 
used to create interactive API documentation, making it easier for developers to understand and integrate the API's capabilities.
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
### Run the server
1. Ensure you have Node.js and npm installed.
2. Clone or download the server codebase.
3. Run `npm install` to install dependencies.
4. Start the server using `node server.js`.

