// Express backend for proxying OpenAI Vision API requests
const express = require('express');
const router = express.Router();
require('dotenv').config();
const rateLimit = require('express-rate-limit');
const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { PDFDocument } = require('pdf-lib');
const heicConvert = require('heic-convert');
const { pdfBufferToPngBuffer } = require('./pdf-poppler-wrapper');
const Tesseract = require('tesseract.js');

// Load API key from environment variable
const OPENAI_KEY = process.env.REACT_APP_PAINTBRUSH_VISION_KEY || process.env.OPENAI_API_KEY;

console.log('🔑 API Key configured:', !!OPENAI_KEY);

// Strict rate limiter for this endpoint
const strictLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // limit each IP to 10 requests per minute
  message: { error: 'Rate limit exceeded for this endpoint. Please wait before trying again.' },
});

// Apply rate limiter to this route
router.use(strictLimiter);

router.post('/', async (req, res) => {
  try {
    console.log('🎯 Image-to-text API endpoint called');
    console.log('📥 Request body keys:', Object.keys(req.body));
    
    const { image, isFile } = req.body;
    
    if (!image) {
      console.log('❌ No image provided in request');
      return res.status(400).json({ error: 'No image provided' });
    }

    if (!OPENAI_KEY) {
      console.log('❌ OpenAI API key not configured');
      return res.status(500).json({ error: 'OpenAI API key not configured' });
    }

    console.log('🔍 Text extraction starting...');
    console.log('📸 Image type:', isFile ? 'Base64 file' : 'URL');    // Prepare OpenAI API payload
    const payload = {
      model: 'gpt-4o', // Updated OpenAI vision model
      messages: [
        {
          role: 'system',
          content: 'Extract text only. Example responses: "STOP", "Hello World", "No text found". Never describe images.'
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Extract text from image:'
            },
            {
              type: 'image_url',
              image_url: {
                url: isFile ? `data:image/jpeg;base64,${image}` : image,
                detail: 'high'
              }
            }
          ]
        }
      ],
      max_tokens: 50,
      temperature: 0
    };

    console.log('🚀 Calling OpenAI Vision API...');
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_KEY}`
      },
      body: JSON.stringify(payload)
    });

    console.log('📊 OpenAI Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.log('❌ OpenAI API Error:', errorText);
      
      // Handle specific OpenAI errors
      if (response.status === 401) {
        return res.status(401).json({ error: 'Invalid OpenAI API key' });
      }
      if (response.status === 429) {
        return res.status(429).json({ error: 'Rate limit exceeded. Please try again later.' });
      }
      
      return res.status(response.status).json({ 
        error: 'OpenAI API Error', 
        details: errorText 
      });
    }

    const data = await response.json();
    const description = data.choices[0]?.message?.content || 'No description available';
    
    console.log('✅ Text extraction completed successfully');
    console.log('📝 Description length:', description.length, 'characters');
    
    res.json({ 
      success: true,
      description: description,
      usage: data.usage,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Server Error:', error);
    res.status(500).json({ 
      error: 'Internal server error', 
      message: error.message 
    });
  }
});

// Multer setup for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowed = [
      'image/jpeg', 'image/png', 'image/gif', 'image/jpg',
      'image/jfif', 'image/heic', 'application/pdf'
    ];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error('Unsupported file type'), false);
  }
});

// Helper: Convert PDF buffer to PNG base64 (first page)
async function pdfToPngBase64(buffer) {
  // Use pdf-poppler to render first page to PNG
  const pngBuffer = await pdfBufferToPngBuffer(buffer);
  return pngBuffer.toString('base64');
}

// Helper: Convert HEIC buffer to JPEG base64
async function heicToJpegBase64(buffer) {
  const outputBuffer = await heicConvert({
    buffer,
    format: 'JPEG',
    quality: 1
  });
  return outputBuffer.toString('base64');
}

// Helper: OCR image buffer to text
async function ocrImageBufferToText(buffer) {
  const { data: { text } } = await Tesseract.recognize(buffer, 'eng');
  return text;
}

// Helper: OCR PDF buffer to text (first page)
async function ocrPdfBufferToText(buffer) {
  // Convert PDF to PNG buffer (first page)
  const pngBuffer = await pdfBufferToPngBuffer(buffer);
  return await ocrImageBufferToText(pngBuffer);
}

// New endpoint for file uploads
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    console.log('📥 /upload endpoint called');
    if (!req.file) {
      console.log('❌ No file uploaded');
      return res.status(400).json({ error: 'No file uploaded' });
    }
    let base64Image;
    let imageMimeType;
    const { mimetype, buffer, originalname, size } = req.file;
    console.log(`📝 Received file: ${originalname}, type: ${mimetype}, size: ${size}`);
    let extractedText = '';
    if (mimetype === 'application/pdf') {
      base64Image = await pdfToPngBase64(buffer);
      imageMimeType = 'image/png';
      console.log('✅ PDF converted to PNG base64');
      extractedText = await ocrPdfBufferToText(buffer);
    } else if (mimetype === 'image/heic') {
      base64Image = await heicToJpegBase64(buffer);
      imageMimeType = 'image/jpeg';
      console.log('✅ HEIC converted to JPEG base64');
      extractedText = await ocrImageBufferToText(buffer);
    } else if ({
      'image/jpeg': true, 'image/png': true, 'image/gif': true, 'image/jpg': true, 'image/jfif': true
    }[mimetype]) {
      base64Image = buffer.toString('base64');
      imageMimeType = mimetype;
      console.log('✅ Image converted to base64');
      extractedText = await ocrImageBufferToText(buffer);
    } else {
      console.log('❌ Unsupported file type:', mimetype);
      return res.status(400).json({ error: 'Unsupported file type' });
    }    // Prepare OpenAI API payload
    const payload = {
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Please analyze this image and provide a detailed description of what you see. Include any text that appears in the image, objects, people, colors, setting, mood, and any other relevant details. Be descriptive and comprehensive.'
            },
            {
              type: 'image_url',
              image_url: {
                url: `data:${imageMimeType};base64,${base64Image}`,
                detail: 'high'
              }
            }
          ]
        }
      ],
      max_tokens: 800,
      temperature: 0.7
    };

    console.log('🚀 Calling OpenAI Vision API for uploaded file...');
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_KEY}`
      },
      body: JSON.stringify(payload)
    });

    console.log('📊 OpenAI Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.log('❌ OpenAI API Error:', errorText);
      return res.status(response.status).json({ 
        error: 'OpenAI API Error', 
        details: errorText 
      });
    }

    const data = await response.json();
    const description = data.choices[0]?.message?.content || 'No description available';
    console.log('✅ Analysis completed successfully for uploaded file');
    res.json({ 
      success: true,
      description: description,
      extractedText: extractedText,
      usage: data.usage,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Server Error (upload):', error);
    res.status(500).json({ 
      error: 'Internal server error (upload)', 
      message: error.message 
    });
  }
});

module.exports = router;
