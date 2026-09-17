# SkillMap AI

## AI-Powered Resume Skill Gap Analyzer

SkillMap AI is a full-stack, AI-powered career analysis platform that helps candidates understand how closely their resume matches a target job description.

The platform analyzes a PDF resume against a job description and generates a structured skill-gap report containing matched skills, partially matched skills, missing skills, experience analysis, resume improvement suggestions, a personalized learning roadmap, and interview questions.

The project combines modern full-stack web development with Generative AI, secure authentication, PDF text extraction, MongoDB persistence, and cloud deployment.

---

## Live Application

**Frontend:**  
https://skill-map-ai-amber.vercel.app

**Backend:**  
https://skillmap-ai-backend.onrender.com

**GitHub:**  
https://github.com/lav71/SkillMap-AI

---

## Problem Statement

Job descriptions often contain a large number of technical and professional requirements. Candidates may know some of these skills but have difficulty identifying:

- Which required skills they already have
- Which skills they partially satisfy
- Which skills are missing
- Whether their experience aligns with the role
- How their resume can be improved
- What they should learn next
- What interview questions they should prepare for

SkillMap AI addresses this problem by converting a resume and job description into an actionable career analysis.

---

## Solution

SkillMap AI creates a structured comparison between a candidate's resume and a target job description.

The workflow is:

```text
Resume PDF + Job Description
            |
            v
      PDF Text Extraction
            |
            v
      Resume Processing
            |
            v
       Groq AI Analysis
            |
            v
     Skill Classification
            |
            v
    Backend Score Calculation
            |
            v
       MongoDB Storage
            |
            v
       Analysis Dashboard
            |
            v
 Personalized Career Insights
```

---

## Core Features

### User Authentication

Secure user authentication is implemented using JWT.

Users can:

- Register an account
- Log in securely
- Access protected application pages
- Access their own analysis history
- Log out from the application

Passwords are hashed using bcrypt before being stored.

---

### Resume Upload

Users can upload their resume in PDF format.

The backend uses Multer to receive the file and PDF parsing to extract readable text from the uploaded document.

Current upload restrictions:

```text
File Type: PDF
Maximum File Size: 5 MB
```

---

### Job Description Input

Users can paste the complete job description into the dashboard.

The system uses the provided job description as the target requirements for the AI analysis.

---

### AI-Powered Skill Gap Analysis

The application uses the Groq API to analyze the resume and job description.

The AI identifies:

- Matched skills
- Partial skills
- Missing skills
- Experience alignment
- Resume improvement areas
- Learning requirements
- Interview preparation topics

The analysis is returned in a structured JSON format for reliable frontend rendering.

---

### Match Percentage

SkillMap AI calculates an overall match percentage between the candidate's resume and the target job description.

The backend processes the identified skills and calculates the final score instead of depending entirely on an AI-generated score.

This helps keep the displayed score consistent with the application's analysis logic.

---

### Matched Skills

Matched skills are requirements from the job description that are clearly demonstrated in the candidate's resume.

Example:

```text
JavaScript
React
Node.js
MongoDB
REST APIs
```

---

### Partial Skills

Partial skills represent requirements where the resume contains related knowledge or limited evidence but does not completely satisfy the job requirement.

Example:

```text
Docker
AWS
TypeScript
```

---

### Missing Skills

Missing skills represent important job requirements that are not sufficiently demonstrated in the resume.

Example:

```text
Kubernetes
GraphQL
Redis
```

---

### Experience Analysis

The system analyzes the candidate's experience in relation to the target role.

The generated explanation helps identify areas where the candidate's existing experience aligns with or differs from the job requirements.

---

### Resume Improvement Suggestions

SkillMap AI generates actionable suggestions for improving the resume.

Suggestions can include:

- Adding relevant technical keywords
- Improving project descriptions
- Adding measurable achievements
- Highlighting relevant development experience
- Better aligning project descriptions with the target role
- Adding relevant skills when genuinely applicable

---

### Personalized Learning Roadmap

Based on identified skill gaps, the application generates a personalized learning roadmap.

Each roadmap item contains:

```text
Skill
Priority
Estimated Time
```

Example:

```text
Skill: Docker
Priority: High
Estimated Time: 1 Week
```

The roadmap is designed to help users understand what they can focus on to reduce their skill gaps.

---

### Interview Question Generation

SkillMap AI generates interview questions based on the job description and identified skill requirements.

This allows users to use the same analysis for interview preparation.

---

### Analysis History

Completed analyses are stored in MongoDB.

