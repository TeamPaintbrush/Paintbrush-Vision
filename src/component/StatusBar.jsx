import React from 'react';
import { useNetworkStatus } from '../utils/performance';

const StatusBar = ({ 
  imageInfo = null, 
  zoom = 1, 
  historyPosition = { current: 0, total: 0 },
  isProcessing = false,
  lastAction = null 
}) => {
  const { isOnline, connectionType } = useNetworkStatus();

  const formatFileSize = (bytes) => {
    if (!bytes) return 'Unknown';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getConnectionIcon = () => {
    switch (connectionType) {
      case 'slow-2g':
      case '2g':
        return 'fa-signal-1';
      case '3g':
        return 'fa-signal-3';
      case '4g':
        return 'fa-signal-4';
      default:
        return 'fa-wifi';
    }
  };

  const getConnectionColor = () => {
    switch (connectionType) {
      case 'slow-2g':
      case '2g':
        return 'text-danger';
      case '3g':
        return 'text-warning';
      case '4g':
        return 'text-success';
      default:
        return 'text-primary';
    }
  };

  return (
    <div 
      className="status-bar bg-light border-top p-2 small"
      role="status"
      aria-live="polite"
      aria-label="Application status information"
    >
      <div className="container-fluid">
        <div className="row align-items-center">
          {/* Left side - Image info */}
          <div className="col-md-4">
            {imageInfo ? (
              <div className="d-flex gap-3">
                <span>
                  <i className="fas fa-image me-1" aria-hidden="true"></i>
                  {imageInfo.width} × {imageInfo.height}
                </span>
                <span>
                  <i className="fas fa-file me-1" aria-hidden="true"></i>
                  {formatFileSize(imageInfo.size)}
                </span>
                {imageInfo.format && (
                  <span>
                    <i className="fas fa-file-image me-1" aria-hidden="true"></i>
                    {imageInfo.format.toUpperCase()}
                  </span>
                )}
              </div>
            ) : (
              <span className="text-muted">No image loaded</span>
            )}
          </div>

          {/* Center - Current status */}
          <div className="col-md-4 text-center">
            {isProcessing ? (
              <div className="d-flex align-items-center justify-content-center">
                <div 
                  className="spinner-border spinner-border-sm me-2" 
                  role="status"
                  aria-hidden="true"
                />
                <span>Processing...</span>
              </div>
            ) : lastAction ? (
              <span>
                <i className="fas fa-check-circle text-success me-1" aria-hidden="true"></i>
                {lastAction}
              </span>
            ) : (
              <span className="text-muted">Ready</span>
            )}
          </div>

          {/* Right side - Zoom, history, and connection */}
          <div className="col-md-4">
            <div className="d-flex gap-3 justify-content-end align-items-center">
              {/* Zoom level */}
              {imageInfo && (
                <span>
                  <i className="fas fa-search me-1" aria-hidden="true"></i>
                  {Math.round(zoom * 100)}%
                </span>
              )}

              {/* History position */}
              {historyPosition.total > 0 && (
                <span>
                  <i className="fas fa-history me-1" aria-hidden="true"></i>
                  {historyPosition.current}/{historyPosition.total}
                </span>
              )}

              {/* Connection status */}
              <div className="d-flex align-items-center">
                <i 
                  className={`fas ${getConnectionIcon()} ${getConnectionColor()} me-1`}
                  aria-hidden="true"
                />
                <span 
                  className={`status-indicator ${isOnline ? 'online' : 'offline'}`}
                  title={`Connection: ${isOnline ? 'Online' : 'Offline'}${connectionType ? ` (${connectionType})` : ''}`}
                >
                  {isOnline ? 'Online' : 'Offline'}
                </span>
                {connectionType && connectionType !== 'unknown' && (
                  <span className={`connection-indicator ms-1 ${
                    ['slow-2g', '2g'].includes(connectionType) ? 'connection-slow' : 
                    ['4g'].includes(connectionType) ? 'connection-fast' : ''
                  }`}>
                    {connectionType.toUpperCase()}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
