# 🗂️ Project Task Management System

A powerful, organization-based project and task management platform built with Laravel, Inertia.js, React, and TailwindCSS.  
This application enables teams to collaborate efficiently, manage projects, and track tasks in real-time.

---

## 🚀 Features

- 🔐 Authentication (Login, Register, Email Verification)
- 👥 Organization & Team Management
- ✅ Role-Based Access Control (Admin, Member, etc.)
- 📋 Project & Task Boards (Kanban-style)
- 📦 Drag & Drop Task Management
- 📁 File Uploads & Avatar Support
- 🔄 Real-time Updates & Notifications (via Laravel Events or Pusher)
- 📊 Dashboard Overview for Organization and Individual Users
- ⚙️ User Profile with Avatar Upload

---

## 🛠️ Tech Stack

| Frontend       | Backend       | Others         |
| -------------- | ------------- | -------------- |
| React + Vite   | Laravel 12.x  | TailwindCSS    |
| Inertia.js     | PHP 8.3+      | Laravel Breeze |
| TypeScript     | MySQL / SQLite| Headless UI    |

---

## 📂 Project Structure

├── app ├── resources │ └── js │ ├── Components # React components │ ├── Pages # Inertia pages │ ├── Layouts # App & Settings layouts ├── routes │ └── web.php # App routes ├── public │ └── storage # Public avatars/files ├── storage │ └── app/public/avatars # Uploaded avatars └── ...

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/project-task-manager.git
cd project-task-manager
2. Install dependencies
bash
Copy
Edit
composer install
npm install && npm run dev
3. Environment setup
bash
Copy
Edit
cp .env.example .env
php artisan key:generate
Update your .env file with your database and storage settings.

4. Run migrations and seeders (if any)
bash
Copy
Edit
php artisan migrate
5. Create storage symlink
bash
Copy
Edit
php artisan storage:link
6. Run the development server
bash
Copy
Edit
php artisan serve
```
👥 User Roles

Role	Permissions
Super Admin	Manage all organizations and users
Organization	Create teams, assign projects & manage tasks
Team Member	View & update assigned tasks only
📷 Avatar Upload
Users can upload avatars from their profile page.

Uploaded files are stored in storage/app/public/avatars.

Existing avatars are deleted automatically when a new one is uploaded.

📌 To-Do / Roadmap
 Task comments and mentions

 Calendar view for tasks

 Notifications with WebSockets

 Multi-language support

 Dark mode support

🧑‍💻 Contributing
Fork the repository

Create your feature branch: git checkout -b feature/your-feature

Commit your changes: git commit -m 'Add your message here'

Push to the branch: git push origin feature/your-feature

Open a Pull Request

📝 License
This project is open-source and available under the MIT License.
