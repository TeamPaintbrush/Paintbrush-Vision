import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useKeyboardNavigation, useUndoRedo } from '../hooks/useAccessibility';
import { useToast } from '../context/ToastContext';
import { AccessibleButton, LoadingSpinner, AccessibleInput } from './AccessibleUI';
import UserPreferences from './UserPreferences';
import HelpSystem from './HelpSystem';
import StatusBar from './StatusBar';
import { trackEvent, trackError } from '../utils/performance';
import './ImageEditor.css';

const ImageEditor = () => {
    const canvasRef = useRef(null);
    const fileInputRef = useRef(null);
    const { showSuccess, showError, showInfo } = useToast();
    
    const [image, setImage] = useState(null);
    const [originalImage, setOriginalImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showPreferences, setShowPreferences] = useState(false);
    const [showHelp, setShowHelp] = useState(false);
    const [imageInfo, setImageInfo] = useState(null);
    const [lastAction, setLastAction] = useState(null);
    const [filters, setFilters] = useState({
        brightness: 100,
        contrast: 100,
        saturation: 100,
        blur: 0,
        sepia: 0,
        grayscale: 0,
        hue: 0
    });
    const [crop, setCrop] = useState({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        active: false
    });
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
      // Enhanced undo/redo with accessibility hooks
    const initialState = {
        image: null,
        filters: { ...filters },
        zoom: 1,
        rotation: 0
    };
    
    const { 
        state: historyState, 
        pushState: saveToHistory, 
        undo: undoAction, 
        redo: redoAction, 
        canUndo, 
        canRedo 
    } = useUndoRedo(initialState);

    // Keyboard shortcuts for accessibility
    const shortcuts = {
        'ctrl+z': undoAction,
        'ctrl+y': redoAction,
        'ctrl+shift+z': redoAction,
        'ctrl+o': () => fileInputRef.current?.click(),
        'ctrl+s': downloadImage,
        'escape': () => setCrop(prev => ({ ...prev, active: false })),
        'ctrl+comma': () => setShowPreferences(true),
        'f1': () => setShowHelp(true),
        'ctrl+/': () => setShowHelp(true)
    };
    
    useKeyboardNavigation(shortcuts);

    // Track actions for analytics and status updates
    const trackAction = useCallback((action, details = {}) => {
        setLastAction(action);
        trackEvent('image_editor_action', { action, ...details });
        
        // Clear action status after 3 seconds
        setTimeout(() => setLastAction(null), 3000);
    }, []);

    // Enhanced image upload with error handling and accessibility
    const handleImageUpload = useCallback(async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            showError('Please select a valid image file.');
            trackError(new Error('Invalid file type'), { fileType: file.type });
            return;
        }

        // Check file size (limit to 10MB)
        if (file.size > 10 * 1024 * 1024) {
            showError('Image file is too large. Please select a file under 10MB.');
            trackError(new Error('File too large'), { fileSize: file.size });
            return;
        }

        setLoading(true);
        trackAction('Image upload started');
        
        try {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    setImage(img);
                    setOriginalImage(img);
                    
                    // Set image info for status bar
                    setImageInfo({
                        width: img.naturalWidth,
                        height: img.naturalHeight,
                        size: file.size,
                        format: file.type.split('/')[1]
                    });
                    
                    drawImageToCanvas(img);
                    
                    // Save initial state to history
                    saveToHistory({
                        image: img,
                        filters: { ...filters },
                        zoom: 1,
                        rotation: 0
                    });
                    
                    showSuccess('Image loaded successfully!');
                    trackAction('Image loaded successfully', {
                        width: img.naturalWidth,
                        height: img.naturalHeight,
                        format: file.type
                    });
                    setLoading(false);
                };
                img.onerror = () => {
                    const error = new Error('Failed to load image');
                    showError('Failed to load image. Please try another file.');
                    trackError(error, { fileName: file.name });
                    setLoading(false);
                };
                img.src = e.target.result;
            };
            reader.onerror = () => {
                const error = new Error('Failed to read file');
                showError('Failed to read file. Please try again.');
                trackError(error, { fileName: file.name });
                setLoading(false);
            };
            reader.readAsDataURL(file);
        } catch (error) {
            showError('An error occurred while loading the image.');
            trackError(error, { context: 'image upload' });
            setLoading(false);
        }
    }, [filters, saveToHistory, showSuccess, showError, trackAction]);

    const drawImageToCanvas = (img = image) => {
        if (!img || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        // Set canvas size
        canvas.width = img.width;
        canvas.height = img.height;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Apply transformations
        ctx.save();
        
        // Translate to center for rotation
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.scale(zoom, zoom);
        ctx.translate(-img.width / 2, -img.height / 2);

        // Apply filters
        const filterString = `
            brightness(${filters.brightness}%)
            contrast(${filters.contrast}%)
            saturate(${filters.saturation}%)
            blur(${filters.blur}px)
            sepia(${filters.sepia}%)
            grayscale(${filters.grayscale}%)
            hue-rotate(${filters.hue}deg)
        `.trim();
        
        ctx.filter = filterString;

        // Draw image
        ctx.drawImage(img, 0, 0);
        
        ctx.restore();

        // Draw crop overlay if active
        if (crop.active) {
            drawCropOverlay();
        }
    };

    const drawCropOverlay = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        // Semi-transparent overlay
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Clear crop area
        ctx.clearRect(crop.x, crop.y, crop.width, crop.height);
        
        // Crop border
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.strokeRect(crop.x, crop.y, crop.width, crop.height);
    };

    const applyFilter = (filterName, value) => {
        setFilters(prev => ({
            ...prev,
            [filterName]: value
        }));
    };

    const resetFilters = () => {
        setFilters({
            brightness: 100,
            contrast: 100,
            saturation: 100,
            blur: 0,
            sepia: 0,
            grayscale: 0,
            hue: 0
        });
    };

    // Apply rotation function
    const applyRotation = useCallback((degrees) => {
        setRotation(prev => prev + degrees);
        setTimeout(() => {
            saveToHistory({
                image,
                filters,
                zoom,
                rotation: rotation + degrees
            });
        }, 100);
        showInfo(`Image rotated ${degrees}°`);
    }, [image, filters, zoom, rotation, saveToHistory, showInfo]);

    // Flip image function
    const flipImage = useCallback((direction) => {
        if (!canvasRef.current || !image) return;
        
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        // Create a new canvas for the flipped image
        const flippedCanvas = document.createElement('canvas');
        const flippedCtx = flippedCanvas.getContext('2d');
        
        flippedCanvas.width = canvas.width;
        flippedCanvas.height = canvas.height;
        
        if (direction === 'horizontal') {
            flippedCtx.scale(-1, 1);
            flippedCtx.drawImage(canvas, -canvas.width, 0);
        } else {
            flippedCtx.scale(1, -1);
            flippedCtx.drawImage(canvas, 0, -canvas.height);
        }
        
        // Create new image from flipped canvas
        const flippedImage = new Image();
        flippedImage.onload = () => {
            setImage(flippedImage);
            drawImageToCanvas(flippedImage);
            saveToHistory({
                image: flippedImage,
                filters,
                zoom,
                rotation
            });
        };
        flippedImage.src = flippedCanvas.toDataURL();
        
        showInfo(`Image flipped ${direction}ally`);
    }, [image, filters, zoom, rotation, saveToHistory, showInfo]);

    // Start crop function
    const startCrop = useCallback(() => {
        setCrop(prev => ({ ...prev, active: true }));
        showInfo('Click and drag on the image to select crop area. Press Escape to cancel.');
    }, [showInfo]);

    const applyCrop = () => {
        if (!crop.active || !image) return;

        const canvas = canvasRef.current;
        const croppedCanvas = document.createElement('canvas');
        const croppedCtx = croppedCanvas.getContext('2d');
        
        croppedCanvas.width = crop.width;
        croppedCanvas.height = crop.height;
        
        croppedCtx.drawImage(
            canvas,
            crop.x, crop.y, crop.width, crop.height,
            0, 0, crop.width, crop.height
        );
        
        const croppedImage = new Image();
        croppedImage.onload = () => {            setImage(croppedImage);
            drawImageToCanvas(croppedImage);
            setCrop(prev => ({ ...prev, active: false }));
            
            // Save to history after crop
            saveToHistory({
                image: croppedImage,
                filters: { ...filters },
                zoom,
                rotation
            });
            
            showSuccess('Image cropped successfully!');
        };
        croppedImage.src = croppedCanvas.toDataURL();
    };

    // Enhanced download function with format options
    const downloadImage = useCallback((format = 'png') => {
        if (!canvasRef.current) {
            showError('No image to download.');
            return;
        }
        
        try {
            const link = document.createElement('a');
            link.download = `edited-image.${format}`;
            link.href = canvasRef.current.toDataURL(`image/${format}`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            showSuccess(`Image downloaded as ${format.toUpperCase()}`);
        } catch (error) {
            showError('Failed to download image. Please try again.');
        }
    }, [showSuccess, showError]);    // Enhanced filter handling with debouncing and history
    const handleFilterChange = useCallback((filterName, value) => {
        const newFilters = { ...filters, [filterName]: value };
        setFilters(newFilters);
        
        // Save to history when filter change is complete
        setTimeout(() => {
            saveToHistory({
                image,
                filters: newFilters,
                zoom,
                rotation
            });
        }, 500); // Debounce history saves
    }, [filters, image, zoom, rotation, saveToHistory]);

    // Reset all changes
    const resetImage = useCallback(() => {
        if (originalImage) {
            setImage(originalImage);
            setFilters({
                brightness: 100,
                contrast: 100,
                saturation: 100,
                blur: 0,
                sepia: 0,
                grayscale: 0,
                hue: 0
            });
            setRotation(0);
            setZoom(1);
            setCrop({ x: 0, y: 0, width: 0, height: 0, active: false });
            drawImageToCanvas(originalImage);
            
            saveToHistory({
                image: originalImage,
                filters: {
                    brightness: 100,
                    contrast: 100,
                    saturation: 100,
                    blur: 0,
                    sepia: 0,
                    grayscale: 0,
                    hue: 0
                },
                zoom: 1,
                rotation: 0
            });
            
            showInfo('Image reset to original state');
        }
    }, [originalImage, saveToHistory, showInfo]);

    useEffect(() => {
        if (image) {
            drawImageToCanvas();
        }
    }, [filters, zoom, rotation]);    return (
        <div className="image-editor" role="main" aria-label="Image Editor">
            {/* Top toolbar with preferences and help */}
            <div className="editor-top-bar d-flex justify-content-between align-items-center p-2 border-bottom">
                <div className="editor-title">
                    <h3 id="editor-title" className="mb-0">Image Editor</h3>
                </div>
                
                <div className="editor-actions d-flex gap-2">
                    <AccessibleButton
                        onClick={() => setShowHelp(true)}
                        variant="outline"
                        size="small"
                        ariaLabel="Open help and documentation (F1)"
                        title="Help (F1)"
                    >
                        <i className="fas fa-question-circle" aria-hidden="true"></i>
                    </AccessibleButton>
                    
                    <AccessibleButton
                        onClick={() => setShowPreferences(true)}
                        variant="outline"
                        size="small"
                        ariaLabel="Open user preferences (Ctrl+Comma)"
                        title="Preferences (Ctrl+,)"
                    >
                        <i className="fas fa-cog" aria-hidden="true"></i>
                    </AccessibleButton>
                </div>
            </div>

            <div className="editor-header p-3">
                <p className="text-muted mb-2">Edit and enhance your images with professional tools</p>
                
                {/* Keyboard shortcuts info */}
                <div className="keyboard-shortcuts-info">
                    <small className="text-muted">
                        <i className="fas fa-keyboard me-1" aria-hidden="true"></i>
                        Press F1 for help, Ctrl+, for preferences, or Ctrl+O to open an image
                    </small>
                </div>
            </div>

            {/* Loading indicator */}
            {loading && (
                <div className="d-flex justify-content-center my-4">
                    <LoadingSpinner message="Processing image..." />
                </div>
            )}

            {/* File Upload */}
            {!image && !loading && (
                <div className="upload-section">
                    <AccessibleInput
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        label="Select an image to edit"
                        helpText="Supported formats: JPG, PNG, GIF, WebP (max 10MB)"
                        className="mb-3"
                    />
                    <AccessibleButton 
                        onClick={() => fileInputRef.current?.click()}
                        variant="primary"
                        size="large"
                        className="mb-3"
                        ariaLabel="Choose image file"
                    >
                        <i className="fas fa-upload me-2" aria-hidden="true"></i>
                        Choose Image
                    </AccessibleButton>
                </div>
            )}

            {image && !loading && (
                <div className="editor-container">
                    {/* Toolbar */}
                    <div className="editor-toolbar" role="toolbar" aria-label="Image editing tools">
                        <div className="toolbar-section">
                            <h5>Actions</h5>
                            <div className="action-buttons d-flex gap-2 flex-wrap">
                                <AccessibleButton 
                                    onClick={undoAction} 
                                    disabled={!canUndo}
                                    variant="outline"
                                    ariaLabel="Undo last action (Ctrl+Z)"
                                    ariaDescribedBy="undo-help"
                                >
                                    <i className="fas fa-undo me-1" aria-hidden="true"></i> Undo
                                </AccessibleButton>
                                <div id="undo-help" className="visually-hidden">
                                    Undo the last editing action
                                </div>
                                
                                <AccessibleButton 
                                    onClick={redoAction} 
                                    disabled={!canRedo}
                                    variant="outline"
                                    ariaLabel="Redo last action (Ctrl+Y)"
                                    ariaDescribedBy="redo-help"
                                >
                                    <i className="fas fa-redo me-1" aria-hidden="true"></i> Redo
                                </AccessibleButton>
                                <div id="redo-help" className="visually-hidden">
                                    Redo the last undone action
                                </div>
                                
                                <AccessibleButton 
                                    onClick={resetImage}
                                    variant="warning"
                                    ariaLabel="Reset image to original state"
                                    ariaDescribedBy="reset-help"
                                >
                                    <i className="fas fa-refresh me-1" aria-hidden="true"></i> Reset
                                </AccessibleButton>
                                <div id="reset-help" className="visually-hidden">
                                    Reset all changes and return to original image
                                </div>
                            </div>
                        </div>

                        <div className="toolbar-section">
                            <h5>Transform</h5>
                            <div className="transform-controls">
                                <div className="d-flex gap-2 flex-wrap mb-3">
                                    <AccessibleButton 
                                        onClick={() => applyRotation(90)}
                                        variant="secondary"
                                        ariaLabel="Rotate image 90 degrees clockwise"
                                    >
                                        <i className="fas fa-redo me-1" aria-hidden="true"></i> Rotate 90°
                                    </AccessibleButton>
                                    <AccessibleButton 
                                        onClick={() => flipImage('horizontal')}
                                        variant="secondary"
                                        ariaLabel="Flip image horizontally"
                                    >
                                        <i className="fas fa-arrows-alt-h me-1" aria-hidden="true"></i> Flip H
                                    </AccessibleButton>
                                    <AccessibleButton 
                                        onClick={() => flipImage('vertical')}
                                        variant="secondary"
                                        ariaLabel="Flip image vertically"
                                    >
                                        <i className="fas fa-arrows-alt-v me-1" aria-hidden="true"></i> Flip V
                                    </AccessibleButton>
                                </div>
                                
                                <div className="zoom-control">
                                    <label htmlFor="zoom-slider" className="form-label">
                                        Zoom: {Math.round(zoom * 100)}%
                                    </label>
                                    <input
                                        id="zoom-slider"
                                        type="range"
                                        min="0.1"
                                        max="3"
                                        step="0.1"
                                        value={zoom}
                                        onChange={(e) => setZoom(parseFloat(e.target.value))}
                                        className="form-range"
                                        aria-describedby="zoom-help"
                                    />
                                    <div id="zoom-help" className="form-text">
                                        Adjust the zoom level of the image
                                    </div>
                                </div>
                            </div>
                        </div>                        <div className="toolbar-section">
                            <h5>Crop</h5>
                            <div className="crop-controls d-flex gap-2 flex-wrap">
                                {!crop.active ? (
                                    <AccessibleButton 
                                        onClick={startCrop}
                                        variant="info"
                                        ariaLabel="Start cropping the image"
                                        ariaDescribedBy="crop-help"
                                    >
                                        <i className="fas fa-crop me-1" aria-hidden="true"></i> Start Crop
                                    </AccessibleButton>
                                ) : (
                                    <>
                                        <AccessibleButton 
                                            onClick={applyCrop}
                                            variant="success"
                                            ariaLabel="Apply the current crop selection"
                                        >
                                            <i className="fas fa-check me-1" aria-hidden="true"></i> Apply Crop
                                        </AccessibleButton>
                                        <AccessibleButton 
                                            onClick={() => setCrop(prev => ({ ...prev, active: false }))}
                                            variant="danger"
                                            ariaLabel="Cancel crop selection (Escape)"
                                        >
                                            <i className="fas fa-times me-1" aria-hidden="true"></i> Cancel
                                        </AccessibleButton>
                                    </>
                                )}
                                <div id="crop-help" className="visually-hidden">
                                    Click and drag on the image to select an area to crop
                                </div>
                            </div>
                        </div>

                        <div className="toolbar-section">
                            <h5>Download</h5>
                            <div className="download-controls d-flex gap-2 flex-wrap">
                                <AccessibleButton 
                                    onClick={() => downloadImage('png')}
                                    variant="success"
                                    ariaLabel="Download image as PNG format (Ctrl+S)"
                                >
                                    <i className="fas fa-download me-1" aria-hidden="true"></i> PNG
                                </AccessibleButton>
                                <AccessibleButton 
                                    onClick={() => downloadImage('jpeg')}
                                    variant="success"
                                    ariaLabel="Download image as JPEG format"
                                >
                                    <i className="fas fa-download me-1" aria-hidden="true"></i> JPEG
                                </AccessibleButton>
                                <AccessibleButton 
                                    onClick={() => downloadImage('webp')}
                                    variant="success"
                                    ariaLabel="Download image as WebP format"
                                >
                                    <i className="fas fa-download me-1" aria-hidden="true"></i> WebP                                </AccessibleButton>
                            </div>
                        </div>
                    </div>

                    {/* Canvas and Filters */}
                    <div className="editor-main">
                        <div className="canvas-container">
                            <canvas 
                                ref={canvasRef} 
                                className="editor-canvas"
                                role="img"
                                aria-label="Image being edited"
                                tabIndex="0"
                            />
                        </div>

                        <div className="filters-panel">
                            <h5>Filters</h5>
                            
                            <div className="filter-control mb-3">
                                <label htmlFor="brightness-slider" className="form-label">
                                    Brightness: {filters.brightness}%
                                </label>
                                <input
                                    id="brightness-slider"
                                    type="range"
                                    min="0"
                                    max="200"
                                    value={filters.brightness}
                                    onChange={(e) => handleFilterChange('brightness', parseInt(e.target.value))}
                                    className="form-range"
                                    aria-describedby="brightness-help"
                                />
                                <div id="brightness-help" className="form-text">
                                    Adjust the brightness of the image
                                </div>
                            </div>

                            <div className="filter-control mb-3">
                                <label htmlFor="contrast-slider" className="form-label">
                                    Contrast: {filters.contrast}%
                                </label>
                                <input
                                    id="contrast-slider"
                                    type="range"
                                    min="0"
                                    max="200"
                                    value={filters.contrast}
                                    onChange={(e) => handleFilterChange('contrast', parseInt(e.target.value))}
                                    className="form-range"
                                    aria-describedby="contrast-help"
                                />
                                <div id="contrast-help" className="form-text">
                                    Adjust the contrast of the image
                                </div>
                            </div>

                            <div className="filter-control mb-3">
                                <label htmlFor="saturation-slider" className="form-label">
                                    Saturation: {filters.saturation}%
                                </label>
                                <input
                                    id="saturation-slider"
                                    type="range"
                                    min="0"
                                    max="200"
                                    value={filters.saturation}
                                    onChange={(e) => handleFilterChange('saturation', parseInt(e.target.value))}
                                    className="form-range"
                                    aria-describedby="saturation-help"
                                />
                                <div id="saturation-help" className="form-text">
                                    Adjust the color saturation of the image
                                </div>
                            </div>

                            <div className="filter-control mb-3">
                                <label htmlFor="blur-slider" className="form-label">
                                    Blur: {filters.blur}px
                                </label>
                                <input
                                    id="blur-slider"
                                    type="range"
                                    min="0"
                                    max="10"
                                    step="0.1"
                                    value={filters.blur}
                                    onChange={(e) => handleFilterChange('blur', parseFloat(e.target.value))}
                                    className="form-range"
                                    aria-describedby="blur-help"
                                />
                                <div id="blur-help" className="form-text">
                                    Apply blur effect to the image
                                </div>
                            </div>

                            <div className="filter-control mb-3">
                                <label htmlFor="sepia-slider" className="form-label">
                                    Sepia: {filters.sepia}%
                                </label>
                                <input
                                    id="sepia-slider"
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={filters.sepia}
                                    onChange={(e) => handleFilterChange('sepia', parseInt(e.target.value))}
                                    className="form-range"
                                    aria-describedby="sepia-help"
                                />
                                <div id="sepia-help" className="form-text">
                                    Apply sepia (vintage) effect to the image
                                </div>
                            </div>

                            <div className="filter-control mb-3">
                                <label htmlFor="grayscale-slider" className="form-label">
                                    Grayscale: {filters.grayscale}%
                                </label>
                                <input
                                    id="grayscale-slider"
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={filters.grayscale}
                                    onChange={(e) => handleFilterChange('grayscale', parseInt(e.target.value))}
                                    className="form-range"
                                    aria-describedby="grayscale-help"
                                />
                                <div id="grayscale-help" className="form-text">
                                    Convert image to grayscale
                                </div>
                            </div>

                            <div className="filter-control mb-3">
                                <label htmlFor="hue-slider" className="form-label">
                                    Hue Rotate: {filters.hue}°
                                </label>
                                <input
                                    id="hue-slider"
                                    type="range"
                                    min="0"
                                    max="360"
                                    value={filters.hue}
                                    onChange={(e) => handleFilterChange('hue', parseInt(e.target.value))}
                                    className="form-range"
                                    aria-describedby="hue-help"
                                />
                                <div id="hue-help" className="form-text">
                                    Rotate the hue of the image colors                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Status Bar */}
            <StatusBar
                imageInfo={imageInfo}
                zoom={zoom}
                historyPosition={{
                    current: historyState ? 1 : 0,
                    total: canUndo || canRedo ? 1 : 0
                }}
                isProcessing={loading}
                lastAction={lastAction}
            />

            {/* Modals */}
            <UserPreferences 
                isOpen={showPreferences}
                onClose={() => setShowPreferences(false)}
            />
            
            <HelpSystem
                isOpen={showHelp}
                onClose={() => setShowHelp(false)}
            />
        </div>
    );
};

export default ImageEditor;
