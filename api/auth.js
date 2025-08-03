// Authentication middleware
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

// Simple user store (in production, use a database)
const users = new Map();

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Optional auth middleware (allows both authenticated and guest users)
const optionalAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (!err) {
        req.user = user;
      }
    });
  }
  next();
};

// Login endpoint
const loginHandler = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    // For demo purposes, accept admin/admin123 or any user/password123
    let isValid = false;
    let userRole = 'user';

    if (username === 'admin' && password === ADMIN_PASSWORD) {
      isValid = true;
      userRole = 'admin';
    } else if (password === 'password123') {
      isValid = true;
      userRole = 'user';
    }

    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        username: username, 
        role: userRole,
        exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
      },
      JWT_SECRET
    );

    res.json({
      token: token,
      user: {
        username: username,
        role: userRole
      },
      expiresIn: '24h'
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
};

// Register endpoint (simple demo version)
const registerHandler = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    if (users.has(username)) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store user
    users.set(username, {
      username: username,
      password: hashedPassword,
      email: email,
      role: 'user',
      createdAt: new Date().toISOString()
    });

    // Generate token
    const token = jwt.sign(
      { 
        username: username, 
        role: 'user',
        exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60)
      },
      JWT_SECRET
    );

    res.status(201).json({
      token: token,
      user: {
        username: username,
        role: 'user'
      },
      message: 'User registered successfully'
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
};

// Get user profile
const profileHandler = (req, res) => {
  res.json({
    user: req.user,
    loginTime: new Date().toISOString()
  });
};

module.exports = {
  authenticateToken,
  optionalAuth,
  loginHandler,
  registerHandler,
  profileHandler
};
