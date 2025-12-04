-- Additional Sample Data for Internship Tracker
-- Issue #2: Add 5 more applications and 3 more interviews
-- Created by: Ihor (Database Lead)
-- Date: December 2, 2025

USE internship_tracker;

-- Add 5 more sample applications
INSERT INTO Applications (user_id, company_name, position_title, job_description, location, 
salary_range, application_status, application_date, job_url, notes) VALUES
(1, 'Apple', 'iOS Development Intern', 'Develop innovative features for iOS applications used 
by millions of users worldwide.', 'Cupertino, CA', '$45-55/hour', 'Applied', '2024-11-01', 
'https://jobs.apple.com/jobs/123', 'Applied through career fair connection. Strong interest 
in mobile development.'),

(1, 'Amazon', 'Software Development Engineer Intern', 'Work on scalable cloud services and 
contribute to AWS infrastructure.', 'Seattle, WA', '$42-52/hour', 'Interview', '2024-10-28', 
'https://amazon.jobs/jobs/456', 'Recruiter reached out via LinkedIn. Interview scheduled for 
next week.'),

(2, 'Netflix', 'Data Engineering Intern', 'Build data pipelines and analytics tools to 
support content recommendations.', 'Los Gatos, CA', '$48-58/hour', 'Applied', '2024-11-05', 
'https://jobs.netflix.com/jobs/789', 'Referred by alumni. Strong match for ML background.'),

(2, 'Tesla', 'Software Engineering Intern - Autopilot', 'Contribute to self-driving 
technology and vehicle software systems.', 'Palo Alto, CA', '$40-50/hour', 'Rejected', 
'2024-10-10', 'https://tesla.com/careers/123', 'Applied early but received rejection. May 
reapply next semester.'),

(2, 'Salesforce', 'Cloud Engineering Intern', 'Develop enterprise cloud solutions and work 
with Salesforce platform.', 'San Francisco, CA', '$38-48/hour', 'Offer', '2024-10-18', 
'https://salesforce.com/careers/456', 'Received offer! Need to respond by November 15th. Very 
excited about this opportunity!');

-- Add 3 more sample interviews (for applications that are in Interview or Offer status)
INSERT INTO Interviews (application_id, interview_type, interview_date, location, 
interviewer_name, interviewer_email, notes, outcome) VALUES
-- Amazon (application_id = 5) - currently in Interview status
(5, 'Phone Screen', '2024-11-08 15:00:00', 'Remote', 'Jennifer Martinez', 
'jennifer.martinez@amazon.com', 'Initial phone screen went very well. Discussed projects and 
technical background. Moved to next round.', 'Passed'),

(5, 'Technical', '2024-11-15 10:00:00', 'Remote', 'Alex Thompson', 
'alex.thompson@amazon.com', 'Coding interview scheduled. Focus on algorithms, data 
structures, and system design. Prepare LeetCode medium/hard problems.', 'Pending'),

-- Salesforce (application_id = 8) - received Offer (FIXED: Changed 'Final Round' to 'Final')
(8, 'Final', '2024-10-25 13:00:00', 'San Francisco, CA', 'Michael Chen', 
'michael.chen@salesforce.com', 'Final interview with team lead and manager. Discussed team 
culture, projects, and career growth. Received offer same day!', 'Passed');

-- Add more contacts for the new applications
INSERT INTO Contacts (application_id, contact_name, contact_title, contact_email, 
contact_phone, linkedin_url) VALUES
(4, 'Emily Rodriguez', 'Technical Recruiter', 'emily.rodriguez@apple.com', '408-555-0789', 
'https://linkedin.com/in/emilyrodriguez'),
(5, 'Jennifer Martinez', 'Senior Recruiter', 'jennifer.martinez@amazon.com', '206-555-0234', 
'https://linkedin.com/in/jennifermartinez'),
(6, 'Kevin Park', 'Engineering Manager', 'kevin.park@netflix.com', '408-555-0567', 
'https://linkedin.com/in/kevinpark'),
(8, 'Michael Chen', 'Team Lead - Cloud Platform', 'michael.chen@salesforce.com', 
'415-555-0890', 'https://linkedin.com/in/michaelchen');

-- Add more reminders for new applications
INSERT INTO Reminders (application_id, reminder_date, reminder_type, description, 
is_completed) VALUES
(4, '2024-11-20 09:00:00', 'Follow-up', 'Follow up on Apple application status via email to 
Emily', FALSE),
(5, '2024-11-14 10:00:00', 'Interview Prep', 'Prepare for Amazon technical interview - review 
system design and AWS concepts', FALSE),
(5, '2024-11-16 09:00:00', 'Thank You Note', 'Send thank you email to Alex Thompson after 
technical interview', FALSE),
(6, '2024-11-18 09:00:00', 'Follow-up', 'Check on Netflix application status', FALSE),
(8, '2024-11-14 17:00:00', 'Application Deadline', 'URGENT: Respond to Salesforce offer by 
November 15th deadline', FALSE);

-- Add more notes for new applications
INSERT INTO Notes (application_id, note_title, note_content) VALUES
(4, 'Apple Career Fair Notes', 'Met recruiter Emily at career fair. She mentioned they are 
looking for interns with strong Swift/SwiftUI experience. Emphasized innovation and user 
experience. Company culture seems collaborative and fast-paced.'),
(5, 'Amazon Interview Prep', 'Key areas to study: AWS services (EC2, S3, Lambda), system 
design principles, leadership principles (especially "Customer Obsession" and "Bias for 
Action"). Practice explaining projects using STAR method.'),
(6, 'Netflix Engineering Blog Research', 'Netflix tech stack: Java, Python, Kafka, Cassandra. 
Known for microservices architecture and A/B testing culture. Engineering blog has great 
insights on their recommendation algorithms and data infrastructure.'),
(8, 'Salesforce Offer Details', 'Offer: $45/hour, housing stipend $2000/month, relocation 
assistance provided. Team: Cloud Platform Engineering. Start date: June 2025. Manager seems 
supportive and team works on interesting enterprise problems.');

-- Verify the new data was inserted
SELECT 'Total Applications:' as metric, COUNT(*) as count FROM Applications
UNION ALL
SELECT 'Total Interviews:', COUNT(*) FROM Interviews
UNION ALL
SELECT 'Total Contacts:', COUNT(*) FROM Contacts
UNION ALL
SELECT 'Total Reminders:', COUNT(*) FROM Reminders
UNION ALL
SELECT 'Total Notes:', COUNT(*) FROM Notes;

-- Show applications by status
SELECT application_status, COUNT(*) as count 
FROM Applications 
GROUP BY application_status 
ORDER BY count DESC;