The History page allows users to review previous analyses.

History information includes:

- Match percentage
- Job description
- Matched skill count
- Partial skill count
- Missing skill count
- Analysis date
- Detailed analysis access

---

### Analysis Details

Users can open an individual analysis to view complete results.

The details page displays:

- Match percentage
- Matched skills
- Partial skills
- Missing skills
- Experience analysis
- Resume improvements
- Learning roadmap
- Interview questions

---

## Technology Stack

### Frontend

| Technology | Purpose |
|---|---|
| React | User interface |
| Vite | Frontend development and build tool |
| JavaScript | Application logic |
| Tailwind CSS | Styling and responsive UI |
| React Router | Client-side routing |
| Axios | HTTP requests |
| HTML5 | Application structure |
| CSS3 | Styling |

### Backend

| Technology | Purpose |
|---|---|
| Node.js | Server-side runtime |
| Express.js | REST API framework |
| JavaScript | Backend logic |
| Multer | File upload handling |
| PDF Parser | Resume text extraction |
| CORS | Cross-origin communication |
| dotenv | Environment configuration |

### Database

| Technology | Purpose |
|---|---|
| MongoDB | Database |
| Mongoose | MongoDB object modeling |
| MongoDB Atlas | Cloud database |

### Authentication

| Technology | Purpose |
|---|---|
| JWT | Authentication and authorization |
| bcryptjs | Password hashing |

### Artificial Intelligence

| Technology | Purpose |
|---|---|
| Groq API | Generative AI inference |
| Groq SDK | Backend AI integration |
| OpenAI GPT OSS 120B | AI analysis model accessed through Groq |

### Deployment

| Platform | Purpose |
|---|---|
| Vercel | Frontend deployment |
| Render | Backend deployment |
| MongoDB Atlas | Production database |

---

## System Architecture

```text
                         USER
                           |
                           v
                +----------------------+
                |   React Frontend     |
                |   Vite + Tailwind    |
                +----------+-----------+
                           |
                           | HTTPS REST API
                           v
                +----------------------+
                |   Express Backend    |
                |       Node.js         |
                +----+-------------+----+
                     |             |
                     |             |
                     v             v
             +-----------+   +-----------+
             | MongoDB   |   |  Groq AI  |
             |  Atlas    |   |    API    |
             +-----------+   +-----------+
                     |             |
                     +------+------+
                            |
                            v
                     Structured Result
                            |
                            v
                    React Dashboard
```

---

## Application Architecture

The project follows a layered architecture.

### Frontend Layer

Responsible for:

- User interface
- Routing
- Authentication state
- Resume selection
- Job description input
- API communication
- Result visualization
- Analysis history

### Backend Layer

Responsible for:

- Authentication
- Authorization
- File uploads
- PDF processing
- AI requests
- Score calculation
- Database operations
- API responses
- Error handling

### Database Layer

MongoDB stores:

- User accounts
- Analysis records
- Resume analysis results
- Job descriptions
- Skill classifications
- Roadmaps
- Interview questions

### AI Layer

Groq processes:

- Resume context
- Job requirements
- Skill relationships
- Experience analysis
- Resume improvement recommendations
- Learning roadmap generation
- Interview question generation

---

## Project Structure

