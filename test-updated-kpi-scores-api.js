const axios = require('axios');

// Configuration
const BASE_URL = 'http://localhost:3000/api/kpi-scores';

console.log('=== KPI Scores API Test ===\n');

// Test 1: Record Branch Net Contribution KPI Score
async function testBranchNetContribution() {
    console.log('1. Testing Branch Net Contribution KPI Score:');
    try {
        const response = await axios.post(`${BASE_URL}/branch-net-contribution`, {
            user_id: 1,
            kpi_id: 5,
            office_id: 1,
            province_id: 1,
            start_date: '2023-01-01',
            end_date: '2023-01-31'
        });

        console.log('✓ Success');
        console.log('Response:', JSON.stringify(response.data, null, 2));
        return response.data;
    } catch (error) {
        console.error('✗ Error:', error.response?.data?.error || error.message);
        return null;
    }
}

// Test 2: Record Monthly Disbursement KPI Score
async function testMonthlyDisbursement() {
    console.log('\n2. Testing Monthly Disbursement KPI Score:');
    try {
        const response = await axios.post(`${BASE_URL}/monthly-disbursement`, {
            user_id: 1,
            kpi_id: 1,
            office_id: 1,
            province_id: 1,
            start_date: '2023-01-01',
            end_date: '2023-01-31'
        });

        console.log('✓ Success');
        console.log('Response:', JSON.stringify(response.data, null, 2));
        return response.data;
    } catch (error) {
        console.error('✗ Error:', error.response?.data?.error || error.message);
        return null;
    }
}

// Test 3: Record Month-1 Default Rate KPI Score
async function testMonth1DefaultRate() {
    console.log('\n3. Testing Month-1 Default Rate KPI Score:');
    try {
        const response = await axios.post(`${BASE_URL}/month1-default-rate`, {
            user_id: 1,
            kpi_id: 2,
            office_id: 1,
            province_id: 1,
            start_date: '2023-01-01',
            end_date: '2023-01-31'
        });

        console.log('✓ Success');
        console.log('Response:', JSON.stringify(response.data, null, 2));
        return response.data;
    } catch (error) {
        console.error('✗ Error:', error.response?.data?.error || error.message);
        return null;
    }
}

// Test 4: Record LCs at K50K+ Tier KPI Score
async function testLcsAtK50KTier() {
    console.log('\n4. Testing LCs at K50K+ Tier KPI Score:');
    try {
        const response = await axios.post(`${BASE_URL}/lcs-at-k50k-tier`, {
            user_id: 1,
            kpi_id: 4,
            office_id: 1,
            province_id: 1,
            start_date: '2023-01-01',
            end_date: '2023-01-31'
        });

        console.log('✓ Success');
        console.log('Response:', JSON.stringify(response.data, null, 2));
        return response.data;
    } catch (error) {
        console.error('✗ Error:', error.response?.data?.error || error.message);
        return null;
    }
}

// Test 5: Record Branch Recovery Rate (Month-4) KPI Score
async function testBranchRecoveryRateMonth4() {
    console.log('\n5. Testing Branch Recovery Rate (Month-4) KPI Score:');
    try {
        const response = await axios.post(`${BASE_URL}/branch-recovery-rate-month4`, {
            user_id: 1,
            kpi_id: 3,
            office_id: 1,
            province_id: 1,
            start_date: '2023-01-01',
            end_date: '2023-01-31'
        });

        console.log('✓ Success');
        console.log('Response:', JSON.stringify(response.data, null, 2));
        return response.data;
    } catch (error) {
        console.error('✗ Error:', error.response?.data?.error || error.message);
        return null;
    }
}

// Test 6: Get All KPI Scores for User
async function testGetUserScores() {
    console.log('\n6. Testing Get User KPI Scores:');
    try {
        const response = await axios.get(`${BASE_URL}/user/1`);

        console.log('✓ Success');
        console.log('Response:', JSON.stringify(response.data, null, 2));
        return response.data;
    } catch (error) {
        console.error('✗ Error:', error.response?.data?.error || error.message);
        return null;
    }
}

// Test 7: Get User KPI Scores by Position
async function testGetUserScoresByPosition() {
    console.log('\n7. Testing Get User KPI Scores by Position:');
    try {
        const response = await axios.get(`${BASE_URL}/user/1/position/5`);

        console.log('✓ Success');
        console.log('Response:', JSON.stringify(response.data, null, 2));
        return response.data;
    } catch (error) {
        console.error('✗ Error:', error.response?.data?.error || error.message);
        return null;
    }
}

// Test 8: Calculate Total Weighted Score
async function testCalculateTotalScore() {
    console.log('\n8. Testing Calculate Total Weighted Score:');
    try {
        const response = await axios.get(`${BASE_URL}/calculate/1/5`);

        console.log('✓ Success');
        console.log('Response:', JSON.stringify(response.data, null, 2));
        return response.data;
    } catch (error) {
        console.error('✗ Error:', error.response?.data?.error || error.message);
        return null;
    }
}

// Run all tests
async function runAllTests() {
    const results = [];

    // Record individual KPI scores
    results.push(await testBranchNetContribution());
    results.push(await testMonthlyDisbursement());
    results.push(await testMonth1DefaultRate());
    results.push(await testLcsAtK50KTier());
    results.push(await testBranchRecoveryRateMonth4());

    // Retrieve scores
    const userScores = await testGetUserScores();
    results.push(userScores);

    const userScoresByPosition = await testGetUserScoresByPosition();
    results.push(userScoresByPosition);

    const totalScore = await testCalculateTotalScore();
    results.push(totalScore);

    console.log('\n=== Test Results Summary ===');
    const successfulTests = results.filter(result => result !== null);
    const failedTests = results.filter(result => result === null);

    console.log(`✓ Successful Tests: ${successfulTests.length}`);
    console.log(`✗ Failed Tests: ${failedTests.length}`);

    if (failedTests.length > 0) {
        console.log('\nSome tests failed. Please check the errors above.');
    } else {
        console.log('\nAll tests passed! The KPI scores API is working correctly.');
    }
}

// Execute tests
runAllTests().catch(error => {
    console.error('Error running tests:', error.message);
});