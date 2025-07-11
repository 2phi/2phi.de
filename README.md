# 2phi.de

A modern website for the 2phi research group showcasing snow and avalanche research.

## 🚀 Getting Started

### Prerequisites
- Node.js (for development server - required for ES6 modules)
- LFTP (for deployment)

### Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The development server will open at `http://localhost:3000`

**Note**: A development server is required because this website uses ES6 modules, which cannot be loaded directly from the filesystem due to browser CORS restrictions.

## 🚢 Deployment

### Setup
```bash
# Copy LFTP configuration template
cp lftp.config.example lftp.config
# Edit lftp.config with your FTP credentials
```

### Deploy
```bash
npm run deploy
```

## 📁 Project Structure

```
2phi.de/
├── public/                    # Web files
│   ├── css/                   # Modularized stylesheets
│   ├── js/                    # ES6 modules
│   ├── assets/                # Images and logos
│   └── index.html             # Main page
├── deploy.sh                  # Deployment script
├── lftp.config.example        # FTP config template
└── package.json               # Node.js configuration
```

## 📄 License

MIT License

## 👥 Authors

- Dr.-Ing. Philipp Rosendahl - Center of Snow and Avalanche Research, TU Darmstadt
- Prof. Dr.-Ing. Philipp Weißgraeber - Chair of Lightweight Design, University of Rostock

## 🔗 Links

- [Center of Snow and Avalanche Research](https://www.ismd.tu-darmstadt.de/forschung_ismd/gruppen/center_of_snow_and_avalanche_research/csar_ismd.en.jsp)
- [Chair of Lightweight Design](https://www.cld.uni-rostock.de)
- [WEAC on GitHub](https://github.com/2phi/weac)
- [WEAC on PyPI](https://pypi.org/project/weac/)
- [Oracle Web App](https://snoworacle.streamlit.app) 