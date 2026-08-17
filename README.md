# 📜 Ambient Writing Room

> *A distraction-free ambient writing sanctuary with procedural audio synthesis, vintage dark academia skeuomorphism, and private author vaults.*

---

## 🌟 Overview

**Ambient Writing Room** is an immersive digital sanctuary crafted for writers, journalers, and thinkers. It combines a vintage paper & ink aesthetic with real-time procedural sound synthesis (rain, cafe chatter, crackling fireplace, clock ticking, acoustic instruments) and isolated private vaults to protect your personal musings.

---

## 🔒 Author Privacy & Private Vault System

All manuscripts, session archives, and journal reflections are kept strictly private using our **Scoped Author Privacy System**:

- **Local-First Privacy**: Your writings are stored locally inside your browser's private storage (`localStorage`). No private manuscripts or journal entries are ever transmitted over the network or exposed via shared links.
- **Isolated Author Vaults**: Support for multiple author profiles / pen names on the same device. Manuscripts, session archives (`historyEntries`), and sealed journal reflections (`journalEntries`) are strictly isolated to each author.
- **Passcode PIN Protection**: Protect your private vault with an optional 4-digit security PIN. When enabled, switching into your author profile requires entering your passcode PIN, keeping your writings safe even on shared computers.
- **Antique Key Insignia**: Access your Author Privacy & Vault menu at any time by clicking the wax seal profile insignia in the top navigation bar.

---

## 🖋️ Key Features

- **Setup Ritual**: Custom session timers, writing intentions, desk companion toggles (tea, candles, plants, pocket watch), and smart ambient presets (Dawn, Midday, Dusk, Midnight).
- **Study Editor**: Distraction-free typography with custom paper styles (Parchment, Rose, Lined, Dotted, Blank), pigment selection (Burgundy, Forest Green, Iron Gall Ink, Sepia), and live word count goals.
- **Session History Archives**: Auto-filed session logs and one-click PDF export rendered in your selected paper aesthetic.
- **Sealed Journal Musings**: Post-session emotional heart-checks & reflections stored in your private vault.
- **Procedural Soundscape**: Web Audio API ambient noise generator for rain, fireplace, cafe, library, acoustic guitar, piano, and pocket watch ticking.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- `npm` or `yarn`

### Installation

1. Clone the repository or navigate to the project directory:
   ```bash
   cd "Ambient Writing Room"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to enter the sanctuary.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 15 (App Router)
- **State Management**: Zustand with `persist` middleware
- **Styling**: Tailwind CSS with custom skeuomorphic surface tokens
- **Icons**: Lucide React
- **PDF Export**: html2pdf.js / jsPDF
- **Audio Engine**: Custom procedural Web Audio API synthesizer

---

## 📜 License

MIT License - feel free to customize and enjoy your writing sanctuary!