```text
SkillMap-AI/
│
├── backend/
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── analyze.controller.js
│   │   └── auth.controller.js
│   │
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   └── upload.middleware.js
│   │
│   ├── models/
│   │   ├── analysis.model.js
│   │   └── user.model.js
│   │
│   ├── routes/
│   │   ├── analyze.routes.js
│   │   ├── auth.routes.js
│   │   └── groq.routes.js
│   │
│   ├── services/
│   │   └── groq.service.js
│   │
│   ├── uploads/
│   │
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
├── frontend/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── History.jsx
│   │   │   └── AnalysisDetails.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .env
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

## Frontend Pages

### Login

Allows registered users to authenticate.

### Register

Allows new users to create an account.

### Dashboard

The primary workspace for performing a new resume analysis.

Users can:

1. Select a resume
2. Enter a job description
3. Submit the analysis
4. View generated results

### History

Displays previously completed analyses for the authenticated user.

### Analysis Details

Displays the complete result of a selected analysis.

---

## Backend API

Production base URL:

```text
https://skillmap-ai-backend.onrender.com
```

Local base URL:

```text
http://localhost:5000
```

---

## API Endpoints

### Authentication

#### Register

```http
POST /api/auth/register
```

Example request:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

---

#### Login

```http
POST /api/auth/login
```

Example request:

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Successful authentication returns a JWT token.

---

### Resume Analysis

#### Analyze Resume

```http
POST /api/analyze
```

Authentication:

```text
Authorization: Bearer <JWT_TOKEN>
```

Request type:

```text
multipart/form-data
```

Form fields:

```text
resume          PDF File
jobDescription  Text
```

---

#### Get Analysis History

```http
GET /api/analyze/history
```

Authentication:

```text
Authorization: Bearer <JWT_TOKEN>
```

Returns analysis records belonging to the authenticated user.

---

#### Get Analysis By ID

```http
GET /api/analyze/:id
```

Authentication:

```text
Authorization: Bearer <JWT_TOKEN>
```

Returns the complete analysis details for the selected record.

---

### Groq API Test

```http
GET /api/groq/test
```

This endpoint is used to verify the Groq API integration.

---

## Authentication Flow

```text
                 Register
                    |
                    v
              Password Hash
                    |
                    v
             MongoDB User
                    |
                    v
                  Login
                    |
                    v
              JWT Generated
                    |
                    v
          Token Stored by Client
                    |
                    v
       Protected API Request
                    |
                    v
           Auth Middleware
                    |
                    v
          Verify JWT Token
                    |
                    v
              Controller
                    |
                    v
               Response
```

Protected requests use:

```http
Authorization: Bearer <JWT_TOKEN>
```

---

## Resume Processing Pipeline

```text
PDF Resume
    |
    v
Multer Upload
    |
    v
Memory Buffer
    |
    v
PDF Text Extraction
    |
    v
Resume Text
    |
    v
Groq AI
    |
    v
Structured Analysis
```

The current implementation accepts PDF resumes up to 5 MB.

---

## AI Analysis Pipeline

```text
Resume Text
     |
     +--------------------+
                          |
                          v
                  Groq AI Model
                          |
                          |
Job Description ----------+
                          |
                          v
                 Skill Classification
                          |
            +-------------+-------------+
            |             |             |
            v             v             v
         Matched       Partial       Missing
            |             |             |
            +-------------+-------------+
                          |
                          v
                  Backend Score
                          |
                          v
                 Analysis Result
                          |
                          v
                    MongoDB
                          |
                          v
                    Frontend
```

---

## Analysis Data Model

The Analysis collection contains the following major fields:

```text
user
analysisKey
jobDescription
resumeText
matchPercentage
matchedSkills
partialSkills
missingSkills
experienceAnalysis
resumeImprovements
learningRoadmap
interviewQuestions
createdAt
updatedAt
```

Learning roadmap objects contain:

```text
skill
priority
estimatedTime
```

---

## Analysis Consistency

Repeated analysis of the same resume and job description can produce different AI results if the model is allowed to regenerate the response each time.

SkillMap AI addresses this by generating an `analysisKey` based on:

```text
Analysis Version
+
User
+
Normalized Resume
+
Normalized Job Description
```

The application can use this key to identify an existing analysis before making another AI request.

The AI configuration also uses deterministic settings where supported:

```text
Temperature: 0
Seed: 42
```

The analysis version can be updated whenever the prompt or scoring logic is changed.

---

## Example Analysis Response

```json
{
  "matchPercentage": 78,
  "matchedSkills": [
    "JavaScript",
    "React",
    "Node.js",
    "MongoDB"
  ],
  "partialSkills": [
    "Docker",
    "AWS"
  ],
  "missingSkills": [
    "Kubernetes",
    "GraphQL"
  ],
  "experienceAnalysis": "The candidate has relevant full-stack development experience with limited exposure to cloud and container technologies.",
  "resumeImprovements": [
    "Add measurable achievements to project descriptions.",
    "Highlight backend API development experience.",
    "Include relevant cloud technologies where applicable."
  ],
  "learningRoadmap": [
    {
      "skill": "Docker",
      "priority": "High",
      "estimatedTime": "1 Week"
    },
    {
      "skill": "AWS",
      "priority": "Medium",
      "estimatedTime": "2 Weeks"
    }
  ],
  "interviewQuestions": [
    "Explain how REST APIs work.",
    "What is JWT authentication?",
    "How does MongoDB differ from a relational database?"
  ]
}
```

---

## Environment Variables

### Backend

Create:

```text
backend/.env
```

Add:

```env
PORT=5000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GROQ_API_KEY=your_groq_api_key
```

### Frontend

Create:

```text
frontend/.env
```

For local development:

```env
VITE_API_URL=http://localhost:5000
```

For production:

```env
VITE_API_URL=https://skillmap-ai-backend.onrender.com
```

Never commit `.env` files or secret API keys to GitHub.

---

## Local Development

### Prerequisites

Install:

- Node.js
- npm
- Git
- MongoDB or MongoDB Atlas account

A Groq API key is also required.

---

### Clone Repository

```bash
git clone https://github.com/lav71/SkillMap-AI.git
```

```bash
cd SkillMap-AI
```

---

### Backend Installation

```bash
cd backend
npm install
```

Create the backend `.env` file and configure the required variables.

Start the development server:

```bash
npm run dev
```

Production start:

```bash
npm start
```

Backend:

```text
http://localhost:5000
```

---

### Frontend Installation

Open another terminal:

```bash
cd frontend
npm install
```

Create the frontend `.env` file:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

## Production Deployment

### Frontend

The React frontend is deployed on Vercel.

Production environment variable:

```text
VITE_API_URL=https://skillmap-ai-backend.onrender.com
```

The Vite application uses client-side routing. A Vercel rewrite configuration is used so direct navigation and refreshes of routes such as `/login`, `/dashboard`, and `/history` are handled by the SPA entry point.

---

### Backend

The Node.js and Express backend is deployed on Render.

Required production environment variables:

```text
MONGODB_URL
JWT_SECRET
GROQ_API_KEY
```

The application uses the port provided by the hosting platform.

---

### Database

MongoDB Atlas is used for production database hosting.

Production architecture:

```text
Vercel
   |
   v
