// Test OCR endpoint directly
const testOCR = async () => {
    try {
        console.log('🧪 Testing OCR endpoint with valid image data...');
        
        // Create a simple 1x1 pixel PNG base64 image for testing
        const testBase64Image = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==';
        
        const response = await fetch('http://localhost:5000/api/ocr-extract', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                image: testBase64Image,
                isFile: true
            })
        });
        
        console.log('Response status:', response.status);
        
        const data = await response.json();
        console.log('Response data:', JSON.stringify(data, null, 2));
        
        if (response.status === 200) {
            console.log('✅ OCR test successful!');
            console.log('📝 Extracted text:', data.text);
        } else {
            console.log('❌ OCR test failed with status:', response.status);
        }
        
    } catch (error) {
        console.error('❌ Error during OCR test:', error);
    }
};

testOCR();
