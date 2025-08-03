import React, { useState } from 'react';
import { AccessibleButton } from './AccessibleUI';

const HelpSystem = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('shortcuts');

  const keyboardShortcuts = [
    {
      category: 'File Operations',
      shortcuts: [
        { key: 'Ctrl + O', description: 'Open image file' },
        { key: 'Ctrl + S', description: 'Download current image' },
        { key: 'Ctrl + Shift + S', description: 'Download as different format' }
      ]
    },
    {
      category: 'Editing',
      shortcuts: [
        { key: 'Ctrl + Z', description: 'Undo last action' },
        { key: 'Ctrl + Y', description: 'Redo last undone action' },
        { key: 'Ctrl + Shift + Z', description: 'Redo (alternative)' },
        { key: 'Ctrl + R', description: 'Reset image to original' },
        { key: 'R', description: 'Rotate image 90° clockwise' },
        { key: 'H', description: 'Flip image horizontally' },
        { key: 'V', description: 'Flip image vertically' }
      ]
    },
    {
      category: 'Navigation',
      shortcuts: [
        { key: 'Tab', description: 'Navigate to next interactive element' },
        { key: 'Shift + Tab', description: 'Navigate to previous interactive element' },
        { key: 'Enter', description: 'Activate focused button or control' },
        { key: 'Space', description: 'Toggle checkboxes or activate buttons' },
        { key: 'Escape', description: 'Cancel current operation or close dialogs' }
      ]
    },
    {
      category: 'Cropping',
      shortcuts: [
        { key: 'C', description: 'Start crop mode' },
        { key: 'Enter', description: 'Apply crop selection' },
        { key: 'Escape', description: 'Cancel crop mode' }
      ]
    },
    {
      category: 'Zoom and View',
      shortcuts: [
        { key: '+', description: 'Zoom in' },
        { key: '-', description: 'Zoom out' },
        { key: '0', description: 'Reset zoom to 100%' },
        { key: 'F', description: 'Fit image to screen' }
      ]
    }
  ];

  const tutorials = [
    {
      title: 'Getting Started',
      steps: [
        'Click "Choose Image" or use Ctrl+O to select an image file',
        'Your image will appear in the editor canvas',
        'Use the toolbar on the left to access editing tools',
        'Adjust filters using the sliders on the right panel',
        'Download your edited image using the download buttons'
      ]
    },
    {
      title: 'Basic Image Editing',
      steps: [
        'Upload an image using the file picker',
        'Adjust brightness, contrast, and saturation using the filter sliders',
        'Rotate or flip your image using the transform buttons',
        'Use the zoom slider to get a closer look at details',
        'Click "Reset" to return to the original image at any time'
      ]
    },
    {
      title: 'Cropping Images',
      steps: [
        'Click "Start Crop" to enter crop mode',
        'Click and drag on the image to select the area you want to keep',
        'Adjust the selection by dragging the corners',
        'Click "Apply Crop" to crop the image',
        'Click "Cancel" or press Escape to exit crop mode without cropping'
      ]
    },
    {
      title: 'Using Filters',
      steps: [
        'Use the Brightness slider to make your image lighter or darker',
        'Adjust Contrast to make colors more or less vivid',
        'Change Saturation to make colors more vibrant or muted',
        'Apply Blur for a soft focus effect',
        'Use Sepia for a vintage, brown-toned look',
        'Adjust Grayscale to remove color partially or completely',
        'Rotate Hue to shift all colors in the image'
      ]
    },
    {
      title: 'Undo and Redo',
      steps: [
        'Every action you take is automatically saved to history',
        'Click "Undo" or press Ctrl+Z to reverse your last action',
        'Click "Redo" or press Ctrl+Y to reapply an undone action',
        'You can undo up to 50 actions (configurable in preferences)',
        'The undo history is cleared when you load a new image'
      ]
    },
    {
      title: 'Accessibility Features',
      steps: [
        'Use Tab and Shift+Tab to navigate between controls',
        'All controls have keyboard equivalents - check the shortcuts tab',
        'Screen readers will announce control names and values',
        'High contrast mode is available in preferences',
        'Text size can be increased in the preferences',
        'Motion can be reduced for users with vestibular disorders'
      ]
    }
  ];

  const troubleshooting = [
    {
      problem: 'Image won\'t load',
      solutions: [
        'Make sure the file is a supported image format (JPG, PNG, GIF, WebP)',
        'Check that the file size is under 10MB',
        'Try refreshing the page and uploading again',
        'Make sure your internet connection is stable'
      ]
    },
    {
      problem: 'Filters are not applying',
      solutions: [
        'Make sure you have an image loaded first',
        'Try refreshing the page if filters seem stuck',
        'Check that JavaScript is enabled in your browser',
        'Clear your browser cache and try again'
      ]
    },
    {
      problem: 'Undo/Redo not working',
      solutions: [
        'Make sure you have made changes to undo',
        'Try using keyboard shortcuts (Ctrl+Z for undo)',
        'Check that you haven\'t reached the history limit',
        'Refresh the page if the feature seems stuck'
      ]
    },
    {
      problem: 'Download not working',
      solutions: [
        'Make sure pop-ups are not blocked in your browser',
        'Try right-clicking the download button and selecting "Save link as"',
        'Check your browser\'s download settings',
        'Try a different image format (PNG, JPEG, WebP)'
      ]
    },
    {
      problem: 'Performance issues',
      solutions: [
        'Try using a smaller image (resize before uploading)',
        'Close other browser tabs to free up memory',
        'Reduce image quality in preferences',
        'Disable animations in preferences if needed',
        'Use a more recent browser version'
      ]
    }
  ];

  if (!isOpen) return null;

  return (
    <div 
      className="modal fade show d-block" 
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      role="dialog"
      aria-labelledby="help-title"
      aria-modal="true"
    >
      <div className="modal-dialog modal-xl modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="help-title">
              <i className="fas fa-question-circle me-2" aria-hidden="true"></i>
              Help & Documentation
            </h5>
            <AccessibleButton
              onClick={onClose}
              variant="outline"
              size="small"
              ariaLabel="Close help dialog"
              className="btn-close"
            />
          </div>
          
          <div className="modal-body p-0">
            {/* Tab Navigation */}
            <div className="nav nav-tabs" role="tablist">
              <button
                className={`nav-link ${activeTab === 'shortcuts' ? 'active' : ''}`}
                onClick={() => setActiveTab('shortcuts')}
                role="tab"
                aria-selected={activeTab === 'shortcuts'}
                aria-controls="shortcuts-panel"
              >
                <i className="fas fa-keyboard me-1" aria-hidden="true"></i>
                Keyboard Shortcuts
              </button>
              <button
                className={`nav-link ${activeTab === 'tutorials' ? 'active' : ''}`}
                onClick={() => setActiveTab('tutorials')}
                role="tab"
                aria-selected={activeTab === 'tutorials'}
                aria-controls="tutorials-panel"
              >
                <i className="fas fa-graduation-cap me-1" aria-hidden="true"></i>
                Tutorials
              </button>
              <button
                className={`nav-link ${activeTab === 'troubleshooting' ? 'active' : ''}`}
                onClick={() => setActiveTab('troubleshooting')}
                role="tab"
                aria-selected={activeTab === 'troubleshooting'}
                aria-controls="troubleshooting-panel"
              >
                <i className="fas fa-tools me-1" aria-hidden="true"></i>
                Troubleshooting
              </button>
            </div>

            {/* Tab Content */}
            <div className="tab-content p-4">
              {/* Keyboard Shortcuts Tab */}
              {activeTab === 'shortcuts' && (
                <div 
                  id="shortcuts-panel"
                  role="tabpanel"
                  aria-labelledby="shortcuts-tab"
                >
                  <div className="row">
                    {keyboardShortcuts.map((category, categoryIndex) => (
                      <div key={categoryIndex} className="col-md-6 mb-4">
                        <h6 className="fw-bold text-primary mb-3">
                          {category.category}
                        </h6>
                        <div className="list-group list-group-flush">
                          {category.shortcuts.map((shortcut, shortcutIndex) => (
                            <div 
                              key={shortcutIndex}
                              className="list-group-item d-flex justify-content-between align-items-center"
                            >
                              <span>{shortcut.description}</span>
                              <kbd className="bg-secondary text-white px-2 py-1 rounded">
                                {shortcut.key}
                              </kbd>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="alert alert-info mt-4">
                    <i className="fas fa-info-circle me-2" aria-hidden="true"></i>
                    <strong>Tip:</strong> These shortcuts work when the editor is focused. 
                    Some shortcuts may not work if you're typing in a text field.
                  </div>
                </div>
              )}

              {/* Tutorials Tab */}
              {activeTab === 'tutorials' && (
                <div 
                  id="tutorials-panel"
                  role="tabpanel"
                  aria-labelledby="tutorials-tab"
                >
                  <div className="accordion" id="tutorials-accordion">
                    {tutorials.map((tutorial, index) => (
                      <div key={index} className="accordion-item">
                        <h6 className="accordion-header" id={`tutorial-heading-${index}`}>
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#tutorial-collapse-${index}`}
                            aria-expanded="false"
                            aria-controls={`tutorial-collapse-${index}`}
                          >
                            {tutorial.title}
                          </button>
                        </h6>
                        <div
                          id={`tutorial-collapse-${index}`}
                          className="accordion-collapse collapse"
                          aria-labelledby={`tutorial-heading-${index}`}
                          data-bs-parent="#tutorials-accordion"
                        >
                          <div className="accordion-body">
                            <ol className="list-group list-group-numbered">
                              {tutorial.steps.map((step, stepIndex) => (
                                <li key={stepIndex} className="list-group-item">
                                  {step}
                                </li>
                              ))}
                            </ol>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Troubleshooting Tab */}
              {activeTab === 'troubleshooting' && (
                <div 
                  id="troubleshooting-panel"
                  role="tabpanel"
                  aria-labelledby="troubleshooting-tab"
                >
                  <div className="accordion" id="troubleshooting-accordion">
                    {troubleshooting.map((item, index) => (
                      <div key={index} className="accordion-item">
                        <h6 className="accordion-header" id={`trouble-heading-${index}`}>
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#trouble-collapse-${index}`}
                            aria-expanded="false"
                            aria-controls={`trouble-collapse-${index}`}
                          >
                            <i className="fas fa-exclamation-triangle me-2 text-warning" aria-hidden="true"></i>
                            {item.problem}
                          </button>
                        </h6>
                        <div
                          id={`trouble-collapse-${index}`}
                          className="accordion-collapse collapse"
                          aria-labelledby={`trouble-heading-${index}`}
                          data-bs-parent="#troubleshooting-accordion"
                        >
                          <div className="accordion-body">
                            <h6 className="text-success mb-3">
                              <i className="fas fa-lightbulb me-1" aria-hidden="true"></i>
                              Possible Solutions:
                            </h6>
                            <ul className="list-group">
                              {item.solutions.map((solution, solutionIndex) => (
                                <li key={solutionIndex} className="list-group-item">
                                  <i className="fas fa-check text-success me-2" aria-hidden="true"></i>
                                  {solution}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="alert alert-warning mt-4">
                    <i className="fas fa-question-circle me-2" aria-hidden="true"></i>
                    <strong>Still having issues?</strong> Try refreshing the page or 
                    clearing your browser cache. If problems persist, please contact support.
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="modal-footer">
            <AccessibleButton
              onClick={onClose}
              variant="primary"
              ariaLabel="Close help dialog"
            >
              <i className="fas fa-times me-1" aria-hidden="true"></i>
              Close
            </AccessibleButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSystem;
