// import express from 'express';
// import { PDFDocument } from 'pdf-lib';
// import fs from 'fs/promises';
// import path from 'path';
// import pdfPoppler from 'pdf-poppler';
// import { v2 as cloudinary } from 'cloudinary';
// import cors from 'cors'
// import { configDotenv } from 'dotenv';
// configDotenv()
// cloudinary.config({
//     cloud_name: 'dxoyx4xw3',
//     api_key: '226187215341891',
//     api_secret:  process.env.CLOUDINARY_SECRET// Use environment variable for security
// });

// const app = express();
// const port = 5000;
// app.use(cors(
//     {
//         origin: "*",
//         allowedHeaders: {
//             'Access-Control-Allow-Origin': '*'
//         }
//     }
// ));

// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });

// app.get('/', (req, res) => {
//     res.send({ 'status': 'Working Fine!' });
// });

// app.get('/api/generate-certificate', async (req, res) => {
//     try {
//         const { walletAddress, wpm, accuracy } = req.query;

//         if (!walletAddress || !wpm || !accuracy) {
//             return res.status(400).json({ error: 'Missing required parameters' });
//         }

//         const pdfPath = path.join(process.cwd(), 'public', 'certificate.pdf');
//         const imageOutputDir = path.join(process.cwd(), 'public', 'images');
//         const outputPdfPath = path.join(process.cwd(), 'public', 'images', `output_${walletAddress}.pdf`);

//         // Generate PDF
//         const existingPdfBytes = await fs.readFile(pdfPath);
//         const pdfDoc = await PDFDocument.load(existingPdfBytes);

//         const form = pdfDoc.getForm();
//         form.getTextField('name').setText(
//             `The user ${walletAddress} has proof of work with typing speed of ${wpm} wpm with accuracy of ${accuracy}`
//         );

//         const pdfBytes = await pdfDoc.save();
//         await fs.writeFile(outputPdfPath, Buffer.from(pdfBytes));

//         // Ensure output directory exists
//         try {
//             await fs.access(imageOutputDir);
//         } catch {
//             await fs.mkdir(imageOutputDir, { recursive: true });
//         }

//         // Convert PDF to PNG
//         const options = {
//             format: 'png',
//             out_dir: imageOutputDir,
//             out_prefix: `output_${walletAddress}`,
//             page: null,
//         };

//         try {
//             await pdfPoppler.convert(outputPdfPath, options);
//         } catch (err) {
//             console.error('\nError converting PDF to images:', err);
//             return res.status(500).json({ error: 'Failed to convert PDF to images' });
//         }

//         // Get the generated PNG file
//         const imageFiles = await fs.readdir(imageOutputDir);
//         const pngFile = imageFiles.find(file => file.startsWith(`output_${walletAddress}`) && file.endsWith('.png'));

//         if (!pngFile) {
//             return res.status(500).json({ error: 'PNG file not found' });
//         }

//         const imagePath = path.join(imageOutputDir, pngFile);
//         // Upload to Cloudinary
//         try {
//             const uploadResult = await cloudinary.uploader.upload(imagePath, {
//                 public_id: `certificate_${walletAddress}`,
//                 folder: 'certificates',
//                 format: 'png',
//                 transformation: {
//                     quality: 'auto',
//                     fetch_format: 'auto'
//                 }
//             });
//             // Clean up local files
//             await fs.unlink(outputPdfPath);
//             await fs.unlink(imagePath);

//             return res.json({
//                 status: 'success',
//                 certificate: {
//                     url: uploadResult.secure_url,
//                     public_id: uploadResult.public_id,
//                     version: uploadResult.version
//                 }
//             });

//         } catch (cloudinaryError) {
//             console.error('\nCloudinary upload error:', cloudinaryError);
//             return res.status(500).json({ error: 'Failed to upload to Cloudinary' });
//         }

//     } catch (error) {
//         console.error('\nError generating certificate:', error);
//         return res.status(500).json({ error: 'Failed to generate certificate' });
//     }
// });

// export default app;


// import cors from 'cors';
// import express from 'express';
// import { createCanvas } from 'canvas';
// import { v2 as cloudinary } from 'cloudinary';

