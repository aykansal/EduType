import express from 'express';
import { createCanvas, registerFont } from 'canvas';
import { v2 as cloudinary } from 'cloudinary';

// Cloudinary config
cloudinary.config({
    cloud_name: 'dxoyx4xw3',
    api_key: '226187215341891',
    api_secret: process.env.CLOUDINARY_SECRET
});

const router = express.Router();
const fontPath = "https://fonts.cdnfonts.com/s/7358/handy00.woff";

router.get('/generate', async (req, res) => {
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
        ctx.fillText('Typing Certification', width / 2, 150);

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
            
            // Generate a unique identifier by appending a timestamp
            const uniquePublicId = `certificate_${walletAddress}_${Date.now()}`;
        
            const uploadResult = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        public_id: uniquePublicId,  // Unique public ID to avoid overwriting
                        folder: 'certificates',
                        format: 'png',
                        transformation: {
                            quality: 'auto',
                            fetch_format: 'auto'
                        },
                        context: {
                            wpm: wpm,               // Attach WPM as metadata
                            accuracy: accuracy,     // Attach accuracy as metadata
                            walletAddress: walletAddress // Attach wallet address as metadata
                        }
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    },
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
            return res.status(500).json({ error: 'Failed to upload to Cloudinary', message: cloudinaryError });
        }
        

    } catch (error) {
        console.error('\nError generating certificate:', error);
        return res.status(500).json({ error: 'Failed to generate certificate' });
    }
});

router.get('/', async (req, res) => {
    const { walletAddress } = req.query;

    if (!walletAddress) {
        return res.status(400).json({ error: 'Missing wallet address' });
    }

    try {
        const result = await cloudinary.api.resources({ context: true });

        const certificates = result.resources
            .filter(resource => resource.asset_folder === 'certificates' && resource.display_name.includes(walletAddress))
            .map(certificate => ({
                name: certificate.display_name,
                url: certificate.secure_url,
                width: certificate.width,
                height: certificate.height,
                context: certificate.context.custom
            }));

        res.send(certificates);
    } catch (error) {
        console.error('Error fetching certificates from Cloudinary:', error);
        res.status(500).json({ error: 'Failed to fetch certificates', details: error.message });
    }
});


export default router;