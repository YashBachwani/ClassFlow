# 🎓 ClassFlow

> A modern Learning Management System (LMS) built with **React + Tailwind CSS**, designed for **Admins, Faculty, and Students**.  
> ClassFlow simplifies teaching, learning, and course management with dashboards, analytics, material uploads, startup idea evaluation, and much more.

---

## 🖥️ Overview

**ClassFlow** is a smart, modular, and interactive platform that helps institutions streamline their academic processes.  
It’s designed to make the entire learning ecosystem — from **teaching materials** to **feedback sentiment analysis** — seamless and intuitive.

With a clean UI, dynamic dashboards, and smooth transitions, ClassFlow offers a real LMS experience for all roles:  
- 🧑‍💼 **Admin**
- 👩‍🏫 **Faculty**
- 👨‍🎓 **Student**

---

## 🌟 Features by Role

### 👑 Admin Dashboard
- 📢 Post announcements and global notifications  
- 👩‍🎓 Manage students, teachers, and courses (CRUD)  
- 📊 Track student performance and progress analytics  
- 💬 Assess and analyze student feedback (sentiment-based)  
- 💡 Evaluate uploaded startup ideas and remarks  

---

### 👩‍🏫 Faculty Dashboard
- 📚 Upload materials (PDF, PPT, images, etc.) via drag-and-drop  
- 🧮 Create quizzes, assignments, and course assessments  
- 🗓️ Manage course schedule and syllabus tracking  
- 🗂️ Mark assignments dynamically with auto-totaling  
- 📢 Post announcements and view student responses  
- 💬 Collect feedback for self-improvement  

---

### 👨‍🎓 Student Dashboard
- 📥 Download materials & assignments  
- 💡 Upload startup ideas for mentor review  
- 📝 Submit feedback with sentiment scoring  
- 🎯 View performance analytics (marks, attendance, deadlines)  
- 📚 Check syllabus progress (percentage completion)  
- ⏰ Real-time clock display with clean UI  

---

## ⚙️ Tech Stack

| Category | Technology Used |
|-----------|----------------|
| **Frontend Framework** | React (Vite) |
| **Styling** | Tailwind CSS |
| **UI Components** | Shadcn / Lucide React Icons |
| **Charts & Analytics** | Recharts |
| **State Management** | useState, useEffect (React Hooks) |
| **Animations** | AOS (Animate On Scroll) |
| **Notifications** | React-Toastify |
| **Storage (Demo)** | LocalStorage |
| **Routing** | React Router DOM |

---

## 🧰 Installation & Setup

### Prerequisites
- Node.js >= 16
- npm or yarn

### Steps
```bash
# Clone the repository
git clone https://github.com/YashBachwani/ClassFlow.git

# Navigate to project directory
cd ClassFlow

# Install dependencies
npm install

# Start the development server
npm run dev

## **Then open your browser and go to http://localhost:5173/ (default Vite port).**

🚀 **Usage Guide**

Sign up or log in using any role (Admin, Faculty, Student).
The app automatically redirects to the corresponding dashboard.
Use the sidebar navigation for switching between modules.
Admins can manage data, faculty can upload, and students can view or submit.
Click Logout to end the session (clears localStorage & redirects to /signup).

🔮 Future Enhancements
  🧩 Full backend integration (Node.js + Express + MongoDB)
  🔐 JWT-based Authentication & Authorization
  🤖 AI-powered feedback sentiment engine (NLP)
  📅 Smart Scheduler & Reminder Emails
  📱 Progressive Web App (PWA) version
  🧾 Auto-report generation (Excel / PDF exports with visual charts)
  🌍 Multi-language support

🧑‍💻 Author
  👤 Yash Bachwani
  🌐 GitHub Profile
  📂 ClassFlow Repository

📄 License
This project is licensed under the MIT License — feel free to modify and use it in your own LMS solutions.
