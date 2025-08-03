# Paintbrush Vision 🎨🤖

**Advanced AI-Powered Image Processing Suite with Enhanced Accessibility**

Paintbrush Vision is a comprehensive React-based web application that provides cutting-edge image processing capabilities using OpenAI's Vision API and modern web technologies. Built with accessibility-first design principles and comprehensive user experience enhancements.

## ✨ Enhanced Features

### 🎨 **Advanced Image Editor**
- Professional-grade image editing tools with real-time preview
- Comprehensive filters: brightness, contrast, saturation, blur, sepia, grayscale, hue rotation
- Transform tools: rotate, flip, zoom, crop with precise controls
- Multiple export formats (PNG, JPEG, WebP) with quality options
- Enhanced undo/redo functionality (up to 50 actions)
- Keyboard shortcuts for power users
- Real-time status tracking and performance monitoring

### ♿ **Accessibility Excellence**
- **WCAG 2.1 AA Compliant** design throughout the application
- Comprehensive keyboard navigation with customizable shortcuts
- Screen reader optimizations with proper ARIA labels and roles
- High contrast mode support for users with visual impairments
- Reduced motion support for users with vestibular disorders
- Large text options and scalable UI elements
- Focus management and skip links for efficient navigation
- Voice-over and NVDA screen reader tested

### 🎛️ **User Preferences & Customization**
- **Dark/Light Mode** with system preference detection
- **Accessibility Settings**: high contrast, large text, reduced motion
- **Interface Preferences**: compact mode, tooltips, confirmations
- **Performance Options**: image quality, animations, lazy loading
- **Editor Preferences**: default formats, undo limits, auto-preview
- **Privacy Controls**: analytics, error reporting toggles
- Persistent settings with localStorage integration

### 🆘 **Comprehensive Help System**
- **Interactive Tutorials** for all major features
- **Keyboard Shortcuts Reference** with searchable commands
- **Troubleshooting Guide** with common solutions
- **Contextual Help** with tooltips and hints
- **Progressive Disclosure** for complex features
- **Multi-modal Learning** (visual, text, interactive)

### 📊 **Enhanced Status & Monitoring**
- **Real-time Status Bar** with image info, zoom level, and connection status
- **Performance Monitoring** with load times and memory usage
- **Network Status Detection** with connection type indicators
- **Action History Tracking** with detailed undo/redo status
- **Error Tracking & Recovery** with graceful degradation
- **Analytics Integration** for usage insights (privacy-respecting)

### 🔧 **Developer Experience Improvements**
- **Error Boundaries** with detailed error reporting and recovery
- **Component Library** with reusable accessible UI components
- **Custom Hooks** for accessibility, form validation, and performance
- **Toast Notification System** with action support and accessibility
- **Loading States** with meaningful progress indicators
- **Performance Utilities** for image optimization and lazy loading

### 🔍 **AI Vision Analysis** (Enhanced)
- Advanced image analysis with detailed AI-generated descriptions
- Support for both URL and file uploads with drag-and-drop
- Real-time progress tracking with accessible status updates
- Comprehensive metadata and confidence scoring
- Batch processing with progress indicators

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn
- OpenAI API key

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/paintbrush-vision.git
cd paintbrush-vision
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Environment Setup**
Create a `.env` file in the root directory:
```env
OPENAI_API_KEY=your_openai_api_key_here
PORT=3005
JWT_SECRET=your_jwt_secret_here
```

4. **Start the application**
```bash
# Development mode (starts both client and server)
npm run dev

# Production build
npm run build && npm run server
```

## ⌨️ Keyboard Shortcuts

### File Operations
- `Ctrl + O` - Open image file
- `Ctrl + S` - Download current image
- `Ctrl + Shift + S` - Download as different format

### Editing
- `Ctrl + Z` - Undo last action
- `Ctrl + Y` / `Ctrl + Shift + Z` - Redo last undone action
- `Ctrl + R` - Reset image to original
- `R` - Rotate image 90° clockwise
- `H` - Flip image horizontally
- `V` - Flip image vertically

### Navigation & Help
- `Tab` / `Shift + Tab` - Navigate between controls
- `F1` / `Ctrl + /` - Open help documentation
- `Ctrl + ,` - Open user preferences
- `Escape` - Cancel current operation or close dialogs

### Cropping
- `C` - Start crop mode
- `Enter` - Apply crop selection
- `Escape` - Cancel crop mode

### Zoom & View
- `+` - Zoom in
- `-` - Zoom out
- `0` - Reset zoom to 100%
- `F` - Fit image to screen

## 🎯 Accessibility Features

