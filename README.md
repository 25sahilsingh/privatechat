# PrivateChat

<p align="center">
  <strong>A modern, secure chat application built for professional communication using Socket.IO.</strong>
</p>

---

## 🚀 About the Project

In professional meetings or work environments, sharing a personal phone number is often unnecessary or uncomfortable.  
PrivateChat solves this problem by enabling real-time communication using email-based authentication instead of phone numbers.

With company-issued emails becoming standard, PrivateChat allows users to connect securely using Google or GitHub OAuth.

---

## ✨ Key Highlights

- No phone number required
- Email-based authentication (Google & GitHub)
- Real-time messaging
- Secure and scalable architecture
- Built for professional and enterprise use

---

## 🛠️ Tech Stack

- Next.js – Frontend & backend framework
- NextAuth.js – Authentication (OAuth handled internally)
- MongoDB – Database
- Socket.IO – Real-time communication
- Tailwind CSS – Styling

---

## ⚙️ Quick Setup for Contributors

### Clone the Repository

```bash
git clone https://github.com/25sahilsingh/privatechat.git
cd privatechat
```

---

### Environment Configuration

Create a `.env` file in the root directory:

```bash
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-random-secret-string"

GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

GITHUB_ID="your-github-client-id"
GITHUB_SECRET="your-github-client-secret"

MONGODB_URL="your-mongodb-connection-string"
```

---

## ▶️ Running the Project

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

This will start:

- Next.js server
- Socket.IO service
- Authentication providers

---

## ✅ Current Features

- Real-time chat
- Message persistence
- Google and GitHub login
- Online user status

---

## 🔮 Future Roadmap

- AI-powered unread message summary
- File sharing
- Video calling (WebRTC)
- Enhanced security and encryption

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a new branch
3. Commit your changes
4. Open a pull request

---

## 📄 License

This project is licensed under the MIT License.
