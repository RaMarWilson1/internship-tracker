 # GitHub Issues for Internship Tracker Project
## Team 7: RaMar, Sid, Ihor

Copy these issues into GitHub: Go to your repo → Issues tab → New Issue → Copy/paste each one

---

## IHOR - Database Lead

### Issue #1: Set Up Local Development Environment
**Assignee:** Ihor  
**Labels:** setup, database  
**Due:** November 5, 2024

**Description:**
Set up your local development environment to work on the project.

**Tasks:**
- [ ] Clone GitHub repository to local machine
- [ ] Install Node.js 18+ and verify: `node --version`
- [ ] Install MySQL and verify: `mysql --version`
- [ ] Run `npm install` in project root
- [ ] Create `.env.local` file with database credentials
- [ ] Load schema.sql into MySQL: `mysql -u root -p < database/schema.sql`
- [ ] Verify database has 7 tables: `SHOW TABLES;`
- [ ] Verify sample data exists: `SELECT * FROM Applications;`
- [ ] Start dev server: `npm run dev`
- [ ] Test API endpoint: http://localhost:3000/api/applications

**Acceptance Criteria:**
- Can see 3 sample applications in MySQL
- Can access API endpoint in browser
- No errors in terminal when running `npm run dev`

**Resources:**
- Setup guide: See internship_tracker_guide.pdf
- Team Slack/Discord for questions

---

### Issue #2: Review and Document Database Schema
**Assignee:** Ihor  
**Labels:** database, documentation  
**Due:** November 7, 2024  
**Depends on:** #1

**Description:**
Review the existing database schema, understand all relationships, and document it.

**Tasks:**
- [ ] Review all 7 tables in schema.sql
- [ ] Understand primary keys and foreign keys
- [ ] Document each table's purpose in a database/README.md file
- [ ] List all relationships (1:N, M:N)
- [ ] Test foreign key constraints by trying to insert invalid data
- [ ] Verify CASCADE DELETE works (delete an application, check interviews)
- [ ] Add 5 more sample applications for testing
- [ ] Add 3 more sample interviews
- [ ] Add sample contacts and reminders

**Acceptance Criteria:**
- Database has at least 8 total applications
- database/README.md explains each table
- All foreign key constraints tested and working
- Sample data covers various statuses (Applied, Interview, Offer, Rejected)

**Deliverables:**
- `database/README.md` with table documentation
- Additional INSERT statements in `database/seed_data.sql`

---

### Issue #3: Generate ERD Using MySQL Workbench
**Assignee:** Ihor  
**Labels:** database, documentation  
**Due:** November 20, 2024  
**Depends on:** #2

**Description:**
Create professional ERD diagram for the final report using MySQL Workbench.

**Tasks:**
- [ ] Install MySQL Workbench if not already installed
- [ ] Connect Workbench to local database
- [ ] Database → Reverse Engineer → Select internship_tracker
- [ ] Organize diagram layout (Users at top, Applications below, etc.)
- [ ] Ensure all relationships are visible and clear
- [ ] Make sure primary keys (yellow icons) are visible
- [ ] Export as PNG: File → Export → Export as PNG
- [ ] Save as `docs/database_erd.png`
- [ ] Add ERD to project README.md

**Acceptance Criteria:**
- ERD shows all 7 tables
- All relationships (lines) are visible
- Primary and foreign keys are marked
- Image is high resolution (readable when printed)
- ERD is in GitHub repo under docs/ folder

**Deliverables:**
- `docs/database_erd.png`
- Updated README.md with ERD image

---

### Issue #4: Database Backup and Cloud SQL Migration Prep
**Assignee:** Ihor  
**Labels:** database, deployment  
**Due:** November 27, 2024

**Description:**
Prepare database for migration to Google Cloud SQL in Week 4.

**Tasks:**
- [ ] Export current database: `mysqldump -u root -p internship_tracker > database/backup.sql`
- [ ] Test restore on fresh database to ensure backup works
- [ ] Document backup/restore procedures in database/README.md
- [ ] Create `database/production_setup.sql` for Cloud SQL (same as schema.sql but production-ready)
- [ ] Review Google Cloud SQL documentation
- [ ] Create checklist for Cloud SQL migration

**Acceptance Criteria:**
- backup.sql successfully restores database
- Documentation is clear for team members
- Ready to migrate to Cloud SQL in Week 4

