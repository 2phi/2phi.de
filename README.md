<h1 align="center">
  <br>
  <img src="public/assets/logos/2phi.png" alt="2phi logo" width="120" height="120">
  <br>
  <br>
  <b>2phi.de</b>
  <br>
</h1>

A modern website for the 2phi organization.

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
# Rename LFTP configuration template and edit with your FTP credentials
cp lftp.config.example lftp.config
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
│   ├── assets/                # Images, logos, favicons, and author portraits
│   │   ├── favicon/           # Favicon images, .htaccess, and manifest assets
│   │   ├── logos/             # Logos of partner institutions and projects
│   │   └── portraits/         # Author/people images for the website
│   ├── site.webmanifest       # Web app manifest (at root for best compatibility)
│   └── index.html             # Main page
├── favicon/                   # Source and export files for favicons
├── deploy.sh                  # Deployment script
├── lftp.config.example        # FTP config template
└── package.json               # Node.js configuration
```

## 🖼️ Favicon & Manifest Management

Favicons are managed according to [this guide](https://dev.to/masakudamatsu/favicon-nightmare-how-to-maintain-sanity-3al7) and generated using [RealFaviconGenerator](https://realfavicongenerator.net).

Displaying the favicons requires
- that files and directories in `public/assets/favicon/` are readable (permissions 755 for directories, 644 for files),
- and that there is a `.htaccess` file in `public/assets/favicon/` with the following content:
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