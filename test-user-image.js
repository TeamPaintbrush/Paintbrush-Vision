const fs = require('fs');
const path = require('path');

// Test the OCR extraction with the user's image
async function testUserImage() {
    try {
        // Create a base64 image with text content
        // This represents the gummies label image shared by the user
        const testImageB64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="; // Placeholder - actual test

        console.log('🧪 Testing OCR extraction with user image...');
        const response = await fetch('http://localhost:5000/api/ocr-extract', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                image: testImageB64,
                isFile: true,
                languages: 'en'
            }),
        });

        console.log('Response status:', response.status);
        
        if (response.ok) {
            const data = await response.json();
            console.log('Response data:', JSON.stringify(data, null, 2));
            console.log('✅ OCR test successful!');
            console.log('📝 Extracted text:', data.text);
            console.log('🎯 Confidence:', data.confidence);
        } else {
            const errorText = await response.text();
            console.error('❌ OCR test failed:', response.status, errorText);
        }
    } catch (error) {
        console.error('❌ Test error:', error.message);
    }
}

testUserImage();
