const http = require('http');

const PORT = 5000;
const BASE_URL = `http://localhost:${PORT}/api/kpi-scores`;

// Helper function to make HTTP requests
function makeRequest(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        try {
          const response = JSON.parse(body);
          resolve({
            status: res.statusCode,
            data: response
          });
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

// Test function
async function testKpiScoresAPI() {
  console.log('Testing KPI Scores API...\n');

  try {
    // Test 1: Record Monthly Disbursement KPI score
    console.log('1. Testing Monthly Disbursement API...');
    const monthlyDisbursementData = {
      user_id: 1,
      score: 480000
    };
    
    const monthlyDisbursementOptions = {
      hostname: 'localhost',
      port: PORT,
      path: '/api/kpi-scores/monthly-disbursement',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(JSON.stringify(monthlyDisbursementData))
      }
    };
    
    const monthlyDisbursementResponse = await makeRequest(monthlyDisbursementOptions, monthlyDisbursementData);
    console.log('Status:', monthlyDisbursementResponse.status);
    console.log('Response:', JSON.stringify(monthlyDisbursementResponse.data, null, 2));
    console.log();

    // Test 2: Record Month-1 Default Rate KPI score
    console.log('2. Testing Month-1 Default Rate API...');
    const month1DefaultRateData = {
      user_id: 1,
      score: 22
    };
    
    const month1DefaultRateOptions = {
      hostname: 'localhost',
      port: PORT,
      path: '/api/kpi-scores/month1-default-rate',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(JSON.stringify(month1DefaultRateData))
      }
    };
    
    const month1DefaultRateResponse = await makeRequest(month1DefaultRateOptions, month1DefaultRateData);
    console.log('Status:', month1DefaultRateResponse.status);
    console.log('Response:', JSON.stringify(month1DefaultRateResponse.data, null, 2));
    console.log();

    // Test 3: Record LCs at K50K+ Tier KPI score
    console.log('3. Testing LCs at K50K+ Tier API...');
    const lcsAtK50KTierData = {
      user_id: 1,
      score: 45
    };
    
    const lcsAtK50KTierOptions = {
      hostname: 'localhost',
      port: PORT,
      path: '/api/kpi-scores/lcs-at-k50k-tier',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(JSON.stringify(lcsAtK50KTierData))
      }
    };
    
    const lcsAtK50KTierResponse = await makeRequest(lcsAtK50KTierOptions, lcsAtK50KTierData);
    console.log('Status:', lcsAtK50KTierResponse.status);
    console.log('Response:', JSON.stringify(lcsAtK50KTierResponse.data, null, 2));
    console.log();

    // Test 4: Record Branch Net Contribution KPI score
    console.log('4. Testing Branch Net Contribution API...');
    const branchNetContributionData = {
      user_id: 1,
      score: 350000
    };
    
    const branchNetContributionOptions = {
      hostname: 'localhost',
      port: PORT,
      path: '/api/kpi-scores/branch-net-contribution',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(JSON.stringify(branchNetContributionData))
      }
    };
    
    const branchNetContributionResponse = await makeRequest(branchNetContributionOptions, branchNetContributionData);
    console.log('Status:', branchNetContributionResponse.status);
    console.log('Response:', JSON.stringify(branchNetContributionResponse.data, null, 2));
    console.log();

    // Test 5: Record Branch Recovery Rate (Month-4) KPI score
    console.log('5. Testing Branch Recovery Rate (Month-4) API...');
    const branchRecoveryRateMonth4Data = {
      user_id: 1,
      score: 70
    };
    
    const branchRecoveryRateMonth4Options = {
      hostname: 'localhost',
      port: PORT,
      path: '/api/kpi-scores/branch-recovery-rate-month4',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(JSON.stringify(branchRecoveryRateMonth4Data))
      }
    };
    
    const branchRecoveryRateMonth4Response = await makeRequest(branchRecoveryRateMonth4Options, branchRecoveryRateMonth4Data);
    console.log('Status:', branchRecoveryRateMonth4Response.status);
    console.log('Response:', JSON.stringify(branchRecoveryRateMonth4Response.data, null, 2));
    console.log();

    // Test 6: Get user's KPI scores
    console.log('6. Testing Get User KPI Scores API...');
    const userScoresOptions = {
      hostname: 'localhost',
      port: PORT,
      path: '/api/kpi-scores/user/1',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    const userScoresResponse = await makeRequest(userScoresOptions);
    console.log('Status:', userScoresResponse.status);
    console.log('Response:', JSON.stringify(userScoresResponse.data, null, 2));
    console.log();

    // Test 7: Calculate total weighted score
    console.log('7. Testing Calculate Total Weighted Score API...');
    const calculateScoreOptions = {
      hostname: 'localhost',
      port: PORT,
      path: '/api/kpi-scores/calculate/1/5',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    const calculateScoreResponse = await makeRequest(calculateScoreOptions);
    console.log('Status:', calculateScoreResponse.status);
    console.log('Response:', JSON.stringify(calculateScoreResponse.data, null, 2));
    console.log();

    console.log('✅ All API tests completed successfully!');

  } catch (error) {
    console.error('❌ Error testing KPI Scores API:', error);
    if (error.code === 'ECONNREFUSED') {
      console.error('Make sure the server is running on port', PORT);
    }
  }
}

// Run the tests
testKpiScoresAPI();
