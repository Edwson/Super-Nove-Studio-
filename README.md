# Super Nove Studio 🎧

> **A Professional Web-Based DJ Controller with AI Integration**

Super Nove Studio is a sophisticated, browser-based DJ mixing platform that brings professional-grade audio processing and intuitive controls to the web. Built with cutting-edge Web Audio API technology and enhanced with AI assistance, it delivers studio-quality mixing capabilities accessible from any modern browser.

## ✨ Features

### 🎛️ Professional DJ Controls
- **Dual Deck System** - Independent audio decks with professional jog wheel controls
- **Advanced Tempo Control** - Precise BPM matching with ±20% tempo range
- **Real-time Waveforms** - Visual audio representation with playhead tracking
- **Hot Cue System** - 8 configurable cue points per deck for instant access

### 🔊 Studio-Quality Audio Engine
- **Web Audio API Integration** - Professional-grade audio processing
- **3-Band EQ** - High, mid, and low frequency control per deck
- **Dynamic Compression** - Master bus compression for polished output
- **Real-time Effects** - Reverb, delay, filters, flanger, and bitcrusher
- **Crossfader Curves** - Linear, constant power, and sharp cut options

### 🤖 AI-Powered Assistant
- **Gemini Integration** - Advanced AI for mixing guidance and track analysis
- **Auto-Mix Generation** - Intelligent automatic mixing sequences
- **Track Suggestions** - AI-powered track recommendations based on current mix
- **Real-time Advice** - Context-aware mixing tips and techniques

