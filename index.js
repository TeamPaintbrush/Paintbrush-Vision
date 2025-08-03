// Main Express server for Paintbrush Vision API proxy
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || process.env.SERVER_PORT || 5000;

console.log(`🔧 Server will start on port: ${PORT}`);
console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
console.log(`📍 Expected frontend URLs: http://localhost:3000, http://localhost:3005`);

// Rate limiting middleware
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

const strictLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // limit each IP to 10 requests per minute for heavy operations
  message: 'Rate limit exceeded for this endpoint. Please wait before trying again.',
});

app.use(cors({
  origin: [
    'http://localhost:3005', 
    'http://localhost:3006', 
    'http://localhost:3000',
    'https://amazing-gould.74-208-217-142.plesk.page',
    'http://amazing-gould.74-208-217-142.plesk.page'
  ],
  credentials: true
}));

// Force override - immediately serve our React app for root requests
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use(bodyParser.json({ limit: '10mb' }));

// Override any default Plesk content - force our app to handle ALL requests
app.use((req, res, next) => {
  // Block any requests for default Plesk files
  if (req.path.includes('default-website') || 
      req.path.includes('plesk.page') || 
      req.url.includes('assets.plesk.com')) {
    return res.status(404).end();
  }
  next();
});

// Serve static files from React build
app.use(express.static(path.join(__dirname, 'build')));

// Apply rate limiting to all API routes
app.use('/api/', apiLimiter);

// Add logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path} - IP: ${req.ip}`);
  next();
});

// API routes
app.use('/api/image-to-text', require('./api/image-to-text'));
app.use('/api/ocr-extract', require('./api/ocr-extract'));
app.use('/api/image-convert', require('./api/image-convert'));
app.use('/api/batch-process', require('./api/batch-process'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    apiKeyConfigured: !!process.env.REACT_APP_PAINTBRUSH_VISION_KEY,
    server: 'Paintbrush Vision API'
  });
});

// Debug endpoint to verify frontend/backend connection
app.get('/api/debug', (req, res) => {
  res.json({
    message: 'Connection successful',
    port: process.env.SERVER_PORT,
    apiUrl: process.env.REACT_APP_API_URL,
    timestamp: new Date().toISOString()
  });
});

// Catch-all for any unhandled /api/* route to always return JSON
app.all('/api/*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// Authentication routes
// const { loginHandler, registerHandler, profileHandler, authenticateToken } = require('./api/auth');
// app.post('/api/auth/login', loginHandler);
// app.post('/api/auth/register', registerHandler);
// app.get('/api/auth/profile', authenticateToken, profileHandler);

// Serve React app for all non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server Error:', error);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Paintbrush Vision Server running on http://localhost:${PORT}`);
  console.log(`� OpenAI API Key configured: ${!!process.env.REACT_APP_PAINTBRUSH_VISION_KEY}`);
  console.log(`�📊 Rate limiting: 100 requests per 15 minutes`);
  console.log(`🔒 Strict endpoints: 10 requests per minute`);
  console.log(`📁 Serving React build from /build directory`);
});
