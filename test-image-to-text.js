// Test script for Image-to-Text functionality
const https = require('https');
const http = require('http');
require('dotenv').config();

const API_URL = 'http://localhost:5000';

function makeRequest(url, options, data) {
    return new Promise((resolve, reject) => {
        const req = http.request(url, options, (res) => {
            let responseData = '';
            res.on('data', chunk => responseData += chunk);
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(responseData);
                    resolve({ status: res.statusCode, data: parsed });
                } catch (e) {
                    resolve({ status: res.statusCode, data: responseData });
                }
            });
        });
        
        req.on('error', reject);
        
        if (data) {
            req.write(JSON.stringify(data));
        }
        req.end();
    });
}

async function testImageAnalysis() {
    console.log('🧪 Testing Image-to-Text functionality...\n');
    
    // Test with a simple image URL
    const testImageUrl = 'https://via.placeholder.com/300x200/0066CC/ffffff?text=Hello+World+Test+Image';
      try {
        console.log('📸 Testing URL-based image analysis...');
        const response = await makeRequest(`${API_URL}/api/image-to-text`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }, {
            image: testImageUrl,
            isFile: false
        });
        
        if (response.status === 200) {
            console.log('✅ Image analysis successful!');
            console.log('📝 Description:', response.data.description);
            console.log('📊 Timestamp:', response.data.timestamp);
            if (response.data.extractedText) {
                console.log('🔤 Extracted text:', response.data.extractedText);
            }
        } else {
            console.log('❌ Image analysis failed:', response.data);
        }
    } catch (error) {
        console.log('❌ Network error:', error.message);
    }
    
    console.log('\n🧪 Testing OCR functionality...');
      try {
        const ocrResponse = await makeRequest(`${API_URL}/api/ocr-extract`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }, {
            image: testImageUrl,
            isFile: false,
            languages: 'en'
        });
        
        if (ocrResponse.status === 200) {
            console.log('✅ OCR extraction successful!');
            console.log('🔤 Extracted text:', ocrResponse.data.text);
            console.log('📊 Confidence:', ocrResponse.data.confidence + '%');
        } else {
            console.log('❌ OCR extraction failed:', ocrResponse.data);
        }
    } catch (error) {
        console.log('❌ OCR network error:', error.message);
    }
}

// Run the test
if (require.main === module) {
    testImageAnalysis();
}

module.exports = { testImageAnalysis };
