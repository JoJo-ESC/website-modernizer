# 🚀 Revamp

**Transform legacy HTML into modern, Tailwind CSS-powered websites using AI.**

Revamp is a full-stack web application that automatically modernizes outdated static HTML websites. Simply paste a URL, and watch as AI converts old-school markup into clean, semantic HTML5 with Tailwind CSS styling—all in real-time.

🔗 **Live Demo:** [revamp.ai](https://website-modernizer-juje.vercel.app/)

---

## ✨ Features

- **AI-Powered Modernization** – Leverages OpenRouter API to transform legacy HTML into modern, semantic code
- **Side-by-Side Comparison** – View original and modernized versions simultaneously
- **Tailwind CSS Integration** – Automatic injection of Tailwind CDN for instant styling
- **Rate Limiting** – Custom rate limiter (40 req/min) to prevent abuse
- **Asset Proxying** – Handles cross-origin assets to bypass CORS restrictions
- **Copy to Clipboard** – One-click code copying for both original and modernized HTML
- **Responsive Design** – Built with mobile-first Tailwind CSS

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **AI:** OpenRouter API (GPT-4o-mini)
- **Deployment:** Vercel
- **Testing:** Vitest

---

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ and npm
- OpenRouter API key ([get one here](https://openrouter.ai/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/JoJo-ESC/website-modernizer.git
   cd website-modernizer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```bash
   OPENAI_API_KEY=your_openrouter_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📖 How It Works

1. **Input a URL** – User enters a static HTML website URL
2. **Scrape** – Server fetches the raw HTML using native `fetch`
3. **Modernize** – AI processes the HTML, converting it to semantic HTML5 + Tailwind CSS
4. **Render** – Both original and modernized versions are displayed side-by-side in iframes
5. **Copy Code** – Users can copy either version with one click

### Limitations

- **Works best with static HTML sites** – JavaScript-heavy SPAs (React, Vue, Angular) won't render properly since we only fetch source HTML, not the rendered output
- **Asset loading depends on CORS** – Some sites block cross-origin requests

---

## 🧪 Testing

Run the test suite:

```bash
npm test
```

Run integration tests:

```bash
npm run test:integration
```

---

## 📁 Project Structure

```
website-modernizer/
├── app/
│   ├── api/
│   │   ├── modernize/      # AI modernization endpoint
│   │   ├── proxy/          # Asset proxy for CORS bypass
│   │   └── scrape/         # HTML fetching endpoint
│   ├── components/         # React components
│   ├── lib/                # Utilities (rate limiting, validation)
│   └── [pages]/            # Next.js pages
├── public/                 # Static assets
└── scripts/                # Utility scripts
```

---

## 🚀 Deployment

This project is deployed on [Vercel](https://vercel.com).

### Environment Variables (Production)

Make sure to set `OPENAI_API_KEY` in your Vercel project settings:

1. Go to **Project Settings** → **Environment Variables**
2. Add `OPENAI_API_KEY` with your OpenRouter API key
3. Redeploy

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

**Josiah Riggins**  
🔗 [GitHub](https://github.com/JoJo-ESC)

---

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- AI powered by [OpenRouter](https://openrouter.ai/)
- Deployed on [Vercel](https://vercel.com/)
