// New Features page to showcase all the enhanced capabilities
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BatchImageProcessor from '../component/BatchImageProcessor';
import OCRTextExtractor from '../component/OCRTextExtractor';
import ImageEditor from '../component/ImageEditor';
import ImageToTextVision from '../component/ImageToTextVision';
import './FeaturesPage.css';

const FeaturesPage = () => {
    const [activeTab, setActiveTab] = useState('vision');

    const features = [
        {
            id: 'vision',
            title: 'AI Vision Analysis',
            icon: 'fas fa-eye',
            description: 'Advanced image analysis with AI-powered descriptions',
            component: <ImageToTextVision />
        },
        {
            id: 'ocr',
            title: 'OCR Text Extraction',
            icon: 'fas fa-text-height',
            description: 'Extract text from images with high accuracy',
            component: <OCRTextExtractor />
        },
        {
            id: 'batch',
            title: 'Batch Processing',
            icon: 'fas fa-layer-group',
            description: 'Process multiple images simultaneously',
            component: <BatchImageProcessor />
        },
        {
            id: 'editor',
            title: 'Image Editor',
            icon: 'fas fa-edit',
            description: 'Professional image editing tools',
            component: <ImageEditor />
        }
    ];

    return (
        <div className="features-page">
            {/* Header */}
            <div className="features-header">
                <div className="container">
                    <Link to="/" className="back-link">
                        <i className="fas fa-arrow-left"></i>
                        Back to Home
                    </Link>
                    <div className="header-content">
                        <h1>Paintbrush Vision Features</h1>
                        <p>Explore our comprehensive suite of AI-powered image processing tools</p>
                    </div>
                </div>
            </div>

            {/* Feature Navigation */}
            <div className="feature-nav">
                <div className="container">
                    <div className="nav-tabs">
                        {features.map(feature => (
                            <button
                                key={feature.id}
                                className={`nav-tab ${activeTab === feature.id ? 'active' : ''}`}
                                onClick={() => setActiveTab(feature.id)}
                            >
                                <i className={feature.icon}></i>
                                <span>{feature.title}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Feature Content */}
            <div className="feature-content">
                <div className="container">
                    {features.map(feature => (
                        <div
                            key={feature.id}
                            className={`feature-panel ${activeTab === feature.id ? 'active' : ''}`}
                        >
                            <div className="feature-info">
                                <div className="feature-title">
                                    <i className={feature.icon}></i>
                                    <h2>{feature.title}</h2>
                                </div>
                                <p>{feature.description}</p>
                            </div>
                            
                            <div className="feature-component">
                                {activeTab === feature.id && feature.component}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Stats */}
            <div className="quick-stats">
                <div className="container">
                    <div className="stats-grid">
                        <div className="stat-item">
                            <i className="fas fa-image"></i>
                            <h3>10K+</h3>
                            <p>Images Processed</p>
                        </div>
                        <div className="stat-item">
                            <i className="fas fa-users"></i>
                            <h3>500+</h3>
                            <p>Active Users</p>
                        </div>
                        <div className="stat-item">
                            <i className="fas fa-clock"></i>
                            <h3>2.3s</h3>
                            <p>Average Processing Time</p>
                        </div>
                        <div className="stat-item">
                            <i className="fas fa-check-circle"></i>
                            <h3>99.9%</h3>
                            <p>Uptime</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeaturesPage;
