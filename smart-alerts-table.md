-- Create alerts table
CREATE TABLE smart_alerts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type ENUM('warning', 'info', 'success', 'error') NOT NULL DEFAULT 'info',
    priority ENUM('low', 'medium', 'high', 'critical') NOT NULL DEFAULT 'medium',
    message VARCHAR(500) NOT NULL,
    title VARCHAR(100),
    category VARCHAR(50),
    source VARCHAR(20) DEFAULT 'system',
    kpi_id INT,
    position_id INT,
    office_id INT,
    province_id INT,
    user_id INT,
    is_read TINYINT(1) DEFAULT 0,
    is_dismissed TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NULL,
    action_url VARCHAR(255),
    action_label VARCHAR(50),
    metadata JSON,
    
    -- Indexes for efficient filtering
    INDEX idx_user_id (user_id),
    INDEX idx_position_id (position_id),
    INDEX idx_office_id (office_id),
    INDEX idx_kpi_id (kpi_id),
    INDEX idx_type (type),
    INDEX idx_priority (priority),
    INDEX idx_category (category),
    INDEX idx_is_read (is_read),
    INDEX idx_created_at (created_at),
    INDEX idx_expires_at (expires_at),
    
    -- Composite indexes for common queries
    INDEX idx_user_unread (user_id, is_read, is_dismissed),
    INDEX idx_position_unread (position_id, is_read, is_dismissed),
    INDEX idx_office_unread (office_id, is_read, is_dismissed)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

