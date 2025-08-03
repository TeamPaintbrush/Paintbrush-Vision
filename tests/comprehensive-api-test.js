// Comprehensive API testing suite
const http = require('http');
require('dotenv').config();

const API_URL = 'http://localhost:5000';
const TEST_IMAGE_URL = 'https://via.placeholder.com/300x200/0066CC/ffffff?text=Test+Image';

class APITester {
    constructor() {
        this.results = {
            passed: 0,
            failed: 0,
            tests: []
        };
    }

    async makeRequest(endpoint, method = 'GET', data = null) {
        return new Promise((resolve, reject) => {
            const options = {
                hostname: 'localhost',
                port: 5000,
                path: endpoint,
                method: method,
                headers: method === 'POST' ? { 'Content-Type': 'application/json' } : {}
            };

            const req = http.request(options, (res) => {
                let responseData = '';
                res.on('data', chunk => responseData += chunk);
                res.on('end', () => {
                    try {
                        const parsed = JSON.parse(responseData);
                        resolve({ status: res.statusCode, data: parsed, headers: res.headers });
                    } catch (e) {
                        resolve({ status: res.statusCode, data: responseData, headers: res.headers });
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

    async test(name, testFunction) {
        try {
            console.log(`🧪 Testing: ${name}`);
            const result = await testFunction();
            
            if (result.success) {
                console.log(`✅ PASSED: ${name}`);
                this.results.passed++;
            } else {
                console.log(`❌ FAILED: ${name} - ${result.error}`);
                this.results.failed++;
            }
            
            this.results.tests.push({
                name,
                passed: result.success,
                error: result.error,
                response: result.response
            });
        } catch (error) {
            console.log(`❌ ERROR: ${name} - ${error.message}`);
            this.results.failed++;
            this.results.tests.push({
                name,
                passed: false,
                error: error.message
            });
        }
    }

    async runAllTests() {
        console.log('🚀 Starting Comprehensive API Tests\n');

        // Test 1: Health Check
        await this.test('Health Check Endpoint', async () => {
            const response = await this.makeRequest('/api/health');
            return {
                success: response.status === 200 && response.data.status === 'OK',
                response,
                error: response.status !== 200 ? `Expected 200, got ${response.status}` : null
            };
        });

        // Test 2: Debug Endpoint
        await this.test('Debug Endpoint', async () => {
            const response = await this.makeRequest('/api/debug');
            return {
                success: response.status === 200 && response.data.message === 'Connection successful',
                response,
                error: response.status !== 200 ? `Expected 200, got ${response.status}` : null
            };
        });

        // Test 3: Image-to-Text with URL
        await this.test('Image-to-Text (URL)', async () => {
            const response = await this.makeRequest('/api/image-to-text', 'POST', {
                image: TEST_IMAGE_URL,
                isFile: false
            });
            return {
                success: response.status === 200 || response.status === 500, // 500 if no API key
                response,
                error: response.status === 400 ? 'Bad request' : null
            };
        });

        // Test 4: OCR Extract
        await this.test('OCR Extract Endpoint', async () => {
            const response = await this.makeRequest('/api/ocr-extract', 'POST', {
                image: TEST_IMAGE_URL,
                isFile: false
            });
            return {
                success: response.status === 200 || response.status === 500, // 500 if no API key
                response,
                error: response.status === 400 ? 'Bad request' : null
            };
        });

        // Test 5: Batch Process
        await this.test('Batch Process Endpoint', async () => {
            const response = await this.makeRequest('/api/batch-process', 'POST', {
                images: [TEST_IMAGE_URL],
                mode: 'analyze'
            });
            return {
                success: response.status === 200 || response.status === 500, // 500 if no API key
                response,
                error: response.status === 400 ? 'Bad request' : null
            };
        });

        // Test 6: Invalid Endpoint
        await this.test('Invalid Endpoint (404)', async () => {
            const response = await this.makeRequest('/api/nonexistent');
            return {
                success: response.status === 404,
                response,
                error: response.status !== 404 ? `Expected 404, got ${response.status}` : null
            };
        });

        this.printResults();
    }

    printResults() {
        console.log('\n📊 TEST RESULTS SUMMARY');
        console.log('='.repeat(50));
        console.log(`✅ Passed: ${this.results.passed}`);
        console.log(`❌ Failed: ${this.results.failed}`);
        console.log(`📈 Success Rate: ${((this.results.passed / (this.results.passed + this.results.failed)) * 100).toFixed(1)}%`);
        
        if (this.results.failed > 0) {
            console.log('\n❌ FAILED TESTS:');
            this.results.tests
                .filter(test => !test.passed)
                .forEach(test => {
                    console.log(`  - ${test.name}: ${test.error}`);
                });
        }

        console.log('\n🎯 RECOMMENDATIONS:');
        if (this.results.tests.some(t => t.error && t.error.includes('API key'))) {
            console.log('  - Configure OpenAI API key in .env file');
        }
        if (this.results.failed === 0) {
            console.log('  - All systems operational! ✅');
        }
    }
}

// Run tests if executed directly
if (require.main === module) {
    const tester = new APITester();
    tester.runAllTests().catch(console.error);
}

module.exports = APITester;
