// Comprehensive connectivity test
const testSystemConnectivity = async () => {
    console.log('🔍 COMPREHENSIVE SYSTEM CONNECTIVITY TEST\n');
    
    const tests = [
        {
            name: 'Backend Health Check',
            url: 'http://localhost:5000/api/health',
            method: 'GET'
        },
        {
            name: 'Backend Debug Endpoint',
            url: 'http://localhost:5000/api/debug', 
            method: 'GET'
        },
        {
            name: 'Frontend React App',
            url: 'http://localhost:3005',
            method: 'GET'
        },
        {
            name: 'Image-to-Text API (Direct)',
            url: 'http://localhost:5000/api/image-to-text',
            method: 'POST',
            body: {
                image: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==',
                isFile: true
            }
        }
    ];

    for (const test of tests) {
        try {
            console.log(`🧪 Testing: ${test.name}...`);
            
            const options = {
                method: test.method,
                headers: test.method === 'POST' ? { 'Content-Type': 'application/json' } : {}
            };
            
            if (test.body) {
                options.body = JSON.stringify(test.body);
            }
            
            const response = await fetch(test.url, options);
            const contentType = response.headers.get('content-type');
            
            console.log(`   Status: ${response.status}`);
            console.log(`   Content-Type: ${contentType}`);
            
            if (response.status === 200) {
                console.log(`   ✅ ${test.name}: SUCCESS\n`);
            } else {
                console.log(`   ❌ ${test.name}: FAILED`);
                
                if (contentType && contentType.includes('application/json')) {
                    const errorData = await response.json();
                    console.log(`   Error: ${JSON.stringify(errorData, null, 2)}\n`);
                } else {
                    const errorText = await response.text();
                    console.log(`   Error: ${errorText.substring(0, 200)}...\n`);
                }
            }
            
        } catch (error) {
            console.log(`   🚨 ${test.name}: CONNECTION ERROR`);
            console.log(`   Error: ${error.message}\n`);
        }
    }
    
    console.log('🎯 TEST COMPLETE - If all tests pass, your system is fully operational!');
    console.log('📝 NOTE: If you see 404 errors, ensure both servers are running:');
    console.log('   - Backend: http://localhost:5000 (npm run server)');
    console.log('   - Frontend: http://localhost:3005 (npm run start)');
    console.log('   - Full dev: npm run dev (runs both)');
};

testSystemConnectivity().catch(console.error);
