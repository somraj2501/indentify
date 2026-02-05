# _indentify. [🔗](https://indentify-app.vercel.app/)

An AI-powered code formatter that uses Google's Gemini API to detect, clean, and format messy code snippets instantly.

![_indentify](https://img.shields.io/badge/Status-Beta-brightgreen)
![Next.js](https://img.shields.io/badge/Frontend-Next.js%2016-black)
![Tailwind](https://img.shields.io/badge/CSS-Tailwind%204-blue)
![Gemini](https://img.shields.io/badge/AI-Gemini%20Flash-purple)

## 🚀 Features

- **AI-Driven Formatting**: Leverage Google Gemini to intelligently format code regardless of the language.
- **Automatic Language Detection**: Don't know what language the code is? _indentify_ will figure it out for you.
- **Modern UI/UX**: Built with React 19 and Tailwind CSS 4 for a sleek, responsive, and performance-driven experience.
- **Snippet Management**: Save your formatted snippets to history (powered by MongoDB).
- **Dark Mode First**: Designed for developers with a premium, low-strain aesthetic.

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Library**: React 19
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js & Express
- **Database**: MongoDB (via Mongoose)
- **AI Integration**: Google Generative AI (Gemini 2.0 Flash)

---

## 🏃 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB connection string
- Google Gemini API Key (Get it from [Google AI Studio](https://aistudio.google.com/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/somraj2501/indentify.git
   cd indentify
   ```

2. **Setup Backend**
   ```bash
   cd server
   npm install
   ```
   Create a `.env` file in the `server` directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_uri
   GEMINI_API_KEY=your_gemini_api_key
   ALLOWED_ORIGINS=http://localhost:3000
   ```
   Start the server:
   ```bash
   npm run dev
   ```

3. **Setup Frontend**
   ```bash
   cd ../client
   npm install
   ```
   Start the client:
   ```bash
   npm run dev
   ```

---

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

---

Built with ❤️ by [somraj2501](https://github.com/somraj2501)
