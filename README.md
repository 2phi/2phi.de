# 2phi.de

A modern website for the 2phi research group showcasing snow and avalanche research.

## 🚀 Getting Started

### Prerequisites
- LFTP (for deployment)

### Development
```bash
# Open the website directly in your browser
open public/index.html
```

The website is a static HTML/CSS site with minimal JavaScript for mobile scroll highlighting on touch devices.

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