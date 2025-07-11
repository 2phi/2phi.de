# 2phi Website

A modern, modularized website for the 2phi research group showcasing snow and avalanche research.

## 🏗️ Project Structure

```
2phi-website/
├── public/                    # Public web files
│   ├── css/                   # Modularized CSS files
│   │   ├── base.css          # Base styles and layout
│   │   ├── components.css    # Component-specific styles
│   │   ├── animations.css    # Animations and tooltips
│   │   └── responsive.css    # Media queries and responsive design
│   ├── js/                   # Modularized JavaScript files
│   │   ├── TooltipManager.js # Tooltip functionality
│   │   └── main.js          # Application initialization
│   ├── assets/              # Static assets
│   │   ├── logos/           # Logo images
│   │   └── portraits/       # Author portraits
│   ├── index.html                  # Clean modular HTML (main file)
│   └── index-monolithic-backup.html # Original monolithic HTML (backup)
├── lftp.config             # LFTP configuration with credentials (gitignored)
├── lftp.config.example     # LFTP configuration template (no credentials)
├── deploy.sh               # Automated LFTP deployment script
├── package.json           # Node.js project configuration
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (for development server)
- LFTP (for deployment)

### Installation
```bash
# Install dependencies
npm install

# Setup LFTP configuration
cp lftp.config.example lftp.config
# Edit lftp.config with your actual FTP credentials
```

### Development
```bash
# Start development server (modular architecture)
npm run dev

# Or start with original monolithic version (backup)
npm run dev-original

# Or manually
npm start
```

The development server will open at `http://localhost:3000`

## 📝 Key Improvements

### ✅ LFTP Configuration Optimized
- Purpose-built `lftp.config` format for LFTP compatibility
- Added `LFTP_PASSWORD` environment variable for security
- Included connection timeout and retry settings
- Added transfer optimization parameters

### ✅ Modularized CSS Architecture
- **`base.css`**: Core layout and typography
- **`components.css`**: Author cards, logos, and UI components  
- **`animations.css`**: Animations, transitions, and tooltips
- **`responsive.css`**: Media queries for mobile responsiveness

### ✅ Modularized JavaScript
- **`TooltipManager.js`**: Sophisticated tooltip functionality as ES6 module
- **`main.js`**: Application initialization and orchestration
- Clean separation of concerns and reusable components

### ✅ Enhanced HTML Structure
- Clean, semantic HTML without inline styles
- External CSS and JavaScript references
- Maintained all original functionality
- Improved maintainability and readability

## 🔧 LFTP Configuration

The project includes optimized LFTP configuration:

### Basic Usage
```bash
# Setup configuration
cp lftp.config.example lftp.config
# Edit lftp.config with your actual credentials

# Deploy using npm script
npm run deploy

# Or manually with LFTP
source lftp.config
export LFTP_PASSWORD="$FTP_PASSWORD"
lftp --env-password -u $FTP_USERNAME $FTP_HOST
```

### Configuration Files
- `lftp.config` - Your actual LFTP configuration with credentials (gitignored)
- `lftp.config.example` - Template for LFTP settings (no credentials)

## 🎨 Features

- **Responsive Design**: Optimized for all screen sizes
- **Interactive Tooltips**: Hover effects with contextual information
- **Modern CSS**: Flexbox layout with smooth animations
- **Clean Architecture**: Modular, maintainable code structure
- **Performance Optimized**: Efficient loading and rendering
- **Accessibility**: Semantic HTML and proper ARIA attributes

## 📱 Browser Support

- Chrome/Edge 88+
- Firefox 78+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🚢 Deployment

```bash
# Build and validate
npm run build

# Deploy via LFTP (customize deploy script)
npm run deploy
```

## 🤝 Development Workflow

1. **Development**: Use `npm run dev` for live reloading
2. **Testing**: Test your modular website
3. **Building**: Run `npm run build` to validate
4. **Deployment**: Use LFTP with optimized configuration

## 📄 License

MIT License - see LICENSE file for details

## 👥 Authors

- Dr.-Ing. Philipp Rosendahl - Center of Snow and Avalanche Research, TU Darmstadt
- Prof. Dr.-Ing. Philipp Weißgraeber - Chair of Lightweight Design, University of Rostock

## 🔗 Links

- [Center of Snow and Avalanche Research](https://www.ismd.tu-darmstadt.de/forschung_ismd/gruppen/center_of_snow_and_avalanche_research/csar_ismd.en.jsp)
- [Chair of Lightweight Design](https://www.cld.uni-rostock.de)
- [WEAC on GitHub](https://github.com/2phi/weac)
- [WEAC on PyPI](https://pypi.org/project/weac/)
- [Oracle Web App](https://snoworacle.streamlit.app) 