# 🎓 CampusConnect

> 🔐 A full-stack Training and Placement Management System for Students, TPOs, and Recruiters.

---

## 🌟 Features

- 🔐 Secure Login/Register with Email & Google Auth
- 🎓 Student Dashboard: Apply for Drives, Upload Resume, View Offer Letter
- 🧑‍💼 TPO Panel: Add Drives, Upload Offer Letters, Track Placements
- 📈 Analytics Dashboard: Dynamic charts and stats (Avg. Offers, Branch-wise)
- 📢 Admin Notifications to Students
- 📂 Export Student Data as CSV
- 📄 View Offer Letters in PDF format
- 💅 Beautiful UI with TailwindCSS & Chart.js

---

## ⚙️ Tech Stack

| Frontend        | Backend         | Database          | Others                |
|-----------------|------------------|-------------------|------------------------|
| React.js        | Node.js + Express| Firebase Firestore| TailwindCSS, Chart.js |
| React-Router    | REST APIs        | Firebase Auth     | React-Toastify        |

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Anvesh044/CampusConnect.git
cd CampusConnect
2. Install Dependencies
bash
Copy
Edit
npm install
3. Firebase Configuration
Create a file at src/firebaseConfig.js:

js
Copy
Edit
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  // ...rest of the config
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
4. Start the Frontend
bash
Copy
Edit
npm start
5. (Optional) Start Backend Server
bash
Copy
Edit
cd backend
node server.js
🧠 Folder Structure
php
Copy
Edit
CampusConnect/
├── src/
│   ├── pages/             # All main screens (Login, Dashboards, etc.)
│   ├── Components/        # Reusable UI components
│   ├── firebaseConfig.js  # Firebase setup
├── backend/               # Express server (optional)
├── public/
├── tailwind.config.js
└── package.json
📸 Screenshots (Add Yours!)
Login Page	Dashboard	Admin Panel

🧩 Future Enhancements
📄 Resume Parser (AI-powered)

📧 Email Notifications

📊 Recruiter Portal

📱 Mobile-first UI

🏆 Leaderboard for top offers

🤝 Contributing
Pull requests are welcome!
Create an issue first to discuss a feature or bug.

📜 License
This project is licensed under the MIT License.

👨‍💻 Developed By
Anvesh R Bekal
📌 Full Stack Developer | 2nd Year Engineering Student
🔗 GitHub | LinkedIn

💼 Empowering your future, one login at a time

yaml
Copy
Edit

---

📌 **Pro tip:** After adding the file, push it like this:

```bash
git add README.md
git commit -m "📘 Added complete README file"
git push origin main
