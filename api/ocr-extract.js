// OCR Text Extraction API endpoint
const express = require('express');
const router = express.Router();

// Load API key from environment variable
const OPENAI_KEY = process.env.REACT_APP_PAINTBRUSH_VISION_KEY || process.env.OPENAI_API_KEY;

// Simple in-memory cache for OCR results
const cache = new Map();
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

router.post('/', async (req, res) => {
  try {
    const { image, isFile, languages = 'en' } = req.body;
    if (!image) return res.status(400).json({ error: 'No image provided' });

    console.log('🔍 OCR Request:', {
      isFile,
      languages,
      imageLength: image.length,
      imagePrefix: image.substring(0, 50) + '...'
    });

    // Create cache key based on image content
    const cacheKey = Buffer.from(image.substring(0, 100)).toString('base64');
    
    // Check cache first
    if (cache.has(cacheKey)) {
      const cached = cache.get(cacheKey);
      if (Date.now() - cached.timestamp < CACHE_DURATION) {
        console.log('💾 Returning cached OCR result');
        return res.json(cached.data);
      } else {
        cache.delete(cacheKey);
      }
    }

    // Prepare OpenAI API payload for OCR-specific extraction
    const payload = {
      model: 'gpt-4o', // Updated to current model
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `STRICT OCR EXTRACTION ONLY:

              INSTRUCTION: Extract ONLY the text that appears in this image. Do not describe, analyze, or interpret anything.

              RULES:
              1. Return ONLY the exact text visible in the image
              2. Do NOT add descriptions, explanations, or context
              3. Do NOT describe what you see in the image  
              4. Do NOT mention objects, colors, layout, or visual elements
              5. If no readable text exists, respond with exactly: "No text detected"
              6. Preserve line breaks and formatting where possible
              7. Include punctuation and special characters as they appear

              EXAMPLE GOOD RESPONSES:
              - "Hello World"
              - "Contact us at info@example.com"
              - "No text detected"
              
              EXAMPLE BAD RESPONSES:
              - "The image shows text that says..."
              - "This appears to be a sign with the text..."
              - "I can see the following text in the image..."

              Languages to detect: ${languages}
              
              EXTRACT TEXT NOW:`
            },
            {
              type: 'image_url',
              image_url: {
                url: isFile ? `data:image/jpeg;base64,${image}` : image
              }
            }
          ]
        }
      ],
      max_tokens: 1000
    };

    console.log('🚀 Calling OpenAI API for OCR extraction...');
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_KEY}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('❌ OpenAI API Error:', response.status, err);
      return res.status(response.status).json({ error: err });
    }

    const data = await response.json();
    let extractedText = data.choices[0]?.message?.content || 'No text detected';
    
    console.log('📝 Raw OpenAI response:', extractedText);
    
    // Post-process to ensure we only return actual text
    extractedText = cleanOCRResponse(extractedText);
    
    console.log('✨ Cleaned OCR text:', extractedText);
    
    // Calculate confidence based on text length and patterns
    const confidence = calculateConfidence(extractedText);
    
    const result = {
      text: extractedText,
      confidence: confidence,
      languages: languages.split(','),
      timestamp: new Date().toISOString()
    };

    // Cache the result
    cache.set(cacheKey, {
      data: result,
      timestamp: Date.now()
    });

    res.json(result);
  } catch (err) {
    console.error('OCR API Error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Clean OCR response to ensure only text is returned
function cleanOCRResponse(text) {
  if (!text || text.trim() === '') return 'No text detected';
  
  // Common descriptive phrases that indicate the AI is describing rather than extracting
  const descriptivePhrases = [
    'the image shows',
    'this image contains',
    'i can see',
    'the text reads',
    'the sign says',
    'appears to say',
    'the document contains',
    'the following text',
    'visible text includes',
    'the image displays',
    'this appears to be',
    'the text in the image'
  ];
  
  const lowerText = text.toLowerCase();
  
  // If the response contains descriptive language, try to extract just the quoted text
  for (const phrase of descriptivePhrases) {
    if (lowerText.includes(phrase)) {
      // Look for quoted text patterns
      const quotedMatches = text.match(/"([^"]*)"/g) || text.match(/'([^']*)'/g);
      if (quotedMatches && quotedMatches.length > 0) {
        return quotedMatches.map(match => match.slice(1, -1)).join(' ');
      }
      // If it contains descriptive language but no quotes, it's likely a description
      return 'No text detected';
    }
  }
  
  // If the response is very long (>500 chars), it's likely a description
  if (text.length > 500) {
    return 'No text detected';
  }
  
  return text.trim();
}

// Simple confidence calculation
function calculateConfidence(text) {
  if (!text || text === 'No text detected') return 0;
  
  let confidence = 50; // Base confidence
  
  // Increase confidence based on text characteristics
  if (text.length > 10) confidence += 20;
  if (text.length > 50) confidence += 10;
  if (/[A-Z]/.test(text)) confidence += 5; // Contains uppercase
  if (/[0-9]/.test(text)) confidence += 5; // Contains numbers
  if (/[.!?]/.test(text)) confidence += 5; // Contains punctuation
  if (text.split(/\s+/).length > 5) confidence += 5; // Multiple words
  
  return Math.min(confidence, 95); // Cap at 95%
}

// Clean up cache periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of cache.entries()) {
    if (now - value.timestamp > CACHE_DURATION) {
      cache.delete(key);
    }
  }
}, 30 * 60 * 1000); // Clean every 30 minutes

module.exports = router;
