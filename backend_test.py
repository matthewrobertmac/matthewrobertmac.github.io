import requests
import sys
from datetime import datetime

class DiiaThesisAPITester:
    def __init__(self, base_url="https://pdf-library-27.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0

    def run_test(self, name, method, endpoint, expected_status, expected_content_type=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            else:
                print(f"❌ Unsupported method: {method}")
                return False, {}

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                
                # Check content type if specified
                if expected_content_type:
                    actual_content_type = response.headers.get('content-type', '').lower()
                    if expected_content_type.lower() in actual_content_type:
                        print(f"✅ Content-Type: {actual_content_type}")
                    else:
                        print(f"⚠️  Content-Type mismatch: expected {expected_content_type}, got {actual_content_type}")
                
                # Try to parse JSON for non-PDF responses
                if expected_content_type != 'application/pdf':
                    try:
                        return success, response.json()
                    except:
                        return success, {"raw_content": response.text[:200]}
                else:
                    return success, {"content_length": len(response.content)}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}")
                return False, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_health_endpoint(self):
        """Test /api/health endpoint"""
        success, response = self.run_test(
            "Health Check",
            "GET",
            "api/health",
            200,
            "application/json"
        )
        
        if success:
            # Validate health response structure
            required_fields = ['status', 'service', 'timestamp']
            for field in required_fields:
                if field in response:
                    print(f"✅ Health response has {field}: {response[field]}")
                else:
                    print(f"⚠️  Health response missing {field}")
                    
            if response.get('status') == 'ok':
                print("✅ Service status is OK")
            else:
                print(f"⚠️  Service status: {response.get('status')}")
        
        return success

    def test_book_endpoint(self):
        """Test /api/book endpoint"""
        success, response = self.run_test(
            "Book Metadata",
            "GET",
            "api/book",
            200,
            "application/json"
        )
        
        if success:
            # Validate book metadata structure
            required_fields = ['title', 'subtitle', 'pdf_url', 'themes']
            for field in required_fields:
                if field in response:
                    if field == 'themes':
                        print(f"✅ Book has {len(response[field])} themes")
                    else:
                        print(f"✅ Book has {field}: {str(response[field])[:50]}...")
                else:
                    print(f"⚠️  Book metadata missing {field}")
                    
            # Check if themes have required structure
            if 'themes' in response and isinstance(response['themes'], list):
                if len(response['themes']) >= 8:
                    print("✅ Book has 8+ themes as expected")
                    # Check first theme structure
                    if response['themes']:
                        theme = response['themes'][0]
                        theme_fields = ['id', 'title', 'description', 'tag', 'icon']
                        for field in theme_fields:
                            if field in theme:
                                print(f"✅ Theme has {field}")
                            else:
                                print(f"⚠️  Theme missing {field}")
                else:
                    print(f"⚠️  Expected 8+ themes, got {len(response['themes'])}")
        
        return success, response

    def test_config_endpoint(self):
        """Test /api/config endpoint"""
        success, response = self.run_test(
            "Config (YouTube)",
            "GET",
            "api/config",
            200,
            "application/json"
        )
        
        if success:
            # Validate config response structure
            required_fields = ['youtube_url', 'youtube_configured']
            for field in required_fields:
                if field in response:
                    print(f"✅ Config has {field}: {response[field]}")
                else:
                    print(f"⚠️  Config missing {field}")
                    
            # Check if YouTube is configured correctly (should be false)
            if response.get('youtube_configured') == False:
                print("✅ YouTube correctly shows as not configured")
            else:
                print(f"⚠️  YouTube configured status: {response.get('youtube_configured')}")
                
            if response.get('youtube_url') == "":
                print("✅ YouTube URL is empty as expected")
            else:
                print(f"⚠️  YouTube URL: {response.get('youtube_url')}")
        
        return success

    def test_pdf_endpoint(self):
        """Test /api/pdf endpoint"""
        success, response = self.run_test(
            "PDF Proxy",
            "GET",
            "api/pdf",
            200,
            "application/pdf"
        )
        
        if success:
            content_length = response.get('content_length', 0)
            if content_length > 1000:  # PDF should be substantial
                print(f"✅ PDF content length: {content_length} bytes")
            else:
                print(f"⚠️  PDF seems small: {content_length} bytes")
        
        return success

def main():
    # Setup
    tester = DiiaThesisAPITester()
    
    print("🚀 Starting Diia Thesis API Tests")
    print(f"   Base URL: {tester.base_url}")
    print("=" * 50)

    # Run tests
    health_success = tester.test_health_endpoint()
    config_success = tester.test_config_endpoint()
    book_success, book_data = tester.test_book_endpoint()
    pdf_success = tester.test_pdf_endpoint()

    # Print results
    print("\n" + "=" * 50)
    print(f"📊 Tests passed: {tester.tests_passed}/{tester.tests_run}")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All API tests passed!")
        return 0
    else:
        print("❌ Some API tests failed")
        return 1

if __name__ == "__main__":
    sys.exit(main())