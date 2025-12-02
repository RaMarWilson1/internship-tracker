-- MySQL dump 10.13  Distrib 9.3.0, for macos15 (x86_64)
--
-- Host: localhost    Database: internship_tracker
-- ------------------------------------------------------
-- Server version	9.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Applications`
--

DROP TABLE IF EXISTS `Applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Applications` (
  `application_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `position_title` varchar(255) NOT NULL,
  `job_description` text,
  `location` varchar(255) DEFAULT NULL,
  `salary_range` varchar(100) DEFAULT NULL,
  `application_status` enum('Applied','Interview','Offer','Rejected','Accepted','Withdrawn') DEFAULT 'Applied',
  `application_date` date NOT NULL,
  `job_url` varchar(500) DEFAULT NULL,
  `notes` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`application_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `applications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Applications`
--

LOCK TABLES `Applications` WRITE;
/*!40000 ALTER TABLE `Applications` DISABLE KEYS */;
INSERT INTO `Applications` VALUES (2,1,'Microsoft','Product Management Intern','Work with cross-functional teams to deliver innovative products.','Redmond, WA','$35-45/hour','Applied','2024-10-20','https://careers.microsoft.com/jobs/456',NULL,'2025-12-02 06:19:29','2025-12-02 06:19:29'),(3,1,'Meta','Data Science Intern','Analyze large datasets to drive business decisions.','Menlo Park, CA','$45-55/hour','Rejected','2024-09-30','https://metacareers.com/jobs/789',NULL,'2025-12-02 06:19:29','2025-12-02 06:19:29'),(4,1,'Apple','iOS Development Intern','Develop innovative features for iOS applications used \nby millions of users worldwide.','Cupertino, CA','$45-55/hour','Applied','2024-11-01','https://jobs.apple.com/jobs/123','Applied through career fair connection. Strong interest \nin mobile development.','2025-12-02 07:14:29','2025-12-02 07:14:29'),(5,1,'Amazon','Software Development Engineer Intern','Work on scalable cloud services and \ncontribute to AWS infrastructure.','Seattle, WA','$42-52/hour','Interview','2024-10-28','https://amazon.jobs/jobs/456','Recruiter reached out via LinkedIn. Interview scheduled for \nnext week.','2025-12-02 07:14:29','2025-12-02 07:14:29'),(6,2,'Netflix','Data Engineering Intern','Build data pipelines and analytics tools to \nsupport content recommendations.','Los Gatos, CA','$48-58/hour','Applied','2024-11-05','https://jobs.netflix.com/jobs/789','Referred by alumni. Strong match for ML background.','2025-12-02 07:14:29','2025-12-02 07:14:29'),(7,2,'Tesla','Software Engineering Intern - Autopilot','Contribute to self-driving \ntechnology and vehicle software systems.','Palo Alto, CA','$40-50/hour','Rejected','2024-10-10','https://tesla.com/careers/123','Applied early but received rejection. May \nreapply next semester.','2025-12-02 07:14:29','2025-12-02 07:14:29'),(8,2,'Salesforce','Cloud Engineering Intern','Develop enterprise cloud solutions and work \nwith Salesforce platform.','San Francisco, CA','$38-48/hour','Offer','2024-10-18','https://salesforce.com/careers/456','Received offer! Need to respond by November 15th. Very \nexcited about this opportunity!','2025-12-02 07:14:29','2025-12-02 07:14:29'),(9,1,'Apple','iOS Development Intern','Develop innovative features for iOS applications used \nby millions of users worldwide.','Cupertino, CA','$45-55/hour','Applied','2024-11-01','https://jobs.apple.com/jobs/123','Applied through career fair connection. Strong interest \nin mobile development.','2025-12-02 07:22:09','2025-12-02 07:22:09'),(10,1,'Amazon','Software Development Engineer Intern','Work on scalable cloud services and \ncontribute to AWS infrastructure.','Seattle, WA','$42-52/hour','Interview','2024-10-28','https://amazon.jobs/jobs/456','Recruiter reached out via LinkedIn. Interview scheduled for \nnext week.','2025-12-02 07:22:09','2025-12-02 07:22:09'),(11,2,'Netflix','Data Engineering Intern','Build data pipelines and analytics tools to \nsupport content recommendations.','Los Gatos, CA','$48-58/hour','Applied','2024-11-05','https://jobs.netflix.com/jobs/789','Referred by alumni. Strong match for ML background.','2025-12-02 07:22:09','2025-12-02 07:22:09'),(12,2,'Tesla','Software Engineering Intern - Autopilot','Contribute to self-driving \ntechnology and vehicle software systems.','Palo Alto, CA','$40-50/hour','Rejected','2024-10-10','https://tesla.com/careers/123','Applied early but received rejection. May \nreapply next semester.','2025-12-02 07:22:09','2025-12-02 07:22:09'),(13,2,'Salesforce','Cloud Engineering Intern','Develop enterprise cloud solutions and work \nwith Salesforce platform.','San Francisco, CA','$38-48/hour','Offer','2024-10-18','https://salesforce.com/careers/456','Received offer! Need to respond by November 15th. Very \nexcited about this opportunity!','2025-12-02 07:22:09','2025-12-02 07:22:09');
/*!40000 ALTER TABLE `Applications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Contacts`
--

DROP TABLE IF EXISTS `Contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Contacts` (
  `contact_id` int NOT NULL AUTO_INCREMENT,
  `application_id` int NOT NULL,
  `contact_name` varchar(255) NOT NULL,
  `contact_title` varchar(255) DEFAULT NULL,
  `contact_email` varchar(255) DEFAULT NULL,
  `contact_phone` varchar(50) DEFAULT NULL,
  `linkedin_url` varchar(500) DEFAULT NULL,
  `notes` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`contact_id`),
  KEY `application_id` (`application_id`),
  CONSTRAINT `contacts_ibfk_1` FOREIGN KEY (`application_id`) REFERENCES `Applications` (`application_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Contacts`
--

LOCK TABLES `Contacts` WRITE;
/*!40000 ALTER TABLE `Contacts` DISABLE KEYS */;
INSERT INTO `Contacts` VALUES (2,2,'David Lee','Recruiting Manager','david.lee@microsoft.com','425-555-0456',NULL,NULL,'2025-12-02 06:19:29','2025-12-02 06:19:29'),(3,4,'Emily Rodriguez','Technical Recruiter','emily.rodriguez@apple.com','408-555-0789','https://linkedin.com/in/emilyrodriguez',NULL,'2025-12-02 07:22:09','2025-12-02 07:22:09'),(4,5,'Jennifer Martinez','Senior Recruiter','jennifer.martinez@amazon.com','206-555-0234','https://linkedin.com/in/jennifermartinez',NULL,'2025-12-02 07:22:09','2025-12-02 07:22:09'),(5,6,'Kevin Park','Engineering Manager','kevin.park@netflix.com','408-555-0567','https://linkedin.com/in/kevinpark',NULL,'2025-12-02 07:22:09','2025-12-02 07:22:09'),(6,8,'Michael Chen','Team Lead - Cloud Platform','michael.chen@salesforce.com','415-555-0890','https://linkedin.com/in/michaelchen',NULL,'2025-12-02 07:22:09','2025-12-02 07:22:09');
/*!40000 ALTER TABLE `Contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Documents`
--

DROP TABLE IF EXISTS `Documents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Documents` (
  `document_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `application_id` int DEFAULT NULL,
  `document_type` enum('Resume','Cover Letter','Portfolio','Transcript','Other') NOT NULL,
  `document_name` varchar(255) NOT NULL,
  `file_path` varchar(500) NOT NULL,
  `uploaded_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`document_id`),
  KEY `user_id` (`user_id`),
  KEY `application_id` (`application_id`),
  CONSTRAINT `documents_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `documents_ibfk_2` FOREIGN KEY (`application_id`) REFERENCES `Applications` (`application_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Documents`
--

LOCK TABLES `Documents` WRITE;
/*!40000 ALTER TABLE `Documents` DISABLE KEYS */;
/*!40000 ALTER TABLE `Documents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Interviews`
--

DROP TABLE IF EXISTS `Interviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Interviews` (
  `interview_id` int NOT NULL AUTO_INCREMENT,
  `application_id` int NOT NULL,
  `interview_type` enum('Phone Screen','Technical','Behavioral','Panel','Final','Other') NOT NULL,
  `interview_date` datetime NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `interviewer_name` varchar(255) DEFAULT NULL,
  `interviewer_email` varchar(255) DEFAULT NULL,
  `notes` text,
  `outcome` enum('Pending','Passed','Failed','Cancelled') DEFAULT 'Pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`interview_id`),
  KEY `application_id` (`application_id`),
  CONSTRAINT `interviews_ibfk_1` FOREIGN KEY (`application_id`) REFERENCES `Applications` (`application_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Interviews`
--

LOCK TABLES `Interviews` WRITE;
/*!40000 ALTER TABLE `Interviews` DISABLE KEYS */;
INSERT INTO `Interviews` VALUES (6,5,'Phone Screen','2024-11-08 15:00:00','Remote','Jennifer Martinez','jennifer.martinez@amazon.com','Initial phone screen went very well. Discussed projects and \ntechnical background. Moved to next round.','Passed','2025-12-02 07:22:09','2025-12-02 07:22:09'),(7,5,'Technical','2024-11-15 10:00:00','Remote','Alex Thompson','alex.thompson@amazon.com','Coding interview scheduled. Focus on algorithms, data \nstructures, and system design. Prepare LeetCode medium/hard problems.','Pending','2025-12-02 07:22:09','2025-12-02 07:22:09'),(8,8,'Final','2024-10-25 13:00:00','San Francisco, CA','Michael Chen','michael.chen@salesforce.com','Final interview with team lead and manager. Discussed team \nculture, projects, and career growth. Received offer same day!','Passed','2025-12-02 07:22:09','2025-12-02 07:22:09');
/*!40000 ALTER TABLE `Interviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Notes`
--

DROP TABLE IF EXISTS `Notes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Notes` (
  `note_id` int NOT NULL AUTO_INCREMENT,
  `application_id` int NOT NULL,
  `note_title` varchar(255) DEFAULT NULL,
  `note_content` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`note_id`),
  KEY `application_id` (`application_id`),
  CONSTRAINT `notes_ibfk_1` FOREIGN KEY (`application_id`) REFERENCES `Applications` (`application_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Notes`
--

LOCK TABLES `Notes` WRITE;
/*!40000 ALTER TABLE `Notes` DISABLE KEYS */;
INSERT INTO `Notes` VALUES (2,2,'Interview Tips','Microsoft values growth mindset. Be prepared to discuss how you handle challenges and learn from failures.','2025-12-02 06:19:29','2025-12-02 06:19:29'),(3,4,'Apple Career Fair Notes','Met recruiter Emily at career fair. She mentioned they are \nlooking for interns with strong Swift/SwiftUI experience. Emphasized innovation and user \nexperience. Company culture seems collaborative and fast-paced.','2025-12-02 07:22:09','2025-12-02 07:22:09'),(4,5,'Amazon Interview Prep','Key areas to study: AWS services (EC2, S3, Lambda), system \ndesign principles, leadership principles (especially \"Customer Obsession\" and \"Bias for \nAction\"). Practice explaining projects using STAR method.','2025-12-02 07:22:09','2025-12-02 07:22:09'),(5,6,'Netflix Engineering Blog Research','Netflix tech stack: Java, Python, Kafka, Cassandra. \nKnown for microservices architecture and A/B testing culture. Engineering blog has great \ninsights on their recommendation algorithms and data infrastructure.','2025-12-02 07:22:09','2025-12-02 07:22:09'),(6,8,'Salesforce Offer Details','Offer: $45/hour, housing stipend $2000/month, relocation \nassistance provided. Team: Cloud Platform Engineering. Start date: June 2025. Manager seems \nsupportive and team works on interesting enterprise problems.','2025-12-02 07:22:09','2025-12-02 07:22:09');
/*!40000 ALTER TABLE `Notes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Reminders`
--

DROP TABLE IF EXISTS `Reminders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Reminders` (
  `reminder_id` int NOT NULL AUTO_INCREMENT,
  `application_id` int NOT NULL,
  `reminder_date` datetime NOT NULL,
  `reminder_type` enum('Follow-up','Interview Prep','Application Deadline','Thank You Note','Other') NOT NULL,
  `description` text NOT NULL,
  `is_completed` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`reminder_id`),
  KEY `application_id` (`application_id`),
  CONSTRAINT `reminders_ibfk_1` FOREIGN KEY (`application_id`) REFERENCES `Applications` (`application_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Reminders`
--

LOCK TABLES `Reminders` WRITE;
/*!40000 ALTER TABLE `Reminders` DISABLE KEYS */;
INSERT INTO `Reminders` VALUES (3,2,'2024-11-15 09:00:00','Follow-up','Follow up on application status',0,'2025-12-02 06:19:29','2025-12-02 06:19:29'),(4,4,'2024-11-20 09:00:00','Follow-up','Follow up on Apple application status via email to \nEmily',0,'2025-12-02 07:22:09','2025-12-02 07:22:09'),(5,5,'2024-11-14 10:00:00','Interview Prep','Prepare for Amazon technical interview - review \nsystem design and AWS concepts',0,'2025-12-02 07:22:09','2025-12-02 07:22:09'),(6,5,'2024-11-16 09:00:00','Thank You Note','Send thank you email to Alex Thompson after \ntechnical interview',0,'2025-12-02 07:22:09','2025-12-02 07:22:09'),(7,6,'2024-11-18 09:00:00','Follow-up','Check on Netflix application status',0,'2025-12-02 07:22:09','2025-12-02 07:22:09'),(8,8,'2024-11-14 17:00:00','Application Deadline','URGENT: Respond to Salesforce offer by \nNovember 15th deadline',0,'2025-12-02 07:22:09','2025-12-02 07:22:09');
/*!40000 ALTER TABLE `Reminders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'john.doe@example.com','$2a$10$abcdefghijklmnopqrstuv','John','Doe','2025-12-02 06:19:29','2025-12-02 06:19:29'),(2,'jane.smith@example.com','$2a$10$wxyzabcdefghijklmnopqrs','Jane','Smith','2025-12-02 06:19:29','2025-12-02 06:19:29');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-02 11:03:32