**Deliverables:**
- `database/backup.sql`
- `database/production_setup.sql`
- Updated database/README.md with procedures

---

## SID - Backend API Lead

### Issue #5: Set Up Development Environment
**Assignee:** Sid  
**Labels:** setup, backend  
**Due:** November 5, 2024

**Description:**
Get your local environment running and understand the existing API structure.

**Tasks:**
- [ ] Clone GitHub repository
- [ ] Install dependencies: `npm install`
- [ ] Create `.env.local` with database credentials
- [ ] Load database: `mysql -u root -p < database/schema.sql`
- [ ] Start dev server: `npm run dev`
- [ ] Test existing API: http://localhost:3000/api/applications
- [ ] Review `app/api/applications/route.js` code
- [ ] Review `lib/db.js` database connection
- [ ] Test POST endpoint using Postman or curl

**Acceptance Criteria:**
- Can run dev server without errors
- Can GET applications from API
- Understands Next.js API route structure
- Ready to build more endpoints

---

### Issue #6: Create Single Application CRUD API
**Assignee:** Sid  
**Labels:** backend, api  
**Due:** November 8, 2024  
**Depends on:** #5

**Description:**
Create API routes for getting, updating, and deleting a single application.

**Tasks:**
- [ ] Create `app/api/applications/[id]/route.js`
- [ ] Implement GET single application by ID
- [ ] Implement PUT to update application
- [ ] Implement DELETE to remove application
- [ ] Add error handling for invalid IDs (404 responses)
- [ ] Add validation for required fields
- [ ] Test all endpoints with Postman
- [ ] Document endpoints in API_DOCS.md

**API Endpoints:**
- `GET /api/applications/[id]` - Get single application
- `PUT /api/applications/[id]` - Update application
- `DELETE /api/applications/[id]` - Delete application

**Acceptance Criteria:**
- All 3 endpoints work correctly
- Returns proper error codes (404, 400, 500)
- Updates are reflected in database
- Deletes remove application and cascade to interviews/contacts

**Deliverables:**
- `app/api/applications/[id]/route.js`
- `docs/API_DOCS.md` with endpoint documentation

---

### Issue #7: Create Interviews API Routes
**Assignee:** Sid  
**Labels:** backend, api  
**Due:** November 10, 2024  
**Depends on:** #6

**Description:**
Build complete CRUD API for interviews with JOIN to applications.

**Tasks:**
- [ ] Create `app/api/interviews/route.js`
- [ ] Implement GET all interviews (with application details via JOIN)
- [ ] Implement POST new interview
- [ ] Add validation (date must be future, application must exist)
- [ ] Create `app/api/interviews/[id]/route.js`
- [ ] Implement GET, PUT, DELETE for single interview
- [ ] Add endpoint to mark interview as completed
- [ ] Test all endpoints
- [ ] Update API_DOCS.md

**API Endpoints:**
- `GET /api/interviews` - All interviews with application info
- `POST /api/interviews` - Create new interview
- `GET /api/interviews/[id]` - Single interview
- `PUT /api/interviews/[id]` - Update interview
- `DELETE /api/interviews/[id]` - Delete interview
- `PATCH /api/interviews/[id]/complete` - Mark as completed

**SQL Requirements:**
- Use JOIN to get company_name and position_title with interviews
- Use ORDER BY to sort by date
- Validate application_id exists before INSERT

**Acceptance Criteria:**
- All endpoints return correct data
- JOINs work properly
- Can't create interview for non-existent application
- Dates validated

**Deliverables:**
- `app/api/interviews/route.js`
- `app/api/interviews/[id]/route.js`
- Updated API_DOCS.md

---

### Issue #8: Create Contacts and Reminders API Routes
**Assignee:** Sid  
**Labels:** backend, api  
**Due:** November 13, 2024  
**Depends on:** #7

**Description:**
Build CRUD APIs for contacts and reminders.

**Tasks:**

**Contacts API:**
- [ ] Create `app/api/contacts/route.js` (GET all, POST new)
- [ ] Create `app/api/contacts/[id]/route.js` (GET, PUT, DELETE)
- [ ] JOIN with applications to show company name
- [ ] Validate email format if provided

