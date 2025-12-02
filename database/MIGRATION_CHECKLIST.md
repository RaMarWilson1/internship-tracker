# Internship Tracker Database Documentation

**Database Lead:** Ihor  
**Database Name:** `internship_tracker`  
**DBMS:** MySQL 9.3.0  
**Created:** December 1, 2024

---

## Database Overview

This database supports an internship application tracking system. It allows users to manage their job applications, schedule interviews, track contacts, set reminders, store documents, and maintain notes throughout their internship search process.

---

## Database Schema

### Tables Summary

The database consists of **7 tables**:

1. **Users** - User account information
2. **Applications** - Internship application records
3. **Interviews** - Interview scheduling and outcomes
4. **Contacts** - Company recruiters and contacts
5. **Reminders** - Task reminders and follow-ups
6. **Documents** - File references for resumes and cover letters
7. **Notes** - Additional notes about applications

---

## Table Definitions

### 1. Users

Stores user account information for authentication and personalization.

**Purpose:** Manages user accounts and profiles for the application tracking system.

**Columns:**
- `user_id` (INT, PRIMARY KEY, AUTO_INCREMENT) - Unique identifier for each user
- `email` (VARCHAR(255), UNIQUE, NOT NULL) - User's email address for login
- `password_hash` (VARCHAR(255), NOT NULL) - Hashed password for security
- `first_name` (VARCHAR(100), NOT NULL) - User's first name
- `last_name` (VARCHAR(100), NOT NULL) - User's last name
- `created_at` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP) - Account creation timestamp
- `updated_at` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP ON UPDATE) - Last update timestamp

**Relationships:**
- One user can have many Applications (1:N)
- One user can have many Documents (1:N)

---

### 2. Applications

Stores detailed information about each internship application.

**Purpose:** Core table tracking all internship applications with status, company details, and application metadata.

**Columns:**
- `application_id` (INT, PRIMARY KEY, AUTO_INCREMENT) - Unique identifier for each application
- `user_id` (INT, FOREIGN KEY, NOT NULL) - References Users(user_id)
- `company_name` (VARCHAR(255), NOT NULL) - Name of the company
- `position_title` (VARCHAR(255), NOT NULL) - Job title/position applied for
- `job_description` (TEXT) - Detailed job description
- `location` (VARCHAR(255)) - Job location (city, state)
- `salary_range` (VARCHAR(100)) - Expected salary or hourly rate
- `application_status` (ENUM, DEFAULT 'Applied') - Current status: Applied, Interview, Offer, Rejected, Accepted, Withdrawn
- `application_date` (DATE, NOT NULL) - Date application was submitted
- `job_url` (VARCHAR(500)) - Link to job posting
- `notes` (TEXT) - General notes about the application
- `created_at` (TIMESTAMP) - Record creation timestamp
- `updated_at` (TIMESTAMP) - Last update timestamp

**Relationships:**
- Many applications belong to one User (N:1)
- One application can have many Interviews (1:N)
- One application can have many Contacts (1:N)
- One application can have many Reminders (1:N)
- One application can have many Documents (1:N)
- One application can have many Notes (1:N)

**Constraints:**
- Foreign key to Users with CASCADE DELETE (deleting a user deletes all their applications)

---

### 3. Interviews

Tracks interview schedules, types, and outcomes for each application.

**Purpose:** Manages interview scheduling, tracks different interview rounds, and records outcomes.

**Columns:**
- `interview_id` (INT, PRIMARY KEY, AUTO_INCREMENT) - Unique identifier for each interview
- `application_id` (INT, FOREIGN KEY, NOT NULL) - References Applications(application_id)
- `interview_type` (ENUM, NOT NULL) - Type: Phone Screen, Technical, Behavioral, Panel, Final, Other
- `interview_date` (DATETIME, NOT NULL) - Scheduled date and time
- `location` (VARCHAR(255)) - Interview location or "Remote"
- `interviewer_name` (VARCHAR(255)) - Name of the interviewer
- `interviewer_email` (VARCHAR(255)) - Interviewer's email
- `notes` (TEXT) - Interview preparation notes or feedback
- `outcome` (ENUM, DEFAULT 'Pending') - Result: Pending, Passed, Failed, Cancelled
- `created_at` (TIMESTAMP) - Record creation timestamp
- `updated_at` (TIMESTAMP) - Last update timestamp