React Frontend
   |
   v
Render
   |
   v
Express Backend
   |
   +---------> MongoDB Atlas
   |
   +---------> Groq API
```

---

## Security

The application currently includes:

- JWT authentication
- Password hashing with bcrypt
- Protected API routes
- User-specific analysis access
- PDF file type validation
- File size restrictions
- Environment variables for secrets
- MongoDB schema validation
- Authentication middleware

Recommended future security improvements include:

- API rate limiting
- Strong password policies
- Request schema validation
- HTTP security headers
- Refresh token architecture
- Token expiration handling
- Restricted production CORS
- AI API abuse protection
- Input sanitization
- Logging and monitoring

---

## Error Handling

The application handles common scenarios including:

- Invalid login credentials
- Invalid JWT tokens
- Unauthorized API access
- Missing resume
- Invalid file format
- File size exceeding the limit
- MongoDB connection errors
- Groq API errors
- Invalid analysis IDs
- Duplicate analysis requests
- Frontend API failures

The frontend also provides loading, error, and empty states where required.

---

## Testing With Postman

The backend can be tested independently using Postman.

Recommended sequence:

```text
1. Register
2. Login
3. Copy JWT token
4. Analyze Resume
5. Get Analysis History
6. Get Analysis By ID
7. Test Groq API
```

For protected endpoints:

```text
Authorization
Bearer Token
```

Use the JWT token returned by the login endpoint.

---

## Example Postman Resume Request

Method:

```text
POST
```

URL:

```text
http://localhost:5000/api/analyze
```

Authorization:

```text
Bearer Token
```

Body:

```text
form-data
```

Fields:

```text
resume          File
jobDescription  Text
```

Select a PDF resume for the `resume` field.

---

## Git Workflow

Check project status:

```bash
git status
```

Add changes:

```bash
git add .
```

Commit:

```bash
git commit -m "Update SkillMap AI"
```

Push:

```bash
git push origin main
```

---

## Deployment URLs

| Component | URL |
|---|---|
| Frontend | https://skill-map-ai-amber.vercel.app |
| Backend | https://skillmap-ai-backend.onrender.com |
| GitHub | https://github.com/lav71/SkillMap-AI |

---

## Development Challenges Solved

### MongoDB Local to Cloud Migration

The application was initially developed with local MongoDB and later connected to MongoDB Atlas for cloud deployment.

### Groq Model Compatibility

The project initially encountered a model availability issue and was configured to use:

```text
openai/gpt-oss-120b
```

through the Groq API.

### PDF Processing

Resume PDF uploads and text extraction were implemented using Multer and PDF parsing.

### Environment-Based API Configuration

The frontend API URL was separated into an environment variable:

```text
VITE_API_URL
```

This allows the same frontend codebase to work with both local and production backends.

### React SPA Routing

Client-side routes require server-side fallback handling when directly accessed or refreshed.

Vercel rewrite configuration is used to route frontend requests back to the application entry point.

### AI Result Consistency

An analysis key and deterministic AI configuration were introduced to reduce unnecessary repeated AI requests and improve consistency for identical inputs.

---

## Performance Considerations

The project includes several measures that reduce unnecessary processing:

- Analysis caching for identical user inputs
- In-memory PDF upload handling
- Structured AI responses
- Backend-side score calculation
- MongoDB indexing for analysis lookup
- Environment-based configuration
- Client-side routing

The production backend runs on Render, where free-tier services may temporarily sleep during periods of inactivity. As a result, the first request after inactivity may take longer than subsequent requests.

---

## Future Enhancements

Potential future features include:

### Resume and Career Features

- ATS score analysis
- Resume keyword optimization
- Resume builder
- Multiple resume versions
- Cover letter generation
- Job recommendation system
- LinkedIn profile analysis

### Skill Development

- Skill progress tracking
- Interactive learning roadmap
- Course recommendations
- Learning resource recommendations
- Progress analytics
- Personalized study schedules

### Interview Preparation

- Advanced interview question generation
- Interview answer evaluation
- Mock interview mode
- Technical interview simulations
- Behavioral interview preparation

### Platform Features

- User profile customization
- Advanced analytics dashboard
- Admin dashboard
- Role-based access control
- Email notifications
- Saved job descriptions
- Comparison between multiple job descriptions

### Infrastructure

- API rate limiting
- Advanced logging
- Monitoring
- Automated testing
- CI/CD pipeline
- Production security hardening
- Scalable AI processing

---

## Use Cases

SkillMap AI can be used by:

- College students
- Freshers
- Software developers
- Job seekers
- Career switchers
- Professionals targeting new roles
- Candidates preparing for technical interviews

The platform can help users transform a job description into a practical skill development plan.

---

## Project Objectives

The major objectives of SkillMap AI are:

1. Compare resumes with real-world job descriptions.
2. Identify relevant skills already present in a resume.
3. Identify partially matched skills.
4. Detect important missing skills.
5. Calculate a meaningful resume-to-job match percentage.
6. Provide actionable resume improvement suggestions.
7. Generate personalized learning roadmaps.
8. Generate role-specific interview questions.
9. Maintain analysis history.
10. Demonstrate practical Generative AI integration in a full-stack application.

---

## Learning Outcomes

This project demonstrates practical experience in:

- React application development
- REST API development
- Node.js and Express.js
- MongoDB and Mongoose
- JWT authentication
- Password hashing
- File uploads
- PDF text extraction
- Generative AI integration
- Structured AI responses
- API integration
- Environment configuration
- Cloud database deployment
- Frontend deployment
- Backend deployment
- Git and GitHub
- Debugging production issues
- Responsive UI development

---

## Project Highlights

```text
Full-Stack Architecture
React + Node.js + Express.js + MongoDB

