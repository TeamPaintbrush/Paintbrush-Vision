# Function Naming Convention Guide

## Component-Specific Function Naming

### ImageToTextVision.jsx
- `handleVisionDragOver()` → instead of `handleDragOver()`
- `handleVisionDragLeave()` → instead of `handleDragLeave()`
- `handleVisionDrop()` → instead of `handleDrop()`
- `clearVisionResults()` → instead of `clearAll()`

### OCRTextExtractor.jsx
- `handleOCRDragOver()` → instead of `handleDragOver()`
- `handleOCRDragLeave()` → instead of `handleDragLeave()`
- `handleOCRDrop()` → instead of `handleDrop()`
- `clearOCRResults()` → instead of `clearAll()`

### GenerativeTextProcessor.jsx
- `handleGenerativeDragOver()` → instead of `handleDragOver()`
- `handleGenerativeDragLeave()` → instead of `handleDragLeave()`
- `handleGenerativeDrop()` → instead of `handleDrop()`
- `clearGenerativeResults()` → instead of `clearAll()`

### BatchImageProcessor.jsx
- `handleBatchDragOver()` → instead of `handleDragOver()`
- `handleBatchDragLeave()` → instead of `handleDragLeave()`
- `handleBatchDrop()` → instead of `handleDrop()`
- `clearBatchResults()` → instead of `clearAll()`

## Benefits
1. **Easier Debugging**: Clear identification of which component's function is executing
2. **Better Code Search**: More specific function names for codebase navigation
3. **Reduced Maintenance**: Less confusion when updating shared functionality
4. **IDE Support**: Better auto-complete and go-to-definition functionality
