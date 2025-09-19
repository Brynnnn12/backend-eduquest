# 🚀 Express Starter - Backend API

<div align="center">
  <img src="https://nodejs.org/static/images/logo.svg" alt="Node.js" width="80" height="80">
  <img src="https://expressjs.com/images/express-facebook-share.png" alt="Express.js" width="140" height="80">
  <img src="https://www.mysql.com/common/logos/logo-mysql-170x115.png" alt="MySQL" width="120" height="80">
</div>

<div align="center">
  <h3>Backend API lengkap dengan autentikasi JWT, role-based authorization, dan email modern</h3>
  
  ![Node.js](https://img.shields.io/badge/Node.js-18%2B-green?style=flat-square&logo=node.js)
  ![Express.js](https://img.shields.io/badge/Express.js-5.1-blue?style=flat-square&logo=express)
  ![MySQL](https://img.shields.io/badge/MySQL-8.0-orange?style=flat-square&logo=mysql)
  ![Sequelize](https://img.shields.io/badge/Sequelize-6.37-red?style=flat-square&logo=sequelize)
  ![JWT](https://img.shields.io/badge/JWT-Auth-purple?style=flat-square&logo=jsonwebtokens)
</div>

---

## 📖 **Deskripsi**

Express Starter adalah template backend API yang siap pakai dan production-ready, dilengkapi dengan sistem autentikasi lengkap menggunakan JWT, role-based authorization, email templates modern yang responsif, custom logging dengan Morgan, dan berbagai fitur keamanan. Cocok untuk memulai proyek backend dengan cepat dan professional.

## ✨ **Fitur Utama**

### 🔐 **Sistem Autentikasi & Otorisasi**

- ✅ Registrasi dengan verifikasi email otomatis
- ✅ Login dengan JWT (Access & Refresh Token)
- ✅ Forgot & Reset Password melalui email
- ✅ Role-based Authorization (Admin & User)
- ✅ Middleware keamanan untuk proteksi route
- ✅ Logout dengan blacklist token

### 📧 **Email System**

- ✅ Template email HTML modern & responsif dengan animasi
- ✅ Email verifikasi account dengan link aktivasi
- ✅ Email reset password dengan token aman
- ✅ Welcome email setelah verifikasi berhasil
- ✅ Fallback untuk development mode (console logging)
- ✅ Support multiple email providers

### 🗄️ **Database & ORM**

- ✅ MySQL dengan Sequelize ORM v6.37.7
- ✅ Migration & Seeding system yang lengkap
- ✅ Model relationships (User-Role many-to-many via pivot table)
- ✅ UUID sebagai primary key untuk keamanan
- ✅ Snake_case column naming untuk konsistensi
- ✅ Password hashing dengan bcryptjs

### 🛡️ **Keamanan**

- ✅ Helmet.js untuk security headers
- ✅ CORS configuration yang fleksibel
- ✅ Input validation dengan express-validator
- ✅ Password hashing yang aman
- ✅ JWT token dengan expiry time
- ✅ Error handling yang tidak expose sensitive data

### 📊 **Logging & Monitoring**

- ✅ Morgan dengan format custom dan visual indicators
- ✅ Color-coded status codes untuk development
- ✅ Environment-based logging (dev/production)
- ✅ Request tracking yang lengkap dengan timestamp
- ✅ Konfigurasi logging terpisah untuk maintainability

### 🎯 **Developer Experience**

- ✅ Hot Reload dengan nodemon untuk development
- ✅ Environment configuration yang lengkap
- ✅ Struktur folder yang terorganisir dan scalable
- ✅ Custom NPM scripts untuk model/migration/seeder generation
- ✅ Error handling middleware yang comprehensive
- ✅ Testing setup dengan Jest dan Supertest

## �️ **Tech Stack & Dependencies**

| Kategori           | Teknologi         | Versi  | Deskripsi                         |
| ------------------ | ----------------- | ------ | --------------------------------- |
| **Runtime**        | Node.js           | 18+    | JavaScript runtime environment    |
| **Framework**      | Express.js        | 5.1.0  | Fast, unopinionated web framework |
| **Database**       | MySQL             | 8.0+   | Relational database management    |
| **ORM**            | Sequelize         | 6.37.7 | Promise-based ORM for Node.js     |
| **Authentication** | JsonWebToken      | 9.0.2  | JWT implementation untuk auth     |
| **Validation**     | Express Validator | 7.2.1  | Middleware untuk input validation |
| **Email**          | Nodemailer        | 7.0.6  | Module untuk sending email        |
| **Security**       | Helmet            | 8.1.0  | Security middleware collection    |
| **Password**       | Bcryptjs          | 3.0.2  | Library untuk password hashing    |
| **CORS**           | Cors              | 2.8.5  | Cross-Origin Resource Sharing     |
| **Logging**        | Morgan            | 1.10.1 | HTTP request logger middleware    |
| **Environment**    | Dotenv            | 17.2.2 | Environment variables loader      |
| **Testing**        | Jest & Supertest  | 30.1.3 | Unit & integration testing        |
| **UUID**           | UUID              | 12.0.0 | UUID generation library           |

## 📋 **Persyaratan Sistem**

- **Node.js** >= 18.0.0
- **npm** >= 8.0.0
- **MySQL** >= 8.0.0
- **Git** (untuk version control)

## 🚀 **Instalasi & Setup**

### 1. **Clone Repository**

```bash
git clone https://github.com/Brynnnn12/express-starter.git
cd express-starter
```

### 2. **Install Dependencies**

```bash
npm install
```

### 3. **Environment Configuration**

Buat file `.env` dan konfigurasikan sesuai kebutuhan:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=express_starter
DB_USERNAME=root
DB_PASSWORD=your_mysql_password

# JWT Secrets (Ganti dengan secret yang kuat untuk production!)
JWT_ACCESS_SECRET=your_super_secret_access_key_here_at_least_32_characters
JWT_REFRESH_SECRET=your_super_secret_refresh_key_here_at_least_32_characters
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Email Configuration (Opsional, untuk fitur email)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your_email@gmail.com
MAIL_PASSWORD=your_gmail_app_password
MAIL_FROM=noreply@yourapp.com

# Application Configuration
APP_URL=http://localhost:3000
NODE_ENV=development
PORT=3000
```

### 4. **Database Setup**

```bash
# Buat database MySQL terlebih dahulu
mysql -u root -p
CREATE DATABASE express_starter;
exit

# Jalankan migration untuk membuat tabel
npm run migrate

# Seed data default (Role Admin/User + akun admin)
npm run seed
```

### 5. **Jalankan Server**

```bash
# Development mode dengan hot reload
npm run dev

# Production mode
npm start
```

Server akan berjalan di: `http://localhost:3000`

## 📚 **Script NPM yang Tersedia**

### **🏃‍♂️ Development & Testing**

```bash
npm run dev          # Jalankan server development dengan nodemon
npm start            # Jalankan server production
npm test             # Jalankan unit tests dengan Jest
npm run test:watch   # Jalankan tests dalam watch mode
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

## 🎯 **API Endpoints**

### **� Authentication Endpoints**

```http
POST   /api/auth/register        # Registrasi user baru + email verifikasi
POST   /api/auth/login           # Login user (return access + refresh token)
POST   /api/auth/refresh-token   # Refresh access token menggunakan refresh token
POST   /api/auth/logout          # Logout user (invalidate tokens)
POST   /api/auth/forgot-password # Request reset password via email
POST   /api/auth/reset-password  # Reset password menggunakan token dari email
GET    /api/auth/verify-email    # Verifikasi email dari link di email
```

### **👤 User Management Endpoints** (Coming Soon)

```http
GET    /api/users                # List semua users (Admin only)
GET    /api/users/:id            # Get detail user tertentu
PUT    /api/users/:id            # Update data user
DELETE /api/users/:id            # Hapus user (Admin only)
GET    /api/users/profile        # Get profile user yang sedang login
```

## 🔑 **Default Credentials**

Setelah menjalankan seeder, gunakan kredensial berikut untuk testing:

**Admin Account:**

- Email: `admin@expressapp.com`
- Password: `admin123`
- Role: `Admin`

> ⚠️ **Penting**: Segera ganti password default ini setelah deployment ke production!

## 📝 **Contoh Penggunaan API**

### **Register User Baru**

```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "passwordConfirmation": "password123"
}

# Response Success:
{
  "success": true,
  "message": "Registrasi berhasil. Silakan cek email untuk verifikasi.",
  "data": {
    "id": "uuid-here",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### **Login**

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@expressapp.com",
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

### **Menggunakan Protected Route**

```bash
GET /api/protected-route
Authorization: Bearer <your_access_token>
```

### **Refresh Token**

```bash
POST /api/auth/refresh-token
Content-Type: application/json

{
  "refreshToken": "your_refresh_token_here"
}
```

### **Forgot Password**

```bash
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "john@example.com"
}
```

## 🛡️ **Authorization Middleware**

### **Cara Penggunaan Middleware**

```javascript
const {
  authenticateToken,
  adminOnly,
  checkRole,
  ownerOrAdmin,
} = require("./middlewares/authMiddleware");

// Route yang memerlukan autentikasi
router.get("/profile", authenticateToken, getProfile);

// Route khusus admin saja
router.get("/admin/dashboard", authenticateToken, adminOnly, getAdminDashboard);

// Route untuk role tertentu (bisa multiple roles)
router.get(
  "/dashboard",
  authenticateToken,
  checkRole(["Admin", "User"]),
  getDashboard
);

// Route untuk owner data tersebut atau admin
router.put(
  "/users/:userId",
  authenticateToken,
  ownerOrAdmin("userId"),
  updateUser
);
```

### **Middleware yang Tersedia**

| Middleware                     | Deskripsi                   | Penggunaan              |
| ------------------------------ | --------------------------- | ----------------------- |
| `authenticateToken`            | Verifikasi JWT token        | Semua protected route   |
| `adminOnly`                    | Hanya admin yang bisa akses | Route admin exclusive   |
| `checkRole(['Admin', 'User'])` | Cek role specific           | Route berdasarkan role  |
| `ownerOrAdmin('paramName')`    | Owner data atau admin       | Update/delete data user |

## 📧 **Email Templates & Configuration**

### **Template Email yang Tersedia**

1. **Email Verifikasi** - Untuk aktivasi account baru
2. **Email Reset Password** - Untuk reset password dengan token
3. **Welcome Email** - Selamat datang setelah verifikasi berhasil

### **Custom Email Template**

```javascript
const { createEmailTemplate } = require("./src/templates/emailTemplate");

// Buat template email custom
const customEmail = createEmailTemplate({
  title: "Judul Email Anda",
  heading: "Header Email",
  message: "Pesan email yang ingin disampaikan...",
  buttonText: "Tombol Action",
  buttonUrl: "https://example.com/action",
  companyName: "Nama Perusahaan Anda",
});

// Gunakan dengan nodemailer
await sendEmail(email, subject, customEmail);
```

### **Konfigurasi Email Provider**

#### **Gmail Configuration**

```env
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your_email@gmail.com
MAIL_PASSWORD=your_app_password  # Bukan password biasa, gunakan App Password
MAIL_FROM=noreply@yourapp.com
```

#### **Outlook/Hotmail Configuration**

```env
MAIL_HOST=smtp-mail.outlook.com
MAIL_PORT=587
MAIL_USERNAME=your_email@outlook.com
MAIL_PASSWORD=your_password
MAIL_FROM=noreply@yourapp.com
```

## 📁 **Struktur Project**

```
express-starter/
├── src/                      # Source code utama
│   ├── config/               # File konfigurasi
│   │   ├── config.js         # Database configuration (Sequelize)
│   │   ├── cors.js          # CORS middleware configuration
│   │   ├── jwt.js           # JWT configuration & settings
│   │   ├── mailer.js        # Email configuration (Nodemailer)
│   │   └── morgan.js        # Custom Morgan logging configuration
│   ├── controllers/          # Request handlers / Controllers
│   │   └── authController.js # Authentication controllers
│   ├── middlewares/          # Custom middleware functions
│   │   ├── authMiddleware.js # JWT & role-based authorization
│   │   └── errorHandler.js   # Global error handling
│   ├── migrations/           # Database schema migrations
│   │   ├── 20250908122856-create-user.js
│   │   ├── 20250908123000-create-role.js
│   │   └── 20250908123100-create-user-roles.js
│   ├── models/               # Sequelize models
│   │   ├── index.js          # Models index & associations
│   │   ├── user.js          # User model
│   │   └── role.js          # Role model
│   ├── routes/               # API routes
│   │   └── authRoute.js     # Authentication routes
│   ├── seeders/              # Database seeders
│   │   ├── 20250908124000-roles.js
│   │   └── 20250908124100-admin-user.js
│   ├── services/             # Business logic layer
│   │   └── authService.js   # Authentication business logic
│   ├── templates/            # Email templates
│   │   └── emailTemplate.js # HTML email templates
│   ├── utils/                # Utility functions
│   │   ├── generateToken.js # JWT token generation
│   │   ├── hashing.js       # Password hashing utilities
│   │   ├── response.js      # Standardized API responses
│   │   └── sendEmail.js     # Email sending utilities
│   ├── validators/           # Input validation
│   │   └── authValidate.js  # Authentication validation rules
│   └── server.js            # Express server entry point
├── tests/                    # Test files (Unit & Integration)
│   ├── auth.test.js         # Authentication tests
│   └── setup.js             # Test setup configuration
├── .env.example             # Environment variables template
├── .gitignore               # Git ignore rules
├── package.json             # Dependencies & npm scripts
├── package-lock.json        # Dependency lock file
└── README.md               # Dokumentasi lengkap (file ini)
```

## 🛡️ **Konfigurasi Keamanan**

### **JWT Configuration**

File: `src/config/jwt.js`

```javascript
module.exports = {
  access: {
    secret: process.env.JWT_ACCESS_SECRET,
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
  },
  refresh: {
    secret: process.env.JWT_REFRESH_SECRET,
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  },
};
```

### **Database Configuration**

File: `src/config/config.js`

```javascript
module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    define: {
      underscored: true, // snake_case columns
      freezeTableName: true, // tidak pluralize table names
      timestamps: true, // created_at, updated_at
    },
  },
};
```

### **CORS Configuration**

File: `src/config/cors.js`

```javascript
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://yourdomain.com",
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};
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
// tests/auth.test.js
const request = require("supertest");
const app = require("../src/server");

describe("Authentication", () => {
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

# Email Production
MAIL_HOST=smtp.your-provider.com
MAIL_USERNAME=your_production_email
MAIL_PASSWORD=your_production_email_password
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
pm2 start src/server.js --name "express-starter"

# Setup auto-restart on reboot
pm2 startup
pm2 save

# Monitor aplikasi
pm2 status
pm2 logs express-starter
```

### **Docker Deployment**

```dockerfile
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy app source
COPY . .

# Expose port
EXPOSE 3000

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001
USER nodejs

CMD ["npm", "start"]
```

```yaml
# docker-compose.yml
version: "3.8"
services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DB_HOST=mysql
    depends_on:
      - mysql

  mysql:
    image: mysql:8.0
    environment:
      MYSQL_DATABASE: express_starter
      MYSQL_ROOT_PASSWORD: rootpassword
    volumes:
      - mysql_data:/var/lib/mysql

volumes:
  mysql_data:
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

### **Migration & Seeding Errors**

```bash
# Reset semua migration dan mulai dari awal
npm run migrate:undo:all
npm run migrate

# Jika ada constraint error
npm run db:reset  # Hati-hati: ini akan menghapus semua data!

# Cek status migration
npx sequelize-cli db:migrate:status
```

### **JWT Token Issues**

- **Token Invalid**: Pastikan `JWT_ACCESS_SECRET` dan `JWT_REFRESH_SECRET` sudah di-set di `.env`
- **Token Expired**: Gunakan refresh token untuk mendapatkan access token baru
- **Headers Missing**: Pastikan format: `Authorization: Bearer <token>`

```javascript
// Debug JWT token
const jwt = require("jsonwebtoken");
try {
  const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  console.log("Token valid:", decoded);
} catch (error) {
  console.log("Token error:", error.message);
}
```

### **Email Sending Issues**

#### **Gmail Configuration**

```bash
# 1. Enable 2-Factor Authentication di Gmail
# 2. Generate App Password di Google Account Settings
# 3. Gunakan App Password (bukan password biasa)

MAIL_USERNAME=your_email@gmail.com
MAIL_PASSWORD=your_16_character_app_password  # Format: abcd efgh ijkl mnop
```

#### **Common Email Errors**

- **Invalid login**: Gunakan App Password untuk Gmail
- **Connection timeout**: Cek firewall dan port 587
- **Authentication failed**: Pastikan credentials benar

### **Development Issues**

```bash
# Port sudah digunakan
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac:
lsof -ti:3000 | xargs kill -9

# Clear npm cache jika ada masalah install
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### **Production Issues**

- **Memory leak**: Monitor dengan PM2 dan setup auto-restart
- **Database timeout**: Setup connection pool dengan `maxConcurrentQueries`
- **Log files terlalu besar**: Setup log rotation
- **Performance slow**: Implementasi caching dan database indexing

## 📈 **Performance Optimization**

### **Database Optimization**

```javascript
// Add indexes untuk query yang sering digunakan
// migrations/add-indexes.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addIndex("users", ["email"]);
    await queryInterface.addIndex("users", ["created_at"]);
    await queryInterface.addIndex("user_roles", ["user_id", "role_id"]);
  },
};
```

### **Caching Strategy**

```javascript
// Implementasi Redis untuk session caching (optional)
const redis = require("redis");
const client = redis.createClient();

// Cache user data setelah login
await client.setex(`user:${userId}`, 3600, JSON.stringify(userData));
```

### **Security Enhancements**

```javascript
// Rate limiting untuk API endpoints
const rateLimit = require("express-rate-limit");

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: "Too many authentication attempts, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api/auth/login", authLimiter);
```

## 🤝 **Contributing**

Kontribusi sangat diterima! Untuk berkontribusi:

1. **Fork** repository ini
2. Buat **feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit** perubahan Anda (`git commit -m 'Add: amazing feature'`)
4. **Push** ke branch (`git push origin feature/amazing-feature`)
5. Buat **Pull Request**

### **Coding Standards**

- Gunakan **ESLint** untuk code formatting
- Tulis **unit tests** untuk setiap fitur baru
- Follow **conventional commits** format
- Dokumentasi yang lengkap untuk public APIs

### **Pull Request Guidelines**

- Deskripsi yang jelas tentang perubahan
- Include tests untuk code changes
- Update README jika diperlukan
- Pastikan semua tests pass

## 📝 **Changelog**

### **v1.0.0** (2025-01-09)

- ✨ **Initial Release** - Complete authentication system
- 🔐 **JWT Authentication** - Access & refresh token implementation
- 👥 **Role Management** - Admin & User roles with middleware
- 📧 **Email System** - Modern responsive email templates
- 🗄️ **Database Setup** - MySQL + Sequelize with migrations & seeders
- 📊 **Logging** - Custom Morgan configuration with visual indicators
- 🧪 **Testing** - Jest & Supertest setup
- 📚 **Documentation** - Comprehensive Indonesian documentation
- 🛡️ **Security** - Helmet, CORS, input validation, password hashing
- 🎯 **Developer Experience** - Custom npm scripts, hot reload, error handling

### **Upcoming Features** (v1.1.0)

- [ ] **User Management** - Complete CRUD operations untuk users
- [ ] **Email Templates** - More template variations
- [ ] **File Upload** - Profile picture upload dengan multer
- [ ] **API Documentation** - Swagger/OpenAPI integration
- [ ] **Rate Limiting** - Built-in rate limiting untuk security
- [ ] **Caching** - Redis integration untuk performance
- [ ] **Monitoring** - Health check endpoints
- [ ] **Docker** - Complete containerization

## 📄 **License**

Proyek ini dilisensikan di bawah **brynnnn12 License**.

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
  <img src="https://github.com/Brynnnn12.png" alt="Bryan Kurnia" width="100" height="100" style="border-radius: 50%;">
  
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
- **[JWT.io](https://jwt.io/)** - Implementasi JSON Web Token yang reliable
- **[Nodemailer](https://nodemailer.com/)** - Module terbaik untuk sending emails dari Node.js
- **[MySQL](https://www.mysql.com/)** - Database management system yang robust
- **Open Source Community** - Untuk semua kontribusi dan inspirasi
- **Stack Overflow Community** - Untuk solusi-solusi technical yang membantu
- **GitHub** - Platform amazing untuk code collaboration

## 🌟 **Support & Community**

### **Getting Help**

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/Brynnnn12/express-starter/issues)
- 💡 **Feature Requests**: [GitHub Discussions](https://github.com/Brynnnn12/express-starter/discussions)
- 📖 **Documentation**: [Wiki Pages](https://github.com/Brynnnn12/express-starter/wiki)
- 💬 **Community**: [Discord Server](#) (Coming Soon)

### **Show Your Support**

Jika proyek ini membantu Anda, jangan lupa untuk:

- ⭐ **Star** repository ini
- 🍴 **Fork** untuk experiment sendiri
- 📢 **Share** ke developer lain
- 💝 **Contribute** dengan pull request

---

<div align="center">
  
  **🚀 Happy Coding! 🚀**
  
  *Dibuat dengan ❤️ oleh Bryan Kurnia untuk komunitas developer Indonesia*
  
  [![Made with Love](https://img.shields.io/badge/Made%20with-❤️-red.svg)](https://github.com/Brynnnn12)
  [![Indonesian](https://img.shields.io/badge/Made%20in-🇮🇩%20Indonesia-red.svg)](https://github.com/Brynnnn12)
  
  **Jika repository ini bermanfaat, berikan ⭐ untuk mendukung development selanjutnya!**

</div>