AI Integration
Groq API + OpenAI GPT OSS 120B

Authentication
JWT + bcrypt

Document Processing
PDF Resume Upload + Text Extraction

Database
MongoDB + Mongoose + MongoDB Atlas

Deployment
Vercel + Render + MongoDB Atlas

Development
Git + GitHub + Postman + MongoDB Compass
```

---

## Why SkillMap AI

SkillMap AI is designed to go beyond simply displaying an AI-generated resume score.

The platform connects the analysis to practical next steps:

```text
Resume
   |
   v
Job Description
   |
   v
Skill Comparison
   |
   +---- Matched Skills
   |
   +---- Partial Skills
   |
   +---- Missing Skills
   |
   v
Experience Analysis
   |
   v
Resume Improvements
   |
   v
Learning Roadmap
   |
   v
Interview Questions
```

This creates a complete workflow from resume evaluation to skill development and interview preparation.

---

## Author

**Lavkush Vishwakarma**

B.Tech Computer Science and Engineering  
Quantum University, Roorkee

GitHub:  
https://github.com/lav71

---

## License

This project is developed for educational, portfolio, and demonstration purposes.

If the project is distributed or used commercially, an appropriate open-source or proprietary license should be added based on the intended usage.

---

## Acknowledgements

The project uses the following technologies and services:

- React
- Vite
- Tailwind CSS
- Node.js
- Express.js
- MongoDB
- MongoDB Atlas
- Mongoose
- Groq API
- OpenAI GPT OSS 120B
- JWT
- bcryptjs
- Multer
- PDF parsing
- Vercel
- Render
- GitHub

---

## Repository

https://github.com/lav71/SkillMap-AI