**Relationships:**
- Many interviews belong to one Application (N:1)

**Constraints:**
- Foreign key to Applications with CASCADE DELETE (deleting an application deletes all its interviews)

---

### 4. Contacts

Stores information about recruiters, hiring managers, and other company contacts.

**Purpose:** Maintains contact information for networking and follow-up communication.

**Columns:**
- `contact_id` (INT, PRIMARY KEY, AUTO_INCREMENT) - Unique identifier for each contact
- `application_id` (INT, FOREIGN KEY, NOT NULL) - References Applications(application_id)
- `contact_name` (VARCHAR(255), NOT NULL) - Name of the contact person
- `contact_title` (VARCHAR(255)) - Job title (e.g., "Technical Recruiter")
- `contact_email` (VARCHAR(255)) - Email address
- `contact_phone` (VARCHAR(50)) - Phone number
- `linkedin_url` (VARCHAR(500)) - LinkedIn profile URL
- `notes` (TEXT) - Notes about interactions with this contact
- `created_at` (TIMESTAMP) - Record creation timestamp
- `updated_at` (TIMESTAMP) - Last update timestamp

**Relationships:**
- Many contacts belong to one Application (N:1)

**Constraints:**
- Foreign key to Applications with CASCADE DELETE

---

### 5. Reminders

Manages task reminders and follow-up notifications.

**Purpose:** Helps users stay organized with interview prep, follow-ups, and deadlines.

**Columns:**
- `reminder_id` (INT, PRIMARY KEY, AUTO_INCREMENT) - Unique identifier for each reminder
- `application_id` (INT, FOREIGN KEY, NOT NULL) - References Applications(application_id)
- `reminder_date` (DATETIME, NOT NULL) - When the reminder should trigger
- `reminder_type` (ENUM, NOT NULL) - Type: Follow-up, Interview Prep, Application Deadline, Thank You Note, Other
- `description` (TEXT, NOT NULL) - Description of the task
- `is_completed` (BOOLEAN, DEFAULT FALSE) - Whether the task is completed
- `created_at` (TIMESTAMP) - Record creation timestamp
- `updated_at` (TIMESTAMP) - Last update timestamp

**Relationships:**
- Many reminders belong to one Application (N:1)

**Constraints:**
- Foreign key to Applications with CASCADE DELETE

---

### 6. Documents

Stores metadata and file paths for resumes, cover letters, and other application documents.

**Purpose:** Tracks which documents were used for which applications.

**Columns:**
- `document_id` (INT, PRIMARY KEY, AUTO_INCREMENT) - Unique identifier for each document
- `user_id` (INT, FOREIGN KEY, NOT NULL) - References Users(user_id)
- `application_id` (INT, FOREIGN KEY, NULLABLE) - References Applications(application_id), can be NULL for general documents
- `document_type` (ENUM, NOT NULL) - Type: Resume, Cover Letter, Portfolio, Transcript, Other
- `document_name` (VARCHAR(255), NOT NULL) - Display name of the document
- `file_path` (VARCHAR(500), NOT NULL) - Server file path or cloud storage URL
- `uploaded_at` (TIMESTAMP) - Upload timestamp

**Relationships:**
- Many documents belong to one User (N:1)
- Many documents can belong to one Application (N:1, optional)

**Constraints:**
- Foreign key to Users with CASCADE DELETE
- Foreign key to Applications with SET NULL (if application is deleted, document remains but link is removed)

---

### 7. Notes

Stores additional notes and research about applications.

**Purpose:** Allows users to maintain detailed notes about companies, culture, interview prep, etc.

