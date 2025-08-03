// Test URL image processing specifically
const testURLImage = async () => {
    try {
        console.log('🌐 Testing URL image processing...');
        
        const testImageUrl = 'https://httpbin.org/image/png';
        
        console.log('📸 Testing URL:', testImageUrl);
        
        const response = await fetch('http://localhost:5000/api/image-to-text', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                image: testImageUrl,
                isFile: false
            })
        });
        
        console.log('Response status:', response.status);
        
        const data = await response.json();
        console.log('Response data:', JSON.stringify(data, null, 2));
        
    } catch (error) {
        console.error('❌ Error:', error);
    }
};

testURLImage();
