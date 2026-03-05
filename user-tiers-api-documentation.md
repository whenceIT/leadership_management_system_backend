# User Tiers API Documentation

## Overview

The User Tiers API provides endpoints for managing user tier information, including retrieving tier data and updating portfolio values. This API supports a tiered system for loan consultants based on their portfolio performance.

---

## Base URL

```
http://localhost:5000
```

---

## Authentication

All endpoints require authentication. Include the user's session token in requests.

---

## Endpoints

### 1. Get User Tier Information

Retrieves comprehensive tier information for a specific user, including current tier, next tier, portfolio summary, benefits, and historical tier data.

#### Request

```http
GET /user-tiers/:userId
```

#### Parameters

| Parameter | Type | Location | Required | Description |
|-----------|------|----------|----------|-------------|
| `userId` | integer | path | Yes | The unique identifier of the user |

#### Example Request

```bash
curl -X GET http://localhost:5000/user-tiers/123
```

#### Response

**Status Code:** `200 OK`

```json
{
  "success": true,
  "data": {
    "user_id": 123,
    "current_tier": {
      "id": 2,
      "name": "K50K+",
      "description": "Intermediate tier for consistently performing consultants",
      "tier_range": "K50K+",
      "minimum_portfolio_value": 50000,
      "badge_color": "blue",
      "text_color": "white"
    },
    "next_tier": {
      "id": 3,
      "name": "K80K+",
      "minimum_portfolio_value": 80000
    },
    "portfolio_summary": {
      "current_value": 2300000,
      "current_formatted": "K2.3M",
      "required_for_next_tier": 2500000,
      "required_formatted": "K2.5M",
      "progress_percentage": 92
    },
    "benefits": [
      {
        "benefit_type": "commission_rate",
        "description": "Commission on loans",
        "value": "4.5%"
      },
      {
        "benefit_type": "support_level",
        "description": "Dedicated support",
        "value": "Standard"
      }
    ],
    "historical_tiers": [
      {
        "tier_id": 1,
        "tier_name": "Base",
        "effective_from": "2023-01-15",
        "effective_to": "2023-03-20"
      },
      {
        "tier_id": 2,
        "tier_name": "K50K+",
        "effective_from": "2023-03-20",
        "effective_to": null
      }
    ]
  }
}
```

#### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `success` | boolean | Indicates if the request was successful |
| `data.user_id` | integer | The user's unique identifier |
| `data.current_tier` | object | Current tier details |
| `data.current_tier.id` | integer | Tier unique identifier |
| `data.current_tier.name` | string | Tier name (e.g., "K50K+") |
| `data.current_tier.description` | string | Tier description |
| `data.current_tier.tier_range` | string | Tier range label |
| `data.current_tier.minimum_portfolio_value` | number | Minimum portfolio value for this tier |
| `data.current_tier.badge_color` | string | Badge color for UI display |
| `data.current_tier.text_color` | string | Text color for UI display |
| `data.next_tier` | object\|null | Next tier details (null if at highest tier) |
| `data.portfolio_summary` | object | Portfolio progress summary |
| `data.portfolio_summary.current_value` | number | Current portfolio value |
| `data.portfolio_summary.current_formatted` | string | Formatted currency string |
| `data.portfolio_summary.required_for_next_tier` | number\|null | Value needed for next tier |
| `data.portfolio_summary.required_formatted` | string\|null | Formatted requirement string |
| `data.portfolio_summary.progress_percentage` | number | Progress percentage (0-100) |
| `data.benefits` | array | List of tier benefits |
| `data.historical_tiers` | array | History of tier assignments |

#### Error Responses

**404 Not Found - User Not Found**
```json
{
  "success": false,
  "message": "User not found"
}
```

**404 Not Found - No Active Base Tier**
```json
{
  "success": false,
  "message": "No active base tier found"
}
```

**500 Internal Server Error**
```json
{
  "success": false,
  "message": "Failed to fetch user tier data"
}
```

---

### 2. Update User Portfolio Value

Updates a user's portfolio value and automatically handles tier upgrades when thresholds are reached.

#### Request

```http
PUT /user-tiers/:userId/portfolio
```

#### Parameters

| Parameter | Type | Location | Required | Description |
|-----------|------|----------|----------|-------------|
| `userId` | integer | path | Yes | The unique identifier of the user |

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `portfolio_value` | number | Yes | The new portfolio value |

#### Example Request

```bash
curl -X PUT http://localhost:5000/user-tiers/123/portfolio \
  -H "Content-Type: application/json" \
  -d '{"portfolio_value": 2450000}'
```

#### Response

**Status Code:** `200 OK`

**Response - No Tier Upgrade**
```json
{
  "success": true,
  "message": "Portfolio value updated successfully",
  "data": {
    "user_id": 123,
    "old_portfolio_value": 2300000,
    "new_portfolio_value": 2450000,
    "tier_upgraded": false,
    "current_tier": {
      "id": 2,
      "name": "K50K+",
      "minimum_portfolio_value": 50000,
      "progress_percentage": 98
    },
    "next_tier": {
      "id": 3,
      "name": "K80K+",
      "minimum_portfolio_value": 80000,
      "remaining_to_next_tier": 50000
    }
  }
}
```

