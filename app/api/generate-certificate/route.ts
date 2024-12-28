
import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';
import fs from 'fs/promises';
import path from 'path';
// @ts-expect-error ignore
import pdfPoppler from 'pdf-poppler';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request?.nextUrl?.searchParams;
    const walletAddress = searchParams.get('walletAddress');
    const wpm = searchParams.get('wpm');
    const accuracy = searchParams.get('accuracy');

    if (!walletAddress || !wpm || !accuracy) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    const pdfPath = path.join(process.cwd(), 'public', `certificate.pdf`);
    const imageOutputDir = path.join(process.cwd(), 'public', 'images');
    const outputPdfPath = path.join(process.cwd(), 'public', 'images', `output_${walletAddress}.pdf`);
    const existingPdfBytes = await fs.readFile(pdfPath);
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    const form = pdfDoc.getForm();
    form.getTextField("name").setText(`The user ${walletAddress} has proof of work with typing speed of ${wpm} wpm with accuracy of ${accuracy}`);

    const pdfBytes = await pdfDoc.save();
    await fs.writeFile(outputPdfPath, Buffer.from(pdfBytes));

    try {
      await fs.access(imageOutputDir);
    } catch {
      await fs.mkdir(imageOutputDir, { recursive: true });
    }

    const options = {
      format: 'png',
      out_dir: imageOutputDir,
      out_prefix: `output_${walletAddress}`,
      page: null
    };

    try {
      await pdfPoppler.convert(outputPdfPath, options);
    } catch (err) {
      console.error('Error converting PDF to images:', err);
      return NextResponse.json(
        { error: 'Failed to convert PDF to images' },
        { status: 500 }
      );
    }

    const imageFiles = (await fs.readdir(imageOutputDir))
      .map(file => path.join('images', file).replace(/\\/g, '/'));
    
    console.log(imageFiles);
    return NextResponse.json({ images: imageFiles });

  } catch (error) {
    console.error('Error generating certificate:', error);
    return NextResponse.json(
      { error: 'Failed to generate certificate' },
      { status: 500 }
    );
  }
}