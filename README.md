# Voila - A Singular Intelligence

<div align="center">

![Voila](https://img.shields.io/badge/Status-Production_Ready-brightgreen) ![Next.js](https://img.shields.io/badge/Next_js-16-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?logo=vercel)

> A brutally honest AI chat interface with supernatural aesthetics and condescending personality.

**[🌌 Experience Voila →](https://voila.farhansadiq.dev/)**

</div>

---

## 🎯 Project Overview

Voila is a sophisticated AI chat application featuring a condescending AI personality powered by cutting-edge technology. Built with supernatural aesthetics and premium UX, it demonstrates advanced full-stack development with modern AI integration.

### ✨ Key Features

- **🤖 Ultra-Fast AI**: Powered by Groq (Llama 3.3 70B) - 10x faster than traditional AI
- **🔍 Intelligent Search**: AI-powered search detection with Tavily real-time data
- **📝 Markdown Support**: Beautiful formatted responses with code highlighting
- **🔒 DevTool Protection**: Security measures to prevent code inspection
- **📱 Mobile Optimized**: Sticky input box, auto-scroll, and responsive design
- **🎨 Premium UI/UX**: Mystical dark theme with supernatural animations
- **⚡ Performance**: Server-side rendering with Next.js 16 + Turbopack
- **🔐 Secure Storage**: Client-side API key management

---

## 🛠 Technical Stack

### Frontend

- **Next.js 16** - React framework with App Router + Turbopack
- **TypeScript 5** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **React Markdown** - Rich text rendering with syntax highlighting

### Backend & AI

- **Groq SDK** - Ultra-fast AI inference (30 RPM, 14,400 requests/day)
- **Llama 3.3 70B** - Advanced open-source language model
- **Tavily Search API** - Real-time web search for current data
- **Intelligent Search Detection** - AI determines when to search
- **Vercel Edge Functions** - Serverless deployment

### Security & UX

- **disable-devtool** - DevTool detection and blocking
- **react-secure-storage** - Encrypted local storage for API keys
- **Auto-scroll** - Smooth scrolling to latest messages
- **Auto-focus** - Input box automatically focused

---

## 🚀 Getting Started

### Prerequisites

```bash
Node.js 18+ and pnpm
```

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/voila.git

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
```

### Environment Variables

```bash
# Required
GROQ_API_KEY=your_groq_api_key_here

# Optional
TAVILY_API_KEY=your_tavily_api_key_here
NEXT_PUBLIC_GROQ_API_KEY=fallback_groq_key
```

### Development

```bash
# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

---

## 🎨 Design Philosophy

### Supernatural Aesthetic

- **Mystical Color Palette**: Deep blues and purples with ethereal gradients
- **Animated Effects**: Floating particles, glowing elements, consciousness pulses
- **Premium Feel**: Glassmorphism effects and sophisticated animations
- **Responsive Design**: Seamless experience across all device sizes

### User Experience

- **Intuitive Interface**: Clean design with clear visual hierarchy
- **Performance**: Optimized for fast loading and smooth interactions
- **Mobile-First**: Sticky input, auto-scroll, perfect mobile experience
- **Accessibility**: WCAG compliant with proper ARIA labels

---

## 🤖 AI Personality

Voila features a **brutally condescending AI** that:

- Insults users while providing accurate information
- Keeps responses concise unless complexity demands otherwise
- Maintains a tone of superiority and contempt
- Provides helpful answers despite the attitude
- Uses markdown for beautiful formatted responses

---

## 🔧 Technical Highlights

### Intelligent Search Detection

```typescript
// AI determines when queries need current data
const shouldSearch = await needsSearch(query, apiKey);
if (shouldSearch) {
  const searchResults = await searchWeb(query);
  // Integrate search results into AI context
}
```

### DevTool Protection

```typescript
// Blocks developer tools in production
import('disable-devtool').then((module) => {
  module.default({
    ondevtoolopen: () => window.location.href = '/warning',
    disableMenu: true,
    clearLog: true,
  });
});
```

### Mobile Optimization

- **Sticky Input**: Always visible at bottom on mobile
- **Auto-scroll**: Smooth scroll to latest messages
- **Auto-focus**: Input automatically focused
- **Responsive Layout**: Perfect on all screen sizes

---

## 📊 Performance Metrics

- **AI Response Time**: ~1.5 seconds (Groq)
- **Bundle Size**: Optimized for fast loading
- **Lighthouse Score**: 95+ across all metrics
- **Mobile Performance**: Optimized for 3G networks
- **SEO Score**: 100/100 with comprehensive metadata

---

## 🚀 Deployment

- **Platform**: Vercel Edge Network
- **Region**: Global CDN for optimal performance
- **CI/CD**: Automatic deployments on push
- **Domain**: Custom domain with SSL

---

## 🔮 Future Enhancements

- **Voice Input**: Speech-to-text for hands-free interaction
- **Conversation History**: Save and resume conversations
- **Custom Personalities**: Multiple AI personality options
- **Multi-language Support**: Internationalization
- **PWA Features**: Offline capabilities and app installation

---

## 🎯 Development Approach

This project was developed using **AI-assisted vibe coding** - a modern development approach that leverages AI for rapid prototyping while maintaining human oversight for design decisions and quality assurance.

### Philosophy

- **Transparent**: Honest about AI-assisted development
- **Rapid Iteration**: Quick cycles enabled by AI collaboration
- **Aesthetic-Driven**: UI/UX decisions based on visual impact
- **Performance-Focused**: Continuous optimization for production

---

## 📝 License

© 2025 Farhan Sadiq. All rights reserved.

---

<div align="center">

**Built with ❤️ using AI-assisted vibe coding**

*Where artificial intelligence meets human creativity*

</div>
