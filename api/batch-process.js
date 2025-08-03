// Batch Image Processing API endpoint
const express = require('express');
const router = express.Router();

// Load API key from environment variable
const OPENAI_KEY = process.env.REACT_APP_PAINTBRUSH_VISION_KEY || process.env.OPENAI_API_KEY;

// In-memory storage for batch jobs
const batchJobs = new Map();

router.post('/', async (req, res) => {
  try {
    const { images, mode = 'analyze' } = req.body;
    if (!images || !Array.isArray(images) || images.length === 0) {
      return res.status(400).json({ error: 'No images provided for batch processing' });
    }

    if (images.length > 10) {
      return res.status(400).json({ error: 'Maximum 10 images allowed per batch' });
    }

    // Create batch job
    const jobId = Date.now().toString();
    const job = {
      id: jobId,
      status: 'processing',
      total: images.length,
      completed: 0,
      results: [],
      errors: [],
      startTime: new Date(),
      mode: mode
    };

    batchJobs.set(jobId, job);

    // Start processing asynchronously
    processBatch(jobId, images, mode);

    res.json({
      jobId: jobId,
      status: 'started',
      message: `Batch processing started for ${images.length} images`,
      estimatedTime: `${images.length * 3}s`
    });

  } catch (err) {
    console.error('Batch API Error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get batch job status
router.get('/status/:jobId', (req, res) => {
  const jobId = req.params.jobId;
  const job = batchJobs.get(jobId);

  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }

  res.json({
    jobId: jobId,
    status: job.status,
    progress: {
      completed: job.completed,
      total: job.total,
      percentage: Math.round((job.completed / job.total) * 100)
    },
    results: job.results,
    errors: job.errors,
    processingTime: job.endTime 
      ? Math.round((job.endTime - job.startTime) / 1000) 
      : Math.round((Date.now() - job.startTime) / 1000)
  });
});

// Get all results for a completed job
router.get('/results/:jobId', (req, res) => {
  const jobId = req.params.jobId;
  const job = batchJobs.get(jobId);

  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }

  if (job.status !== 'completed') {
    return res.status(400).json({ error: 'Job not completed yet' });
  }

  res.json({
    jobId: jobId,
    results: job.results,
    summary: {
      total: job.total,
      successful: job.results.length,
      failed: job.errors.length,
      processingTime: Math.round((job.endTime - job.startTime) / 1000)
    }
  });
});

async function processBatch(jobId, images, mode) {
  const job = batchJobs.get(jobId);
  if (!job) return;

  try {
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      
      try {
        let result;
        
        if (mode === 'ocr') {
          result = await processOCR(image);
        } else {
          result = await processAnalysis(image);
        }

        job.results.push({
          index: i,
          imageId: image.id || i,
          name: image.name || `image_${i}`,
          result: result,
          timestamp: new Date().toISOString()
        });

      } catch (error) {
        console.error(`Error processing image ${i}:`, error);
        job.errors.push({
          index: i,
          imageId: image.id || i,
          name: image.name || `image_${i}`,
          error: error.message
        });
      }

      job.completed++;
      
      // Add small delay to prevent rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    job.status = 'completed';
    job.endTime = new Date();

  } catch (error) {
    console.error(`Batch job ${jobId} failed:`, error);
    job.status = 'failed';
    job.error = error.message;
    job.endTime = new Date();
  }
}

async function processAnalysis(image) {
  const payload = {
    model: 'gpt-4-vision-preview',
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: 'Please analyze this image and provide a detailed description of what you see.'
          },
          {
            type: 'image_url',
            image_url: {
              url: image.isFile ? `data:image/jpeg;base64,${image.data}` : image.data
            }
          }
        ]
      }
    ],
    max_tokens: 500
  };

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_KEY}`
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0]?.message?.content || 'No description available';
}

async function processOCR(image) {
  const payload = {
    model: 'gpt-4-vision-preview',
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: 'Please extract all text from this image. Only return the extracted text, nothing else.'
          },
          {
            type: 'image_url',
            image_url: {
              url: image.isFile ? `data:image/jpeg;base64,${image.data}` : image.data
            }
          }
        ]
      }
    ],
    max_tokens: 1000
  };

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_KEY}`
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0]?.message?.content || 'No text detected';
}

// Clean up old jobs (older than 1 hour)
setInterval(() => {
  const oneHourAgo = Date.now() - 60 * 60 * 1000;
  for (const [jobId, job] of batchJobs.entries()) {
    if (job.startTime.getTime() < oneHourAgo) {
      batchJobs.delete(jobId);
    }
  }
}, 30 * 60 * 1000); // Clean every 30 minutes

module.exports = router;
