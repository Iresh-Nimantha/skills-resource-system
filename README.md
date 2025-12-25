# 📊 SkillMatch – Resource & Skills Management System

SkillMatch is a **full-stack Skills & Personnel Management System** built to manage people, skills, projects, and intelligently match resources to project requirements.  
Developed as part of the **4BEX Internship Program**.

---

## 🚀 Features

### 👥 Personnel Management
- Create, update, and delete personnel.  
- Assign multiple skills to each person.  
- Track experience levels (Junior, Mid-Level, Senior).  
- View assigned skills with proficiency levels.

### 🎯 Skills Management
- Add, edit, and delete skills.  
- Include skill categories and descriptions.  
- Classify skills (Framework, Language, Tool, etc.).

### 📁 Project Management
- Create and manage projects.  
- Set start date, end date, and project status.  
- Track projects in planning, active, or completed states.

### 🤖 Skill Matching Engine
- Match personnel to projects based on required skills.  
- Identify best-fit candidates.  
- Display match scores and compatibility percentages.

### 📊 Dashboard & Analytics
- View total personnel, skills, and projects.  
- Identify top-performing personnel.  
- Clean, modern, data-driven UI.

---

## 🛠️ Tech Stack

### Frontend
- React.js  
- Tailwind CSS  
- Lucide Icons  
- SweetAlert2

### Backend
- Node.js  
- Express.js  
- MySQL  
- REST API Architecture

---

## 🗂️ Database Design

### Main Tables
- **personnel**  
- **skills**  
- **projects**

### Relationship Tables
| Table | Columns |
|--------|----------|
| `personnel_skills` | `personnel_id`, `skill_id`, `proficiency` |
| `project_skills` | `project_id`, `skill_id`, `required_level` |

These relationships establish a **many-to-many** link between personnel, skills, and projects.

---

## 🔗 API Endpoints (Core)

### Personnel
GET /api/personnel
POST /api/personnel
PUT /api/personnel/:id
DELETE /api/personnel/:id


### Skills
GET /api/skills
POST /api/skills
PUT /api/skills/:id
DELETE /api/skills/:id


### Personnel Skill Assignment
POST /api/personnel/skills
GET /api/personnel/:id/skills


### Projects
GET /api/projects
POST /api/projects
PUT /api/projects/:id
DELETE /api/projects/:id


### Matching
GET /api/projects/:id/match


---

## 🖥️ UI Modules

| Module | Description |
|---------|--------------|
| **Dashboard** | View statistics and top personnel |
| **Personnel** | Manage people and assign skills |
| **Skills** | Manage skill categories and data |
| **Projects** | Manage project information |
| **Find Matches** | Match personnel to project requirements |

---

## ⚙️ Installation

### Backend Setup
cd skills-management-backend
npm install
npm run dev


### Frontend Setup
cd skills-management-frontend
npm install
npm run dev


---

## 🔑 Environment Variables

Create a `.env` file inside the **backend** folder:
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=skills_db
PORT=5000

---

## 🧪 Testing APIs

Use **Postman** or **Thunder Client** to test endpoints.  

Example:
POST /api/personnel/skills
Content-Type: application/json

{
"personnelid": 3,
"skillid": 5,
"proficiency": "Advanced"
}


---

## 🎨 UI Highlights
- Modern sidebar with animated navigation.  
- Responsive layout and clean design.  
- Beautiful skill badges with color coding.  
- Proficiency level indicators.  
- Real-time updates and API integration.

---

## 📌 Internship Project
This project was built for the **4BEX Internship Program**.  
**Purpose:** Demonstrate full-stack development, database modeling, and real-world HR skill management.

---

## 👨‍💻 Developer
**Iresh Nimantha**  
Undergraduate – University of Colombo  
Faculty of Technology (BICT)