// // Configure Cloudinary
// cloudinary.config({
//     cloud_name: 'dxoyx4xw3',
//     api_key: '226187215341891',
//     api_secret: process.env.CLOUDINARY_SECRET || 'A_Rne4shf9hSV_2Z3EbqREiNyD4'
// });

// const app = express();
// app.use(cors());

// const port = process.env.PORT || 5000
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });

// app.get('/', (req, res) => {
//     res.send({ 'status': 'Working Fine!' });
// });

// app.get('/api/generate-certificate', async (req, res) => {
//     try {
//         const { walletAddress, wpm, accuracy } = req.query;

//         if (!walletAddress || !wpm || !accuracy) {
//             return res.status(400).json({ error: 'Missing required parameters' });
//         }

//         // Create canvas
//         const width = 800;
//         const height = 600;
//         const canvas = createCanvas(width, height);
//         const ctx = canvas.getContext('2d');

//         // Set background
//         ctx.fillStyle = '#ffffff';
//         ctx.fillRect(0, 0, width, height);

//         // Add border
//         ctx.strokeStyle = '#000000';
//         ctx.lineWidth = 5;
//         ctx.strokeRect(25, 25, width - 50, height - 50);

//         // Add decorative border
//         ctx.strokeStyle = '#888888';
//         ctx.lineWidth = 2;
//         ctx.strokeRect(35, 35, width - 70, height - 70);

//         // Configure text styles
//         ctx.textAlign = 'center';
//         ctx.fillStyle = '#000000';

//         // Draw title
//         ctx.font = 'bold 40px Arial';
//         ctx.fillText('Certificate of Achievement', width / 2, 150);

//         // Draw main text
//         ctx.font = '20px Arial';
//         const lines = [
//             `This is to certify that`,
//             `User: ${walletAddress}`,
//             `has achieved a typing speed of ${wpm} WPM`,
//             `with an accuracy of ${accuracy}%`
//         ];

//         let y = 250;
//         lines.forEach(line => {
//             ctx.fillText(line, width / 2, y);
//             y += 40;
//         });

//         // Add date
//         const date = new Date().toLocaleDateString();
//         ctx.font = '16px Arial';
//         ctx.fillText(`Date: ${date}`, width / 2, height - 100);

//         // Convert canvas to buffer
//         const buffer = canvas.toBuffer('image/png');
//         console.log(buffer);
//         // Upload to Cloudinary
//         try {
//             const uploadResult = await new Promise((resolve, reject) => {
//                 const uploadStream = cloudinary.uploader.upload_stream(
//                     {
//                         public_id: `certificate_${walletAddress}`,
//                         folder: 'certificates',
//                         format: 'png',
//                         transformation: {
//                             quality: 'auto',
//                             fetch_format: 'auto'
//                         }
//                     },
//                     (error, result) => {
//                         if (error) reject(error);
//                         else resolve(result);
//                     }
//                 );

//                 uploadStream.end(buffer);
//             });

//             return res.json({
//                 status: 'success',
//                 certificate: {
//                     url: uploadResult.secure_url,
//                     public_id: uploadResult.public_id,
//                     version: uploadResult.version
//                 }
//             });

//         } catch (cloudinaryError) {
//             console.error('\nCloudinary upload error:', cloudinaryError);
//             return res.status(500).json({ error: 'Failed to upload to Cloudinary' });
//         }

//     } catch (error) {
//         console.error('\nError generating certificate:', error);
//         return res.status(500).json({ error: 'Failed to generate certificate' });
//     }
// });

// export default app;

//----------------//------------------//------------------//--------------------//------------------//

