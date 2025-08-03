// Image Format Conversion API endpoint
const express = require('express');
const router = express.Router();
const sharp = require('sharp');

router.post('/convert', async (req, res) => {
  try {
    const { image, fromFormat, toFormat, quality = 80, width, height } = req.body;
    
    if (!image) {
      return res.status(400).json({ error: 'No image provided' });
    }

    if (!toFormat) {
      return res.status(400).json({ error: 'Target format not specified' });
    }

    const supportedFormats = ['jpeg', 'jpg', 'png', 'webp'];
    if (!supportedFormats.includes(toFormat.toLowerCase())) {
      return res.status(400).json({ 
        error: 'Unsupported format', 
        supportedFormats: supportedFormats 
      });
    }

    // Convert image using Sharp
    const result = await convertImageWithSharp(image, toFormat, quality, width, height);
    
    res.json({
      convertedImage: result.data,
      format: toFormat,
      quality: quality,
      originalSize: result.originalSize,
      newSize: result.newSize,
      compressionRatio: result.compressionRatio
    });

  } catch (err) {
    console.error('Image conversion error:', err);
    res.status(500).json({ error: err.message });
  }
});

router.post('/compress', async (req, res) => {
  try {
    const { image, quality = 70, maxWidth = 1920, maxHeight = 1080 } = req.body;
    
    if (!image) {
      return res.status(400).json({ error: 'No image provided' });
    }

    const result = await compressImageWithSharp(image, quality, maxWidth, maxHeight);
    
    res.json({
      compressedImage: result.data,
      originalSize: result.originalSize,
      newSize: result.newSize,
      compressionRatio: result.compressionRatio,
      quality: quality
    });

  } catch (err) {
    console.error('Image compression error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Helper function to convert image format using Sharp
async function convertImageWithSharp(imageData, toFormat, quality, width, height) {
  try {
    // Extract base64 data if it's a data URL
    let base64Data = imageData;
    if (imageData.startsWith('data:')) {
      base64Data = imageData.split(',')[1];
    }
    
    // Convert base64 to buffer
    const inputBuffer = Buffer.from(base64Data, 'base64');
    const originalSize = inputBuffer.length;
    
    // Create Sharp instance
    let sharpInstance = sharp(inputBuffer);
    
    // Resize if dimensions provided
    if (width || height) {
      sharpInstance = sharpInstance.resize(width, height, {
        fit: 'inside',
        withoutEnlargement: true
      });
    }
    
    // Convert format
    let outputBuffer;
    const format = toFormat.toLowerCase();
    
    switch (format) {
      case 'jpeg':
      case 'jpg':
        outputBuffer = await sharpInstance.jpeg({ quality: Math.round(quality) }).toBuffer();
        break;
      case 'png':
        outputBuffer = await sharpInstance.png({ quality: Math.round(quality) }).toBuffer();
        break;
      case 'webp':
        outputBuffer = await sharpInstance.webp({ quality: Math.round(quality) }).toBuffer();
        break;
      default:
        throw new Error(`Unsupported format: ${format}`);
    }
    
    const newSize = outputBuffer.length;
    const compressionRatio = ((originalSize - newSize) / originalSize * 100).toFixed(1);
    
    // Convert back to base64
    const outputBase64 = `data:image/${format};base64,${outputBuffer.toString('base64')}`;
    
    return {
      data: outputBase64,
      originalSize: originalSize,
      newSize: newSize,
      compressionRatio: compressionRatio
    };
  } catch (error) {
    throw new Error(`Image conversion failed: ${error.message}`);
  }
}

// Helper function to compress image using Sharp
async function compressImageWithSharp(imageData, quality, maxWidth, maxHeight) {
  try {
    let base64Data = imageData;
    if (imageData.startsWith('data:')) {
      base64Data = imageData.split(',')[1];
    }
    
    const inputBuffer = Buffer.from(base64Data, 'base64');
    const originalSize = inputBuffer.length;
    
    let sharpInstance = sharp(inputBuffer);
    
    // Resize if needed
    if (maxWidth || maxHeight) {
      sharpInstance = sharpInstance.resize(maxWidth, maxHeight, {
        fit: 'inside',
        withoutEnlargement: true
      });
    }
    
    const outputBuffer = await sharpInstance.jpeg({ quality: Math.round(quality) }).toBuffer();
    const newSize = outputBuffer.length;
    const compressionRatio = ((originalSize - newSize) / originalSize * 100).toFixed(1);
    
    const outputBase64 = `data:image/jpeg;base64,${outputBuffer.toString('base64')}`;
    
    return {
      data: outputBase64,
      originalSize: originalSize,
      newSize: newSize,
      compressionRatio: compressionRatio
    };
  } catch (error) {
    throw new Error(`Image compression failed: ${error.message}`);
  }
}

module.exports = router;
