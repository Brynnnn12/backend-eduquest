/**
 * Template email HTML modern dan responsif
 * @param {Object} options
 * @param {string} options.title - Judul email
 * @param {string} options.heading - Heading utama
 * @param {string} options.message - Pesan utama
 * @param {string} [options.buttonText] - Text untuk button
 * @param {string} [options.buttonUrl] - URL untuk button
 * @param {string} [options.footerText] - Text untuk footer
 * @param {string} [options.companyName] - Nama company
 * @returns {string} HTML template
 */
exports.createEmailTemplate = ({
  title,
  heading,
  message,
  buttonText,
  buttonUrl,
  footerText = "Jika Anda tidak melakukan permintaan ini, abaikan email ini.",
  companyName = "Express Starter App",
}) => {
  return `
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        /* Reset styles */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #2d3748;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0;
            padding: 20px;
            min-height: 100vh;
        }
        
        .email-container {
            max-width: 680px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
            position: relative;
        }
        
        .email-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 6px;
            background: linear-gradient(90deg, #667eea, #764ba2, #f093fb, #f5576c, #4facfe, #00f2fe);
            background-size: 300% 100%;
            animation: gradientShift 6s ease infinite;
        }
        
        @keyframes gradientShift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 50px 40px;
            text-align: center;
            color: white;
            position: relative;
            overflow: hidden;
        }
        
        .header::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
            animation: float 8s ease-in-out infinite;
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        .header h1 {
            font-size: 32px;
            font-weight: 800;
            margin-bottom: 15px;
            text-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            position: relative;
            z-index: 1;
            letter-spacing: -0.5px;
        }
        
        .header .company-name {
            font-size: 16px;
            opacity: 0.95;
            font-weight: 500;
            position: relative;
            z-index: 1;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .content {
            padding: 50px 40px;
            background-color: #ffffff;
            position: relative;
        }
        
        .content h2 {
            font-size: 28px;
            color: #1a202c;
            margin-bottom: 25px;
            font-weight: 700;
            text-align: center;
        }
        
        .message {
            font-size: 18px;
            color: #4a5568;
            margin-bottom: 35px;
            line-height: 1.8;
            text-align: center;
        }
        
        .message p {
            margin-bottom: 15px;
        }
        
        .message strong {
            color: #2d3748;
            font-weight: 600;
        }
        
        .button-container {
            text-align: center;
            margin: 45px 0;
            position: relative;
        }
        
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-decoration: none;
            padding: 18px 40px;
            border-radius: 50px;
            font-weight: 700;
            font-size: 18px;
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            position: relative;
            overflow: hidden;
        }
        
        .cta-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: left 0.5s;
        }
        
        .cta-button:hover::before {
            left: 100%;
        }
        
        .cta-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 40px rgba(102, 126, 234, 0.5);
            background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
        }
        
        .divider {
            height: 2px;
            background: linear-gradient(90deg, transparent, #e2e8f0, transparent);
            margin: 40px 0;
            position: relative;
        }
        
        .divider::after {
            content: '✦';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            color: #cbd5e0;
            padding: 0 15px;
            font-size: 14px;
        }
        
        .info-box {
            background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
            border-left: 5px solid #4299e1;
            padding: 25px;
            margin: 25px 0;
            border-radius: 10px;
            position: relative;
            box-shadow: 0 5px 15px rgba(66, 153, 225, 0.1);
        }
        
        .info-box::before {
            content: '💡';
            position: absolute;
            top: -10px;
            left: 20px;
            background: white;
            padding: 8px;
            border-radius: 50%;
            box-shadow: 0 3px 10px rgba(0,0,0,0.1);
            font-size: 16px;
        }
        
        .info-box p {
            margin: 0;
            font-size: 16px;
            color: #2d3748;
            font-weight: 500;
            margin-top: 10px;
        }
        
        .feature-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            margin: 30px 0;
        }
        
        .feature-item {
            text-align: center;
            padding: 20px 15px;
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            border-radius: 15px;
            transition: transform 0.3s ease;
        }
        
        .feature-item:hover {
            transform: translateY(-5px);
        }
        
        .feature-icon {
            font-size: 24px;
            margin-bottom: 10px;
            display: block;
        }
        
        .feature-text {
            font-size: 14px;
            color: #4a5568;
            font-weight: 500;
        }
        
        .footer {
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            padding: 40px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
            position: relative;
        }
        
        .footer p {
            font-size: 15px;
            color: #718096;
            margin-bottom: 15px;
            font-weight: 500;
        }
        
        .footer .security-notice {
            background: linear-gradient(135deg, #fff5f5 0%, #fed7d7 100%);
            border: 2px solid #feb2b2;
            color: #c53030;
            padding: 20px;
            border-radius: 15px;
            margin: 25px 0;
            font-size: 14px;
            font-weight: 600;
            position: relative;
            overflow: hidden;
        }
        
        .security-notice::before {
            content: '⚠️';
            position: absolute;
            top: -8px;
            left: 20px;
            background: white;
            padding: 8px;
            border-radius: 50%;
            font-size: 16px;
            box-shadow: 0 3px 10px rgba(0,0,0,0.1);
        }
        
        .social-links {
            margin-top: 30px;
            display: flex;
            justify-content: center;
            gap: 30px;
            flex-wrap: wrap;
        }
        
        .social-links a {
            color: #4a5568;
            text-decoration: none;
            font-size: 14px;
            font-weight: 600;
            padding: 8px 16px;
            border-radius: 20px;
            background: white;
            box-shadow: 0 3px 10px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
        }
        
        .social-links a:hover {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            transform: translateY(-2px);
        }
        
        .copyright {
            margin-top: 30px;
            padding-top: 25px;
            border-top: 2px solid #e2e8f0;
            font-size: 13px;
            color: #a0aec0;
            font-weight: 500;
        }
        
        /* Responsive styles */
        @media screen and (max-width: 600px) {
            body {
                padding: 10px;
            }
            
            .email-container {
                margin: 0;
                border-radius: 15px;
            }
            
            .header, .content, .footer {
                padding: 30px 25px !important;
            }
            
            .header h1 {
                font-size: 26px !important;
            }
            
            .content h2 {
                font-size: 22px !important;
            }
            
            .message {
                font-size: 16px !important;
            }
            
            .cta-button {
                padding: 16px 30px !important;
                font-size: 16px !important;
                width: 100%;
                max-width: 280px;
            }
            
            .feature-grid {
                grid-template-columns: 1fr !important;
            }
            
            .social-links {
                flex-direction: column;
                align-items: center;
                gap: 15px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="header">
            <h1>${heading}</h1>
            <div class="company-name">${companyName}</div>
        </div>
        
        <!-- Content -->
        <div class="content">
            <div class="message">
                ${message}
            </div>
            
            ${
              buttonText && buttonUrl
                ? `
            <div class="button-container">
                <a href="${buttonUrl}" class="cta-button">${buttonText}</a>
            </div>
            `
                : ""
            }
            
            <div class="divider"></div>
            
            <!-- Feature Grid -->
            <div class="feature-grid">
                <div class="feature-item">
                    <span class="feature-icon">🔐</span>
                    <div class="feature-text">Keamanan Tinggi</div>
                </div>
                <div class="feature-item">
                    <span class="feature-icon">⚡</span>
                    <div class="feature-text">Proses Cepat</div>
                </div>
                <div class="feature-item">
                    <span class="feature-icon">🎯</span>
                    <div class="feature-text">Mudah Digunakan</div>
                </div>
            </div>
            
            <div class="info-box">
                <p><strong>Catatan Penting:</strong> Link ini akan kedaluwarsa dalam 1 jam untuk menjaga keamanan akun Anda. Pastikan untuk segera melakukan verifikasi.</p>
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <p>Email ini dikirim secara otomatis dari sistem <strong>${companyName}</strong></p>
            <p>${footerText}</p>
            
            <div class="security-notice">
                <strong>Perhatian Keamanan:</strong> Jangan pernah bagikan link atau informasi dalam email ini kepada siapapun. Tim kami tidak akan pernah meminta password Anda melalui email.
            </div>
            
            <div class="social-links">
                <a href="#">📞 Bantuan</a>
                <a href="#">🔒 Kebijakan Privasi</a>
                <a href="#">📧 Kontak Kami</a>
                <a href="#">❓ FAQ</a>
            </div>
            
            <div class="copyright">
                © ${new Date().getFullYear()} ${companyName}. Hak cipta dilindungi undang-undang.<br>
                Dibuat dengan ❤️ untuk pengalaman pengguna yang terbaik.
            </div>
        </div>
    </div>
</body>
</html>`;
};