### Visual Accessibility
- **High Contrast Mode**: Enhanced color contrast for better visibility
- **Large Text Option**: Scalable text sizes up to 120% default size
- **Dark Mode Support**: Reduced eye strain with dark color schemes
- **Focus Indicators**: Clear visual focus indicators for keyboard navigation
- **Color Independence**: No reliance on color alone to convey information

### Motor Accessibility
- **Keyboard Navigation**: Full functionality accessible via keyboard
- **Large Click Targets**: Minimum 44px touch targets for all interactive elements
- **Reduced Motion**: Respects user's motion preferences
- **Sticky Focus**: Focus management that doesn't trap users
- **Customizable Shortcuts**: User-configurable keyboard shortcuts

### Cognitive Accessibility
- **Clear Navigation**: Logical tab order and intuitive interface layout
- **Consistent Design**: Uniform UI patterns throughout the application
- **Progress Indicators**: Clear status updates for all operations
- **Error Prevention**: Validation and confirmation for destructive actions
- **Help Documentation**: Contextual help and comprehensive tutorials

### Assistive Technology Support
- **Screen Reader Optimized**: Full compatibility with NVDA, JAWS, VoiceOver
- **ARIA Labels**: Comprehensive labeling for all interactive elements
- **Semantic HTML**: Proper heading hierarchy and landmark regions
- **Live Regions**: Dynamic content updates announced to screen readers
- **Alternative Text**: Descriptive alt text for all images and icons

## 🛠️ Technical Architecture

### Frontend Technologies
- **React 19.1.0** with modern hooks and concurrent features
- **Bootstrap 5.3.5** for responsive design and components
- **Custom CSS** with CSS Grid and Flexbox for layout
- **Web APIs**: Canvas, File API, Intersection Observer, Web Workers

### Accessibility Implementation
- **WCAG 2.1 AA Compliance** throughout the application
- **WAI-ARIA Practices** for complex UI components
- **Focus Management** with proper focus trapping and restoration
- **Keyboard Event Handling** with conflict avoidance
- **Color Contrast** meeting and exceeding minimum requirements

### Performance Optimizations
- **Image Optimization**: Automatic resizing and format conversion
- **Lazy Loading**: Progressive loading of images and components
- **Debounced Updates**: Reduced re-renders for filter adjustments
- **Memory Management**: Cleanup of canvas contexts and event listeners
- **Bundle Splitting**: Code splitting for improved load times

### State Management
- **Custom Hooks**: Centralized state logic for undo/redo, preferences
- **Context API**: Global state for theming, notifications, user preferences
- **Local Storage**: Persistent user settings and preferences
- **Session Management**: JWT-based authentication with refresh tokens

## 📱 Browser Support

### Supported Browsers
- **Chrome 80+** (full feature support)
- **Firefox 75+** (full feature support)
- **Safari 13+** (full feature support)
- **Edge 80+** (full feature support)

### Progressive Enhancement
- **Graceful Degradation**: Core functionality works without JavaScript
- **Feature Detection**: Modern features with fallbacks
- **Responsive Design**: Mobile-first approach with breakpoints
- **Touch Support**: Optimized for touch devices and gestures

## 🧪 Testing & Quality Assurance

### Accessibility Testing
- **Automated Testing**: axe-core integration for accessibility violations
- **Manual Testing**: Keyboard navigation and screen reader testing
- **User Testing**: Feedback from users with disabilities
- **Compliance Audits**: Regular WCAG 2.1 compliance checks

### Performance Testing
- **Lighthouse Audits**: Regular performance and accessibility scoring
- **Load Testing**: Image processing performance under load
- **Memory Profiling**: Memory leak detection and optimization
- **Network Testing**: Performance across different connection speeds

### Cross-Platform Testing
- **Browser Testing**: Automated testing across major browsers
- **Device Testing**: Mobile and tablet compatibility testing
- **Assistive Technology**: Testing with multiple screen readers
- **Operating System**: Windows, macOS, iOS, Android compatibility

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn
- OpenAI API key

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd paintbrush-vision
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
Create a `.env` file in the root directory:
```env
# Server Configuration
PORT=3005
GENERATE_SOURCEMAP=false

# API Configuration
REACT_APP_API_URL=http://localhost:3005
REACT_APP_PAINTBRUSH_VISION_KEY=your-openai-api-key-here

# Authentication (Optional)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
ADMIN_PASSWORD=your-admin-password

# Development
NODE_ENV=development
```

4. **Start the application**

**Development mode:**
```bash
# Terminal 1: Start the backend server
node server.js

# Terminal 2: Start the React development server
npm start
```

**Production mode:**
```bash
# Build the React app
npm run build

# Start the production server
NODE_ENV=production node server.js
```

## 📖 API Documentation

### Core Endpoints

