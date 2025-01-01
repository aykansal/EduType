const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');
const { PDFDocument } = require('pdf-lib');
const pdfPoppler = require('pdf-poppler');

router.get('/', (req, res) => res.send("Backend Working !!"))

router.get('/generate-certificate', async(req, res) => {
    try {
        const { walletAddress, wpm, accuracy } = req.query;

        // Check for required parameters
        if (!walletAddress || !wpm || !accuracy) {
            return res.status(400).json({ error: 'Missing required parameters' });
        }

        // File paths
        const pdfPath = path.join(__dirname, 'public', 'certificate.pdf');
        const imageOutputDir = path.join(__dirname, 'public', 'images');
        const outputPdfPath = path.join(__dirname, 'public', 'images', `output_${walletAddress}.pdf`);

        // Read existing PDF and load it
        const existingPdfBytes = await fs.readFile(pdfPath);
        const pdfDoc = await PDFDocument.load(existingPdfBytes);

        // Modify the form in the PDF
        const form = pdfDoc.getForm();
        form.getTextField("name").setText(`The user ${walletAddress} has proof of work with typing speed of ${wpm} wpm with accuracy of ${accuracy}`);

        // Save the modified PDF
        const pdfBytes = await pdfDoc.save();
        await fs.writeFile(outputPdfPath, Buffer.from(pdfBytes));

        // Create output directory if it doesn't exist
        try {
            await fs.access(imageOutputDir);
        } catch {
            await fs.mkdir(imageOutputDir, { recursive: true });
        }

        // PDF to image conversion options
        const options = {
            format: 'png',
            out_dir: imageOutputDir,
            out_prefix: `output_${walletAddress}`,
            page: null,
        };

        try {
            // Convert the modified PDF to images
            await pdfPoppler.convert(outputPdfPath, options);
        } catch (err) {
            console.error('Error converting PDF to images:', err);
            return res.status(500).json({ error: 'Failed to convert PDF to images' });
        }

        // Read image files from the output directory
        const imageFiles = (await fs.readdir(imageOutputDir))
            .map(file => path.join('images', file).replace(/\\/g, '/'));

        console.log(imageFiles);
        return res.json({ images: imageFiles });

    } catch (error) {
        console.error('Error generating certificate:', error);
        return res.status(500).json({ error: 'Failed to generate certificate' });
    }
});


module.exports = router; 
