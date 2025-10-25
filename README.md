Aurora Business Review Web App
A beautifully designed React + Vite project for discovering, reviewing, and managing local businesses. The app combines clean data handling with a modern Aurora-inspired aesthetic — glowing gradients, glassmorphism, and smooth animations that make it feel alive.
🚀 Features
• 🌈 Elegant Aurora UI/UX built with Tailwind CSS and Framer Motion
• 🧩 React Router for smooth page navigation
• 💬 Dynamic review system – add, edit, and view reviews
• 🏢 Business management – add, edit, and browse businesses
• 🔐 User authentication simulation – login/register flow with local state
• 🌟 Responsive, glassy design that looks great on all devices
• ⚡ Built with Vite for ultra-fast development and build speeds
🛠️ Tech Stack
• Frontend: React + Vite
• Styling: Tailwind CSS
• Animation: Framer Motion
• Routing: React Router DOM
• State Management: React Context (DataContext.jsx)
• Icons/Effects: Lucide / CSS keyframes
📦 Installation
• Make sure you have Node.js (v16 or higher) and npm or yarn installed.
• 1️⃣ Clone the Repository:
• git clone https://github.com/yourusername/web-project.git
• cd web-project
• 2️⃣ Install Dependencies:
• npm install or yarn install
🧪 Development
• Start the development server:
• npm run dev
• Open the app in your browser: http://localhost:5173
🏗️ Build for Production
• Create an optimized build: npm run build
• Preview it locally: npm run preview
📁 Folder Structure
• src/
• ├── App.jsx # Main app & routing setup
• ├── main.jsx # Entry point
• ├── index.css # Tailwind & Aurora styles
• ├── DataContext.jsx # Global app data & user state
• ├── components/
• │ ├── NavBar.jsx
• │ ├── Home.jsx
• │ ├── BusinessesList.jsx
• │ ├── BusinessDetail.jsx
• │ ├── BusinessForm.jsx
• │ ├── WriteReview.jsx
• │ ├── UserReviews.jsx
• │ ├── Login.jsx
• │ └── Register.jsx
• └── assets/ # Optional images or icons
🎨 Styling Notes
• Tailwind CSS provides the base utility styling.
• Framer Motion powers the transitions and subtle animations.
• The Aurora gradient animation is defined in index.css:
• .bg-gradient-aurora {
• background: linear-gradient(120deg, #c3dafe, #e9d8fd, #fbb6ce, #d6bcfa, #bee3f8);
• background-size: 400% 400%;
• animation: auroraFlow 30s ease infinite;
• }
💻 Requirements
• Node.js 16+ (required for Vite)
• npm or yarn (latest)
• Modern browser (Chrome / Firefox / Edge)
🧠 Instructor Notes
• ✅ No backend setup required — all data is simulated in React Context.
• ✅ To run the app, simply install dependencies and execute npm run dev.
• ✅ Works on Windows, macOS, and Linux.
• ✅ All visuals are handled via Tailwind and CSS keyframes — no external APIs needed.
🪄 Screens & Highlights
• Home — Cinematic Aurora hero section with animated categories.
• Businesses List — Search, filter, and sort with glowing cards.
• Business Detail — Gradient “spotlight” for each business with reviews.
• Write Review — Interactive star rating & glassy review form.
• Register / Login — Centered, elegant authentication forms.
• User Reviews — Aurora gallery of a user’s submitted reviews.
🌟 Credits
• Designed and developed by CodeForces development team
• Built with ❤️ using React, Tailwind, and Vite.
🧭 Quick Start (TL;DR)
• npm install
• npm run dev
• Then open your browser to http://localhost:5173 and enjoy the Aurora experience ✨