**Reminders API:**
- [ ] Create `app/api/reminders/route.js` (GET all, POST new)
- [ ] Create `app/api/reminders/[id]/route.js` (GET, PUT, DELETE)
- [ ] Add endpoint to get overdue reminders: `GET /api/reminders/overdue`
- [ ] Add endpoint to get upcoming reminders: `GET /api/reminders/upcoming`
- [ ] Add endpoint to mark reminder complete

**Acceptance Criteria:**
- All CRUD operations work
- Proper validation on all inputs
- Date queries work correctly (overdue, upcoming)
- All documented in API_DOCS.md

**Deliverables:**
- `app/api/contacts/route.js` and `app/api/contacts/[id]/route.js`
- `app/api/reminders/route.js` and `app/api/reminders/[id]/route.js`
- Updated API_DOCS.md

---

### Issue #9: Create Analytics API with Complex Queries
**Assignee:** Sid  
**Labels:** backend, api, sql  
**Due:** November 18, 2024  
**Depends on:** #8

**Description:**
Build analytics endpoint with advanced SQL queries (GROUP BY, aggregations, JOINs).

**Tasks:**
- [ ] Create `app/api/analytics/route.js`
- [ ] Query: Total applications count
- [ ] Query: Applications by status (GROUP BY)
- [ ] Query: Success rate calculation (offers / total)
- [ ] Query: Upcoming interviews count
- [ ] Query: Average days to hear back (date calculations)
- [ ] Query: Most responsive companies
- [ ] Query: Application trends by month
- [ ] Query: Interview conversion rate
- [ ] Return all as JSON object

**SQL Requirements:**
- Use GROUP BY for counts by status
- Use aggregate functions (COUNT, SUM, AVG)
- Use JOINs for related data
- Use date functions (DATEDIFF, DATE_FORMAT)
- Use CASE statements for conditional logic

**Acceptance Criteria:**
- Returns comprehensive analytics object
- All calculations are correct
- Queries are optimized
- Handles empty database gracefully

**Deliverables:**
- `app/api/analytics/route.js`
- SQL queries documented in API_DOCS.md

---

### Issue #10: Error Handling and Validation Improvements
**Assignee:** Sid  
**Labels:** backend, enhancement  
**Due:** November 22, 2024

**Description:**
Add comprehensive error handling and validation to all API endpoints.

**Tasks:**
- [ ] Review all API routes for consistent error handling
- [ ] Add try-catch blocks everywhere
- [ ] Return proper HTTP status codes (200, 201, 400, 404, 409, 500)
- [ ] Validate all required fields
- [ ] Validate data types (dates, emails, enums)
- [ ] Handle duplicate entry errors
- [ ] Handle foreign key constraint errors
- [ ] Add descriptive error messages
- [ ] Log errors to console with timestamps
- [ ] Create error handling utility function

**Acceptance Criteria:**
- All endpoints have proper error handling
- Clear error messages returned to frontend
- No unhandled promise rejections
- Console logs are helpful for debugging

**Deliverables:**
- Updated all API route files
- `lib/errorHandler.js` utility (if created)

---

## RAMAR - Frontend & Integration Lead

### Issue #11: Update Homepage with Applications Display
**Assignee:** RaMar  
**Labels:** frontend, ui  
**Due:** November 7, 2024

**Description:**
Build the main homepage that displays applications list and add form.

**Tasks:**
- [ ] Update `app/page.js` with complete UI
- [ ] Create applications table with all fields
- [ ] Add form to create new application
- [ ] Connect form to POST API endpoint
- [ ] Add loading state while fetching data
- [ ] Add error handling and display error messages
- [ ] Style with Tailwind CSS
- [ ] Add color-coded status badges
- [ ] Make table responsive (scrollable on mobile)
- [ ] Add success message after adding application

**Features:**
- Table showing: Company, Position, Date, Location, Status
- Form with: Company Name*, Position*, Date*, Status, Location, Salary, URL, Notes
- Status badges with colors (Applied=blue, Interview=purple, Offer=green, Rejected=red)
- Form validation (required fields marked with *)

**Acceptance Criteria:**
- Can see all applications in a table
- Can add new application via form
- Form validation works
- Loading states show while fetching
- Looks professional with Tailwind

**Deliverables:**
- Updated `app/page.js`

---

### Issue #12: Create Reusable Components
**Assignee:** RaMar  
**Labels:** frontend, components  
**Due:** November 10, 2024  
**Depends on:** #11

**Description:**
Extract reusable components from homepage for use across the app.