#### **Image Analysis**
```http
POST /api/image-to-text
Content-Type: application/json

{
  "image": "base64_string_or_url",
  "isFile": true/false
}
```

#### **OCR Text Extraction**
```http
POST /api/ocr-extract
Content-Type: application/json

{
  "image": "base64_string_or_url",
  "isFile": true/false,
  "languages": "en,es,fr"
}
```

#### **Batch Processing**
```http
POST /api/batch-process
Content-Type: application/json

{
  "images": [
    {
      "id": "image1",
      "name": "image1.jpg",
      "data": "base64_string",
      "isFile": true
    }
  ],
  "mode": "analyze" // or "ocr"
}

# Check status
GET /api/batch-process/status/{jobId}

# Get results
GET /api/batch-process/results/{jobId}
```

#### **Authentication**
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}

POST /api/auth/register
Content-Type: application/json

{
  "username": "newuser",
  "password": "password123",
  "email": "user@example.com"
}
```

### Rate Limits
- **General API**: 100 requests per 15 minutes
- **Heavy operations**: 10 requests per minute
- **Caching**: 1-hour cache for similar requests

## 🎯 Usage Examples

### **Basic Image Analysis**
```javascript
const analyzeImage = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);
  
  const response = await fetch('/api/image-to-text', {
    method: 'POST',
    body: formData
  });
  
  const result = await response.json();
  console.log(result.description);
};
```

### **OCR Text Extraction**
```javascript
const extractText = async (imageUrl) => {
  const response = await fetch('/api/ocr-extract', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      image: imageUrl,
      isFile: false,
      languages: 'en,es'
    })
  });
  
  const result = await response.json();
  console.log(result.text, result.confidence);
};
```

## 🏗️ Architecture

### **Frontend Stack**
- **React 19** - Modern React with latest features
- **React Router 7** - Client-side routing
- **Bootstrap 5** - Responsive UI framework
- **Custom CSS** - Enhanced animations and styling

### **Backend Stack**
- **Express.js** - Web application framework
- **JWT** - Authentication and authorization
- **Rate Limiting** - Request throttling
- **CORS** - Cross-origin resource sharing

### **AI Integration**
- **OpenAI GPT-4 Vision** - Image analysis and OCR
- **Custom prompts** - Optimized for specific tasks
- **Response caching** - Performance optimization

## 🔧 Configuration

### **Environment Variables**
```env
# Required
REACT_APP_PAINTBRUSH_VISION_KEY=sk-...  # OpenAI API key
REACT_APP_API_URL=http://localhost:3005   # Backend URL

# Optional
PORT=3005                                  # Server port
JWT_SECRET=your-secret-key                # JWT signing key
ADMIN_PASSWORD=admin123                   # Admin password
NODE_ENV=development                      # Environment
```

### **Feature Toggles**
Modify `src/config/features.js`:
```javascript
export const features = {
  enableAuth: true,
  enableBatchProcessing: true,
  enableImageEditor: true,
  enableOCR: true,
  maxBatchSize: 10,
  cacheEnabled: true
};
```

## 🚢 Deployment

### **Docker Deployment**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3005
CMD ["node", "server.js"]
```

### **Environment Setup**
```bash
# Production environment variables
export NODE_ENV=production
export REACT_APP_API_URL=https://your-domain.com
export REACT_APP_PAINTBRUSH_VISION_KEY=your-openai-key
export JWT_SECRET=your-production-jwt-secret
```

### **Cloud Deployment Options**
- **Vercel**: Frontend + Serverless functions
- **Netlify**: Static hosting + Netlify functions
- **Heroku**: Full-stack deployment
- **AWS**: EC2, Lambda, or Elastic Beanstalk
- **DigitalOcean**: App Platform or Droplets

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Troubleshooting

### **Common Issues**

**1. OpenAI API errors**
- Verify your API key is correct
- Check your OpenAI account has sufficient credits
- Ensure you have access to GPT-4 Vision

**2. Rate limiting**
- Wait before retrying requests
- Consider upgrading your OpenAI plan
- Implement request queuing for batch operations

**3. CORS errors**
- Ensure backend server is running
- Check REACT_APP_API_URL is correct
- Verify CORS settings in server.js

**4. File upload issues**
- Check file size limits (10MB default)
- Ensure supported file formats
- Verify network connectivity

### **Performance Optimization**
- Enable response caching
- Implement image compression
- Use CDN for static assets
- Monitor API usage and costs

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/your-repo/issues)
- **Documentation**: [Wiki](https://github.com/your-repo/wiki)
- **Discussions**: [GitHub Discussions](https://github.com/your-repo/discussions)

---

**Built with ❤️ by the Paintbrush Vision Team**

*Transforming images into insights with the power of AI*

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
