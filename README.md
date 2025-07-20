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
📸 Screenshots of my project
<img width="1849" height="872" alt="image" src="https://github.com/user-attachments/assets/f0950856-db7e-42b3-b4d1-a9d7a041be11" />
<img width="1802" height="877" alt="image" src="https://github.com/user-attachments/assets/a43308a1-8da5-4c44-b98f-b5caf73afa8d" />
<img width="1789" height="849" alt="image" src="https://github.com/user-attachments/assets/749183fe-8008-46e6-87a9-9c0499ff5729" />
<img width="1840" height="858" alt="image" src="https://github.com/user-attachments/assets/9afa62c2-8124-40d2-ab69-06448fa03fe6" />
<img width="1757" height="834" alt="image" src="https://github.com/user-attachments/assets/7bfb303b-3d54-4ca7-a700-742fafecd7d9" />
<img width="1652" height="860" alt="image" src="https://github.com/user-attachments/assets/150b703a-fa28-437c-b8c8-1552eba2dcb9" />







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