/**
 * Template khusus untuk verifikasi email
 */
exports.createVerificationEmailTemplate = ({ userName, verificationUrl }) => {
  return exports.createEmailTemplate({
    title: "Verifikasi Email Anda",
    heading: "Verifikasi Email",
    message: `
      <p>Halo <strong>${userName}</strong>,</p>
      <p>Terima kasih telah mendaftar! Untuk menyelesaikan proses registrasi, silakan verifikasi alamat email Anda dengan mengklik tombol di bawah ini:</p>
    `,
    buttonText: "Verifikasi Email Saya",
    buttonUrl: verificationUrl,
    footerText: "Jika Anda tidak mendaftar untuk akun ini, abaikan email ini.",
  });
};

/**
 * Template khusus untuk reset password
 */
exports.createPasswordResetTemplate = ({ userName, resetUrl }) => {
  return exports.createEmailTemplate({
    title: "Reset Password Anda",
    heading: "Reset Password",
    message: `
      <p>Halo <strong>${userName}</strong>,</p>
      <p>Kami menerima permintaan untuk mereset password akun Anda. Klik tombol di bawah ini untuk membuat password baru:</p>
    `,
    buttonText: "Reset Password Saya",
    buttonUrl: resetUrl,
    footerText:
      "Jika Anda tidak meminta reset password, abaikan email ini dan password Anda tidak akan berubah.",
  });
};

/**
 * Template khusus untuk welcome email
 */
exports.createWelcomeEmailTemplate = ({ userName, dashboardUrl }) => {
  return exports.createEmailTemplate({
    title: "Selamat Datang!",
    heading: "Selamat Datang!",
    message: `
      <p>Halo <strong>${userName}</strong>,</p>
      <p>Selamat datang di Express Starter App! Email Anda telah berhasil diverifikasi dan akun Anda sudah aktif.</p>
      <p>Anda sekarang dapat mulai menggunakan semua fitur yang tersedia.</p>
    `,
    buttonText: "Mulai Sekarang",
    buttonUrl: dashboardUrl || "#",
    footerText:
      "Jika Anda membutuhkan bantuan, jangan ragu untuk menghubungi tim support kami.",
  });
};
