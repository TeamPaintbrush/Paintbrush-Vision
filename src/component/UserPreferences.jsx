import React, { useState, useEffect } from 'react';
import { useDarkMode } from './DarkModeContext';
import { useLocalStorage } from '../hooks/useAccessibility';
import { AccessibleButton, AccessibleInput } from './AccessibleUI';
import { useToast } from '../context/ToastContext';

const UserPreferences = ({ isOpen, onClose }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { showSuccess, showInfo } = useToast();
  
  // User preferences with localStorage
  const [preferences, setPreferences] = useLocalStorage('userPreferences', {
    // Accessibility preferences
    reduceMotion: false,
    highContrast: false,
    largeText: false,
    screenReaderOptimized: false,
    
    // Interface preferences
    compactMode: false,
    showTooltips: true,
    autoSave: true,
    confirmActions: true,
    
    // Performance preferences
    imageQuality: 'high',
    enableAnimations: true,
    lazyLoading: true,
    
    // Privacy preferences
    analyticsEnabled: true,
    errorReporting: true,
    
    // Editor preferences
    defaultImageFormat: 'png',
    maxUndoSteps: 50,
    autoPreview: true,
    showGrid: false,
    snapToGrid: false,
    gridSize: 10
  });

  const [tempPreferences, setTempPreferences] = useState(preferences);

  useEffect(() => {
    // Apply preferences to document
    const root = document.documentElement;
    
    if (tempPreferences.reduceMotion) {
      root.style.setProperty('--animation-duration', '0.01ms');
    } else {
      root.style.removeProperty('--animation-duration');
    }
    
    if (tempPreferences.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    
    if (tempPreferences.largeText) {
      root.classList.add('large-text');
    } else {
      root.classList.remove('large-text');
    }
    
    if (tempPreferences.compactMode) {
      root.classList.add('compact-mode');
    } else {
      root.classList.remove('compact-mode');
    }
  }, [tempPreferences]);

  const handlePreferenceChange = (key, value) => {
    setTempPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const savePreferences = () => {
    setPreferences(tempPreferences);
    showSuccess('Preferences saved successfully!');
    onClose();
  };

  const resetToDefaults = () => {
    const defaultPrefs = {
      reduceMotion: false,
      highContrast: false,
      largeText: false,
      screenReaderOptimized: false,
      compactMode: false,
      showTooltips: true,
      autoSave: true,
      confirmActions: true,
      imageQuality: 'high',
      enableAnimations: true,
      lazyLoading: true,
      analyticsEnabled: true,
      errorReporting: true,
      defaultImageFormat: 'png',
      maxUndoSteps: 50,
      autoPreview: true,
      showGrid: false,
      snapToGrid: false,
      gridSize: 10
    };
    
    setTempPreferences(defaultPrefs);
    showInfo('Preferences reset to defaults');
  };

  if (!isOpen) return null;

  return (
    <div 
      className="modal fade show d-block" 
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      role="dialog"
      aria-labelledby="preferences-title"
      aria-modal="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="preferences-title">
              <i className="fas fa-cog me-2" aria-hidden="true"></i>
              User Preferences
            </h5>
            <AccessibleButton
              onClick={onClose}
              variant="outline"
              size="small"
              ariaLabel="Close preferences dialog"
              className="btn-close"
            />
          </div>
          
          <div className="modal-body">
            {/* Accessibility Section */}
            <div className="preferences-section mb-4">
              <h6 className="fw-bold mb-3">
                <i className="fas fa-universal-access me-2" aria-hidden="true"></i>
                Accessibility
              </h6>
              
              <div className="row">
                <div className="col-md-6">
                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="reduceMotion"
                      checked={tempPreferences.reduceMotion}
                      onChange={(e) => handlePreferenceChange('reduceMotion', e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="reduceMotion">
                      Reduce motion
                    </label>
                    <div className="form-text">Minimize animations and transitions</div>
                  </div>
                  
                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="highContrast"
                      checked={tempPreferences.highContrast}
                      onChange={(e) => handlePreferenceChange('highContrast', e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="highContrast">
                      High contrast mode
                    </label>
                    <div className="form-text">Increase color contrast for better visibility</div>
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="largeText"
                      checked={tempPreferences.largeText}
                      onChange={(e) => handlePreferenceChange('largeText', e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="largeText">
                      Large text
                    </label>
                    <div className="form-text">Increase default text size</div>
                  </div>
                  
                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="screenReaderOptimized"
                      checked={tempPreferences.screenReaderOptimized}
                      onChange={(e) => handlePreferenceChange('screenReaderOptimized', e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="screenReaderOptimized">
                      Screen reader optimized
                    </label>
                    <div className="form-text">Enhanced support for screen readers</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interface Section */}
            <div className="preferences-section mb-4">
              <h6 className="fw-bold mb-3">
                <i className="fas fa-desktop me-2" aria-hidden="true"></i>
                Interface
              </h6>
              
              <div className="row">
                <div className="col-md-6">
                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="darkMode"
                      checked={isDarkMode}
                      onChange={toggleDarkMode}
                    />
                    <label className="form-check-label" htmlFor="darkMode">
                      Dark mode
                    </label>
                    <div className="form-text">Use dark color scheme</div>
                  </div>
                  
                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="compactMode"
                      checked={tempPreferences.compactMode}
                      onChange={(e) => handlePreferenceChange('compactMode', e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="compactMode">
                      Compact mode
                    </label>
                    <div className="form-text">Reduce spacing between elements</div>
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="showTooltips"
                      checked={tempPreferences.showTooltips}
                      onChange={(e) => handlePreferenceChange('showTooltips', e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="showTooltips">
                      Show tooltips
                    </label>
                    <div className="form-text">Display helpful tooltips on hover</div>
                  </div>
                  
                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="confirmActions"
                      checked={tempPreferences.confirmActions}
                      onChange={(e) => handlePreferenceChange('confirmActions', e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="confirmActions">
                      Confirm destructive actions
                    </label>
                    <div className="form-text">Ask for confirmation before deleting or resetting</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Editor Section */}
            <div className="preferences-section mb-4">
              <h6 className="fw-bold mb-3">
                <i className="fas fa-edit me-2" aria-hidden="true"></i>
                Editor
              </h6>
              
              <div className="row">
                <div className="col-md-6">                  <div className="mb-3">
                    <label htmlFor="defaultImageFormat" className="form-label">
                      Default image format
                    </label>
                    <select
                      id="defaultImageFormat"
                      className="form-select"
                      value={tempPreferences.defaultImageFormat}
                      onChange={(e) => handlePreferenceChange('defaultImageFormat', e.target.value)}
                      aria-describedby="defaultImageFormat-help"
                    >
                      <option value="png">PNG</option>
                      <option value="jpeg">JPEG</option>
                      <option value="webp">WebP</option>
                    </select>
                    <div id="defaultImageFormat-help" className="form-text">
                      Default format for saving images
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="maxUndoSteps" className="form-label">
                      Maximum undo steps
                    </label>
                    <input
                      id="maxUndoSteps"
                      type="number"
                      min="10"
                      max="100"
                      className="form-control"
                      value={tempPreferences.maxUndoSteps}
                      onChange={(e) => handlePreferenceChange('maxUndoSteps', parseInt(e.target.value))}
                      aria-describedby="maxUndoSteps-help"
                    />
                    <div id="maxUndoSteps-help" className="form-text">
                      Number of actions that can be undone
                    </div>
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="autoPreview"
                      checked={tempPreferences.autoPreview}
                      onChange={(e) => handlePreferenceChange('autoPreview', e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="autoPreview">
                      Auto preview changes
                    </label>
                    <div className="form-text">Automatically preview filter changes</div>
                  </div>
                  
                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="autoSave"
                      checked={tempPreferences.autoSave}
                      onChange={(e) => handlePreferenceChange('autoSave', e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="autoSave">
                      Auto save progress
                    </label>
                    <div className="form-text">Automatically save your work</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Section */}
            <div className="preferences-section mb-4">
              <h6 className="fw-bold mb-3">
                <i className="fas fa-tachometer-alt me-2" aria-hidden="true"></i>
                Performance
              </h6>
              
              <div className="row">                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="imageQuality" className="form-label">
                      Image quality
                    </label>
                    <select
                      id="imageQuality"
                      className="form-select"
                      value={tempPreferences.imageQuality}
                      onChange={(e) => handlePreferenceChange('imageQuality', e.target.value)}
                      aria-describedby="imageQuality-help"
                    >
                      <option value="low">Low (faster)</option>
                      <option value="medium">Medium</option>
                      <option value="high">High (slower)</option>
                    </select>
                    <div id="imageQuality-help" className="form-text">
                      Balance between quality and performance
                    </div>
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="enableAnimations"
                      checked={tempPreferences.enableAnimations}
                      onChange={(e) => handlePreferenceChange('enableAnimations', e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="enableAnimations">
                      Enable animations
                    </label>
                    <div className="form-text">Show smooth transitions and animations</div>
                  </div>
                  
                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="lazyLoading"
                      checked={tempPreferences.lazyLoading}
                      onChange={(e) => handlePreferenceChange('lazyLoading', e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="lazyLoading">
                      Lazy loading
                    </label>
                    <div className="form-text">Load images only when needed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="modal-footer">
            <div className="d-flex gap-2 w-100 justify-content-between">
              <AccessibleButton
                onClick={resetToDefaults}
                variant="outline"
                ariaLabel="Reset all preferences to default values"
              >
                <i className="fas fa-undo me-1" aria-hidden="true"></i>
                Reset to Defaults
              </AccessibleButton>
              
              <div className="d-flex gap-2">
                <AccessibleButton
                  onClick={onClose}
                  variant="secondary"
                  ariaLabel="Cancel changes and close dialog"
                >
                  Cancel
                </AccessibleButton>
                <AccessibleButton
                  onClick={savePreferences}
                  variant="primary"
                  ariaLabel="Save preferences and close dialog"
                >
                  <i className="fas fa-save me-1" aria-hidden="true"></i>
                  Save Preferences
                </AccessibleButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPreferences;
