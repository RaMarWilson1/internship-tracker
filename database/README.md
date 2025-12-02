# Internship Tracker Database Documentation

**Database Lead:** Ihor  
**Last Updated:** December 2, 2024  
**Database Name:** `internship_tracker`  
**MySQL Version:** 9.3.0

---

## Overview

The Internship Tracker database is designed to help users manage their internship application process. It tracks applications, interviews, contacts, reminders, documents, and notes in an organized relational structure.

---

## Database Schema

The database consists of **7 tables** with well-defined relationships using foreign keys.

### Entity Relationship Summary

```
Users (1) ────< (N) Applications (1) ────< (N) Interviews
                         │
                         ├────< (N) Contacts
                         ├────< (N) Reminders
                         └────< (N) Notes

Users (1) ────< (N) Documents
```

---

## Table Descriptions

### 1. Users Table

**Purpose:** Stores user account information for authentication and personalization.

**Columns:**
- `user_id` (INT, PRIMARY KEY, AUTO_INCREMENT) - Unique identifier for each user
- `email` (VARCHAR(255), UNIQUE, NOT NULL) - User's email address (used for login)
- `password_hash` (VARCHAR(255), NOT NULL) - Encrypted password
- `first_name` (VARCHAR(100), NOT NULL) - User's first name
- `last_name` (VARCHAR(100), NOT NULL) - User's last name
- `created_at` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP) - Account creation timestamp
- `updated_at` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP) - Last update timestamp

**Relationships:**
- One user can have many applications (1:N)
- One user can have many documents (1:N)

---

### 2. Applications Table

**Purpose:** Stores internship application details including company, position, status, and timeline.

**Columns:**
- `application_id` (INT, PRIMARY KEY, AUTO_INCREMENT) - Unique identifier for each application
- `user_id` (INT, NOT NULL, FOREIGN KEY → Users.user_id) - Owner of the application
- `company_name` (VARCHAR(255), NOT NULL) - Name of the company
- `position_title` (VARCHAR(255), NOT NULL) - Job title/position applied for
- `job_description` (TEXT) - Description of the role
- `location` (VARCHAR(255)) - Job location (city, state, remote, etc.)
- `salary_range` (VARCHAR(100)) - Expected compensation range
- `application_status` (ENUM) - Current status:
  - `'Applied'` (default)
  - `'Interview'`
  - `'Offer'`
  - `'Rejected'`
  - `'Accepted'`
  - `'Withdrawn'`
- `application_date` (DATE, NOT NULL) - Date application was submitted
- `job_url` (VARCHAR(500)) - Link to job posting
- `notes` (TEXT) - General notes about the application
- `created_at` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)
- `updated_at` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)

**Relationships:**
- Belongs to one user (N:1)
- Can have many interviews (1:N)
- Can have many contacts (1:N)
- Can have many reminders (1:N)
- Can have many notes (1:N)
- Can have many documents (1:N, optional)

**Foreign Key Constraints:**
- `ON DELETE CASCADE` - If a user is deleted, all their applications are deleted

---

### 3. Interviews Table

**Purpose:** Tracks interview scheduling, types, and outcomes for each application.

**Columns:**
- `interview_id` (INT, PRIMARY KEY, AUTO_INCREMENT) - Unique identifier for each interview
- `application_id` (INT, NOT NULL, FOREIGN KEY → Applications.application_id) - Associated application
- `interview_type` (ENUM, NOT NULL) - Type of interview:
  - `'Phone Screen'`
  - `'Technical'`
  - `'Behavioral'`
  - `'Panel'`
  - `'Final'`
  - `'Other'`
- `interview_date` (DATETIME, NOT NULL) - Scheduled date and time
- `location` (VARCHAR(255)) - Interview location (address, video link, phone, etc.)
- `interviewer_name` (VARCHAR(255)) - Name of the interviewer(s)
- `interviewer_email` (VARCHAR(255)) - Contact email
- `notes` (TEXT) - Preparation notes, questions asked, impressions
- `outcome` (ENUM, DEFAULT 'Pending') - Interview result:
  - `'Pending'` (default)
  - `'Passed'`
  - `'Failed'`
  - `'Cancelled'`
