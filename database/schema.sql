-- Internship Tracker Database Schema
-- Created by: Ihor (Database Lead)
-- Date: December 1, 2025

-- Create database
CREATE DATABASE IF NOT EXISTS internship_tracker;
USE internship_tracker;

-- Table 1: Users
-- Stores user account information
CREATE TABLE Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table 2: Applications
-- Stores internship application details
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
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- Table 3: Interviews
-- Stores interview scheduling and details
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
    FOREIGN KEY (application_id) REFERENCES Applications(application_id) ON DELETE CASCADE
);

-- Table 4: Contacts
-- Stores company contacts and recruiters
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
    FOREIGN KEY (application_id) REFERENCES Applications(application_id) ON DELETE CASCADE
);

-- Table 5: Reminders
-- Stores task reminders and follow-ups
CREATE TABLE Reminders (
    reminder_id INT PRIMARY KEY AUTO_INCREMENT,
    application_id INT NOT NULL,
    reminder_date DATETIME NOT NULL,
    reminder_type ENUM('Follow-up', 'Interview Prep', 'Application Deadline', 'Thank You Note', 'Other') NOT NULL,
    description TEXT NOT NULL,
    is_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (application_id) REFERENCES Applications(application_id) ON DELETE CASCADE
);

-- Table 6: Documents
-- Stores references to resumes, cover letters, etc.
CREATE TABLE Documents (
    document_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    application_id INT,
    document_type ENUM('Resume', 'Cover Letter', 'Portfolio', 'Transcript', 'Other') NOT NULL,
    document_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (application_id) REFERENCES Applications(application_id) ON DELETE SET NULL
);

-- Table 7: Notes
-- Stores additional notes and research about applications
CREATE TABLE Notes (
    note_id INT PRIMARY KEY AUTO_INCREMENT,
    application_id INT NOT NULL,
    note_title VARCHAR(255),
    note_content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (application_id) REFERENCES Applications(application_id) ON DELETE CASCADE
);

-- Sample Data for Testing
-- Insert sample users
INSERT INTO Users (email, password_hash, first_name, last_name) VALUES
('john.doe@example.com', '$2a$10$abcdefghijklmnopqrstuv', 'John', 'Doe'),
('jane.smith@example.com', '$2a$10$wxyzabcdefghijklmnopqrs', 'Jane', 'Smith');

-- Insert sample applications
INSERT INTO Applications (user_id, company_name, position_title, job_description, location, salary_range, application_status, application_date, job_url) VALUES
(1, 'Google', 'Software Engineering Intern', 'Build scalable systems and work on cutting-edge technology.', 'Mountain View, CA', '$40-50/hour', 'Interview', '2024-10-15', 'https://careers.google.com/jobs/123'),
(1, 'Microsoft', 'Product Management Intern', 'Work with cross-functional teams to deliver innovative products.', 'Redmond, WA', '$35-45/hour', 'Applied', '2024-10-20', 'https://careers.microsoft.com/jobs/456'),
(1, 'Meta', 'Data Science Intern', 'Analyze large datasets to drive business decisions.', 'Menlo Park, CA', '$45-55/hour', 'Rejected', '2024-09-30', 'https://metacareers.com/jobs/789');

-- Insert sample interviews
INSERT INTO Interviews (application_id, interview_type, interview_date, location, interviewer_name, notes, outcome) VALUES
(1, 'Phone Screen', '2024-10-25 14:00:00', 'Remote', 'Sarah Johnson', 'Initial screening went well. Discussed background and interest in the role.', 'Passed'),
(1, 'Technical', '2024-11-05 10:00:00', 'Remote', 'Mike Chen', 'Coding interview scheduled. Focus on algorithms and data structures.', 'Pending');

-- Insert sample contacts
INSERT INTO Contacts (application_id, contact_name, contact_title, contact_email, contact_phone) VALUES
(1, 'Sarah Johnson', 'Technical Recruiter', 'sarah.johnson@google.com', '650-555-0123'),
(2, 'David Lee', 'Recruiting Manager', 'david.lee@microsoft.com', '425-555-0456');

-- Insert sample reminders
INSERT INTO Reminders (application_id, reminder_date, reminder_type, description, is_completed) VALUES
(1, '2024-11-04 09:00:00', 'Interview Prep', 'Prepare for technical interview - review algorithms', FALSE),
(1, '2024-11-06 10:00:00', 'Thank You Note', 'Send thank you email to interviewers', FALSE),
(2, '2024-11-15 09:00:00', 'Follow-up', 'Follow up on application status', FALSE);

-- Insert sample notes
INSERT INTO Notes (application_id, note_title, note_content) VALUES
(1, 'Company Research', 'Google is known for their engineering culture and innovative projects. Team works on Google Search infrastructure.'),
(2, 'Interview Tips', 'Microsoft values growth mindset. Be prepared to discuss how you handle challenges and learn from failures.');

-- Verify tables were created
SHOW TABLES;