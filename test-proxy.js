// Test the React app proxy configuration
const testProxyFromFrontend = async () => {
    console.log('🌐 Testing API from React Development Server...');
    
    try {
        // Test if the React dev server can proxy to the backend
        const response = await fetch('/api/health');
        console.log('Proxy Response Status:', response.status);
        
        if (response.status === 200) {
            const data = await response.json();
            console.log('✅ Proxy working! Backend response:', data);
        } else {
            console.log('❌ Proxy failed with status:', response.status);
            const text = await response.text();
            console.log('Error response:', text);
        }
        
    } catch (error) {
        console.log('🚨 Proxy connection error:', error.message);
    }
};

// This would be run from the browser console when React app is loaded
console.log('Copy and paste this function into your browser console when the React app loads:');
console.log('testProxyFromFrontend();');
