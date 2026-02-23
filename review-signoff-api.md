# Review Sign-Off API Documentation

## SQL Table Creation

Run the following SQL query to create the `review_signoffs` table:

```sql
CREATE TABLE IF NOT EXISTS review_signoffs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    position VARCHAR(191) NOT NULL COMMENT 'Position ID or name of the signer',
    signature TEXT NOT NULL COMMENT 'Digital signature (base64 encoded or text)',
    signed_at DATETIME NOT NULL COMMENT 'Timestamp when the review was signed',
    review_type VARCHAR(50) NOT NULL COMMENT 'Type of review: monthly, quarterly, annual, etc.',
    user_id INT NULL COMMENT 'User ID of the person signing',
    office_id INT NULL COMMENT 'Office/Branch ID',
    notes TEXT NULL COMMENT 'Additional notes or comments',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Indexes for common queries
    INDEX idx_user_id (user_id),
    INDEX idx_office_id (office_id),
    INDEX idx_position (position),
    INDEX idx_review_type (review_type),
    INDEX idx_signed_at (signed_at),
    INDEX idx_created_at (created_at),
    
    -- Foreign key constraints (optional - uncomment if needed)
    -- FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    -- FOREIGN KEY (office_id) REFERENCES offices(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci 
COMMENT='Stores performance review sign-off records';
```

---

## API Endpoints

### 1. POST /api/reviews/signoff

Create a new performance review sign-off record.

**Request URL:** `POST /api/reviews/signoff`

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
    "position": "Branch Manager",
    "signature": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
    "signedAt": "2026-02-22T14:30:00.000Z",
    "reviewType": "monthly",
    "user_id": 123,
    "office_id": 5,
    "notes": "Performance review completed and acknowledged"
}
```

**Required Fields:**
| Field | Type | Description |
|-------|------|-------------|
| `position` | string | Position ID or name (e.g., "Branch Manager", "5") |
| `signature` | string | Digital signature (base64 encoded image or text) |
| `signedAt` | string | ISO 8601 timestamp of when the review was signed |
| `reviewType` | string | Type of review: `monthly`, `quarterly`, `annual`, etc. |

**Optional Fields:**
| Field | Type | Description |
|-------|------|-------------|
| `user_id` | integer | User ID of the person signing |
| `office_id` | integer | Office/Branch ID |
| `notes` | string | Additional notes or comments |

**Success Response (201 Created):**
```json
{
    "success": true,
    "message": "Review sign-off recorded successfully",
    "data": {
        "id": 1,
        "position": "Branch Manager",
        "signature": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
        "signed_at": "2026-02-22T14:30:00.000Z",
        "review_type": "monthly",
        "user_id": 123,
        "office_id": 5,
        "notes": "Performance review completed and acknowledged",
        "created_at": "2026-02-22T14:35:00.000Z",
        "updated_at": "2026-02-22T14:35:00.000Z"
    }
}
```

**Error Response (400 Bad Request):**
```json
{
    "success": false,
    "error": "position is required"
}
```

**Error Response (500 Server Error):**
```json
{
    "success": false,
    "error": "Failed to create review sign-off"
}
```

---

### 2. GET /api/reviews/signoffs

Get all review sign-offs with optional filtering.

**Request URL:** `GET /api/reviews/signoffs`

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `user_id` | integer | Filter by user ID |
| `office_id` | integer | Filter by office ID |
| `position` | string | Filter by position |
| `reviewType` | string | Filter by review type |
| `start_date` | string | Filter by start date (YYYY-MM-DD) |
| `end_date` | string | Filter by end date (YYYY-MM-DD) |
| `limit` | integer | Maximum number of results (default: 50) |

**Example Request:**
```
GET /api/reviews/signoffs?user_id=123&reviewType=monthly&start_date=2026-02-01&end_date=2026-02-28
```

**Success Response (200 OK):**
```json
{
    "success": true,
    "count": 2,
    "data": [
        {
            "id": 2,
            "position": "Branch Manager",
            "signature": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
            "signed_at": "2026-02-22T14:30:00.000Z",
            "review_type": "monthly",
            "user_id": 123,
            "office_id": 5,
            "notes": "Performance review completed",
            "created_at": "2026-02-22T14:35:00.000Z",
            "updated_at": "2026-02-22T14:35:00.000Z"
        },
        {
            "id": 1,
            "position": "Branch Manager",
            "signature": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
            "signed_at": "2026-02-15T10:00:00.000Z",
            "review_type": "monthly",
            "user_id": 123,
            "office_id": 5,
            "notes": null,
            "created_at": "2026-02-15T10:05:00.000Z",
            "updated_at": "2026-02-15T10:05:00.000Z"
        }
    ]
}
```

---

### 3. GET /api/reviews/signoffs/:id

Get a single review sign-off by ID.

**Request URL:** `GET /api/reviews/signoffs/:id`

**Example Request:**
```
GET /api/reviews/signoffs/1
```

**Success Response (200 OK):**
```json
{
    "success": true,
    "data": {
        "id": 1,
        "position": "Branch Manager",
        "signature": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
        "signed_at": "2026-02-22T14:30:00.000Z",
        "review_type": "monthly",
        "user_id": 123,
        "office_id": 5,
        "notes": "Performance review completed",
        "created_at": "2026-02-22T14:35:00.000Z",
        "updated_at": "2026-02-22T14:35:00.000Z"
    }
}
```

**Error Response (404 Not Found):**
```json
{
    "success": false,
    "error": "Review sign-off not found"
}
```

---

## Frontend Integration Example

```javascript
// Example usage in React/Next.js
const submitReviewSignoff = async (config, signature) => {
    try {
        const trimmedSignature = signature.trim();
        
        const response = await fetch('/api/reviews/signoff', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                position: config.position,
                signature: trimmedSignature,
                signedAt: new Date().toISOString(),
                reviewType: config.reviewType,
                user_id: config.userId,
                office_id: config.officeId,
            }),
        });

        const result = await response.json();

        if (result.success) {
            console.log('Sign-off recorded:', result.data);
            return result.data;
        } else {
            throw new Error(result.error);
        }
    } catch (error) {
        console.error('Failed to submit sign-off:', error);
        throw error;
    }
};