/* 
import cors from 'cors';
import express from 'express';
import { createCanvas, registerFont } from 'canvas';
import { v2 as cloudinary } from 'cloudinary';
import path from 'path';
import fs from 'fs';
import { configDotenv } from 'dotenv';
configDotenv()
const app = express();
app.use(cors());

// app.use(serveFavicon(path.join(process.cwd(), 'public', 'favicon.ico')));
// app.use('/public', express.static(path.join(process.cwd(), 'public')));

// add server folder for vercel deployment, because the root is pushed as edutype-js and then sub dir is selected as server
const fontPath = path.join(process.cwd(), 'server', 'font.ttf');

cloudinary.config({
    cloud_name: 'dxoyx4xw3',
    api_key: '226187215341891',
    api_secret: process.env.CLOUDINARY_SECRET
});
app.get('/', (req, res) => {
    res.send({ 'status': 'Working Fine!' });
});
console.log("process.cwd(): ", process.cwd());
console.log("Content inside Server Folder: ", fs.readdirSync(path.join(process.cwd(), 'server')));

app.get('/api/generate-certificate', async (req, res) => {
    try {
        if (!fs.existsSync(fontPath)) {
            console.error('\nFont file not found at: ', fontPath);
            console.error('\nCurrent working directory: ', process.cwd());
            console.error('\nDirectory contents of root: ', fs.readdirSync(process.cwd()));
        } else {
            console.log('\nFont file found at:', fontPath);
            registerFont(fontPath, {
                family: 'Geist Mono',
                weight: '400',
                style: 'normal'
            });
            console.log('\nAttempting to load Geist font from:', fontPath);
            console.log('\nFont registered successfully');
        }
    } catch (error) {
        console.error('\nError during font registration:', error);
    }
    try {
        const { walletAddress, wpm, accuracy } = req.query;
        if (!walletAddress || !wpm || !accuracy) {
            return res.status(400).json({ error: 'Missing required parameters' });
        }
        console.log(fontPath);
        // Create canvas with debug logging
        console.log('\nCreating canvas...');
        const width = 800;
        const height = 600;
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext('2d');
        // Set background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);
        // Add border
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 5;
        ctx.strokeRect(25, 25, width - 50, height - 50);
        // Add decorative border
        ctx.strokeStyle = '#888888';
        ctx.lineWidth = 2;
        ctx.strokeRect(35, 35, width - 70, height - 70);
        // Configure text styles with debug logging
        console.log('\nSetting up text styles...');
        ctx.textAlign = 'center';
        ctx.fillStyle = '#000000';
        // Draw title with logging
        ctx.font = '48px "Geist Mono"';
        console.log('\nSet title font:', ctx.font);
        ctx.fillText('Certificate of Achievement', width / 2, 150);
        // Draw main text
        ctx.font = '24px "Geist Mono"';
        console.log('\nSet main text font:', ctx.font);
        const lines = [
            `This is to certify that`,
            `User: ${walletAddress}`,
            `has achieved a typing speed of ${wpm} WPM`,
            `with an accuracy of ${accuracy}%`
        ];
        let y = 250;
        lines.forEach(line => {
            ctx.fillText(line, width / 2, y);
            y += 40;
        });
        // Add date
        const date = new Date().toLocaleDateString();
        ctx.font = '18px "Geist Mono"';
        ctx.fillText(`Date: ${date}`, width / 2, height - 100);
        // Convert canvas to buffer
        console.log('\nConverting to buffer...');
        const buffer = canvas.toBuffer('image/png');
        // Upload to Cloudinary
        try {
            console.log('\nUploading to Cloudinary...');
            const uploadResult = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        public_id: `certificate_${walletAddress}`,
                        folder: 'certificates',
                        format: 'png',
                        transformation: {
                            quality: 'auto',
                            fetch_format: 'auto'
                        }
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                uploadStream.end(buffer);
            });
            console.log('\nUpload successful');
            return res.json({
                status: 'success',
                certificate: {
                    url: uploadResult.secure_url,
                    public_id: uploadResult.public_id,
                    version: uploadResult.version
                }
            });
        } catch (cloudinaryError) {
            console.error('\nCloudinary upload error:', cloudinaryError);
            return res.status(500).json({ error: 'Failed to upload to Cloudinary' });
        }
    } catch (error) {
        console.error('\nError generating certificate:', error);
        return res.status(500).json({ error: 'Failed to generate certificate' });
    }
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`\nServer is running on http://localhost:${port}`);
    console.log('\nFont path:', fontPath);
});
export default app;
*/


