import React, { useState, useRef } from 'react';
import './OCRTextExtractor.css';

const OCRTextExtractor = () => {
    const [imageUrl, setImageUrl] = useState('');
    const [previewUrl, setPreviewUrl] = useState('');
    const [uploadedImage, setUploadedImage] = useState(null);
    const [extractedText, setExtractedText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [confidence, setConfidence] = useState(null);
    const [languages, setLanguages] = useState(['en']);

    const dropRef = useRef(null);
    const fileInputRef = useRef(null);

    const supportedLanguages = [
        { code: 'en', name: 'English' },
        { code: 'es', name: 'Spanish' },
        { code: 'fr', name: 'French' },
        { code: 'de', name: 'German' },
        { code: 'it', name: 'Italian' },
        { code: 'pt', name: 'Portuguese' },
        { code: 'ru', name: 'Russian' },
        { code: 'ja', name: 'Japanese' },
        { code: 'ko', name: 'Korean' },
        { code: 'zh', name: 'Chinese' },
        { code: 'ar', name: 'Arabic' },
        { code: 'hi', name: 'Hindi' }
    ];

    const extractText = async (imageSource, isFile = false) => {
        setLoading(true);
        setError('');
        setExtractedText('');
        setConfidence(null);

        try {
            let base64Image = '';
            if (isFile) {
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

            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/ocr-extract`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    image: isFile ? base64Image : imageSource, 
                    isFile,
                    languages: languages.join(',')
                })
            });

            if (!response.ok) {
                const err = await response.text();
                throw new Error(`OCR request failed: ${response.status} ${err}`);
            }

            const data = await response.json();
            setExtractedText(data.text || 'No text found in image');
            setConfidence(data.confidence || null);
        } catch (err) {
            setError(err.message || 'Failed to extract text from image');
        } finally {
            setLoading(false);
        }
    };

    const handlePreview = () => {
        if (!imageUrl.trim()) {
            setError('Please enter an image URL');
            return;
        }
        
        setError('');
        setPreviewUrl(imageUrl);
        extractText(imageUrl, false);
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            setError('Please select a valid image file');
            return;
        }

        setError('');
        setUploadedImage(file);
        
        const reader = new FileReader();
        reader.onload = (e) => {
            setPreviewUrl(e.target.result);
        };
        reader.readAsDataURL(file);

        extractText(file, true);
    };

    const handleLanguageChange = (langCode) => {
        setLanguages(prev => {
            if (prev.includes(langCode)) {
                return prev.filter(l => l !== langCode);
            } else {
                return [...prev, langCode];
            }
        });
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(extractedText).then(() => {
            // Could add a toast notification here
            console.log('Text copied to clipboard');
        });
    };

    const downloadText = () => {
        const element = document.createElement('a');
        const file = new Blob([extractedText], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = 'extracted-text.txt';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    const clearAll = () => {
        setImageUrl('');
        setPreviewUrl('');
        setUploadedImage(null);
        setExtractedText('');
        setError('');
        setConfidence(null);
    };

    // Drag-and-drop handlers
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0];
            if (!file.type.startsWith('image/')) {
                setError('Please select a valid image file');
                return;
            }
            setUploadedImage(file);
            const reader = new FileReader();
            reader.onload = (ev) => setPreviewUrl(ev.target.result);
            reader.readAsDataURL(file);
            extractText(file, true);
        }
    };
    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };
    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (dropRef.current) dropRef.current.classList.add('drag-active');
    };
    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (dropRef.current) dropRef.current.classList.remove('drag-active');
    };

    // Accessibility: focus management for drag-and-drop
    const [ariaLiveMsg, setAriaLiveMsg] = useState('');
    React.useEffect(() => {
        if (extractedText) setAriaLiveMsg('Text extraction complete.');
        else if (loading) setAriaLiveMsg('Extracting text from image...');
        else setAriaLiveMsg('');
    }, [extractedText, loading]);

    // Keyboard accessibility for dropzone
    const handleDropzoneKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (fileInputRef.current) fileInputRef.current.click();
        }
    };

    return (
        <div className="ocr-extractor">
            <div className="ocr-header">
                <h3>OCR Text Extractor</h3>
                <p>Extract text from images with high accuracy</p>
            </div>
            {/* Language Selection */}
            <div className="language-selection">
                <h5>Select Languages:</h5>
                <div className="language-grid">
                    {supportedLanguages.map(lang => (
                        <label key={lang.code} className="language-option">
                            <input
                                type="checkbox"
                                checked={languages.includes(lang.code)}
                                onChange={() => handleLanguageChange(lang.code)}
                            />
                            <span>{lang.name}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* URL Input */}
            <div className="input-section">
                <h5>Option 1: Enter Image URL</h5>
                <div className="url-input-group">
                    <input
                        type="url"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        className="form-control"
                    />
                    <button 
                        onClick={handlePreview}
                        disabled={loading}
                        className="btn btn-primary"
                    >
                        Extract Text
                    </button>
                </div>
            </div>

            {/* Drag-and-Drop Upload */}
            <div
                ref={dropRef}
                className="dropzone"
                tabIndex={0}
                role="button"
                aria-label="Drag and drop an image here or click to upload"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                onKeyDown={handleDropzoneKeyDown}
                style={{ border: '2px dashed #888', padding: '1em', marginBottom: '1em', cursor: 'pointer' }}
            >
                <span>Drag and drop an image here, or click to select a file</span>
            </div>

            {/* File Upload */}
            <div className="input-section">
                <h5>Option 2: Upload Image File</h5>
                <div className="file-upload">
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={loading}
                        className="form-control"
                        aria-label="Upload image file for OCR"
                    />
                </div>
            </div>

            {/* Loading State with Progress Bar */}
            {loading && (
                <div className="loading-state" aria-live="polite">
                    <div className="spinner" aria-hidden="true"></div>
                    <div className="progress-bar" style={{ width: '100%', background: '#eee', height: 8, borderRadius: 4, margin: '8px 0' }}>
                        <div style={{ width: loading ? '80%' : '0%', height: '100%', background: '#007bff', borderRadius: 4, transition: 'width 0.5s' }}></div>
                    </div>
                    <p>Extracting text from image...</p>
                </div>
            )}

            {/* Error Display */}
            {error && (
                <div className="error-display" role="alert">
                    <i className="fas fa-exclamation-triangle" aria-hidden="true"></i>
                    <p>{error}</p>
                </div>
            )}

            {/* ARIA live region for screen readers */}
            <div aria-live="polite" style={{ position: 'absolute', left: '-9999px', height: 0, width: 0, overflow: 'hidden' }}>{ariaLiveMsg}</div>

            {/* Preview and Results */}
            {previewUrl && (
                <div className="results-section">
                    <div className="image-preview">
                        <h5>Image Preview</h5>
                        <img src={previewUrl} alt="Preview of uploaded for OCR extraction" />
                    </div>

                    {extractedText && (
                        <div className="text-results">
                            <div className="results-header">
                                <h5>Extracted Text</h5>
                                {confidence && (
                                    <span className="confidence-badge">
                                        Confidence: {Math.round(confidence)}%
                                    </span>
                                )}
                                <div className="action-buttons">
                                    <button 
                                        onClick={copyToClipboard}
                                        className="btn btn-sm btn-outline-primary"
                                        aria-label="Copy extracted text to clipboard"
                                    >
                                        <i className="fas fa-copy"></i> Copy
                                    </button>
                                    <button 
                                        onClick={downloadText}
                                        className="btn btn-sm btn-outline-success"
                                        aria-label="Download extracted text as .txt"
                                    >
                                        <i className="fas fa-download"></i> Download
                                    </button>
                                    <button
                                        onClick={clearAll}
                                        className="btn btn-sm btn-outline-secondary"
                                        aria-label="Clear OCR results and form"
                                    >
                                        <i className="fas fa-times"></i> Clear
                                    </button>
                                </div>
                            </div>
                            
                            <div className="text-output">
                                <textarea
                                    value={extractedText}
                                    onChange={(e) => setExtractedText(e.target.value)}
                                    rows="10"
                                    className="form-control"
                                    placeholder="Extracted text will appear here..."
                                    aria-label="Extracted OCR text output"
                                />
                            </div>

                            <div className="text-stats">
                                <span>Characters: {extractedText.length}</span>
                                <span>Words: {extractedText.split(/\s+/).filter(word => word.length > 0).length}</span>
                                <span>Lines: {extractedText.split('\n').length}</span>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default OCRTextExtractor;
