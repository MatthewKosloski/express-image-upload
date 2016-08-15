# express-image-upload
Upload images to an Express server to be served under a static directory.  All uploaded photos can be found at `/public/photos`.  The `/temp` directory stores the 7-bit encoded Buffers that will be turned into the appropriate image types.

# Usage
1. Download repo and install dependencies. `npm install`.
2. Create an 'images' folder within the public directory. `cd public && mkdir images`
2. Run `npm start` and navigate to `http://localhost:3000`.
3. Upload either a `.jpeg, .jpg, or .png` photo.