**Tasks:**
- [ ] Create `components/` directory
- [ ] Create `components/Navbar.js` - Site navigation
- [ ] Create `components/StatusBadge.js` - Colored status pills
- [ ] Create `components/ApplicationCard.js` - Single application display
- [ ] Create `components/LoadingSpinner.js` - Loading indicator
- [ ] Create `components/ErrorMessage.js` - Error display
- [ ] Create `components/Button.js` - Reusable button styles
- [ ] Update homepage to use these components
- [ ] Add PropTypes or TypeScript types

**Component Props:**

**StatusBadge:**
- `status` (string): Applied, Phone Screen, Interview, Offer, Rejected
- Returns: Styled span with correct color

**ApplicationCard:**
- `application` (object): Full application data
- `onEdit` (function): Edit handler
- `onDelete` (function): Delete handler

**Navbar:**
- Links to: Dashboard, Applications, Interviews, Analytics

**Acceptance Criteria:**
- All components are reusable
- Props are documented
- Components work across different pages
- Styling is consistent

**Deliverables:**
- All component files in `components/` directory
- Updated homepage using components

---

### Issue #13: Create Applications List Page with Search/Filter
**Assignee:** RaMar  
**Labels:** frontend, feature  
**Due:** November 14, 2024  
**Depends on:** #12

**Description:**
Build dedicated applications page with advanced search and filtering.

**Tasks:**
- [ ] Create `app/applications/page.js`
- [ ] Fetch all applications from API
- [ ] Display in sortable table
- [ ] Add search bar (search by company or position)
- [ ] Add filter dropdowns:
  - Filter by status
  - Filter by date range
  - Filter by location
- [ ] Add sort options (by date, company, status)
- [ ] Add pagination (10 per page)
- [ ] Add "Edit" button for each application
- [ ] Add "Delete" button with confirmation modal
- [ ] Connect Edit to UPDATE API
- [ ] Connect Delete to DELETE API

**Features:**
- Search updates results in real-time
- Filters can be combined
- Pagination shows current page and total
- Edit opens modal or inline form
- Delete asks for confirmation

**Acceptance Criteria:**
- Search works correctly
- All filters work and can combine
- Can edit application and see update
- Can delete application with confirmation
- UI is responsive

**Deliverables:**
- `app/applications/page.js`

---

### Issue #14: Create Interviews Page
**Assignee:** RaMar  
**Labels:** frontend, feature  
**Due:** November 17, 2024  
**Depends on:** #13

**Description:**
Build interviews page with calendar view and add form.

**Tasks:**
- [ ] Create `app/interviews/page.js`
- [ ] Fetch interviews from API (with application details)
- [ ] Display upcoming interviews in a list/calendar view
- [ ] Show: Date, Time, Company, Position, Type, Interviewer
- [ ] Add form to schedule new interview
- [ ] Dropdown to select application
- [ ] Date and time pickers
- [ ] Interview type dropdown (Phone, Video, In-Person, Panel)
- [ ] Mark interview as completed button
- [ ] Show past interviews separately
- [ ] Style with Tailwind

**Features:**
- Upcoming interviews highlighted
- Past interviews grayed out
- Easy to add new interview
- Links to related application

**Acceptance Criteria:**
- Can see all interviews
- Can add new interview
- Can mark as completed
- Upcoming vs past interviews separated
- Shows company and position from JOIN

**Deliverables:**
- `app/interviews/page.js`

---

### Issue #15: Create Analytics Dashboard
**Assignee:** RaMar  
**Labels:** frontend, analytics  
**Due:** November 20, 2024  
**Depends on:** #14

**Description:**
Build analytics dashboard with statistics and charts.

**Tasks:**
- [ ] Create `app/analytics/page.js`
- [ ] Fetch data from `/api/analytics`
- [ ] Display key metrics in cards:
  - Total applications
  - Success rate
  - Upcoming interviews
  - Most common status
- [ ] Create pie chart for applications by status
- [ ] Create bar chart for applications over time
- [ ] Show top companies applied to
- [ ] Show average response time
- [ ] Style cards with Tailwind
- [ ] Make responsive

**Optional (if time):**
- Use Chart.js or Recharts library
- Add date range selector
- Export data as CSV

**Acceptance Criteria:**
- All statistics display correctly
- Charts are readable and styled
- Dashboard updates when data changes
- Mobile responsive

**Deliverables:**
- `app/analytics/page.js`

---

