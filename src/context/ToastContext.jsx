import React, { createContext, useContext, useState, useCallback } from 'react';
import { Toast } from '../component/AccessibleUI';

const ToastContext = createContext();

export const ToastProvider = ({ children, maxToasts = 5 }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', options = {}) => {
    const id = Date.now() + Math.random();
    const toast = {
      id,
      message,
      type,
      duration: options.duration || 4000,
      actions: options.actions || []
    };

    setToasts(prev => {
      const newToasts = [...prev, toast];
      // Limit the number of toasts
      if (newToasts.length > maxToasts) {
        return newToasts.slice(-maxToasts);
      }
      return newToasts;
    });

    return id;
  }, [maxToasts]);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const clearAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  // Convenience methods
  const showSuccess = useCallback((message, options) => 
    addToast(message, 'success', options), [addToast]);
  
  const showError = useCallback((message, options) => 
    addToast(message, 'error', options), [addToast]);
  
  const showWarning = useCallback((message, options) => 
    addToast(message, 'warning', options), [addToast]);
  
  const showInfo = useCallback((message, options) => 
    addToast(message, 'info', options), [addToast]);

  return (
    <ToastContext.Provider 
      value={{ 
        addToast, 
        removeToast, 
        clearAllToasts,
        showSuccess,
        showError,
        showWarning,
        showInfo
      }}
    >
      {children}
      
      {/* Toast Container */}
      <div 
        className="toast-container position-fixed top-0 end-0 p-3"
        style={{ zIndex: 1055 }}
        aria-live="polite"
        aria-label="Notifications"
      >
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            actions={toast.actions}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
