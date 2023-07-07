# 🌍 A lightweight (< 0.5 MB) JavaScript track-and-trace solution.

[![License](https://img.shields.io/github/license/leogaudin/track-and-trace)](LICENSE)

🚀 This repository contains the source code for the track and trace system developed for the World Bank's Read@Home program. The system enables the tracking and tracing of boxes of educational books.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Compatibility](#compatibility)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Overview

The track and trace system consists of two main components:

1. `application`: 📱 A React Native mobile app for scanning QR codes on the boxes.
2. `web`: 🌐 A MERN stack web app for creating and managing the boxes and their QR codes.

The system is built using JavaScript, making it lightweight, fast and compatible.

## Features

The track and trace system offers the following features:

- 📷 Scan QR codes on boxes using the React Native mobile app.
- 📦 Register boxes.
- 🏷️ Generate QR codes for each box to enable tracking.
- 🔍 Track the movement of educational books.
- 🌐 Manage boxes and their QR codes through the web app.
- 🚀 Lightweight and efficient, with a client bundle size of only **333.84 KB** when gzipped.

## Compatibility

The system is compatible with the following minimum versions:

### 📱 Mobile Application (React Native)

- iOS: Minimum version iOS 11
- Android: Minimum version Android 6.0 (Marshmallow)

### 🌐 Web Application (React)

- Browser Compatibility:
  - Chrome
  - Firefox
  - Safari
  - Edge

The web app is developed using React v18.2.0, while the mobile app uses React Native v0.71.8.

## Folder Structure

The repository has the following folder structure:

- `application`: 📱 Contains the source code for the React Native mobile app.
- `web`: 🌐 Contains the source code for the MERN stack web app.

## Contributing

🙌 Contributions are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or submit a pull request. For major changes, please discuss them with the project maintainers first.

⚠️ Please note that this project is licensed under the **GPLv3 License**.

Any forks or modifications **must also be open source** and adhere to the GPLv3 license terms.

**Private use is not permitted**.

## License

This project is licensed under the **GPLv3 License**. See the [LICENSE](LICENSE) file for details.