### Issue #16: Gmail Integration - Email Parsing Feature
**Assignee:** RaMar  
**Labels:** frontend, backend, feature, gmail-api  
**Due:** November 24, 2024  
**Priority:** HIGH - This is the standout feature

**Description:**
Implement Gmail API integration to automatically parse and import applications from emails.

**Tasks:**

**Backend:**
- [ ] Research Gmail API and OAuth 2.0
- [ ] Set up Google Cloud Console project
- [ ] Enable Gmail API
- [ ] Create OAuth 2.0 credentials
- [ ] Create `app/api/email/connect/route.js` - OAuth connection
- [ ] Create `app/api/email/parse/route.js` - Fetch and parse emails
- [ ] Implement email parsing logic (extract company, position, date)
- [ ] Store parsed data temporarily for review

**Frontend:**
- [ ] Create `app/email/page.js` - Email integration page
- [ ] Add "Connect Gmail" button
- [ ] Handle OAuth flow
- [ ] Add "Scan for Applications" button
- [ ] Display parsed applications in review table
- [ ] Allow user to edit parsed data before importing
- [ ] Add "Import Selected" button
- [ ] Show success message after import
- [ ] Update applications list

**Features:**
- OAuth connection to Gmail
- Scans last 30 days of emails
- Looks for keywords: "application", "applied", "confirmation"
- Parses: company name, position title, application date
- User reviews and confirms before importing
- Imports to database with source='Email'

**Acceptance Criteria:**
- Gmail OAuth works and is secure
- Finds application confirmation emails
- Parses data reasonably accurately (70%+ success rate)
- User can review and edit before import
- Imports correctly to database
- Error handling for API failures

**Deliverables:**
- `app/api/email/connect/route.js`
- `app/api/email/parse/route.js`
- `app/email/page.js`
- Documentation in README

---

### Issue #17: UI/UX Polish and Responsive Design
**Assignee:** RaMar  
**Labels:** frontend, ui, enhancement  
**Due:** November 27, 2024

**Description:**
Final polish on all pages for professional appearance.

**Tasks:**
- [ ] Review all pages for consistent styling
- [ ] Ensure all pages are mobile responsive
- [ ] Add smooth transitions and animations
- [ ] Improve form layouts and labels
- [ ] Add helpful tooltips where needed
- [ ] Improve error message styling
- [ ] Add loading skeletons instead of spinners
- [ ] Add empty states (no applications yet, no interviews, etc.)
- [ ] Test on mobile device
- [ ] Test on different screen sizes
- [ ] Fix any layout bugs
- [ ] Add favicon and page titles

**Acceptance Criteria:**
- Works perfectly on mobile (375px width)
- Works on tablet (768px)
- Works on desktop (1920px)
- No broken layouts
- All interactions have visual feedback
- Professional appearance

**Deliverables:**
- Updated all page files
- Updated `app/globals.css` if needed

---

### Issue #18: Deployment to Google Cloud Platform
**Assignee:** RaMar (with Ihor for database)  
**Labels:** deployment, devops  
**Due:** December 1, 2024  
**Priority:** HIGH

**Description:**
Deploy the complete application to Google Cloud Platform.

**Tasks:**

**Database (with Ihor):**
- [ ] Create Google Cloud SQL instance
- [ ] Configure public IP and authorized networks
- [ ] Import database schema to Cloud SQL
- [ ] Import sample data
- [ ] Test connection from local machine
- [ ] Update `.env` with Cloud SQL credentials

**Application:**
- [ ] Create Dockerfile for Next.js app
- [ ] Test Docker build locally
- [ ] Create Google Cloud Run service
- [ ] Configure environment variables in Cloud Run
- [ ] Deploy application to Cloud Run
- [ ] Test deployed application
- [ ] Get public URL
- [ ] Update OAuth redirect URIs for Gmail
- [ ] Test Gmail integration on deployed app

**Final Testing:**
- [ ] Test all features on production URL
- [ ] Share URL with team for testing
- [ ] Fix any production bugs
- [ ] Document deployment process

**Acceptance Criteria:**
- Application is live and accessible via public URL
- Database is on Cloud SQL
- All features work on production
- Gmail OAuth works on production
- No errors in logs

**Deliverables:**
- Working production URL
- `deployment/README.md` with deployment instructions
- Environment variables documented (not committed)

---

## EVERYONE - Final Week Tasks

