<div align="center">
  <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/Electron.svg" width="80" alt="Electron Logo" />
  
  # 🛡️ KeyShield
  
  **A beautiful, premium cross-platform utility that safely disables your keyboard so you can clean it without accidental clicks.**

  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![Platform](https://img.shields.io/badge/Platform-macOS%20%7C%20Windows%20%7C%20Linux-lightgray.svg)]()
  [![Built with Electron](https://img.shields.io/badge/Built%20with-Electron-47848f.svg)](https://www.electronjs.org/)

  [Features](#sparkles-features) • [Installation](#inbox_tray-installation) • [Usage](#computer-usage) • [Contributing](#handshake-contributing)
</div>

---

## ⬇️ Download

<table>
  <tr>
    <th>Operating System</th>
    <th>Download</th>
  </tr>
  <tr>
    <td>
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg" width="20"/> macOS
    </td>
    <td>
      <a href="https://github.com/atishay567/KeyShild/releases/download/v1.0.0/KeyShield-1.0.0-arm64.dmg">Apple Silicon (M1/M2/M3)</a> · 
      <a href="https://github.com/atishay567/KeyShild/releases/download/v1.0.0/KeyShield-1.0.0.dmg">Intel</a>
    </td>
  </tr>
  <tr>
    <td>
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg" width="20"/> Windows
    </td>
    <td>
      <a href="https://github.com/atishay567/KeyShild/releases/download/v1.0.0/KeyShield%20Setup%201.0.0.exe">Download .exe</a>
    </td>
  </tr>
  <tr>
    <td>
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" width="20"/> Linux
    </td>
    <td>
      <a href="https://github.com/atishay567/KeyShild/releases/download/v1.0.0/KeyShield-1.0.0.AppImage">Download .AppImage</a>
    </td>
  </tr>
</table>

> ### ⚠️ Mac Troubleshooting
> **"App is damaged and can't be opened" error:**
> macOS adds a quarantine flag to unsigned downloaded apps. To fix this, open your Terminal and run the following command after moving the app to your Applications folder:
> ```bash
> xattr -cr /Applications/KeyShield.app
> ```
> 
> **"Developer cannot be verified" warning:**
> Right-click the app → Open → Open anyway.

---

## :sparkles: Features & Capabilities

KeyShield provides a robust suite of features designed to make keyboard maintenance effortless and beautiful.

| Feature | Description | Icon |
| :--- | :--- | :---: |
| **Smart Lock** | Instantly disables keyboard input system-wide by intercepting keypresses using Electron global shortcuts. | 🔒 |
| **Timed Unlock** | Automatically unlocks your keyboard after a set duration (30s, 1m, 2m, or 5m). | ⏱️ |
| **Mouse-Active** | Keeps your mouse active so you can manually click the "Unlock" button at any time in case of emergency. | 🖱️ |
| **Premium UI** | Features a highly polished, luxurious dark-glass UI with subtle champagne/gold accents and smooth animations. | 💎 |
| **Cross-Platform** | Engineered to work flawlessly on all major operating systems. | 🌍 |

---

## :desktop_computer: Platform Support

| Operating System | Status | Compatibility Notes |
| :--- | :---: | :--- |
| <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/Apple-Dark.svg" width="20" /> **macOS** | ✅ | Full support. Intercepts all standard keypresses. |
| <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/Windows-Dark.svg" width="20" /> **Windows** | ✅ | Full support. (System-level sequences like `Ctrl+Alt+Del` remain active for safety). |
| <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/Linux-Dark.svg" width="20" /> **Linux** | ✅ | Full support across standard desktop environments (GNOME, KDE). |

---

## :inbox_tray: Installation

Since KeyShield is a Node.js/Electron application, you can easily download and run it directly from the source code.

| Step | Action | Command |
| :---: | :--- | :--- |
| **1** | **Clone the repository** | `git clone https://github.com/atishay567/KeyShild.git` |
| **2** | **Navigate to folder** | `cd KeyShild` |
| **3** | **Install packages** | `npm install` |
| **4** | **Launch App** | `npm start` |

---

## 📦 Packaging (Build Standalone Executable)

If you want to deploy/install KeyShield permanently on your system as a standalone application (so you don't need to run it from a terminal anymore), you can package it:

```bash
# Build the application package for your current platform
npm run dist
```

This will generate standard standalone application packages in the `dist/` directory:
- **macOS:** Creates `KeyShield.app` and a `.dmg` installer.
- **Windows:** Creates a `.exe` installer.
- **Linux:** Creates a `.AppImage` standalone binary.

---

## :computer: Usage Instructions

1. Open **KeyShield**.
2. Select your desired cleaning time from the options panel.
3. Click the **Lock Keyboard** button.
4. Your screen will display a premium lock overlay. **You can now safely wipe down and clean your keyboard!**
5. Once you are finished, either wait for the timer to run out, or simply use your mouse to click **Click to Unlock**.

---

## :handshake: Contributing

Contributions, issues, and feature requests are welcome! 

| Phase | Description | Status |
| :--- | :--- | :---: |
| **Phase 1** | Kiosk-mode overlay and Global Shortcut swallowing (Current implementation). | 🟢 |
| **Phase 2** | Native C++ hooks (`node-gyp`) for absolute OS-level key blocking. | 🟡 |
| **Packaging** | Compiling binary executables (`.exe`, `.dmg`, `.AppImage`) using `electron-builder`. | 🟢 |

If you'd like to help build Phase 2, please open a Pull Request!

<div align="center">
  <br/>
  Made by Atishay.
</div>