### 🌍 Advanced Features
- **Multi-language Support** - English, Japanese, and Traditional Chinese
- **Session Recording** - Full mix recording with export capabilities
- **Library Management** - Intelligent track organization with metadata
- **Keyboard Shortcuts** - Professional workflow acceleration
- **Responsive Design** - Optimized for desktop, tablet, and mobile

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- PHP 7.4+ (for AI integration)
- Web server (Apache, Nginx, or local development server)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/super-nove-studio.git
   cd super-nove-studio
   ```

2. **Configure AI Integration** (Optional)
   ```bash
   # Edit gemini-api.php
   const GEMINI_API_KEY = 'your_gemini_api_key_here';
   ```

3. **Start the application**
   ```bash
   # For local development
   php -S localhost:8000

   # Or serve with your preferred web server
   ```

4. **Open in browser**
   ```
   http://localhost:8000
   ```

### First Mix

1. **Import Audio Files**
   - Click "Import" in the Library section
   - Select audio files (MP3, WAV, OGG supported)
   - Wait for automatic BPM and key analysis

2. **Load Tracks**
   - Click "Browse" to open the library
   - Use "A" and "B" buttons to load tracks to respective decks

3. **Start Mixing**
   - Use PLAY/PAUSE buttons or keyboard shortcuts (W/P)
   - Adjust tempo faders to match BPMs
   - Use crossfader to blend between tracks

## 🎯 Usage Guide

### Keyboard Shortcuts

| Key | Action | Description |
|-----|--------|-------------|
| `W` / `P` | Play/Pause | Toggle playback for Deck A/B |
| `Q` / `O` | Cue | Set cue point for Deck A/B |
| `E` / `[` | Sync | Beat sync for Deck A/B |
| `1-4` / `7-0` | Hot Cues | Trigger hot cues 1-4 for Deck A/B |
| `R` | Record | Toggle session recording |
| `L` | Library | Open music library |
| `I` | Import | Import audio files |

### Audio Controls

#### EQ Controls
- **HIGH**: ±12dB high-frequency control (10kHz+)
- **MID**: ±12dB mid-frequency control (1kHz)
- **LOW**: ±12dB low-frequency control (300Hz-)

#### Transport Controls
- **CUE**: Set/jump to cue point
- **PLAY**: Start/stop track playback
- **SYNC**: Automatically match BPM to other deck

#### Effects Chain
1. **Reverb**: Spatial depth and ambience
2. **Delay**: Echo effects with feedback control
3. **Filter**: High/low pass filtering
4. **Flanger**: Modulated delay for sweeping effects
5. **Bitcrusher**: Digital distortion and lo-fi effects

### AI Assistant

The integrated AI assistant provides:
- **Mixing Advice**: Real-time suggestions based on current tracks
- **Track Analysis**: Automatic BPM, key, and compatibility analysis
- **Auto-Mix Planning**: Generated mixing sequences for multiple tracks
- **Creative Suggestions**: New track generation and style recommendations

## 🛠️ Technical Architecture

### Frontend Stack
- **JavaScript ES6+**: Modern JavaScript with Web Audio API
- **HTML5 Canvas**: Real-time waveform visualization
- **CSS3**: Advanced styling with glassmorphism design
- **Web Audio API**: Professional audio processing

### Backend Integration
- **PHP**: AI integration and API endpoints
- **Gemini AI**: Advanced language model for DJ assistance
- **JSON**: Session and library data management

### Audio Processing Chain
```
Audio Input → Decoder → Buffer → EQ → Effects → Gain → Crossfader → Master → Output
```

### File Structure
```
super-nove-studio/
├── index.html              # Main application interface
├── script.js               # Core application logic
├── style.css               # Styling and responsive design
├── gemini-api.php          # AI integration backend
├── assets/                 # Static assets
│   ├── icons/             # UI icons and graphics
│   └── samples/           # Demo audio samples
└── docs/                  # Documentation files
```

## 🎨 Customization

### Themes
The application supports light and dark themes with automatic detection:
```javascript
// Toggle theme programmatically
remixStudio.toggleTheme();

// Or set specific theme
document.body.setAttribute('data-theme', 'dark');
```

### Languages
Add new languages by extending the translations object:
```javascript
translations['es'] = {
  appName: "Super Nove Studio",
  // ... other translations
};
```

### Audio Settings
Customize audio engine parameters:
```javascript
const audioOptions = {
  latencyHint: 'interactive',  // 'interactive', 'balanced', 'playback'
  sampleRate: 44100,           // Audio sample rate
  bufferSize: 256              // Audio buffer size
};
```

## 🔧 Development

### Prerequisites for Development
- Node.js 16+ (for build tools)
- Git for version control
- Code editor (VS Code recommended)

### Development Setup
```bash
# Install development dependencies
npm install

# Start development server with hot reload
npm run dev

# Run linting
npm run lint

# Build for production
npm run build
```

### Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📱 Browser Support

| Browser | Version | Support Level |
|---------|---------|---------------|
| Chrome | 66+ | ✅ Full Support |
| Firefox | 60+ | ✅ Full Support |
| Safari | 11.1+ | ✅ Full Support |
| Edge | 79+ | ✅ Full Support |
| Opera | 53+ | ✅ Full Support |

## 🎵 Audio Format Support

| Format | Decode | Encode | Notes |
|--------|--------|--------|-------|
| MP3 | ✅ | ❌ | Most common format |
| WAV | ✅ | ✅ | Uncompressed audio |
| OGG | ✅ | ❌ | Open source format |
| AAC | ✅ | ❌ | High-quality compression |
| FLAC | ✅ | ❌ | Lossless compression |

## 🚨 Troubleshooting

### Common Issues

**Audio Not Playing**
- Ensure browser supports Web Audio API
- Check if audio files are corrupted
- Verify browser permissions for audio

**High CPU Usage**
- Reduce audio buffer size in settings
- Close unnecessary browser tabs
- Use lower quality audio files for testing

**AI Assistant Not Responding**
- Check Gemini API key configuration
- Verify internet connection
- Check browser console for error messages

**Session Recording Failed**
- Ensure browser supports MediaRecorder API
- Check available disk space
- Verify microphone permissions if needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Web Audio API** - Modern web audio processing
- **Gemini AI** - Advanced AI assistance
- **Tabler Icons** - Beautiful icon set
- **Inter & JetBrains Mono** - Typography
- **Claude AI** - Development assistance

## 📞 Support

- **Email**: [edwsonsaas@gmail.com](mailto:edwsonsaas@gmail.com)

## 🔮 Roadmap

### Version 1.1 (Q3 2025)
- [ ] MIDI controller support
- [ ] Cloud sync for sessions
- [ ] Advanced loop controls
- [ ] Stem separation

### Version 1.2 (Q4 2025)
- [ ] Live streaming integration
- [ ] Collaborative mixing
- [ ] Advanced AI beat matching
- [ ] Plugin architecture

---

<div align="center">

**Built with ❤️ by [Ed Chen](https://www.edwson.com)**

[Website](https://www.edwson.com) • [LinkedIn](https://www.linkedin.com/in/ed-chen-saas/) • [GitHub](https://github.com/Edwson)

</div>