- `created_at` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)
- `updated_at` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)

**Relationships:**
- Belongs to one application (N:1)

**Foreign Key Constraints:**
- `ON DELETE CASCADE` - If an application is deleted, all its interviews are deleted

---

### 4. Contacts Table

**Purpose:** Stores information about recruiters, hiring managers, and company contacts.

**Columns:**
- `contact_id` (INT, PRIMARY KEY, AUTO_INCREMENT) - Unique identifier for each contact
- `application_id` (INT, NOT NULL, FOREIGN KEY → Applications.application_id) - Associated application
- `contact_name` (VARCHAR(255), NOT NULL) - Full name of the contact
- `contact_title` (VARCHAR(255)) - Job title/role (e.g., "Senior Recruiter")
- `contact_email` (VARCHAR(255)) - Email address
- `contact_phone` (VARCHAR(50)) - Phone number
- `linkedin_url` (VARCHAR(500)) - LinkedIn profile URL
- `notes` (TEXT) - Additional information about the contact
- `created_at` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)
- `updated_at` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)

**Relationships:**
- Belongs to one application (N:1)

**Foreign Key Constraints:**
- `ON DELETE CASCADE` - If an application is deleted, all its contacts are deleted

---

### 5. Reminders Table

**Purpose:** Manages task reminders and follow-ups for applications.

**Columns:**
- `reminder_id` (INT, PRIMARY KEY, AUTO_INCREMENT) - Unique identifier for each reminder
- `application_id` (INT, NOT NULL, FOREIGN KEY → Applications.application_id) - Associated application
- `reminder_date` (DATETIME, NOT NULL) - When the reminder should trigger
- `reminder_type` (ENUM, NOT NULL) - Type of reminder:
  - `'Follow-up'`
  - `'Interview Prep'`
  - `'Application Deadline'`
  - `'Thank You Note'`
  - `'Other'`
- `description` (TEXT, NOT NULL) - Details of what needs to be done
- `is_completed` (BOOLEAN, DEFAULT FALSE) - Whether the task is complete
- `created_at` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)
- `updated_at` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)

**Relationships:**
- Belongs to one application (N:1)

**Foreign Key Constraints:**
- `ON DELETE CASCADE` - If an application is deleted, all its reminders are deleted

---

### 6. Documents Table

**Purpose:** Stores references to uploaded documents like resumes, cover letters, and portfolios.

**Columns:**
- `document_id` (INT, PRIMARY KEY, AUTO_INCREMENT) - Unique identifier for each document
- `user_id` (INT, NOT NULL, FOREIGN KEY → Users.user_id) - Document owner
- `application_id` (INT, FOREIGN KEY → Applications.application_id, NULLABLE) - Optional link to specific application
- `document_type` (ENUM, NOT NULL) - Type of document:
  - `'Resume'`
  - `'Cover Letter'`
  - `'Portfolio'`
  - `'Transcript'`
  - `'Other'`
- `document_name` (VARCHAR(255), NOT NULL) - Display name of the document
- `file_path` (VARCHAR(500), NOT NULL) - Server path or cloud storage URL
- `uploaded_at` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP) - Upload timestamp

**Relationships:**
- Belongs to one user (N:1)
- Optionally linked to one application (N:1, can be NULL)

**Foreign Key Constraints:**
- `ON DELETE CASCADE` (user_id) - If a user is deleted, all their documents are deleted
- `ON DELETE SET NULL` (application_id) - If an application is deleted, documents remain but link is removed

---

### 7. Notes Table

**Purpose:** Stores additional research, thoughts, and information about applications.

**Columns:**
- `note_id` (INT, PRIMARY KEY, AUTO_INCREMENT) - Unique identifier for each note
- `application_id` (INT, NOT NULL, FOREIGN KEY → Applications.application_id) - Associated application
- `note_title` (VARCHAR(255)) - Optional title/heading for the note
- `note_content` (TEXT, NOT NULL) - Main content of the note
- `created_at` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)
- `updated_at` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)

