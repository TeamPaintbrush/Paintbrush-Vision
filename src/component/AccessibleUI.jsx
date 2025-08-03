import React, { forwardRef } from 'react';

// Accessible Button Component
export const AccessibleButton = forwardRef(({ 
  children, 
  onClick, 
  disabled = false, 
  variant = 'primary',
  size = 'medium',
  ariaLabel,
  ariaDescribedBy,
  ariaPressed,
  className = '',
  type = 'button',
  loading = false,
  ...props 
}, ref) => {
  const baseClasses = 'btn focus-visible position-relative transition-all';
  
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline-primary',
    danger: 'btn-danger',
    success: 'btn-success',
    warning: 'btn-warning',
    info: 'btn-info',
    light: 'btn-light',
    dark: 'btn-dark'
  };
  
  const sizeClasses = {
    small: 'btn-sm',
    medium: '',
    large: 'btn-lg'
  };

  const finalClassName = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabled ? 'disabled' : ''} ${className}`.trim();

  return (
    <button
      ref={ref}
      type={type}
      className={finalClassName}
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-pressed={ariaPressed}
      {...props}
    >
      {loading && (
        <span 
          className="spinner-border spinner-border-sm me-2" 
          role="status" 
          aria-hidden="true"
        />
      )}
      {children}
    </button>
  );
});

AccessibleButton.displayName = 'AccessibleButton';

// Loading Spinner Component
export const LoadingSpinner = ({ 
  size = 'medium', 
  message = 'Loading...', 
  className = '',
  variant = 'primary',
  inline = false 
}) => {
  const sizeClasses = {
    small: 'spinner-border-sm',
    medium: '',
    large: 'spinner-border-lg'
  };

  const spinnerClass = `spinner-border text-${variant} ${sizeClasses[size]}`;
  const containerClass = inline ? 'd-inline-flex align-items-center' : 'd-flex flex-column align-items-center justify-content-center';

  return (
    <div 
      className={`${containerClass} ${className}`}
      role="status" 
      aria-live="polite"
    >
      <div 
        className={spinnerClass}
        aria-hidden="true"
      />
      <span className="visually-hidden">{message}</span>
      {message && !inline && (
        <p className="mt-2 text-muted small" aria-live="polite">
          {message}
        </p>
      )}
    </div>
  );
};

// Toast Notification Component
export const Toast = ({ 
  message, 
  type = 'info', 
  duration = 4000, 
  onClose,
  actions = []
}) => {
  const [isVisible, setIsVisible] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Allow fade out animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const typeClasses = {
    success: 'bg-success text-white',
    error: 'bg-danger text-white',
    warning: 'bg-warning text-dark',
    info: 'bg-info text-white'
  };

  const icons = {
    success: (
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
      </svg>
    ),
    error: (
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
      </svg>
    ),
    warning: (
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
      </svg>
    ),
    info: (
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
      </svg>
    )
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div
      className={`toast position-fixed top-0 end-0 m-3 ${typeClasses[type]} ${isVisible ? 'show' : ''}`}
      style={{ zIndex: 1055, transition: 'all 0.3s ease' }}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="toast-header">
        <span className="me-2" aria-hidden="true">
          {icons[type]}
        </span>
        <strong className="me-auto text-capitalize">{type}</strong>
        <button
          type="button"
          className="btn-close"
          onClick={handleClose}
          aria-label="Close notification"
        />
      </div>
      <div className="toast-body">
        {message}
        {actions.length > 0 && (
          <div className="mt-2 pt-2 border-top d-flex gap-2">
            {actions.map((action, index) => (
              <AccessibleButton
                key={index}
                size="small"
                variant="outline"
                onClick={action.onClick}
                className="text-white border-white"
              >
                {action.label}
              </AccessibleButton>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Accessible Input Component
export const AccessibleInput = forwardRef(({
  label,
  error,
  helpText,
  required = false,
  className = '',
  id,
  ...props
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const errorId = error ? `${inputId}-error` : undefined;
  const helpId = helpText ? `${inputId}-help` : undefined;

  return (
    <div className={`mb-3 ${className}`}>
      {label && (
        <label 
          htmlFor={inputId} 
          className={`form-label ${required ? 'required' : ''}`}
        >
          {label}
          {required && <span className="text-danger ms-1" aria-label="required">*</span>}
        </label>
      )}
      
      <input
        ref={ref}
        id={inputId}
        className={`form-control ${error ? 'is-invalid' : ''}`}
        aria-describedby={[helpId, errorId].filter(Boolean).join(' ') || undefined}
        aria-invalid={error ? 'true' : 'false'}
        {...props}
      />
      
      {helpText && (
        <div id={helpId} className="form-text">
          {helpText}
        </div>
      )}
      
      {error && (
        <div id={errorId} className="invalid-feedback" role="alert">
          {error}
        </div>
      )}
    </div>
  );
});

AccessibleInput.displayName = 'AccessibleInput';

// Skip Link Component for keyboard navigation
export const SkipLink = ({ href = '#main-content', children = 'Skip to main content' }) => {
  return (
    <a
      href={href}
      className="skip-link visually-hidden-focusable position-absolute top-0 start-0 bg-primary text-white p-2 text-decoration-none"
      style={{ zIndex: 1060 }}
    >
      {children}
    </a>
  );
};

// Progress Bar with accessibility
export const AccessibleProgressBar = ({ 
  value, 
  max = 100, 
  label, 
  showValue = true,
  variant = 'primary',
  className = '' 
}) => {
  const percentage = Math.round((value / max) * 100);
  
  return (
    <div className={`progress-container ${className}`}>
      {label && (
        <div className="d-flex justify-content-between align-items-center mb-1">
          <label className="form-label mb-0">{label}</label>
          {showValue && (
            <span className="text-muted small">{percentage}%</span>
          )}
        </div>
      )}
      <div className="progress" role="progressbar" aria-valuenow={value} aria-valuemin="0" aria-valuemax={max}>
        <div 
          className={`progress-bar bg-${variant}`}
          style={{ width: `${percentage}%` }}
        >
          <span className="visually-hidden">{percentage}% complete</span>
        </div>
      </div>
    </div>
  );
};