**Columns:**
- `note_id` (INT, PRIMARY KEY, AUTO_INCREMENT) - Unique identifier for each note
- `application_id` (INT, FOREIGN KEY, NOT NULL) - References Applications(application_id)
- `note_title` (VARCHAR(255)) - Optional title for the note
- `note_content` (TEXT, NOT NULL) - The actual note content
- `created_at` (TIMESTAMP) - Record creation timestamp
- `updated_at` (TIMESTAMP) - Last update timestamp

**Relationships:**
- Many notes belong to one Application (N:1)

**Constraints:**
- Foreign key to Applications with CASCADE DELETE

---

## Entity Relationships

### Relationship Types

**One-to-Many (1:N) Relationships:**

1. **Users → Applications**
   - One user can have many applications
   - Each application belongs to exactly one user

2. **Applications → Interviews**
   - One application can have many interviews (multiple rounds)
   - Each interview belongs to exactly one application

3. **Applications → Contacts**
   - One application can have many contacts (recruiter, hiring manager, etc.)
   - Each contact belongs to exactly one application

4. **Applications → Reminders**
   - One application can have many reminders
   - Each reminder belongs to exactly one application

5. **Applications → Notes**
   - One application can have many notes
   - Each note belongs to exactly one application

6. **Users → Documents**
   - One user can have many documents
   - Each document belongs to exactly one user

7. **Applications → Documents** (Optional)
   - One application can have many documents
   - Each document can optionally be linked to one application

---

## Foreign Key Constraints

### CASCADE DELETE
When a parent record is deleted, all child records are automatically deleted:

- Delete **User** → Deletes all their **Applications** (and cascades to all related records)
- Delete **Application** → Deletes all **Interviews, Contacts, Reminders, Notes**

### SET NULL
When a parent record is deleted, the foreign key in child records is set to NULL:

- Delete **Application** → **Documents** remain but `application_id` becomes NULL

---

## Indexes

**Primary Keys** (automatically indexed):
- All `*_id` columns are primary keys with AUTO_INCREMENT

**Unique Indexes:**
- `Users.email` - Ensures no duplicate email addresses

**Foreign Key Indexes** (automatically created):
- Indexes on all foreign key columns for efficient joins

---

## Sample Data

The database includes sample data for testing:

- **2 users** (John Doe, Jane Smith)
- **3 applications** (Google, Microsoft, Meta)
- **2 interviews** (Phone Screen and Technical for Google)
- **2 contacts** (Recruiters from Google and Microsoft)
- **3 reminders** (Interview prep, thank you note, follow-up)
- **2 notes** (Company research for Google and Microsoft)

---

## Database Statistics

**Current Record Counts:**
```sql
SELECT 'Users' as table_name, COUNT(*) as count FROM Users
UNION ALL
SELECT 'Applications', COUNT(*) FROM Applications
UNION ALL
SELECT 'Interviews', COUNT(*) FROM Interviews
UNION ALL
SELECT 'Contacts', COUNT(*) FROM Contacts
UNION ALL
SELECT 'Reminders', COUNT(*) FROM Reminders
UNION ALL
SELECT 'Documents', COUNT(*) FROM Documents
UNION ALL
SELECT 'Notes', COUNT(*) FROM Notes;
```

---

## Backup and Restore

### Create Backup
```bash
mysqldump -u root -p internship_tracker > database/backup.sql
```

### Restore from Backup
```bash
mysql -u root -p internship_tracker < database/backup.sql
```

---

## Future Enhancements

Potential improvements for future versions:

1. **Skills Tracking** - Add a Skills table to track required skills for each position
2. **Application Sources** - Track where applications were found (LinkedIn, Indeed, etc.)
3. **Email Integration** - Auto-track email correspondence
4. **Analytics** - Response rate tracking, time-to-response metrics
5. **Company Reviews** - Store Glassdoor ratings and reviews

---

## Notes for Developers

- All timestamps use `CURRENT_TIMESTAMP` with automatic updates
- Password hashing should use bcrypt with salt rounds ≥ 10
- File paths in Documents table should be validated before storage
- Consider implementing soft deletes for Applications (archive instead of delete)
- Email validation should be implemented at application level

---

**Last Updated:** December 2, 2024  
**Schema Version:** 1.0
