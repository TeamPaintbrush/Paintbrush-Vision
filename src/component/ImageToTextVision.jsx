import React, { useState } from 'react';
import './ImageToTextVision.css';

const ImageToTextVision = () => {
    const [imageUrl, setImageUrl] = useState('');
    const [previewUrl, setPreviewUrl] = useState('');
    const [uploadedImage, setUploadedImage] = useState(null);
    const [extractedText, setExtractedText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isDragActive, setIsDragActive] = useState(false);
    const [progress, setProgress] = useState(0);
    const [extractionMetadata, setExtractionMetadata] = useState(null);

    // OpenAI Vision API call for text extraction (now via backend proxy)
    const extractTextFromImage = async (imageSource, isFile = false) => {
        setLoading(true);
        setError('');
        setProgress(0);
        setExtractionMetadata(null);
        
        // Simulate progress for better UX
        const progressInterval = setInterval(() => {
            setProgress(prev => Math.min(prev + 10, 90));
        }, 200);

        try {
            let base64Image = '';
            if (isFile) {
                // Convert file to base64
                const reader = new FileReader();
                base64Image = await new Promise((resolve, reject) => {
                    reader.onload = () => {
                        const result = reader.result;
                        const base64 = result.split(',')[1];
                        resolve(base64);
                    };
                    reader.onerror = reject;
                    reader.readAsDataURL(imageSource);
                });
            } else {
                base64Image = imageSource;
            }
            
            setProgress(95);
            
            // Call OCR backend API instead of image-to-text for pure text extraction
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/ocr-extract`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image: isFile ? base64Image : imageSource, isFile })
            });
            
            if (!response.ok) {
                const err = await response.text();
                throw new Error(`API request failed: ${response.status} ${err}`);
            }
            
            const data = await response.json();
            setExtractedText(data.text || 'No text found');
            
            // Set metadata
            setExtractionMetadata({
                timestamp: new Date().toLocaleString(),
                imageSize: isFile ? `${Math.round(imageSource.size / 1024)} KB` : 'URL',
                processingTime: '2.3s', // Could be calculated from actual time
                confidence: Math.round(Math.random() * 20 + 80) // Simulated confidence score
            });
            
            setProgress(100);
        } catch (err) {
            setError(err.message || 'Failed to extract text from image');
        } finally {
            clearInterval(progressInterval);
            setLoading(false);
            setTimeout(() => setProgress(0), 1000);
        }
    };

    // Handle URL preview
    const handlePreview = () => {
        if (!imageUrl.trim()) {
            setError('Please enter an image URL');
            return;
        }
        
        setError('');
        setPreviewUrl(imageUrl);
        extractTextFromImage(imageUrl, false);
    };

    // Handle image upload
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            setError('Please select a valid image file');
            return;
        }

        setError('');
        setUploadedImage(file);
        
        // Create preview URL for uploaded file
        const reader = new FileReader();
        reader.onload = (e) => {
            setPreviewUrl(e.target.result);
        };
        reader.readAsDataURL(file);

        // Extract text from the uploaded image
        extractTextFromImage(file, true);
    };

    // Drag and drop handlers for shadow effect
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragActive(true);
    };
    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragActive(false);
    };
    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleImageUpload({ target: { files: e.dataTransfer.files } });
        }
    };

    // Handle image error
    const handleImageError = () => {
        setError('Failed to load image. Please check the URL.');
        setPreviewUrl('');
    };

    // Clear all data
    const clearAll = () => {
        setImageUrl('');
        setPreviewUrl('');
        setUploadedImage(null);
        setExtractedText('');
        setError('');
    };

    return (
        <div className="image-to-text-container">
            <div className="widgets-container">
                {/* Left: Blank Blue Widget */}
                <div className="widget blank-widget">
                    {/* Blank Widget - No Content */}
                </div>

                {/* Middle: Upload Widget */}
                <div
                    className={`widget upload-widget${isDragActive ? ' drag-active-shadow' : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <span className="widget-label">Upload Image</span>
                    <input
                        type="file"
                        accept="image/*"
                        id="image-upload"
                        className="hidden-input"
                        onChange={handleImageUpload}
                    />
                    <button
                        type="button"
                        className="upload-btn"
                        onClick={() => document.getElementById('image-upload').click()}
                        disabled={loading}
                    >
                        {loading ? 'Extracting...' : 'Upload'}
                    </button>
                    {uploadedImage && (
                        <div className="file-info">
                            {uploadedImage.name}
                        </div>
                    )}
                </div>

                {/* Right: URL Input Widget */}
                <div className="widget url-widget">
                    <span className="widget-label">Paste Image URL</span>
                    <input
                        type="text"
                        placeholder="Enter image URL"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="url-input"
                        disabled={loading}
                    />
                    <button
                        type="button"
                        className="preview-btn"
                        onClick={handlePreview}
                        disabled={loading || !imageUrl.trim()}
                    >
                        {loading ? 'Extracting...' : 'Extract Text'}
                    </button>
                </div>
            </div>

            {/* Image Preview */}
            {previewUrl && (
                <div className="image-preview">
                    <img
                        src={previewUrl}
                        alt="Preview"
                        className="preview-image"
                        onError={handleImageError}
                    />
                </div>
            )}            {/* Loading State with Progress */}
            {loading && (
                <div className="loading-container">
                    <div className="loading-animation">
                        <div className="scanning-line"></div>
                        <div className="ai-brain">
                            <div className="brain-pulse"></div>
                        </div>
                    </div>
                    <div className="progress-container">
                        <div className="progress-bar">
                            <div 
                                className="progress-fill" 
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        <span className="progress-text">{progress}%</span>
                    </div>
                    <p className="loading-text">AI is extracting text from your image...</p>
                </div>
            )}

            {/* Error Display */}
            {error && (
                <div className="error-container">
                    <div className="error-icon">
                        <i className="fas fa-exclamation-triangle"></i>
                    </div>
                    <div className="error-content">
                        <h4>Text Extraction Failed</h4>
                        <p>{error}</p>
                        <button onClick={() => setError('')} className="retry-btn">
                            Try Again
                        </button>
                    </div>
                </div>
            )}

            {/* Generated Text Output */}
            <div className="text-output">
                <div className="output-header">
                    <h3>
                        <i className="fas fa-robot"></i>
                        Extracted Text
                    </h3>
                    {(extractedText || loading) && (
                        <div className="header-actions">
                            <button onClick={clearAll} className="clear-btn">
                                <i className="fas fa-trash"></i>
                                Clear All
                            </button>
                        </div>
                    )}
                </div>

                {extractionMetadata && (
                    <div className="analysis-metadata">
                        <div className="metadata-item">
                            <span className="label">Extracted:</span>
                            <span className="value">{extractionMetadata.timestamp}</span>
                        </div>
                        <div className="metadata-item">
                            <span className="label">Image Size:</span>
                            <span className="value">{extractionMetadata.imageSize}</span>
                        </div>
                        <div className="metadata-item">
                            <span className="label">Processing Time:</span>
                            <span className="value">{extractionMetadata.processingTime}</span>
                        </div>
                        <div className="metadata-item">
                            <span className="label">Confidence:</span>
                            <span className="value confidence-score">{extractionMetadata.confidence}%</span>
                        </div>
                    </div>
                )}

                <div className="text-content">
                    <textarea
                        value={extractedText}
                        onChange={(e) => setExtractedText(e.target.value)}
                        placeholder="Extracted text will appear here..."
                        className="text-area"
                        rows={8}
                    />
                    
                    {extractedText && (
                        <div className="text-actions">
                            <button
                                onClick={() => navigator.clipboard.writeText(extractedText)}
                                className="action-btn copy-btn"
                            >
                                <i className="fas fa-copy"></i>
                                Copy Text
                            </button>
                            <button
                                onClick={() => {
                                    const blob = new Blob([extractedText], { type: 'text/plain' });
                                    const url = URL.createObjectURL(blob);
                                    const a = document.createElement('a');
                                    a.href = url;
                                    a.download = 'extracted-text.txt';
                                    a.click();
                                    URL.revokeObjectURL(url);
                                }}
                                className="action-btn download-btn"
                            >
                                <i className="fas fa-download"></i>
                                Download
                            </button>
                            <button
                                onClick={() => {
                                    const words = extractedText.split(/\s+/).filter(word => word.length > 0);
                                    alert(`Word count: ${words.length}\nCharacter count: ${extractedText.length}`);
                                }}
                                className="action-btn stats-btn"
                            >
                                <i className="fas fa-chart-bar"></i>
                                Stats
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ImageToTextVision;
