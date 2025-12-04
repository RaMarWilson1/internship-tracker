-- Production Database Setup for Internship Tracker
-- Google Cloud SQL Ready
-- Created by: Ihor (Database Lead)
-- Date: December 2, 2025
-- Version: 1.0

-- Create database (for initial setup only)
-- Note: On Cloud SQL, database may already exist
CREATE DATABASE IF NOT EXISTS internship_tracker;
USE internship_tracker;

-- =====================================================
-- TABLE DEFINITIONS
-- =====================================================

-- Table 1: Users
-- Stores user account information
DROP TABLE IF EXISTS Users;
CREATE TABLE Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table 2: Applications
-- Stores internship application details
DROP TABLE IF EXISTS Applications;
CREATE TABLE Applications (
    application_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    position_title VARCHAR(255) NOT NULL,
    job_description TEXT,
    location VARCHAR(255),
    salary_range VARCHAR(100),
    application_status ENUM('Applied', 'Interview', 'Offer', 'Rejected', 'Accepted', 'Withdrawn') DEFAULT 'Applied',
    application_date DATE NOT NULL,
    job_url VARCHAR(500),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_status (application_status),
    INDEX idx_date (application_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table 3: Interviews
-- Stores interview scheduling and details
DROP TABLE IF EXISTS Interviews;
CREATE TABLE Interviews (
    interview_id INT PRIMARY KEY AUTO_INCREMENT,
    application_id INT NOT NULL,
    interview_type ENUM('Phone Screen', 'Technical', 'Behavioral', 'Panel', 'Final', 'Other') NOT NULL,
    interview_date DATETIME NOT NULL,
    location VARCHAR(255),
    interviewer_name VARCHAR(255),
    interviewer_email VARCHAR(255),
    notes TEXT,
    outcome ENUM('Pending', 'Passed', 'Failed', 'Cancelled') DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (application_id) REFERENCES Applications(application_id) ON DELETE CASCADE,
    INDEX idx_application_id (application_id),
    INDEX idx_date (interview_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table 4: Contacts
-- Stores company contacts and recruiters
DROP TABLE IF EXISTS Contacts;
CREATE TABLE Contacts (
    contact_id INT PRIMARY KEY AUTO_INCREMENT,
    application_id INT NOT NULL,
    contact_name VARCHAR(255) NOT NULL,
    contact_title VARCHAR(255),
    contact_email VARCHAR(255),
    contact_phone VARCHAR(50),
    linkedin_url VARCHAR(500),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (application_id) REFERENCES Applications(application_id) ON DELETE CASCADE,
    INDEX idx_application_id (application_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table 5: Reminders
-- Stores task reminders and follow-ups
DROP TABLE IF EXISTS Reminders;
CREATE TABLE Reminders (
    reminder_id INT PRIMARY KEY AUTO_INCREMENT,
    application_id INT NOT NULL,
    reminder_date DATETIME NOT NULL,
    reminder_type ENUM('Follow-up', 'Interview Prep', 'Application Deadline', 'Thank You Note', 'Other') NOT NULL,
    description TEXT NOT NULL,
    is_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (application_id) REFERENCES Applications(application_id) ON DELETE CASCADE,
    INDEX idx_application_id (application_id),
    INDEX idx_date (reminder_date),
    INDEX idx_completed (is_completed)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table 6: Documents
-- Stores references to resumes, cover letters, etc.
DROP TABLE IF EXISTS Documents;
CREATE TABLE Documents (
    document_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    application_id INT,
    document_type ENUM('Resume', 'Cover Letter', 'Portfolio', 'Transcript', 'Other') NOT NULL,
    document_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (application_id) REFERENCES Applications(application_id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_application_id (application_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table 7: Notes
-- Stores additional notes and research about applications
DROP TABLE IF EXISTS Notes;
CREATE TABLE Notes (
    note_id INT PRIMARY KEY AUTO_INCREMENT,
    application_id INT NOT NULL,
    note_title VARCHAR(255),
    note_content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (application_id) REFERENCES Applications(application_id) ON DELETE CASCADE,
    INDEX idx_application_id (application_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- PRODUCTION OPTIMIZATIONS
-- =====================================================

-- Set UTF-8 for proper character support
ALTER DATABASE internship_tracker CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================

-- Verify all tables were created
SELECT 
    TABLE_NAME,
    ENGINE,
    TABLE_ROWS,
    AUTO_INCREMENT,
    CREATE_TIME
FROM information_schema.TABLES
WHERE TABLE_SCHEMA = 'internship_tracker'
ORDER BY TABLE_NAME;

-- Show all foreign key relationships
SELECT 
    TABLE_NAME,
    COLUMN_NAME,
    CONSTRAINT_NAME,
    REFERENCED_TABLE_NAME,
    REFERENCED_COLUMN_NAME
FROM information_schema.KEY_COLUMN_USAGE
WHERE TABLE_SCHEMA = 'internship_tracker'
    AND REFERENCED_TABLE_NAME IS NOT NULL
ORDER BY TABLE_NAME;

-- =====================================================
-- NOTES FOR CLOUD SQL DEPLOYMENT
-- =====================================================

/*
CLOUD SQL SETUP CHECKLIST:

1. Create Cloud SQL Instance:
   - MySQL 8.0 or higher
   - Appropriate machine type (db-n1-standard-1 for development)
   - Enable automatic backups
   - Configure authorized networks or use Cloud SQL Proxy

2. Database Configuration:
   - Max connections: 100+
   - Enable binary logging for point-in-time recovery
   - Set timezone to UTC

3. Security:
   - Use strong password for root user
   - Create application-specific database user with limited privileges
   - Enable SSL connections
   - Restrict IP access

4. Connection Configuration:
   - Update .env files with Cloud SQL connection details:
     DB_HOST=<cloud-sql-instance-ip>
     DB_USER=<app-user>
     DB_PASSWORD=<secure-password>
     DB_NAME=internship_tracker
     DB_PORT=3306

5. Migration Steps:
   a. Create Cloud SQL instance
   b. Run this production_setup.sql script
   c. Import data using: mysql -h <host> -u <user> -p internship_tracker < backup.sql
   d. Verify data integrity
   e. Update application connection strings
   f. Test application connectivity

6. Post-Migration:
   - Set up automated backups (daily recommended)
   - Configure monitoring and alerts
   - Test failover procedures
   - Document rollback procedures

7. Performance Tuning:
   - Monitor query performance
   - Add additional indexes if needed based on actual usage
   - Consider read replicas for high-traffic scenarios
*/
