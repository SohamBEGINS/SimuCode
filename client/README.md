<div align="center">
  <h1>🚀 SimuCode</h1>
  <p><strong>Simulate Real Coding Interviews</strong></p>
  <p>Practice, Learn, and Succeed in Tech Interviews by simulating real-time pressure environments.</p>
  
  [![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
  [![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
  [![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.1.10-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)](https://clerk.com/)
</div>

---

## ✨ Features

### 🎯 **Multi-Stage Interview Process**
- **Stage 1**: Voice-Based Comprehension - Listen and type questions accurately
- **Stage 2**: Clarification Q&A - Ask clarifying questions based on difficulty
- **Stage 3**: Approach Explanation - Explain your algorithmic approach
- **Stage 4**: Code Implementation - Write and test your solution
- **Stage 5**: Summary & Feedback - Get detailed performance analytics

### 🎚️ **Difficulty Levels**
- **Easy** (80%+ threshold): More hints, extended time, visual aids
- **Medium** (70%+ threshold): Standard time, limited hints
- **Hard** (60%+ threshold): Strict time, no hints, advanced algorithms

### 🛡️ **Authentication**
- Secure user authentication with Clerk
- Protected dashboard and interview sessions
- Persistent user progress tracking

### 🎨 **Modern UI/UX**
- Stunning animated backgrounds with Three.js beams
- Terminal-style interface for authentic coding experience
- Responsive design for all devices
- Smooth animations with Framer Motion

---

## 🏗️ Architecture

```
client/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Shadcn/ui components
│   │   ├── BeamBackground.jsx
│   │   ├── DashboardNavbar.jsx
│   │   ├── DifficultySelection.jsx
│   │   ├── TerminalShell.jsx
│   │   └── ...
│   ├── Pages/              # Route components
│   │   ├── Dashboard.jsx
│   │   ├── Home.jsx
│   │   ├── SignInPage.jsx
│   │   └── SignUpPage.jsx
│   ├── styles/             # Custom styled components
│   │   ├── CardSwap.jsx
│   │   ├── RotatingText.jsx
│   │   └── ScrollReveal.jsx
│   ├── backgrounds/        # 3D background effects
│   └── lib/               # Utilities
└── public/
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Clerk account for authentication

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/simulated-coding-interview.git
   cd simulated-coding-interview/client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Add your Clerk publishable key:
   ```env
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

---

## 🛠️ Tech Stack

### **Frontend**
- **React 19** - Latest React with concurrent features
- **Vite** - Lightning fast build tool
- **TailwindCSS 4** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **React Router DOM** - Client-side routing

### **Authentication**
- **Clerk** - Complete authentication solution

### **3D Graphics**
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Useful helpers for R3F

### **Animation & Effects**
- **GSAP** - High-performance animations
- **ScrollTrigger** - Scroll-based animations

### **UI Components**
- **Radix UI** - Accessible component primitives
- **Shadcn/ui** - Beautiful component library
- **Lucide React** - Icon library

---

## 📁 Project Structure

### **Key Components**

#### 🏠 **Home Page**
- Hero section with animated typewriter text
- Scroll-triggered reveal animations
- Interactive card swap showcasing interview stages

#### 🎛️ **Dashboard**
- Protected route with authentication
- Difficulty selection interface
- Progress tracking across stages
- Terminal-style UI for authentic coding experience

#### 🎨 **UI Components**
- **TerminalShell**: Terminal-style container for interview stages
- **DifficultySelection**: Interactive difficulty picker
- **BeamBackground**: Animated 3D background effects
- **CardSwap**: 3D card stack animations

---

## 🎯 Roadmap

### **Phase 1** ✅
- [x] Authentication system
- [x] Landing page design
- [x] Dashboard structure
- [x] Difficulty selection

### **Phase 2** 🚧 *In Progress*
- [ ] Backend API integration
- [ ] MongoDB question database
- [ ] Voice-based question delivery
- [ ] Text similarity scoring

### **Phase 3** 📋 *Planned*
- [ ] AI-powered Q&A system
- [ ] Code editor integration
- [ ] Test case execution
- [ ] Performance analytics

### **Phase 4** 🔮 *Future*
- [ ] Video interview simulation
- [ ] Peer-to-peer mock interviews
- [ ] Company-specific question sets
- [ ] Interview scheduling system

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

---

## 📝 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

---

## 🐛 Known Issues

- Mobile optimization for 3D effects in progress
- Voice recognition feature pending backend integration
- Code editor component not yet implemented

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **React Team** - For the amazing React 19 features
- **Vercel** - For Vite and deployment platform
- **Clerk** - For seamless authentication
- **Shadcn** - For beautiful UI components
- **Three.js Community** - For 3D graphics inspiration

---

<div align="center">
  <p>Made with ❤️ by the SimuCode Team</p>
  <p>
    <a href="#top">⬆️ Back to Top</a>
  </p>
</div>