import cors from 'cors';
import express from 'express';
import { configDotenv } from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import { createCanvas, registerFont } from 'canvas';
import fs from 'fs'
import path from 'path'
configDotenv();

const app = express();
app.use(cors());
app.use(express.static('public'));
const fontPath = "https://fonts.cdnfonts.com/s/7358/handy00.woff";

cloudinary.config({
    cloud_name: 'dxoyx4xw3',
    api_key: '226187215341891',
    api_secret: process.env.CLOUDINARY_SECRET
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`\nServer is running on http://localhost:${port}`);
    console.log('\nFontCDN just after server:', fontPath);
});

app.get('/', (req, res) => {
    res.send({ 'status': 'Working Fine!' });
});

console.log("Content inside root Folder: ", fs.readdirSync(process.cwd()));
console.log("Content inside Server Folder: ", fs.readdirSync(path.join(process.cwd(), 'server')));

app.get('/api/generate-certificate', async (req, res) => {
    try {
        console.log('\nFontCDN inside API request :', fontPath);
        registerFont(fontPath, {
            family: 'Handy00',
            style: 'normal',
            weight: 400,
            format: 'woff2'
        });
        console.log('\nAttempting to load font from:', fontPath);
        console.log('\nFont registered successfully');
    } catch (error) {
        console.error('\nError during font registration:', error);
    }

    // fetching query params and certficate part starts here
    try {
        const { walletAddress, wpm, accuracy } = req.query;

        if (!walletAddress || !wpm || !accuracy) {
            return res.status(400).json({ error: 'Missing required parameters' });
        }
        console.log(fontPath);

        // Create canvas with debug logging
        console.log('\nCreating canvas...');
        const width = 800;
        const height = 600;
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        // Set background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);

        // Add border
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 5;
        ctx.strokeRect(25, 25, width - 50, height - 50);

        // Add decorative border
        ctx.strokeStyle = '#888888';
        ctx.lineWidth = 2;
        ctx.strokeRect(35, 35, width - 70, height - 70);

        // Configure text styles with debug logging
        console.log('\nSetting up text styles...');
        ctx.textAlign = 'center';
        ctx.fillStyle = '#000000';

        // Draw title with logging
        ctx.font = '48px "Handy00"';
        console.log('\nSet title font:', ctx.font);
        ctx.fillText('Certificate of Achievement', width / 2, 150);

        // Draw main text
        ctx.font = '24px "Handy00"';
        console.log('\nSet main text font:', ctx.font);
        const lines = [
            `This is to certify that`,
            `User: ${walletAddress}`,
            `has achieved a typing speed of ${wpm} WPM`,
            `with an accuracy of ${accuracy}%`
        ];

        let y = 250;
        lines.forEach(line => {
            ctx.fillText(line, width / 2, y);
            y += 40;
        });

        // Add date
        const date = new Date().toLocaleDateString();
        ctx.font = '18px "Handy00"';
        console.log('\nSet Date font:', ctx.font);
        ctx.fillText(`Date: ${date}`, width / 2, height - 100);

        // Convert canvas to buffer
        console.log('\nConverting to buffer...');
        const buffer = canvas.toBuffer('image/png');
        console.log(ctx);
        // Upload to Cloudinary
        try {
            console.log('\nUploading to Cloudinary...');
            const uploadResult = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        public_id: `certificate_${walletAddress}`,
                        folder: 'certificates',
                        format: 'png',
                        transformation: {
                            quality: 'auto',
                            fetch_format: 'auto'
                        }
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );

                uploadStream.end(buffer);
            });

            console.log('\nUpload successful');
            return res.json({
                status: 'success',
                certificate: {
                    url: uploadResult.secure_url,
                    public_id: uploadResult.public_id,
                    version: uploadResult.version
                }
            });

        } catch (cloudinaryError) {
            console.error('\nCloudinary upload error:', cloudinaryError);
            return res.status(500).json({ error: 'Failed to upload to Cloudinary' });
        }

    } catch (error) {
        console.error('\nError generating certificate:', error);
        return res.status(500).json({ error: 'Failed to generate certificate' });
    }
});

export default app;