### Issue #19: Create Final Report and Documentation
**Assignee:** Everyone (coordinate)  
**Labels:** documentation  
**Due:** December 3, 2024  
**Priority:** HIGH

**Description:**
Complete final report with all required components.

**Tasks:**

**Ihor:**
- [ ] Generate final ERD from MySQL Workbench
- [ ] Export as high-res PNG
- [ ] Write database design section
- [ ] Document all tables and relationships

**Sid:**
- [ ] Document all API endpoints in API_DOCS.md
- [ ] Write SQL operations section showing examples
- [ ] Explain error handling approach
- [ ] List all queries used

**RaMar:**
- [ ] Write project overview and objectives
- [ ] Take screenshots of all pages
- [ ] Write features section
- [ ] Write deployment section
- [ ] Write challenges and solutions section
- [ ] Combine all sections into final report
- [ ] Create table of contents
- [ ] Proofread entire document

**Everyone:**
- [ ] Review complete draft
- [ ] Add your ranking statement to ranking.html
- [ ] Add code comments with author names
- [ ] Review README.md is complete

**Report Sections Required:**
1. Cover page
2. Table of contents
3. Project description
4. Functionalities overview
5. Database design with EERD
6. Technology stack
7. Implementation details
8. Testing approach
9. Screenshots of UI
10. Deployment details
11. Challenges and solutions
12. Conclusion
13. Appendices (SQL schema, ranking statement)

**Acceptance Criteria:**
- Report is 15-20 pages
- All required sections included
- ERD is clear and professional
- Screenshots show all features
- No spelling/grammar errors
- Ranking statement complete

**Deliverables:**
- `docs/final_report.pdf`
- `ranking.html`
- Updated README.md

---

### Issue #20: Presentation Preparation and Practice
**Assignee:** Everyone  
**Labels:** presentation  
**Due:** December 3, 2024  
**Priority:** HIGH

**Description:**
Prepare and practice 10-minute presentation.

**Tasks:**
- [ ] Create presentation slides (10-12 slides max)
- [ ] Decide who presents what sections
- [ ] Practice demo walkthrough
- [ ] Time the presentation (must be under 10 minutes)
- [ ] Prepare for Q&A
- [ ] Create backup demo video in case of technical issues
- [ ] Test on presentation computer if possible

**Presentation Outline:**
1. **Introduction (1 min)** - Team, project overview
2. **Live Demo (6 min)** - Show all features, especially Gmail
3. **Technical Details (2 min)** - Database, APIs, deployment
4. **Q&A (1 min)**

**Demo Flow:**
- Show dashboard
- Add application manually
- Update status
- **Gmail feature** - scan and import (WOW moment)
- Show analytics
- Show interviews
- Mention Cloud SQL deployment

**Acceptance Criteria:**
- Presentation is exactly 10 minutes
- Everyone speaks
- Demo is smooth (practiced 3+ times)
- Can answer technical questions
- Backup plan ready

**Deliverables:**
- Presentation slides
- Practiced demo
- Backup demo video

---

## Issue Labels Legend

- `setup` - Initial environment setup
- `database` - Database related work
- `backend` - Backend/API work
- `frontend` - UI/Frontend work
- `api` - API endpoints
- `feature` - New feature
- `enhancement` - Improvement to existing feature
- `documentation` - Documentation work
- `deployment` - Deployment related
- `ui` - User interface/design
- `bug` - Bug fix
- `testing` - Testing related

## Priority Levels

- **HIGH** - Must be done for project to work
- **MEDIUM** - Important but not critical
- **LOW** - Nice to have

---

## Weekly Milestones

**Week 1 (Nov 4-10):** Issues #1-6 complete
**Week 2 (Nov 11-17):** Issues #7-15 complete  
**Week 3 (Nov 18-24):** Issues #16-17 complete
**Week 4 (Nov 25-Dec 4):** Issues #18-20 complete

---

## How to Use These Issues

1. Go to your GitHub repo
2. Click "Issues" tab
3. Click "New Issue"
4. Copy/paste each issue above
5. Assign to the right person
6. Add appropriate labels
7. Set due date
8. Link dependencies where noted

## Git Branch Naming Convention

- `database/issue-2-schema-review` (Ihor)
- `backend/issue-7-interviews-api` (Sid)
- `frontend/issue-11-homepage` (RaMar)

Always create a branch for each issue!
