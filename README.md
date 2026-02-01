# 🌍 LUMINARIS - Interactive Legends Database

An immersive 3D web application for exploring historical legends from around the world through an interactive globe interface.

![LUMINARIS](https://img.shields.io/badge/Three.js-Interactive-5B4FFF)
![React](https://img.shields.io/badge/React-18.x-00F0FF)
![License](https://img.shields.io/badge/License-MIT-FF3E9D)

## ✨ Features

- 🌐 **Interactive 3D Globe** - Explore 100+ historical legends on a rotating Earth
- 🎨 **COSMIC EXPLORER Design** - Premium dark theme with vibrant category colors
- 🔍 **Smart Search** - Auto-navigate to legends as you type
- 🎯 **Category Filters** - Filter by Politics, Science, Arts, and more
- 📊 **Multiple Views** - Globe, Knowledge Graph, Galaxy, and Timeline modes
- 💫 **Smooth Animations** - GPU-accelerated transitions and effects
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- ♿ **Accessible** - WCAG AA compliant with keyboard navigation

## 🎨 Category Colors

Each category is color-coded for easy identification:

- **Politics & Leadership**: `#00D9FF` (Bright Cyan)
- **Science & Mathematics**: `#00FF88` (Electric Green)
- **Philosophy & Education**: `#A855F7` (Purple)
- **Arts & Literature**: `#FFD700` (Gold)
- **Medicine**: `#4ADE80` (Light Green)
- **Religion & Spirituality**: `#FB923C` (Warm Orange)
- **Architecture & Engineering**: `#818CF8` (Indigo)
- **Exploration & Geography**: `#22D3EE` (Aqua)
- **Warfare & Strategy**: `#FF3E9D` (Hot Pink)

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/luminaris.git

# Navigate to project directory
cd luminaris

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
H2/
├── src/
│   ├── components/
│   │   ├── Experience.jsx       # 3D scene setup
│   │   ├── Globe.jsx            # Interactive globe component
│   │   ├── KnowledgeGraph.jsx   # Knowledge graph visualization
│   │   ├── PersonMarker.jsx     # 3D legend markers
│   │   └── UI.jsx               # UI controls and info cards
│   ├── data/
│   │   ├── legends.js           # Legend data and colors
│   │   └── historicalLegends.json # 100+ historical figures
│   ├── utils/
│   │   ├── fibonacciSphere.js   # Even distribution algorithm
│   │   └── geo.js               # Geographic calculations
│   ├── App.jsx                  # Main application
│   ├── index.css                # COSMIC EXPLORER design system
│   └── main.jsx                 # Entry point
├── public/                      # Static assets
├── package.json
└── vite.config.js
```

## 🎮 Usage

### Search & Navigate

1. **Type in the search bar** - As you type, the globe automatically navigates to matching legends
2. **Click on glowing markers** - View detailed information about each legend
3. **Use category filters** - Filter legends by field of achievement
4. **Switch views** - Toggle between Globe, Graph, Galaxy, and Timeline modes

### Keyboard Shortcuts

- `Escape` - Close info card
- `Arrow Keys` - Rotate globe
- `+/-` - Zoom in/out

### Mouse Controls

- **Click & Drag** - Rotate the globe
- **Scroll** - Zoom in/out
- **Click Marker** - Select legend
- **Hover Marker** - Preview name and category

## 🎨 Design System

LUMINARIS uses the **COSMIC EXPLORER** design system:

- **Backgrounds**: Deep space gradients (#0A0E27 → #1A2341)
- **Accents**: Nebula Purple, Cosmic Cyan, Stellar Pink
- **Typography**: Orbitron (display) + Inter (body)
- **Effects**: Glassmorphism, multi-layer glows, smooth animations

## 🛠️ Technology Stack

- **Frontend Framework**: React 18
- **3D Engine**: Three.js + React Three Fiber
- **Build Tool**: Vite
- **Styling**: CSS3 with custom properties
- **APIs**: Wikipedia API for images
- **Animation**: GSAP + CSS transitions

## 📊 Data Source

Historical legends data includes:
- 100+ influential figures from history
- Accurate geographic coordinates
- Wikipedia integration for images
- Categories spanning 9 fields
- Era information (Ancient to Modern)

## 🌐 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Historical data sourced from Wikipedia
- Three.js community for 3D web graphics
- React Three Fiber for React integration
- All the historical legends who inspire us


## 🗺️ Roadmap

- [ ] Add more legends (target: 200+)
- [ ] Implement timeline slider functionality
- [ ] Add detailed biography pages
- [ ] Multi-language support
- [ ] Voice search
- [ ] AR/VR mode
- [ ] Educational quizzes
- [ ] Share functionality

---

**Built with ❤️ using React, Three.js, and the COSMIC EXPLORER design system**
