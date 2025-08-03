// Test text extraction with URL that contains actual text
const testTextExtraction = async () => {
    try {
        console.log('🧪 Testing text extraction with an image that contains text...');
        
        // Use a URL of an image that contains text (like a street sign or text)
        const imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Stop_sign_MUTCD.svg/800px-Stop_sign_MUTCD.svg.png';
        
        const response = await fetch('http://localhost:5000/api/image-to-text', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                image: imageUrl,
                isFile: false
            })
        });
        
        console.log('Response status:', response.status);
        
        const data = await response.json();
        console.log('Response data:', JSON.stringify(data, null, 2));
        
        if (response.status === 200) {
            console.log('✅ Text extraction test successful!');
            console.log('📝 Extracted text:', data.description);
        } else {
            console.log('❌ Text extraction test failed with status:', response.status);
        }
        
    } catch (error) {
        console.error('❌ Error during text extraction test:', error);
    }
};

testTextExtraction();
