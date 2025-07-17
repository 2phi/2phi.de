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

The website is a static HTML/CSS site with minimal JavaScript for mobile touch highlighting and caption display on touch devices.

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
│   ├── assets/                # Images, logos, favicons
│   │   └── favicon/           # Favicon images and .htaccess
│   ├── site.webmanifest       # Web app manifest (at root for best compatibility)
│   └── index.html             # Main page
├── favicon/                   # Source and export files for favicons
├── deploy.sh                  # Deployment script
├── lftp.config.example        # FTP config template
└── package.json               # Node.js configuration
```

## 📄 License

MIT License

## 🖼️ Favicon & Manifest Management

- Favicon assets are located in `public/assets/favicon/` and `favicon/` (for source and export files).
- The main favicon files used by the website are:
  - `favicon.ico`, `favicon.svg`, `favicon-96x96.png`, `apple-touch-icon.png` (in `public/assets/favicon/`)
  - The web app manifest is at the root as `/site.webmanifest` and referenced in `index.html` as:
    ```html
    <link rel="manifest" href="/site.webmanifest" />
    ```
- If you update or add favicon files, make sure to commit, push, and redeploy.

### Apache/.htaccess Fix
If you encounter 403 Forbidden errors for favicon files, ensure that:
- All files and directories in `public/assets/favicon/` are readable (permissions 755 for directories, 644 for files).
- There is a `.htaccess` file in `public/assets/favicon/` with the following content:
  ```
  <IfModule mod_authz_core.c>
    Require all granted
  </IfModule>
  <IfModule !mod_authz_core.c>
    Order allow,deny
    Allow from all
  </IfModule>
  ```
This allows Apache to serve favicon files correctly.

## 👥 Authors

- Dr.-Ing. Philipp Rosendahl - Center of Snow and Avalanche Research, TU Darmstadt
- Prof. Dr.-Ing. Philipp Weißgraeber - Chair of Lightweight Design, University of Rostock

## 🔗 Links

- [Center of Snow and Avalanche Research](https://www.ismd.tu-darmstadt.de/forschung_ismd/gruppen/center_of_snow_and_avalanche_research/csar_ismd.en.jsp)
- [Chair of Lightweight Design](https://www.cld.uni-rostock.de)
- [WEAC on GitHub](https://github.com/2phi/weac)
- [WEAC on PyPI](https://pypi.org/project/weac/)
- [Oracle Web App](https://snoworacle.streamlit.app) 