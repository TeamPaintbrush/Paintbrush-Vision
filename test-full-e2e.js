// Comprehensive End-to-End API Testing Suite
const testAPIEndpoints = async () => {
    const API_BASE = 'http://localhost:5000';
    const testResults = [];
    
    // Valid test base64 image (1x1 yellow pixel)
    const testBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==';
    
    console.log('🚀 Starting Comprehensive End-to-End API Testing\n');

    // Test 1: Health Check
    console.log('🏥 Testing Health Check...');
    try {
        const response = await fetch(`${API_BASE}/api/health`);
        const data = await response.json();
        
        if (response.status === 200 && data.status === 'OK') {
            console.log('✅ Health Check: PASSED');
            testResults.push({ test: 'Health Check', status: 'PASSED', response: data });
        } else {
            console.log('❌ Health Check: FAILED');
            testResults.push({ test: 'Health Check', status: 'FAILED', error: 'Unexpected response' });
        }
    } catch (error) {
        console.log('❌ Health Check: ERROR -', error.message);
        testResults.push({ test: 'Health Check', status: 'ERROR', error: error.message });
    }

    // Test 2: Debug Endpoint
    console.log('🔧 Testing Debug Endpoint...');
    try {
        const response = await fetch(`${API_BASE}/api/debug`);
        const data = await response.json();
        
        if (response.status === 200 && data.message === 'Connection successful') {
            console.log('✅ Debug Endpoint: PASSED');
            testResults.push({ test: 'Debug Endpoint', status: 'PASSED', response: data });
        } else {
            console.log('❌ Debug Endpoint: FAILED');
            testResults.push({ test: 'Debug Endpoint', status: 'FAILED', error: 'Unexpected response' });
        }
    } catch (error) {
        console.log('❌ Debug Endpoint: ERROR -', error.message);
        testResults.push({ test: 'Debug Endpoint', status: 'ERROR', error: error.message });
    }

    // Test 3: Image-to-Text with Base64
    console.log('🖼️ Testing Image-to-Text (Base64)...');
    try {
        const response = await fetch(`${API_BASE}/api/image-to-text`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                image: testBase64,
                isFile: true
            })
        });
        const data = await response.json();
        
        if (response.status === 200 && data.success) {
            console.log('✅ Image-to-Text (Base64): PASSED');
            console.log('  📝 Description:', data.description.substring(0, 100) + '...');
            testResults.push({ test: 'Image-to-Text (Base64)', status: 'PASSED', response: data });
        } else {
            console.log('❌ Image-to-Text (Base64): FAILED -', data.error || 'Unknown error');
            testResults.push({ test: 'Image-to-Text (Base64)', status: 'FAILED', error: data.error });
        }
    } catch (error) {
        console.log('❌ Image-to-Text (Base64): ERROR -', error.message);
        testResults.push({ test: 'Image-to-Text (Base64)', status: 'ERROR', error: error.message });
    }

    // Test 4: Image-to-Text with URL
    console.log('🌐 Testing Image-to-Text (URL)...');
    try {
        const testImageUrl = 'https://httpbin.org/image/png';
        const response = await fetch(`${API_BASE}/api/image-to-text`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                image: testImageUrl,
                isFile: false
            })
        });
        const data = await response.json();
        
        if (response.status === 200 && data.success) {
            console.log('✅ Image-to-Text (URL): PASSED');
            console.log('  📝 Description:', data.description.substring(0, 100) + '...');
            testResults.push({ test: 'Image-to-Text (URL)', status: 'PASSED', response: data });
        } else {
            console.log('❌ Image-to-Text (URL): FAILED -', data.error || 'Unknown error');
            testResults.push({ test: 'Image-to-Text (URL)', status: 'FAILED', error: data.error });
        }
    } catch (error) {
        console.log('❌ Image-to-Text (URL): ERROR -', error.message);
        testResults.push({ test: 'Image-to-Text (URL)', status: 'ERROR', error: error.message });
    }

    // Test 5: OCR Extract
    console.log('📝 Testing OCR Extract...');
    try {
        const response = await fetch(`${API_BASE}/api/ocr-extract`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                image: testBase64,
                isFile: true,
                languages: 'en'
            })
        });
        const data = await response.json();
        
        if (response.status === 200 && data.success !== false) {
            console.log('✅ OCR Extract: PASSED');
            console.log('  📝 Extracted text:', data.text || 'No text detected');
            testResults.push({ test: 'OCR Extract', status: 'PASSED', response: data });
        } else {
            console.log('❌ OCR Extract: FAILED -', data.error || 'Unknown error');
            testResults.push({ test: 'OCR Extract', status: 'FAILED', error: data.error });
        }
    } catch (error) {
        console.log('❌ OCR Extract: ERROR -', error.message);
        testResults.push({ test: 'OCR Extract', status: 'ERROR', error: error.message });
    }

    // Test 6: Image Convert
    console.log('🔄 Testing Image Convert...');
    try {
        const response = await fetch(`${API_BASE}/api/image-convert/convert`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                image: `data:image/png;base64,${testBase64}`,
                fromFormat: 'png',
                toFormat: 'jpeg',
                quality: 80
            })
        });
        const data = await response.json();
        
        if (response.status === 200 && data.convertedImage) {
            console.log('✅ Image Convert: PASSED');
            console.log('  🔧 Converted from PNG to JPEG');
            testResults.push({ test: 'Image Convert', status: 'PASSED', response: { format: data.format, quality: data.quality } });
        } else {
            console.log('❌ Image Convert: FAILED -', data.error || 'Unknown error');
            testResults.push({ test: 'Image Convert', status: 'FAILED', error: data.error });
        }
    } catch (error) {
        console.log('❌ Image Convert: ERROR -', error.message);
        testResults.push({ test: 'Image Convert', status: 'ERROR', error: error.message });
    }

    // Test 7: Batch Process
    console.log('📦 Testing Batch Process...');
    try {
        const response = await fetch(`${API_BASE}/api/batch-process`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                images: [testBase64, testBase64],
                mode: 'analyze'
            })
        });
        const data = await response.json();
        
        if (response.status === 200 && data.jobId) {
            console.log('✅ Batch Process: PASSED');
            console.log('  📋 Job ID:', data.jobId);
            console.log('  ⏱️ Estimated time:', data.estimatedTime);
            testResults.push({ test: 'Batch Process', status: 'PASSED', response: data });
        } else {
            console.log('❌ Batch Process: FAILED -', data.error || 'Unknown error');
            testResults.push({ test: 'Batch Process', status: 'FAILED', error: data.error });
        }
    } catch (error) {
        console.log('❌ Batch Process: ERROR -', error.message);
        testResults.push({ test: 'Batch Process', status: 'ERROR', error: error.message });
    }

    // Test 8: Invalid Endpoint (404 Test)
    console.log('🚫 Testing Invalid Endpoint...');
    try {
        const response = await fetch(`${API_BASE}/api/nonexistent`);
        const data = await response.json();
        
        if (response.status === 404 && data.error) {
            console.log('✅ Invalid Endpoint: PASSED (correctly returns 404)');
            testResults.push({ test: 'Invalid Endpoint', status: 'PASSED', response: data });
        } else {
            console.log('❌ Invalid Endpoint: FAILED - Should return 404');
            testResults.push({ test: 'Invalid Endpoint', status: 'FAILED', error: 'Should return 404' });
        }
    } catch (error) {
        console.log('❌ Invalid Endpoint: ERROR -', error.message);
        testResults.push({ test: 'Invalid Endpoint', status: 'ERROR', error: error.message });
    }

    // Summary
    console.log('\n📊 END-TO-END TEST SUMMARY');
    console.log('=' .repeat(50));
    
    const passed = testResults.filter(t => t.status === 'PASSED').length;
    const failed = testResults.filter(t => t.status === 'FAILED').length;
    const errors = testResults.filter(t => t.status === 'ERROR').length;
    
    console.log(`✅ Passed: ${passed}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`🚨 Errors: ${errors}`);
    console.log(`📈 Success Rate: ${((passed / testResults.length) * 100).toFixed(1)}%`);
    
    if (failed > 0 || errors > 0) {
        console.log('\n❌ ISSUES FOUND:');
        testResults.filter(t => t.status !== 'PASSED').forEach(test => {
            console.log(`  - ${test.test}: ${test.error || 'See above for details'}`);
        });
    }
    
    if (passed === testResults.length) {
        console.log('\n🎉 ALL TESTS PASSED! System is fully operational.');
    }
    
    return testResults;
};

// Run the tests
testAPIEndpoints().catch(console.error);