**Relationships:**
- Belongs to one application (N:1)

**Foreign Key Constraints:**
- `ON DELETE CASCADE` - If an application is deleted, all its notes are deleted

---

## Relationships Summary

### One-to-Many (1:N) Relationships

1. **Users → Applications**
   - One user can have multiple applications
   - Foreign Key: `Applications.user_id` → `Users.user_id`

2. **Users → Documents**
   - One user can upload multiple documents
   - Foreign Key: `Documents.user_id` → `Users.user_id`

3. **Applications → Interviews**
   - One application can have multiple interview rounds
   - Foreign Key: `Interviews.application_id` → `Applications.application_id`

4. **Applications → Contacts**
   - One application can be associated with multiple company contacts
   - Foreign Key: `Contacts.application_id` → `Applications.application_id`

5. **Applications → Reminders**
   - One application can have multiple reminders
   - Foreign Key: `Reminders.application_id` → `Applications.application_id`

6. **Applications → Notes**
   - One application can have multiple notes
   - Foreign Key: `Notes.application_id` → `Applications.application_id`

7. **Applications → Documents (Optional)**
   - Documents can optionally be linked to specific applications
   - Foreign Key: `Documents.application_id` → `Applications.application_id` (NULLABLE)

### Cascade Behavior

- **CASCADE DELETE**: Deleting a parent record automatically deletes all related child records
  - Delete User → Deletes all Applications, Documents
  - Delete Application → Deletes all Interviews, Contacts, Reminders, Notes
  
- **SET NULL**: Deleting a parent record sets the foreign key to NULL in child records
  - Delete Application → Documents remain but `application_id` becomes NULL

---

## Sample Data

The database includes sample data for testing:
- 2 sample users (John Doe, Jane Smith)
- 3 sample applications (Google, Microsoft, Meta)
- 2 sample interviews
- 2 sample contacts
- 3 sample reminders
- 2 sample notes

---

## Testing Foreign Key Constraints

### Test CASCADE DELETE:

```sql
-- Test deleting an application (should cascade to interviews, contacts, reminders, notes)
DELETE FROM Applications WHERE application_id = 3;

-- Verify related records are deleted
SELECT * FROM Interviews WHERE application_id = 3;  -- Should return 0 rows
SELECT * FROM Contacts WHERE application_id = 3;    -- Should return 0 rows
SELECT * FROM Reminders WHERE application_id = 3;   -- Should return 0 rows
SELECT * FROM Notes WHERE application_id = 3;       -- Should return 0 rows
```

### Test Invalid Foreign Key:

```sql
-- This should fail (user_id 999 doesn't exist)
INSERT INTO Applications (user_id, company_name, position_title, application_date)
VALUES (999, 'Test Company', 'Test Position', '2024-12-01');
-- Error: Cannot add or update a child row: a foreign key constraint fails
```

---

## Database Maintenance

### Backup Database:
```bash
mysqldump -u root -p internship_tracker > backup_YYYYMMDD.sql
```

### Restore Database:
```bash
mysql -u root -p internship_tracker < backup_YYYYMMDD.sql
```

### View Database Size:
```sql
SELECT 
    table_name AS 'Table',
    ROUND(((data_length + index_length) / 1024 / 1024), 2) AS 'Size (MB)'
FROM information_schema.TABLES
WHERE table_schema = 'internship_tracker'
ORDER BY (data_length + index_length) DESC;
```

---

## Future Enhancements

Potential improvements for future iterations:
- Add full-text search on `job_description` and `notes`
- Create indexes on frequently queried columns (e.g., `application_status`, `application_date`)
- Add a `Companies` table to normalize company information
- Implement soft deletes with `deleted_at` timestamp instead of hard deletes
- Add email notification triggers for upcoming reminders
- Create views for common queries (e.g., active applications, upcoming interviews)

---

## Contact

For questions or issues with the database, contact:
- **Database Lead:** Ihor
