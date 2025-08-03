import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import './BatchImageProcessor.css';

const BatchImageProcessor = () => {
    const [images, setImages] = useState([]);
    const [processing, setProcessing] = useState(false);
    const [results, setResults] = useState([]);
    const [progress, setProgress] = useState(0);

    const onDrop = useCallback((acceptedFiles) => {
        const imageFiles = acceptedFiles.filter(file => 
            file.type.startsWith('image/')
        );
        
        const newImages = imageFiles.map((file, index) => ({
            id: Date.now() + index,
            file,
            name: file.name,
            preview: URL.createObjectURL(file),
            status: 'pending',
            result: null
        }));
        
        setImages(prev => [...prev, ...newImages]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.bmp', '.webp']
        },
        multiple: true
    });

    const processImages = async () => {
        if (images.length === 0) return;
        
        setProcessing(true);
        setProgress(0);
        const processedResults = [];

        for (let i = 0; i < images.length; i++) {
            const image = images[i];
            
            // Update status
            setImages(prev => prev.map(img => 
                img.id === image.id 
                    ? { ...img, status: 'processing' }
                    : img
            ));

            try {
                const base64 = await fileToBase64(image.file);
                  const response = await fetch(`${process.env.REACT_APP_API_URL}/api/batch-process`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        images: [{
                            data: base64.split(',')[1],
                            isFile: true,
                            name: image.name
                        }],
                        mode: 'analyze'
                    })
                });

                if (!response.ok) {
                    throw new Error(`Failed to process ${image.name}`);
                }                const data = await response.json();
                
                // Handle batch API response format
                const batchResult = data.results && data.results[0];
                const description = batchResult ? batchResult.result : 'No description available';
                
                const result = {
                    id: image.id,
                    name: image.name,
                    description: description,
                    status: 'completed'
                };

                processedResults.push(result);
                
                // Update image status
                setImages(prev => prev.map(img => 
                    img.id === image.id 
                        ? { ...img, status: 'completed', result: description }
                        : img
                ));

            } catch (error) {
                console.error(`Error processing ${image.name}:`, error);
                
                setImages(prev => prev.map(img => 
                    img.id === image.id 
                        ? { ...img, status: 'error', result: error.message }
                        : img
                ));
            }

            setProgress(((i + 1) / images.length) * 100);
        }

        setResults(processedResults);
        setProcessing(false);
    };

    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };

    const downloadResults = async () => {
        const zip = new JSZip();
        
        results.forEach(result => {
            const content = `Image: ${result.name}\n\nDescription:\n${result.description}`;
            zip.file(`${result.name.split('.')[0]}_analysis.txt`, content);
        });

        const zipContent = await zip.generateAsync({ type: 'blob' });
        saveAs(zipContent, 'batch_image_analysis.zip');
    };

    const removeImage = (id) => {
        setImages(prev => prev.filter(img => img.id !== id));
    };

    const clearAll = () => {
        setImages([]);
        setResults([]);
        setProgress(0);
    };

    return (
        <div className="batch-processor">
            <div className="batch-header">
                <h3>Batch Image Processing</h3>
                <p>Upload multiple images to analyze them all at once</p>
            </div>

            <div 
                {...getRootProps()} 
                className={`dropzone ${isDragActive ? 'active' : ''}`}
            >
                <input {...getInputProps()} />
                <div className="dropzone-content">
                    <i className="fas fa-cloud-upload-alt"></i>
                    <p>
                        {isDragActive 
                            ? 'Drop the images here...' 
                            : 'Drag & drop images here, or click to select'
                        }
                    </p>
                    <small>Supports: JPG, PNG, GIF, BMP, WebP</small>
                </div>
            </div>

            {images.length > 0 && (
                <div className="batch-controls">
                    <div className="control-buttons">
                        <button 
                            onClick={processImages} 
                            disabled={processing}
                            className="btn btn-primary"
                        >
                            {processing ? 'Processing...' : `Process ${images.length} Images`}
                        </button>
                        
                        {results.length > 0 && (
                            <button 
                                onClick={downloadResults}
                                className="btn btn-success"
                            >
                                Download Results
                            </button>
                        )}
                        
                        <button 
                            onClick={clearAll}
                            className="btn btn-secondary"
                        >
                            Clear All
                        </button>
                    </div>

                    {processing && (
                        <div className="progress-container">
                            <div className="progress">
                                <div 
                                    className="progress-bar" 
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                            <span>{Math.round(progress)}%</span>
                        </div>
                    )}
                </div>
            )}

            {images.length > 0 && (
                <div className="image-grid">
                    {images.map(image => (
                        <div key={image.id} className="image-item">
                            <div className="image-preview">
                                <img src={image.preview} alt={image.name} />
                                <button 
                                    onClick={() => removeImage(image.id)}
                                    className="remove-btn"
                                >
                                    ×
                                </button>
                            </div>
                            
                            <div className="image-info">
                                <h6>{image.name}</h6>
                                <span className={`status ${image.status}`}>
                                    {image.status === 'processing' && <i className="fas fa-spinner fa-spin"></i>}
                                    {image.status === 'completed' && <i className="fas fa-check"></i>}
                                    {image.status === 'error' && <i className="fas fa-times"></i>}
                                    {image.status}
                                </span>
                                
                                {image.result && (
                                    <div className="result-preview">
                                        <p>{image.result.substring(0, 100)}...</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BatchImageProcessor;