**Response - With Tier Upgrade**
```json
{
  "success": true,
  "message": "Portfolio value updated successfully",
  "data": {
    "user_id": 123,
    "old_portfolio_value": 45000,
    "new_portfolio_value": 85000,
    "tier_upgraded": true,
    "current_tier": {
      "id": 3,
      "name": "K80K+",
      "minimum_portfolio_value": 80000,
      "progress_percentage": 70
    },
    "next_tier": {
      "id": 4,
      "name": "K120K+",
      "minimum_portfolio_value": 120000,
      "remaining_to_next_tier": 35000
    }
  }
}
```

#### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `success` | boolean | Indicates if the request was successful |
| `message` | string | Success message |
| `data.user_id` | integer | The user's unique identifier |
| `data.old_portfolio_value` | number | Previous portfolio value |
| `data.new_portfolio_value` | number | Updated portfolio value |
| `data.tier_upgraded` | boolean | Indicates if tier was upgraded |
| `data.current_tier` | object | Current tier after update |
| `data.next_tier` | object\|null | Next tier details (null if at highest tier) |
| `data.next_tier.remaining_to_next_tier` | number | Amount needed to reach next tier |

#### Error Responses

**400 Bad Request - Missing Portfolio Value**
```json
{
  "success": false,
  "message": "portfolio_value is required"
}
```

**404 Not Found - No Tier Assigned**
```json
{
  "success": false,
  "message": "User has no tier assigned"
}
```

**500 Internal Server Error**
```json
{
  "success": false,
  "message": "Failed to update portfolio value"
}
```

---

## Tier Definitions

The system supports the following tier levels:

| Tier ID | Name | Minimum Portfolio Value | Badge Color | Commission Rate |
|---------|------|------------------------|-------------|-----------------|
| 1 | Base | K0 | gray | 3.0% |
| 2 | K50K+ | K50,000 | blue | 4.5% |
| 3 | K80K+ | K80,000 | purple | 6.0% |
| 4 | K120K+ | K120,000 | gold | 8.0% |

---

## Database Tables

### tier_definitions

| Column | Type | Description |
|--------|------|-------------|
| id | int | Primary key |
| name | varchar(50) | Tier name |
| description | text | Tier description |
| tier_range | varchar(20) | Tier range label |
| minimum_portfolio_value | decimal(10,2) | Minimum value for tier |
| order_index | int | Display order |
| badge_color | varchar(20) | Badge color for UI |
| text_color | varchar(20) | Text color for UI |
| effective_from | datetime | Effective start date |
| effective_to | datetime | Effective end date (nullable) |
| is_active | tinyint(1) | Active status flag |

### user_tiers

| Column | Type | Description |
|--------|------|-------------|
| id | int | Primary key |
| user_id | int | Foreign key to users |
| tier_id | int | Foreign key to tier_definitions |
| effective_from | datetime | Assignment start date |
| effective_to | datetime | Assignment end date (nullable) |
| current_portfolio_value | decimal(10,2) | Current portfolio value |
| next_tier_requirement | decimal(10,2) | Value needed for next tier |
| progress_percentage | decimal(5,2) | Progress percentage |
| last_updated | datetime | Last update timestamp |

### tier_benefits

| Column | Type | Description |
|--------|------|-------------|
| id | int | Primary key |
| tier_id | int | Foreign key to tier_definitions |
| benefit_type | varchar(50) | Type of benefit |
| description | text | Benefit description |
| value | varchar(255) | Benefit value |
| effective_from | datetime | Effective start date |
| effective_to | datetime | Effective end date (nullable) |

---

## Usage Examples

### JavaScript/TypeScript

```typescript
// Fetch user tier data
async function getUserTier(userId: number) {
  const response = await fetch(`http://localhost:5000/user-tiers/${userId}`);
  const result = await response.json();
  
  if (result.success) {
    console.log(`Current Tier: ${result.data.current_tier.name}`);
    console.log(`Progress: ${result.data.portfolio_summary.progress_percentage}%`);
  }
  
  return result;
}

// Update portfolio value
async function updatePortfolio(userId: number, value: number) {
  const response = await fetch(`http://localhost:5000/user-tiers/${userId}/portfolio`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ portfolio_value: value }),
  });
  
  const result = await response.json();
  
  if (result.success && result.data.tier_upgraded) {
    console.log(`Congratulations! Upgraded to ${result.data.current_tier.name}`);
  }
  
  return result;
}
```

### React Hook Example

```typescript
import { useState, useEffect } from 'react';

interface UserTierData {
  user_id: number;
  current_tier: {
    id: number;
    name: string;
    badge_color: string;
  };
  portfolio_summary: {
    current_value: number;
    progress_percentage: number;
  };
}

export function useUserTier(userId: number) {
  const [data, setData] = useState<UserTierData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTier() {
      try {
        const response = await fetch(`http://localhost:5000/user-tiers/${userId}`);
        const result = await response.json();
        
        if (result.success) {
          setData(result.data);
        } else {
          setError(result.message);
        }
      } catch (err) {
        setError('Failed to fetch tier data');
      } finally {
        setLoading(false);
      }
    }

    fetchTier();
  }, [userId]);

  return { data, loading, error };
}
```

---

## Error Handling

All endpoints follow a consistent error response format:

```json
{
  "success": false,
  "message": "Error description"
}
```

Common HTTP status codes:

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Created (for new resources) |
| 400 | Bad Request - Invalid input |
| 404 | Not Found - Resource doesn't exist |
| 500 | Internal Server Error |

---

## Rate Limiting

API requests are subject to rate limiting. Please implement appropriate backoff strategies in your client applications.

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-02-19 | Initial API release |

---

## Support

For API support, please contact the development team or refer to the internal documentation.
