import React, { useState, useRef } from 'react';
import { createImagePreview, cleanupImagePreview, downloadTextFile, copyToClipboard, formatFileSize, convertToBase64 } from '../utils/imageUtils';
import './GenerativeTextProcessor.css';

const GenerativeTextProcessor = () => {
    const [uploadedFile, setUploadedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [generatedText, setGeneratedText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [progress, setProgress] = useState(0);
    const [isDragActive, setIsDragActive] = useState(false);
    const [processingTime, setProcessingTime] = useState(null);
    
    const fileInputRef = useRef(null);
    const dropzoneRef = useRef(null);

    // Supported file types
    const supportedTypes = {
        'image/jpeg': true,
        'image/png': true,
        'image/gif': true,
        'image/webp': true,
        'image/heic': true,
        'application/pdf': true
    };    const processFile = async (file) => {
        setLoading(true);
        setError('');
        setProgress(0);
        setGeneratedText('');
        
        const startTime = Date.now();
        
        try {
            // Simulate progress for better UX
            const progressInterval = setInterval(() => {
                setProgress(prev => Math.min(prev + 10, 70));
            }, 200);

            // Convert file to base64 for API
            const base64Data = await convertToBase64(file);
            
            setProgress(80);
            
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/ocr-extract`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    image: base64Data,
                    isFile: true
                })
            });

            clearInterval(progressInterval);
            setProgress(100);

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(`Processing failed: ${response.status} - ${errorData}`);
            }

            const data = await response.json();
            setGeneratedText(data.text || data.content || 'No text found');
            
            const endTime = Date.now();
            setProcessingTime(((endTime - startTime) / 1000).toFixed(1));

        } catch (err) {
            setError(err.message || 'Failed to process file');
            console.error('File processing error:', err);
        } finally {
            setLoading(false);
            setTimeout(() => setProgress(0), 1000);
        }
    };

    const handleFileSelect = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Validate file type
        if (!supportedTypes[file.type]) {
            setError('Unsupported file type. Please upload an image (JPEG, PNG, GIF, WebP, HEIC) or PDF file.');
            return;
        }

        // Validate file size (50MB limit for PDFs, 10MB for images)
        const maxSize = file.type === 'application/pdf' ? 50 * 1024 * 1024 : 10 * 1024 * 1024;
        if (file.size > maxSize) {
            setError(`File too large. Maximum size: ${maxSize / 1024 / 1024}MB for ${file.type === 'application/pdf' ? 'PDFs' : 'images'}`);
            return;
        }

        setError('');
        setUploadedFile(file);

        // Create preview for images only
        if (file.type.startsWith('image/')) {
            try {
                const preview = createImagePreview(file);
                setPreviewUrl(preview);
            } catch (err) {
                console.error('Preview creation failed:', err);
            }
        } else {
            setPreviewUrl(''); // No preview for PDFs
        }

        // Process the file
        await processFile(file);
    };

    const handleDragEvents = {
        onDragOver: (e) => {
            e.preventDefault();
            setIsDragActive(true);
        },
        onDragLeave: (e) => {
            e.preventDefault();
            setIsDragActive(false);
        },
        onDrop: async (e) => {
            e.preventDefault();
            setIsDragActive(false);
            
            const files = Array.from(e.dataTransfer.files);
            const file = files[0];
            
            if (!file) return;
            
            // Simulate file input event
            const fakeEvent = { target: { files: [file] } };
            await handleFileSelect(fakeEvent);
        }
    };

    const clearAll = () => {
        if (previewUrl) {
            cleanupImagePreview(previewUrl);
        }
        setUploadedFile(null);
        setPreviewUrl('');
        setGeneratedText('');
        setError('');
        setProgress(0);
        setProcessingTime(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleCopyText = async () => {
        if (!generatedText) return;
        
        const success = await copyToClipboard(generatedText);
        if (success) {
            // Could add a toast notification here
            console.log('Text copied to clipboard');
        }
    };

    const handleDownloadText = () => {
        if (!generatedText) return;
        
        const filename = uploadedFile ? 
            `generated-text-${uploadedFile.name.split('.')[0]}.txt` : 
            'generated-text.txt';
        
        downloadTextFile(generatedText, filename);
    };

    return (
        <div className="generative-text-processor">
            <div className="processor-header">
                <h3>🤖 AI Text Generator</h3>
                <p>Upload an image or PDF to generate detailed, descriptive text content</p>
            </div>

            {/* File Upload Area */}
            <div 
                ref={dropzoneRef}
                className={`upload-dropzone ${isDragActive ? 'drag-active' : ''} ${loading ? 'loading' : ''}`}
                {...handleDragEvents}
                onClick={() => fileInputRef.current?.click()}
                tabIndex={0}
                role="button"
                aria-label="Upload file for text generation"
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileSelect}
                    style={{ display: 'none' }}
                />
                
                <div className="upload-content">
                    <div className="upload-icon">
                        {loading ? (
                            <div className="processing-animation">
                                <div className="spinner"></div>
                            </div>
                        ) : (
                            <i className="fas fa-cloud-upload-alt"></i>
                        )}
                    </div>
                    
                    <div className="upload-text">
                        {loading ? (
                            <>
                                <h4>Extracting Text...</h4>
                                <p>AI is analyzing and generating descriptive text</p>
                            </>
                        ) : isDragActive ? (
                            <>
                                <h4>Drop Your File Here</h4>
                                <p>Release to upload and generate text</p>
                            </>
                        ) : (
                            <>
                                <h4>Upload Image or PDF</h4>
                                <p>Drag & drop or click to select • Max 10MB for images, 50MB for PDFs</p>
                            </>
                        )}
                    </div>
                    
                    {uploadedFile && !loading && (
                        <div className="file-info">
                            <div className="file-details">
                                <i className={`fas ${uploadedFile.type === 'application/pdf' ? 'fa-file-pdf' : 'fa-image'}`}></i>
                                <span className="file-name">{uploadedFile.name}</span>
                                <span className="file-size">({formatFileSize(uploadedFile.size)})</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Supported Formats */}
            <div className="supported-formats">
                <p>
                    <i className="fas fa-info-circle"></i>
                    Supported: JPEG, PNG, GIF, WebP, HEIC images and PDF documents
                </p>
            </div>

            {/* Progress Bar */}
            {loading && (
                <div className="progress-container">
                    <div className="progress-bar">
                        <div 
                            className="progress-fill" 
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <span className="progress-text">{progress}%</span>
                </div>
            )}

            {/* Error Display */}
            {error && (
                <div className="error-container" role="alert">
                    <div className="error-content">
                        <i className="fas fa-exclamation-triangle"></i>
                        <div>
                            <h4>Text Extraction Error</h4>
                            <p>{error}</p>
                        </div>
                        <button onClick={clearAll} className="retry-button">
                            Try Again
                        </button>
                    </div>
                </div>
            )}

            {/* File Preview (for images only) */}
            {previewUrl && (
                <div className="file-preview">
                    <h5>File Preview</h5>
                    <img 
                        src={previewUrl} 
                        alt="Uploaded file preview" 
                        className="preview-image"
                    />
                </div>
            )}

            {/* Generated Text Output */}
            {generatedText && (
                <div className="text-output">
                    <div className="output-header">
                        <h4>
                            <i className="fas fa-magic"></i>
                            Generated Text Content
                        </h4>
                        <div className="output-actions">
                            <button 
                                onClick={handleCopyText}
                                className="action-btn copy-btn"
                                title="Copy to clipboard"
                            >
                                <i className="fas fa-copy"></i>
                                Copy
                            </button>
                            <button 
                                onClick={handleDownloadText}
                                className="action-btn download-btn"
                                title="Download as text file"
                            >
                                <i className="fas fa-download"></i>
                                Download
                            </button>
                            <button 
                                onClick={clearAll}
                                className="action-btn clear-btn"
                                title="Clear all and start over"
                            >
                                <i className="fas fa-trash"></i>
                                Clear
                            </button>
                        </div>
                    </div>

                    {processingTime && (
                        <div className="processing-stats">
                            <span className="stat-item">
                                <i className="fas fa-clock"></i>
                                Processed in {processingTime}s
                            </span>
                            <span className="stat-item">
                                <i className="fas fa-file-alt"></i>
                                {generatedText.length} characters
                            </span>
                            <span className="stat-item">
                                <i className="fas fa-font"></i>
                                {generatedText.split(/\s+/).length} words
                            </span>
                        </div>
                    )}

                    <div className="text-content">
                        <textarea
                            value={generatedText}
                            onChange={(e) => setGeneratedText(e.target.value)}
                            className="generated-text-area"
                            rows={12}
                            placeholder="Extracted text will appear here..."
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default GenerativeTextProcessor;
