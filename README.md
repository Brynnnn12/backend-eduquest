# 🚀 EduQuest Backend API

<div align="center">
  <img src="https://nodejs.org/static/images/logo.svg" alt="Node.js" width="80" height="80">
  <img src="https://expressjs.com/images/express-facebook-share.png" alt="Express.js" width="140" height="80">
  <img src="https://www.mysql.com/common/logos/logo-mysql-170x115.png" alt="MySQL" width="120" height="80">
</div>

<div align="center">
  <h3>Backend API Edukasi Interaktif dengan AI-Powered Learning</h3>

![Node.js](https://img.shields.io/badge/Node.js-18%2B-green?style=flat-square&logo=node.js)
![Express.js](https://img.shields.io/badge/Express.js-5.1-blue?style=flat-square&logo=express)
![MySQL](https://img.shields.io/badge/MySQL-8.0-orange?style=flat-square&logo=mysql)
![Sequelize](https://img.shields.io/badge/Sequelize-6.37-red?style=flat-square&logo=sequelize)
![JWT](https://img.shields.io/badge/JWT-Auth-purple?style=flat-square&logo=jsonwebtokens)
![Google AI](https://img.shields.io/badge/Google%20AI-Gemini-blue?style=flat-square&logo=google)

</div>

---

## 📖 **Deskripsi**

EduQuest adalah platform edukasi interaktif yang menggunakan kecerdasan buatan (AI) untuk memberikan pengalaman belajar yang personal dan menarik. Backend API ini menyediakan sistem lengkap untuk manajemen misi pembelajaran, quiz interaktif, sistem badge reward, tracking progress siswa, dan fitur AI-powered hints serta solusi untuk membantu siswa dalam proses belajar.

Platform ini dirancang khusus untuk siswa yang ingin belajar dengan cara yang lebih menyenangkan dan interaktif, dengan dukungan AI yang dapat memberikan bantuan personal saat siswa mengalami kesulitan.

## ✨ **Fitur Utama**

### 🔐 **Sistem Autentikasi & Otorisasi**

- ✅ Registrasi siswa dengan verifikasi email otomatis
- ✅ Login dengan JWT (Access & Refresh Token)
- ✅ Role-based Authorization (Admin & Student)
- ✅ Middleware keamanan untuk proteksi route
- ✅ Logout dengan blacklist token
- ✅ Forgot & Reset Password melalui email

### 🎓 **Sistem Pembelajaran Interaktif**

- ✅ **Misi Pembelajaran** - Sistem misi dengan poin dan tingkat kesulitan
- ✅ **Quiz Dinamis** - Quiz otomatis di-generate menggunakan AI Gemini
- ✅ **Progress Tracking** - Pelacakan kemajuan belajar siswa secara real-time
- ✅ **Badge System** - Sistem reward dengan badge untuk motivasi belajar
- ✅ **Character System** - Sistem karakter untuk personalisasi pengalaman

### 🤖 **AI-Powered Learning Assistant**

- ✅ **Hint Generator** - AI memberikan petunjuk saat siswa kesulitan (maks 2 kali per quiz)
- ✅ **Solution Provider** - AI memberikan solusi lengkap (maks 1 kali per quiz)
- ✅ **Quiz Auto-Generation** - AI membuat soal quiz berdasarkan materi pembelajaran
- ✅ **Content Logging** - Pelacakan penggunaan fitur AI untuk analisis

### 📊 **Dashboard & Analytics**

- ✅ **Progress Analytics** - Analisis kemajuan belajar siswa
- ✅ **Badge Achievement** - Sistem pencapaian dan reward
- ✅ **Mission Completion** - Tracking penyelesaian misi
- ✅ **Score Management** - Manajemen skor dan nilai quiz

### 📧 **Email System**

- ✅ Template email HTML modern & responsif dengan animasi
- ✅ Email verifikasi account siswa baru
- ✅ Email reset password dengan token aman
- ✅ Welcome email setelah verifikasi berhasil
- ✅ Fallback untuk development mode (console logging)

## 🗄️ **Database & Model**

### **Models yang Tersedia**

| Model            | Deskripsi                    | Relasi                            |
| ---------------- | ---------------------------- | --------------------------------- |
| **User**         | Data siswa/mentor            | Many-to-Many dengan Role          |
| **Role**         | Role sistem (Admin, Student) | Many-to-Many dengan User          |
| **Mission**      | Misi pembelajaran            | One-to-Many dengan Quiz           |
| **Quiz**         | Soal quiz                    | Many-to-One dengan Mission        |
| **Progress**     | Progress belajar siswa       | Many-to-One dengan User & Mission |
| **Badge**        | Sistem badge reward          | One-to-Many dengan UserBadge      |
| **UserBadge**    | Relasi user-badge            | Many-to-One dengan User & Badge   |
| **Character**    | Sistem karakter              | One-to-Many dengan User           |
| **AiContentLog** | Log penggunaan AI            | Many-to-One dengan User & Quiz    |

### **Database Schema**

```sql
-- Users table with UUID primary key
-- Roles table (Admin, Student)
-- User_Roles pivot table for many-to-many relationship
-- Missions table (title, description, subject, level, points)
-- Quizzes table (question, options JSON, answer JSON)
-- Progress table (user_id, mission_id, score, status, completed_at)
-- Badges table (name, description, threshold, image)
-- User_Badges table (user_id, badge_id, earned_at)
-- Characters table (name, description, avatar)
-- Ai_Content_Logs table (user_id, action_type, quiz_id, prompt, response)
```

## 🛡️ **Keamanan**

- ✅ Helmet.js untuk security headers
- ✅ CORS configuration yang fleksibel
- ✅ Input validation dengan express-validator
- ✅ Password hashing dengan bcryptjs (salt rounds: 12)
- ✅ JWT token dengan expiry time (15m access, 7d refresh)
- ✅ Rate limiting untuk mencegah abuse
- ✅ SQL injection protection dengan Sequelize ORM
- ✅ XSS protection dengan input sanitization

## 📊 **Logging & Monitoring**

- ✅ Morgan dengan format custom dan visual indicators
- ✅ Color-coded status codes untuk development
- ✅ Environment-based logging (dev/production)
- ✅ Request tracking yang lengkap dengan timestamp
- ✅ AI content usage logging untuk analytics
- ✅ Error logging dengan stack trace

## 🎯 **Developer Experience**

- ✅ Hot Reload dengan nodemon untuk development
- ✅ Environment configuration yang lengkap
- ✅ Struktur folder yang terorganisir dan scalable
- ✅ Custom NPM scripts untuk model/migration/seeder generation
- ✅ Error handling middleware yang comprehensive
- ✅ Testing setup dengan Jest dan Supertest
- ✅ API documentation dengan contoh request/response

## � **Tech Stack & Dependencies**

### **Core Dependencies**

| Kategori           | Package            | Versi  | Deskripsi                         |
| ------------------ | ------------------ | ------ | --------------------------------- |
| **Runtime**        | Node.js            | 18+    | JavaScript runtime environment    |
| **Framework**      | Express.js         | 5.1.0  | Fast, unopinionated web framework |
| **Database**       | MySQL              | 8.0+   | Relational database management    |
| **ORM**            | Sequelize          | 6.37.7 | Promise-based ORM untuk Node.js   |
| **Authentication** | JsonWebToken       | 9.0.2  | JWT implementation untuk auth     |
| **AI Integration** | @google/genai      | 1.20.0 | Google AI Gemini integration      |
| **Validation**     | Express Validator  | 7.2.1  | Middleware untuk input validation |
| **Email**          | Nodemailer         | 7.0.6  | Module untuk sending email        |
| **Security**       | Helmet             | 8.1.0  | Security middleware collection    |
| **Password**       | Bcryptjs           | 3.0.2  | Library untuk password hashing    |
| **CORS**           | Cors               | 2.8.5  | Cross-Origin Resource Sharing     |
| **Rate Limiting**  | Express Rate Limit | 8.1.0  | Rate limiting middleware          |
| **File Upload**    | Multer             | 2.0.2  | Middleware untuk file upload      |
| **UUID**           | UUID               | 12.0.0 | UUID generation library           |
| **Compression**    | Compression        | 1.8.1  | Response compression middleware   |
| **Cookie Parser**  | Cookie Parser      | 1.4.7  | Cookie parsing middleware         |

### **Development Dependencies**

| Package           | Versi  | Deskripsi                              |
| ----------------- | ------ | -------------------------------------- |
| **Jest**          | 30.1.3 | Unit & integration testing framework   |
| **Supertest**     | 7.1.4  | HTTP endpoint testing library          |
| **Nodemon**       | 3.1.10 | Development auto-restart tool          |
| **Morgan**        | 1.10.1 | HTTP request logger middleware         |
| **Sequelize CLI** | 6.6.3  | Command line interface untuk Sequelize |

## 📋 **Persyaratan Sistem**

- **Node.js** >= 18.0.0
- **npm** >= 8.0.0
- **MySQL** >= 8.0.0
- **Git** (untuk version control)
- **Google AI API Key** (untuk fitur AI)

## 🚀 **Instalasi & Setup**

### **1. Clone Repository**

```bash
git clone https://github.com/Brynnnn12/backend-eduquest.git
cd backend-eduquest
```

### **2. Install Dependencies**

```bash
npm install
```

### **3. Environment Configuration**

Buat file `.env` di root directory dan konfigurasikan sesuai kebutuhan:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=eduquest_db
DB_USERNAME=root
DB_PASSWORD=your_mysql_password

# JWT Secrets (Ganti dengan secret yang kuat untuk production!)
JWT_ACCESS_SECRET=your_super_secret_access_key_here_at_least_32_characters
JWT_REFRESH_SECRET=your_super_secret_refresh_key_here_at_least_32_characters
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Google AI Configuration (WAJIB untuk fitur AI)
AI_GEMINI_API_KEY=your_google_ai_gemini_api_key_here

# Email Configuration (Opsional, untuk fitur email)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your_email@gmail.com
MAIL_PASSWORD=your_gmail_app_password
MAIL_FROM=noreply@eduquest.com

# Application Configuration
APP_URL=http://localhost:3000
NODE_ENV=development
PORT=3000

# Upload Configuration
UPLOAD_PATH=public/uploads
MAX_FILE_SIZE=2097152
```

### **4. Setup Google AI API Key**

1. Kunjungi [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Buat API key baru
3. Copy API key dan paste ke `.env` file pada variabel `AI_GEMINI_API_KEY`

### **5. Database Setup**

```bash
# Buat database MySQL terlebih dahulu
mysql -u root -p
CREATE DATABASE eduquest_db;
exit

# Jalankan migration untuk membuat tabel
npm run migrate

# Seed data default (Role Admin/Student + akun admin)
npm run seed
```

### **6. Jalankan Server**

```bash
# Development mode dengan hot reload
npm run dev

# Production mode
npm start
```

Server akan berjalan di: `http://localhost:3000`

## 📚 **API Endpoints**

### **🔐 Authentication Endpoints**

```http
POST   /api/auth/register        # Registrasi siswa baru + email verifikasi
POST   /api/auth/login           # Login (return access + refresh token)
POST   /api/auth/refresh-token   # Refresh access token menggunakan refresh token
POST   /api/auth/logout          # Logout user (invalidate tokens)
POST   /api/auth/forgot-password # Request reset password via email
POST   /api/auth/reset-password  # Reset password menggunakan token dari email
GET    /api/auth/verify-email    # Verifikasi email dari link di email
```

### **👤 User Management Endpoints**

```http
GET    /api/profile              # Get profile user yang sedang login
PUT    /api/profile              # Update profile user
```

### **🎓 Learning System Endpoints**

```http
# Missions
GET    /api/missions             # List semua misi pembelajaran
GET    /api/missions/:id         # Detail misi tertentu
POST   /api/missions             # Buat misi baru (Admin only)
PUT    /api/missions/:id         # Update misi (Admin only)
DELETE /api/missions/:id         # Hapus misi (Admin only)

# Quizzes
GET    /api/quizzes              # List semua quiz
GET    /api/quizzes/:id          # Detail quiz tertentu
PUT    /api/quizzes/:id          # Update quiz (Admin only)
DELETE /api/quizzes/:id          # Hapus quiz (Admin only)
POST   /api/quizzes/submit       # Submit jawaban quiz

# Progress
GET    /api/progresses           # List progress user
GET    /api/progresses/:id       # Detail progress tertentu

# Characters
GET    /api/characters           # List semua karakter
GET    /api/characters/:id       # Detail karakter tertentu
POST   /api/characters           # Buat karakter baru (Admin only)
PUT    /api/characters/:id       # Update karakter (Admin only)
DELETE /api/characters/:id       # Hapus karakter (Admin only)

# Badges
GET    /api/badges               # List semua badge
GET    /api/badges/:id           # Detail badge tertentu
POST   /api/badges               # Buat badge baru (Admin only)
PUT    /api/badges/:id           # Update badge (Admin only)
DELETE /api/badges/:id           # Hapus badge (Admin only)
```

### **🤖 AI-Powered Endpoints**

```http
GET    /api/quizzes/:quizId/hint      # Dapatkan hint dari AI (maks 2x per quiz)
GET    /api/quizzes/:quizId/solution  # Dapatkan solusi lengkap dari AI (maks 1x per quiz)
```

## 🔑 **Default Credentials**

Setelah menjalankan seeder, gunakan kredensial berikut untuk testing:

**Admin Account:**

- Email: `admin@eduquest.com`
- Password: `admin123`
- Role: `Admin`

> ⚠️ **Penting**: Segera ganti password default ini setelah deployment ke production!

## 📝 **Contoh Penggunaan API**

### **Register Siswa Baru**

```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "Ahmad Siswa",
  "email": "ahmad@example.com",
  "password": "password123",
  "passwordConfirmation": "password123"
}

# Response Success:
{
  "success": true,
  "message": "Registrasi berhasil. Silakan cek email untuk verifikasi.",
  "data": {
    "id": "uuid-here",
    "name": "Ahmad Siswa",
    "email": "ahmad@example.com"
  }
}
```

### **Login**

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@eduquest.com",
  "password": "admin123"
}

# Response Success:
{
  "success": true,
  "message": "Login berhasil",
  "data": {
    "user": {
      "name": "Admin User"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### **Membuat Misi Pembelajaran Baru**

```bash
POST /api/missions
Authorization: Bearer <your_access_token>
Content-Type: application/json

{
  "title": "Sejarah Perjuangan Bangsa Indonesia",
  "description": "Pelajari tentang perjuangan bangsa Indonesia menuju kemerdekaan",
  "subject": "Sejarah",
  "level": "Menengah",
  "points": 100
}

# Response Success:
{
  "success": true,
  "message": "Berhasil Membuat Mission",
  "data": {
    "id": "uuid-here",
    "title": "Sejarah Perjuangan Bangsa Indonesia",
    "description": "Pelajari tentang perjuangan bangsa Indonesia menuju kemerdekaan",
    "subject": "Sejarah",
    "level": "Menengah",
    "points": 100,
    "created_by": "admin-uuid"
  }
}
```

### **Submit Jawaban Quiz**

```bash
POST /api/quizzes/submit
Authorization: Bearer <your_access_token>
Content-Type: application/json

{
  "mission_id": "mission-uuid-here",
  "answers": [
    {
      "quiz_id": "quiz-uuid-1",
      "user_answer": "a"
    },
    {
      "quiz_id": "quiz-uuid-2",
      "user_answer": "b"
    }
  ]
}

# Response Success:
{
  "success": true,
  "message": "Berhasil submit jawaban & update progress",
  "data": {
    "score": 80,
    "totalQuestions": 10,
    "status": "completed",
    "progress": {
      "id": "progress-uuid",
      "user_id": "user-uuid",
      "mission_id": "mission-uuid",
      "score": 80,
      "status": "completed",
      "completed_at": "2025-09-20T10:30:00.000Z"
    }
  }
}
```

### **Mendapatkan Hint dari AI**

```bash
GET /api/quizzes/quiz-uuid/hint
Authorization: Bearer <your_access_token>

# Response Success:
{
  "success": true,
  "message": "Berhasil mendapatkan hint",
  "data": {
    "hint": "Petunjuk: Budi Utomo adalah organisasi pergerakan nasional pertama di Indonesia yang didirikan oleh dr. Sutomo pada tahun 1908."
  }
}
```

## 📁 **Struktur Project**

```
backend-eduquest/
├── src/                      # Source code utama
│   ├── config/               # File konfigurasi
│   │   ├── cors.js          # CORS middleware configuration
│   │   ├── database.js      # Database configuration (Sequelize)
│   │   ├── jwt.js           # JWT configuration & settings
│   │   ├── mailer.js        # Email configuration (Nodemailer)
│   │   └── rateLimiter.js   # Rate limiting configuration
│   ├── controllers/          # Request handlers / Controllers
│   │   ├── authController.js    # Authentication controllers
│   │   ├── badgeController.js   # Badge management controllers
│   │   ├── characterController.js # Character management controllers
│   │   ├── missionController.js  # Mission management controllers
│   │   ├── profileController.js  # User profile controllers
│   │   ├── progressController.js # Progress tracking controllers
│   │   └── quizController.js     # Quiz management controllers
│   ├── middlewares/          # Custom middleware functions
│   │   ├── authMiddleware.js    # JWT & role-based authorization
│   │   └── errorHandler.js      # Global error handling
│   ├── migrations/           # Database schema migrations
│   │   ├── 20250908122856-create-user.js
│   │   ├── 20250909025508-create-role.js
│   │   └── ... (other migrations)
│   ├── models/               # Sequelize models
│   │   ├── index.js          # Models index & associations
│   │   ├── user.js          # User model
│   │   ├── role.js          # Role model
│   │   ├── mission.js       # Mission model
│   │   ├── quiz.js          # Quiz model
│   │   ├── progres.js       # Progress model
│   │   ├── badge.js         # Badge model
│   │   ├── character.js     # Character model
│   │   └── ... (other models)
│   ├── routes/               # API routes
│   │   ├── index.js         # Main routes index
│   │   ├── authRoute.js     # Authentication routes
│   │   ├── badgeRoute.js    # Badge routes
│   │   ├── characterRoute.js # Character routes
│   │   ├── missionRoute.js  # Mission routes
│   │   ├── profileRoute.js  # Profile routes
│   │   ├── progressRoute.js # Progress routes
│   │   └── quizRoute.js     # Quiz routes
│   ├── seeders/              # Database seeders
│   │   ├── 20250909032531-create-roles.js
│   │   └── 20250909032547-create-admin-user.js
│   ├── services/             # Business logic layer
│   │   ├── authService.js       # Authentication business logic
│   │   ├── badgeService.js      # Badge business logic
│   │   ├── characterService.js  # Character business logic
│   │   ├── missionService.js    # Mission business logic
│   │   ├── progressService.js   # Progress business logic
│   │   ├── quizService.js       # Quiz business logic
│   │   └── userBadgeService.js  # User badge business logic
│   ├── templates/            # Email templates
│   │   └── emailTemplate.js # HTML email templates
│   ├── utils/                # Utility functions
│   │   ├── aiHelper.js       # AI integration utilities
│   │   ├── hashing.js        # Password hashing utilities
│   │   ├── jwt.js            # JWT token utilities
│   │   ├── multer.js         # File upload utilities
│   │   ├── queryHelper.js    # Database query helpers
│   │   ├── response.js       # Standardized API responses
│   │   └── sendEmail.js      # Email sending utilities
│   ├── validators/           # Input validation
│   │   ├── authValidate.js   # Authentication validation rules
│   │   ├── badgeValidate.js  # Badge validation rules
│   │   ├── characterValidate.js # Character validation rules
│   │   ├── missionValidate.js  # Mission validation rules
│   │   └── profileValidate.js  # Profile validation rules
│   └── server.js            # Express server entry point
├── public/                   # Static files
│   └── icons/               # Icon files
├── __tests__/               # Test files
│   ├── routes/              # Route tests
│   │   ├── authRoute.test.js
│   │   └── profileRoute.test.js
│   └── utils/               # Utility tests
│       ├── hash.test.js
│       ├── jwt.test.js
│       └── response.test.js
├── .env.example            # Environment variables template
├── .gitignore              # Git ignore rules
├── package.json            # Dependencies & npm scripts
├── package-lock.json       # Dependency lock file
└── README.md               # Dokumentasi lengkap (file ini)
```

## 📊 **Scripts NPM yang Tersedia**

### **🏃‍♂️ Development & Testing**

```bash
npm run dev          # Jalankan server development dengan nodemon
npm start            # Jalankan server production
npm test             # Jalankan unit tests dengan Jest
```

### **📦 Model, Migration & Seeder Generation**

```bash
# Buat model dengan migration sekaligus
npm run model:create User -- --attributes name:string,email:string,password:string

# Buat migration standalone
npm run migration:create add-column-to-users

# Buat seeder file
npm run seeder:create demo-users
```

### **🗄️ Database Operations**

```bash
# Migration Operations
npm run migrate              # Jalankan semua migration yang pending
npm run migrate:undo         # Rollback migration terakhir
npm run migrate:undo:all     # Rollback semua migration
npm run migrate:fresh        # Reset database + migrate dari awal
npm run migrate:refresh      # Reset + migrate + seed

# Seeding Operations
npm run seed                 # Jalankan semua seeder
npm run seed:undo            # Rollback seeder terakhir
npm run seed:undo:all        # Rollback semua seeder
npm run seed:fresh           # Reset seed + seed ulang

# Database Utilities
npm run db:reset             # Reset database lengkap (drop + create)
npm run db:setup             # Setup database fresh (migrate + seed)
```

## 🧪 **Testing**

### **Menjalankan Tests**

```bash
npm test                      # Run semua tests
npm run test:watch           # Run tests dalam watch mode
npm run test:coverage        # Run tests dengan coverage report
```

### **Contoh Test File**

```javascript
// __tests__/routes/authRoute.test.js
const request = require("supertest");
const app = require("../../src/server");

describe("Authentication Routes", () => {
  test("should register new user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
      passwordConfirmation: "password123",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
  });
});
```

## 🚀 **Deployment**

### **Persiapan Production**

#### **Environment Variables untuk Production**

```env
NODE_ENV=production
PORT=3000

# Database (gunakan connection pool untuk production)
DB_HOST=your_production_db_host
DB_USERNAME=your_production_db_user
DB_PASSWORD=your_production_db_password
DB_NAME=your_production_db_name

# JWT (WAJIB ganti dengan secret yang kuat!)
JWT_ACCESS_SECRET=your_super_strong_secret_at_least_64_characters_long
JWT_REFRESH_SECRET=your_super_strong_refresh_secret_at_least_64_characters_long

# Google AI (WAJIB untuk fitur AI)
AI_GEMINI_API_KEY=your_production_google_ai_api_key

# Email Production
MAIL_HOST=smtp.your-provider.com
MAIL_USERNAME=your_production_email
MAIL_PASSWORD=your_production_email_password
MAIL_FROM=noreply@eduquest.com
```

#### **Production Checklist**

- [ ] Ganti semua default passwords (terutama admin account)
- [ ] Set `NODE_ENV=production`
- [ ] Gunakan HTTPS/SSL certificate
- [ ] Setup reverse proxy (Nginx/Apache)
- [ ] Configure firewall rules (hanya port yang diperlukan)
- [ ] Setup process manager (PM2)
- [ ] Configure log rotation
- [ ] Database backup strategy
- [ ] Environment variables security (gunakan secrets manager)
- [ ] Setup monitoring (health checks)

### **Deployment dengan PM2**

```bash
# Install PM2 globally
npm install -g pm2

# Jalankan aplikasi dengan PM2
pm2 start src/server.js --name "eduquest-backend"

# Setup auto-restart on reboot
pm2 startup
pm2 save

# Monitor aplikasi
pm2 status
pm2 logs eduquest-backend
```

## 🐛 **Troubleshooting**

### **Database Connection Issues**

```bash
# Cek status MySQL service
# Windows:
net start mysql80

# Linux/Mac:
sudo service mysql start
# atau
brew services start mysql

# Test koneksi database
mysql -u root -p -h localhost -P 3306

# Jika error "Client does not support authentication protocol"
mysql -u root -p
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_password';
FLUSH PRIVILEGES;
```

### **Google AI API Issues**

- **API Key Invalid**: Pastikan `AI_GEMINI_API_KEY` sudah benar di `.env`
- **Quota Exceeded**: Cek usage limit di Google AI Studio
- **Network Issues**: Pastikan koneksi internet stabil

### **JWT Token Issues**

- **Token Invalid**: Pastikan `JWT_ACCESS_SECRET` dan `JWT_REFRESH_SECRET` sudah di-set
- **Token Expired**: Gunakan refresh token untuk mendapatkan access token baru
- **Headers Missing**: Pastikan format: `Authorization: Bearer <token>`

### **Email Sending Issues**

#### **Gmail Configuration**

```bash
# 1. Enable 2-Factor Authentication di Gmail
# 2. Generate App Password di Google Account Settings
# 3. Gunakan App Password (bukan password biasa, tanpa spasi)

MAIL_USERNAME=your_email@gmail.com
MAIL_PASSWORD=abcd1234efgh5678  # 16 karakter App Password
```

## 📈 **Performance Optimization**

### **Database Optimization**

```javascript
// Add indexes untuk query yang sering digunakan
// migrations/add-indexes.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addIndex("users", ["email"]);
    await queryInterface.addIndex("progress", ["user_id", "mission_id"]);
    await queryInterface.addIndex("ai_content_logs", [
      "user_id",
      "action_type",
    ]);
  },
};
```

### **AI Content Caching**

```javascript
// Implementasi caching untuk AI responses (optional)
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 3600 }); // 1 hour TTL

// Cache hint responses
const cachedHint = cache.get(`hint_${quizId}_${userId}`);
if (cachedHint) {
  return cachedHint;
}

// Generate new hint and cache it
const hint = await generateHint(quizId);
cache.set(`hint_${quizId}_${userId}`, hint);
return hint;
```

## 🤝 **Contributing**

Kontribusi sangat diterima! Untuk berkontribusi:

1. **Fork** repository ini
2. Buat **feature branch** (`git checkout -b feature/fitur-baru`)
3. **Commit** perubahan Anda (`git commit -m 'Add: fitur baru yang awesome'`)
4. **Push** ke branch (`git push origin feature/fitur-baru`)
5. Buat **Pull Request**

### **Coding Standards**

- Gunakan **ESLint** untuk code formatting
- Tulis **unit tests** untuk setiap fitur baru
- Follow **conventional commits** format
- Dokumentasi yang lengkap untuk public APIs

## 📄 **License**

Proyek ini dilisensikan di bawah **MIT License**.

```
MIT License

Copyright (c) 2025 Bryan Kurnia Akbar

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 👨‍💻 **Author**

<div align="center">
  <img src="https://github.com/Brynnnn12.png" alt="Bryan Kurnia Akbar" width="100" height="100" style="border-radius: 50%;">

**Bryan Kurnia Akbar**

</div>

- 🌐 **GitHub**: [@Brynnnn12](https://github.com/Brynnnn12)
- 📧 **Email**: bryankurniaakbar12@gmail.com
- 💼 **LinkedIn**: [Bryan Kurnia](https://linkedin.com/in/brynnnn12)
- 🐦 **Instagram**: [@brynnnn12](https://instagram.com/brynnnn12)

## 🙏 **Acknowledgments**

Terima kasih kepada:

- **[Express.js Team](https://expressjs.com/)** - Framework web yang luar biasa cepat dan minimal
- **[Sequelize Team](https://sequelize.org/)** - ORM modern untuk Node.js yang powerful
- **[Google AI](https://ai.google.dev/)** - AI Gemini untuk fitur pembelajaran interaktif
- **[JWT.io](https://jwt.io/)** - Implementasi JSON Web Token yang reliable
- **[Nodemailer](https://nodemailer.com/)** - Module terbaik untuk sending emails
- **[MySQL](https://www.mysql.com/)** - Database management system yang robust
- **Open Source Community** - Untuk semua kontribusi dan inspirasi
- **Stack Overflow Community** - Untuk solusi-solusi technical yang membantu

---

<div align="center">

**🚀 EduQuest - Belajar Jadi Lebih Menyenangkan dengan AI! 🚀**

_Dibuat dengan ❤️ oleh Bryan Kurnia untuk komunitas pendidikan Indonesia_

[![Made with Love](https://img.shields.io/badge/Made%20with-❤️-red.svg)](https://github.com/Brynnnn12)
[![Indonesian](https://img.shields.io/badge/Made%20in-🇮🇩%20Indonesia-red.svg)](https://github.com/Brynnnn12)

**Jika repository ini bermanfaat, berikan ⭐ untuk mendukung development selanjutnya!**
