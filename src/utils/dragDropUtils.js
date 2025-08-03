// Shared drag and drop utilities to reduce code duplication
import { createImagePreview, cleanupImagePreview } from './imageUtils';

export const createDragDropHandlers = (componentName, onFilesDrop) => {
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length > 0) {
      onFilesDrop(imageFiles);
    }
  };

  return {
    [`handle${componentName}DragOver`]: handleDragOver,
    [`handle${componentName}DragLeave`]: handleDragLeave,
    [`handle${componentName}Drop`]: handleDrop,
  };
};

export const createImageUploadHandler = (componentName, onImageSelect) => {
  return {
    [`handle${componentName}ImageUpload`]: (event) => {
      const file = event.target.files[0];
      if (file && file.type.startsWith('image/')) {
        onImageSelect(file);
      }
    }
  };
};

export const createClearFunction = (componentName, clearCallback) => {
  return {
    [`clear${componentName}Results`]: clearCallback
  };
};
