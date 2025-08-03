// Shared Image Utilities for Paintbrush Vision
// Prevents code duplication between ImageToTextVision and OCRTextExtractor

/**
 * Handle image file upload with validation
 * @param {File} file - The uploaded file
 * @param {Object} options - Configuration options
 * @returns {Promise<string>} - Base64 data URL
 */
export const handleImageUpload = (file, options = {}) => {
    return new Promise((resolve, reject) => {
        // Validate file type
        if (!file.type.startsWith('image/')) {
            reject(new Error('Please select a valid image file'));
            return;
        }

        // Check file size (default 10MB limit)
        const maxSize = options.maxSize || 10 * 1024 * 1024;
        if (file.size > maxSize) {
            reject(new Error(`File size too large. Maximum ${maxSize / 1024 / 1024}MB allowed`));
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            resolve(e.target.result);
        };
        reader.onerror = (error) => {
            reject(new Error('Failed to read file: ' + error.message));
        };
        reader.readAsDataURL(file);
    });
};

/**
 * Convert file to base64 string (without data URL prefix)
 * @param {File} file - The file to convert
 * @returns {Promise<string>} - Base64 string
 */
export const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result;
            const base64 = result.split(',')[1]; // Remove data URL prefix
            resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

/**
 * Validate image file type and size
 * @param {File} file - File to validate
 * @param {Object} options - Validation options
 * @returns {Object} - Validation result
 */
export const validateImageFile = (file, options = {}) => {
    const allowedTypes = options.allowedTypes || ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const maxSize = options.maxSize || 10 * 1024 * 1024; // 10MB default
    
    const result = {
        isValid: true,
        errors: []
    };
    
    if (!allowedTypes.includes(file.type)) {
        result.isValid = false;
        result.errors.push(`File type ${file.type} not allowed. Allowed: ${allowedTypes.join(', ')}`);
    }
    
    if (file.size > maxSize) {
        result.isValid = false;
        result.errors.push(`File size ${(file.size / 1024 / 1024).toFixed(2)}MB exceeds limit of ${maxSize / 1024 / 1024}MB`);
    }
    
    return result;
};

/**
 * Handle drag and drop events with validation
 * @param {DragEvent} event - The drop event
 * @param {Function} callback - Callback function to handle valid files
 * @param {Object} options - Options for validation
 */
export const handleImageDrop = (event, callback, options = {}) => {
    event.preventDefault();
    
    const files = Array.from(event.dataTransfer.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length === 0) {
        throw new Error('No valid image files found in dropped items');
    }
    
    const maxFiles = options.maxFiles || 1;
    if (imageFiles.length > maxFiles) {
        throw new Error(`Too many files. Maximum ${maxFiles} allowed`);
    }
    
    // Validate each file
    for (const file of imageFiles) {
        const validation = validateImageFile(file, options);
        if (!validation.isValid) {
            throw new Error(validation.errors.join(', '));
        }
    }
    
    callback(imageFiles);
};

/**
 * Create a preview URL for an image file
 * @param {File} file - Image file
 * @returns {string} - Object URL for preview
 */
export const createImagePreview = (file) => {
    return URL.createObjectURL(file);
};

/**
 * Clean up object URLs to prevent memory leaks
 * @param {string} url - Object URL to revoke
 */
export const cleanupImagePreview = (url) => {
    if (url && url.startsWith('blob:')) {
        URL.revokeObjectURL(url);
    }
};

/**
 * Download text content as a file
 * @param {string} content - Text content to download
 * @param {string} filename - Name of the file
 * @param {string} mimeType - MIME type of the file
 */
export const downloadTextFile = (content, filename = 'extracted-text.txt', mimeType = 'text/plain') => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} - Success status
 */
export const copyToClipboard = async (text) => {
    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
            return true;
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            const success = document.execCommand('copy');
            document.body.removeChild(textArea);
            return success;
        }
    } catch (error) {
        console.error('Failed to copy text:', error);
        return false;
    }
};

/**
 * Format file size for display
 * @param {number} bytes - File size in bytes
 * @returns {string} - Formatted file size
 */
export const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Get file extension from filename
 * @param {string} filename - The filename
 * @returns {string} - File extension
 */
export const getFileExtension = (filename) => {
    return filename.split('.').pop().toLowerCase();
};