// Usage
const config = {
    position: 'Branch Manager',
    reviewType: 'monthly',
    userId: 123,
    officeId: 5
};

const signature = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...';
await submitReviewSignoff(config, signature);
```

---

## Express.js API Implementation

Add the following code to your `index.js` file before the `app.listen()` call:

```javascript
/**
 * POST /api/reviews/signoff
 * Create a performance review sign-off record
 */
app.post('/api/reviews/signoff', async (req, res) => {
    try {
        const { 
            position, 
            signature, 
            signedAt, 
            reviewType, 
            user_id, 
            office_id, 
            notes 
        } = req.body;

        // Validation
        if (!position) {
            return res.status(400).json({
                success: false,
                error: 'position is required'
            });
        }

        if (!signature) {
            return res.status(400).json({
                success: false,
                error: 'signature is required'
            });
        }

        if (!signedAt) {
            return res.status(400).json({
                success: false,
                error: 'signedAt is required'
            });
        }

        if (!reviewType) {
            return res.status(400).json({
                success: false,
                error: 'reviewType is required'
            });
        }

        // Validate signedAt is a valid date
        const signedAtDate = new Date(signedAt);
        if (isNaN(signedAtDate.getTime())) {
            return res.status(400).json({
                success: false,
                error: 'signedAt must be a valid ISO timestamp'
            });
        }

        // Insert the sign-off record
        const [result] = await pool.query(`
            INSERT INTO review_signoffs 
            (position, signature, signed_at, review_type, user_id, office_id, notes, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
        `, [position, signature, signedAtDate, reviewType, user_id || null, office_id || null, notes || null]);

        // Fetch the inserted record
        const [newSignoff] = await pool.query(`
            SELECT * FROM review_signoffs WHERE id = ?
        `, [result.insertId]);

        res.status(201).json({
            success: true,
            message: 'Review sign-off recorded successfully',
            data: newSignoff[0]
        });

    } catch (error) {
        console.error('Error creating review sign-off:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create review sign-off'
        });
    }
});

/**
 * GET /api/reviews/signoffs
 * Get all review sign-offs with optional filtering
 */
app.get('/api/reviews/signoffs', async (req, res) => {
    try {
        const { 
            user_id, 
            office_id, 
            position, 
            reviewType, 
            start_date, 
            end_date,
            limit = 50
        } = req.query;

        let sql = 'SELECT * FROM review_signoffs WHERE 1=1';
        const params = [];

        if (user_id) {
            sql += ' AND user_id = ?';
            params.push(parseInt(user_id));
        }

        if (office_id) {
            sql += ' AND office_id = ?';
            params.push(parseInt(office_id));
        }

        if (position) {
            sql += ' AND position = ?';
            params.push(position);
        }

        if (reviewType) {
            sql += ' AND review_type = ?';
            params.push(reviewType);
        }

        if (start_date) {
            sql += ' AND signed_at >= ?';
            params.push(start_date);
        }

        if (end_date) {
            sql += ' AND signed_at <= ?';
            params.push(end_date);
        }

        sql += ' ORDER BY created_at DESC LIMIT ?';
        params.push(parseInt(limit));

        const [signoffs] = await pool.query(sql, params);

        res.json({
            success: true,
            count: signoffs.length,
            data: signoffs
        });

    } catch (error) {
        console.error('Error fetching review sign-offs:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch review sign-offs'
        });
    }
});

/**
 * GET /api/reviews/signoffs/:id
 * Get a single review sign-off by ID
 */
app.get('/api/reviews/signoffs/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const [signoffs] = await pool.query(`
            SELECT * FROM review_signoffs WHERE id = ?
        `, [id]);

        if (signoffs.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Review sign-off not found'
            });
        }

        res.json({
            success: true,
            data: signoffs[0]
        });

    } catch (error) {
        console.error('Error fetching review sign-off:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch review sign-off'
        });
    }
});
```

---

## Review Types Reference

| Review Type | Description |
|-------------|-------------|
| `monthly` | Monthly performance review |
| `quarterly` | Quarterly performance review |
| `annual` | Annual performance review |
| `probation` | Probation period review |
| `mid_year` | Mid-year performance review |
| `project` | Project completion review |
| `custom` | Custom review type |

---

## Testing with cURL

### Create a sign-off:
```bash
curl -X POST http://localhost:5000/api/reviews/signoff \
  -H "Content-Type: application/json" \
  -d '{
    "position": "Branch Manager",
    "signature": "John Doe - Signed digitally",
    "signedAt": "2026-02-22T14:30:00.000Z",
    "reviewType": "monthly",
    "user_id": 123,
    "office_id": 5,
    "notes": "Performance review completed"
  }'
```

### Get all sign-offs:
```bash
curl "http://localhost:5000/api/reviews/signoffs?reviewType=monthly"
```

### Get a specific sign-off:
```bash
curl "http://localhost:5000/api/reviews/signoffs/1"
```
