//*** RaMar Wilson
//*** Database Systems - Final Project
//*** December 2, 2025
//*** Ranking Statement Page

import Link from 'next/link';

export default function RankingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium">
            ← Back to Dashboard
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-3">
            Team 7 - Project Ranking Statement
          </h1>
          
          <div className="space-y-2 mb-8 text-gray-700">
            <p><strong>Course:</strong> Database Systems - Final Project</p>
            <p><strong>Project:</strong> Internship Application Tracker</p>
            <p><strong>Date:</strong> December 4, 2025</p>
            <p><strong>Live Application:</strong> <a href="https://internship-tracker-two.vercel.app" className="text-blue-600 hover:underline">https://internship-tracker-two.vercel.app</a></p>
          </div>

          {/* RaMar Wilson - 40% */}
          <div className="mb-10 p-6 bg-blue-50 border-l-4 border-blue-600 rounded">
            <h2 className="text-2xl font-semibold text-blue-900 mb-3">Member 1: RaMar Wilson</h2>
            <p className="text-xl font-bold text-blue-600 mb-4">My teammates and I agree that I handled 40% of the overall project.</p>
            
            <p className="font-semibold text-gray-800 mb-3">My specific tasks included:</p>
            
            <ul className="space-y-4 text-gray-700">
              <li>
                <strong className="text-gray-900">Task 1 - Frontend Development:</strong> I designed and implemented all 8 frontend pages using Next.js and React, including Dashboard, Applications, Interviews, Analytics, Email Import, Login, Register, and Add Application pages. I built responsive UI with Tailwind CSS ensuring mobile and desktop compatibility.
              </li>
              
              <li>
                <strong className="text-gray-900">Task 2 - Reusable Components:</strong> I created reusable React components including Navbar, SessionProvider, ApplicationCard, Button, StatusBadge, LoadingSpinner, and ErrorMessage to maintain code consistency and reusability.
              </li>
              
              <li>
                <strong className="text-gray-900">Task 3 - API Development:</strong> I implemented all CRUD API routes for Applications at /api/applications, created the Interviews API with JOIN operations at /api/interviews, developed the Analytics API with aggregations and GROUP BY at /api/analytics, and built individual application operations (GET, PUT, PATCH, DELETE) at /api/applications/[id].
              </li>
              
              <li>
                <strong className="text-gray-900">Task 4 - Gmail OAuth Integration:</strong> I integrated Gmail OAuth 2.0 API for secure authentication, implemented an email parsing algorithm to extract company names, positions, and application dates from emails, and created three API routes (/api/email/connect, /api/email/callback, /api/email/parse) to handle the complete Gmail integration workflow.
              </li>
              
              <li>
                <strong className="text-gray-900">Task 5 - Cloud Deployment & CI/CD:</strong> I deployed the frontend application to Vercel with automatic deployments on every Git commit, configured Railway MySQL database connection with secure environment variables, set up a complete CI/CD pipeline ensuring zero-downtime deployments, and managed all environment variables for both production and development environments.
              </li>
              
              <li>
                <strong className="text-gray-900">Task 6 - User Authentication:</strong> I implemented user login and logout functionality, created the SessionProvider component for route protection, built authentication UI for login and register pages, and implemented session management using sessionStorage.
              </li>
              
              <li>
                <strong className="text-gray-900">Task 7 - Interactive Features:</strong> I implemented inline status updates using dropdown selectors directly in the applications table, added delete functionality with confirmation dialogs to prevent accidental deletions, created search and filter features allowing users to find applications by company name, position, or status, and built comprehensive form validation for all user inputs.
              </li>
              
              <li>
                <strong className="text-gray-900">Task 8 - Error Handling & UX:</strong> I implemented error handling throughout the application with user-friendly error messages, created loading states with spinner animations for better user feedback, added success notifications that auto-dismiss after 3 seconds, and ensured all forms have proper validation before submission.
              </li>
            </ul>
          </div>

          {/* Ihor - 30% */}
          <div className="mb-10 p-6 bg-purple-50 border-l-4 border-purple-600 rounded">
            <h2 className="text-2xl font-semibold text-purple-900 mb-3">Member 2: Ihor</h2>
            <p className="text-xl font-bold text-purple-600 mb-4">My teammates and I agree that I handled 30% of the overall project.</p>
            
            <p className="font-semibold text-gray-800 mb-3">My specific tasks included:</p>
            
            <ul className="space-y-4 text-gray-700">
              <li>
                <strong className="text-gray-900">Task 1 - Database Architecture:</strong> I designed the complete database schema with 7 normalized tables (Users, Applications, Interviews, Contacts, Reminders, Documents, Notes), ensuring proper relationships and data integrity.
              </li>
              
              <li>
                <strong className="text-gray-900">Task 2 - ER Diagram Creation:</strong> I created a comprehensive Entity-Relationship Diagram showing all entities, relationships, cardinality notations (1:1, 1:N, M:N), primary keys, and foreign keys using proper database modeling tools.
              </li>
              
              <li>
                <strong className="text-gray-900">Task 3 - SQL Schema Implementation:</strong> I wrote all SQL DDL statements for table creation, implemented foreign key constraints with ON DELETE CASCADE operations to maintain referential integrity, defined ENUM types for application_status, interview_type, reminder_type, and document_type, and set up automatic timestamp fields with ON UPDATE CURRENT_TIMESTAMP.
              </li>
              
              <li>
                <strong className="text-gray-900">Task 4 - Database Normalization:</strong> I ensured all tables are in Third Normal Form (3NF) by eliminating partial and transitive dependencies, removed data redundancy through proper relationship design, and documented the normalization process and design decisions.
              </li>
              
              <li>
                <strong className="text-gray-900">Task 5 - Sample Data Creation:</strong> I created realistic sample data for testing including Google, Microsoft, and Meta applications with corresponding interview data, and designed test cases covering all entities and relationships.
              </li>
              
              <li>
                <strong className="text-gray-900">Task 6 - Database Documentation:</strong> I documented the complete relational schema with attribute descriptions, explained the rationale behind each design decision, and created documentation for foreign key relationships and cascade operations.
              </li>
              
              <li>
                <strong className="text-gray-900">Task 7 - Data Integrity:</strong> I implemented NOT NULL constraints for required fields, created UNIQUE constraints for email addresses, designed appropriate data types for all attributes, and ensured proper indexing for query performance.
              </li>
            </ul>
          </div>

          {/* Sid - 30% */}
          <div className="mb-10 p-6 bg-green-50 border-l-4 border-green-600 rounded">
            <h2 className="text-2xl font-semibold text-green-900 mb-3">Member 3: Sid</h2>
            <p className="text-xl font-bold text-green-600 mb-4">My teammates and I agree that I handled 30% of the overall project.</p>
            
            <p className="font-semibold text-gray-800 mb-3">My specific tasks included:</p>
            
            <ul className="space-y-4 text-gray-700">
              <li>
                <strong className="text-gray-900">Task 1 - Additional API Development:</strong> I implemented the Contacts API routes for managing recruiter and company contact information, created the Reminders API for tracking follow-ups and important dates, developed the Notes API for storing additional application details and observations, and built the Documents API for future file management functionality.
              </li>
              
              <li>
                <strong className="text-gray-900">Task 2 - Complex SQL Queries:</strong> I wrote JOIN queries combining Applications and Interviews tables to show complete application histories, implemented aggregation queries using COUNT, AVG, and GROUP BY for the analytics dashboard, created queries for top companies ranked by application count, and developed queries for application trends showing monthly patterns over 6 months.
              </li>
              
              <li>
                <strong className="text-gray-900">Task 3 - Query Optimization:</strong> I analyzed query performance and identified bottlenecks, optimized JOIN operations for faster data retrieval, implemented efficient WHERE clauses for filtering, and ensured proper use of indexes on frequently queried columns.
              </li>
              
              <li>
                <strong className="text-gray-900">Task 4 - Comprehensive Error Handling:</strong> I implemented try-catch blocks in all API routes to catch database errors, created a consistent error response format across all APIs with appropriate HTTP status codes (400, 401, 404, 500), added validation for required fields and data types, and built error handling for database connection issues and timeout errors.
              </li>
              
              <li>
                <strong className="text-gray-900">Task 5 - Testing & Quality Assurance:</strong> I tested all CRUD operations (SELECT, INSERT, UPDATE, DELETE) to ensure data integrity, verified that foreign key constraints and CASCADE operations work correctly, tested edge cases including empty fields, invalid data, and missing records, and performed integration testing to ensure frontend and backend work together seamlessly.
              </li>
              
              <li>
                <strong className="text-gray-900">Task 6 - API Documentation:</strong> I documented all API endpoints with their routes, HTTP methods, and purposes, created example requests and responses for each endpoint, wrote detailed code comments explaining complex SQL queries, and provided documentation on error codes and handling strategies.
              </li>
              
              <li>
                <strong className="text-gray-900">Task 7 - Data Validation:</strong> I implemented server-side validation for all data inputs, created validation rules for email formats, dates, and ENUM values, added checks for required fields before database insertion, and ensured data type consistency throughout the application.
              </li>
            </ul>
          </div>

          {/* Team Agreement */}
          <div className="mt-10 pt-8 border-t-2 border-gray-300">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Team Agreement</h3>
            <p className="text-gray-700 mb-6">
              All team members contributed significantly to the projects success. This ranking statement accurately reflects our agreed-upon distribution of work: <strong>RaMar Wilson (40%)</strong>, <strong>Ihor (30%)</strong>, and <strong>Sid (30%)</strong>. We worked collaboratively throughout the project, supporting each others work and ensuring high quality across all components.
            </p>
            
            <div className="space-y-4 text-gray-700">
              <div className="flex items-center space-x-4">
                <span className="font-semibold">Signatures:</span>
              </div>
              <div className="pl-4 space-y-3">
                <p> RaMar Wilson</p>
                <p> Ihor Houblets</p>
                <p> Sid Sreedhar</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-gray-600 border-t pt-6">
            <p><strong>Team 7 - Database Systems Final Project</strong></p>
            <p>Saint Josephs University • Fall 2025</p>
          </div>
        </div>
      </main>
    </div>
  );
}