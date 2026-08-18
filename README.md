<<<<<<< HEAD
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
=======
# ✒️ Ambient Writing Room

> A distraction-free, highly atmospheric digital study room designed for deep focus, creative writing, and mindful reflection. Features procedural Web Audio API sound synthesis, 3D notebook page turning, customizable typography and ink pigments, skeuomorphic desk companions, and aesthetic manuscript PDF exports.

---

## ✨ Features & Highlights

### 🎧 1. Procedural Web Audio API Synthesizer (No Pre-Recorded Loops)
- Synthesizes 9 controllable audio layers directly in browser memory using raw Web Audio API nodes:
  - 🌧️ **Rain** (Filtered Noise)
  - ☕ **Café Chatter** (Low-pass filtered ambient rumble)
  - 📚 **Library Hush** (Quiet room resonance)
  - 🔥 **Fireplace Crackle** (Pink noise burst synthesis)
  - 🌲 **Forest Wind** (Modulated bandpass breeze)
  - 🎵 **Soothing Music Box** (Sine wave lullaby synthesizer)
  - 🎸 **Acoustic Guitar** (Plucked acoustic warmth)
  - 🎹 **Grand Piano** (Resonant harmonic keys)
  - ⏱️ **Pocket Watch Ticking** (Synthesized escapement click)

### 📖 2. Unified Dynamic Study Editor (`/editor`)
- **Realistic 3D Book Page Turning**: Smooth 3D perspective page flips (`rotateY`, spring physics) with clickable notebook page margin zones.
- **Dynamic Paper Canvas Textures**: Switch seamlessly between **Parchment**, **Dotted**, **Lined**, **Blank**, and **Pastel Rose**.
- **Page Stack Controls**: Add or remove manuscript pages with **`+ Add Page`** and **`- Remove Page`** toolbar options.
- **Prominent Session Timer**: Real-time elapsed / remaining session countdown with Play/Pause, Reset, and Pocket Watch Tick sound toggle.
- **Dynamic Time-of-Day Lighting**:
  - 🌅 **Dawn** (Cool pale morning cast)
  - ☀️ **Midday** (Warm cream light)
  - 🌇 **Dusk** (Amber candlelit glow)
  - 🌙 **Midnight** (High-visibility dark academia mahogany sheet with warm cream text)

### 📄 3. Aesthetic A4 Manuscript PDF Export
- Generates high-resolution PDF manuscripts scaled to standard A4 format (`210mm x 297mm`).
- **100% Format Fidelity**: Preserves exact line breaks, stanza spacing, calligraphic font, ink color, and selected paper texture (e.g. Pastel Rose).
- Automatically files a copy into your local session **Archives** before downloading.

### 🕯️ 4. Interactive Skeuomorphic Desk Companions
- **Burning Candle**: Gently flickers and visualizes your remaining session duration as the wax burns down.
- **Steaming Teacup**: Emits floating steam particles during the first 3 minutes of warm-up time.
- **Streak-Growing Fern**: Evolves dynamically based on your streak count (*Sprout → Frond → Cottage Fern → Grand Fern*).
- **Windable Pocket Watch**: Set your target duration (30 mins, 1 hour, 2 hours) with audible ticking toggle.

### 📊 5. Chronicles of Focus & Mood Analytics (`/study`)
- **Actual Days of Week Analytics**: Interactive Recharts sentiment graph tracking your weekly writing disposition.
- **Writing Streak Counter**: Starts cleanly at 0 and increments as you write daily.
- **Real-Time Latest Reflection**: Live excerpt and stats from your active writing session.

### 📜 6. Sealed Journal Entries Gallery (`/folio`)
- View sealed reflections recorded after writing sessions via **Mood Check-in** (`/mood`).
- Deckled-edge cards display post-session mood badges, timestamps, reflection notes, and manuscript word counts.

### 🗄️ 7. Dynamic Session History Archives (`/archives`)
- Clean catalog storing your real saved manuscripts with instant PDF re-download links.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 15 (App Router, React 19)
- **Styling**: Vanilla CSS, Tailwind CSS, Dark Academia Design System
- **State Management**: Zustand with `localStorage` persistence
- **Audio Engine**: Web Audio API (Synthesized Oscillators, Noise Buffer Nodes, Bandpass & Lowpass Filters)
- **Animations**: Framer Motion (3D Page Flips, Desk Companion Physics)
- **PDF Export**: jsPDF & html2canvas
- **Charts**: Recharts
- **Fonts**: Google Fonts (`Caveat`, `Homemade Apple`, `EB Garamond`, `Playfair Display`, `Literata`)
>>>>>>> d504da8b5bffb84cb74563c477cca16131d8b036

---

## 🚀 Getting Started

### Prerequisites
<<<<<<< HEAD

- [Node.js](https://nodejs.org/) (v18 or higher)
- `npm` or `yarn`

### Installation

1. Clone the repository or navigate to the project directory:
   ```bash
   cd "Ambient Writing Room"
=======
Make sure you have Node.js (v18 or higher) installed on your system.

### Installation

1. Navigate to the project directory:
   ```bash
   cd stitch_ambient_writing_room
>>>>>>> d504da8b5bffb84cb74563c477cca16131d8b036
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

<<<<<<< HEAD
3. Run the development server:
=======
3. Start the development server:
>>>>>>> d504da8b5bffb84cb74563c477cca16131d8b036
   ```bash
   npm run dev
   ```

<<<<<<< HEAD
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
=======
4. Open your browser and visit:
   ```text
   http://localhost:3000
   ```

---

## 🗺️ Project Structure

```text
stitch_ambient_writing_room/
├── src/
│   ├── app/
│   │   ├── page.jsx           # Setup Ritual (Audio Sliders & Intention Setting)
│   │   ├── editor/page.jsx    # Unified Study Editor & 3D Notebook Canvas
│   │   ├── study/page.jsx     # Chronicles of Focus (Recharts & Streak Counter)
│   │   ├── folio/page.jsx     # Journal Entries Gallery
│   │   ├── archives/page.jsx  # Session History Archives
│   │   ├── mood/page.jsx      # Postcard Mood Check-in
│   │   ├── inkwell/page.jsx   # Pigments & Typography Studio
│   │   ├── layout.jsx         # App Shell Layout with Header & Audio Bar
│   │   ├── icon.svg           # Dark Academia Wax Seal & Gold Quill Favicon
│   │   └── globals.css        # Global CSS & Material Symbols imports
│   ├── components/
│   │   ├── DeskCompanions.jsx # Skeuomorphic Candle, Tea, Fern, Pocket Watch
│   │   ├── AudioBar.jsx       # Procedural Ambient Audio Mixer
│   │   └── Header.jsx         # Navigation Header
│   ├── lib/
│   │   ├── audioEngine.js     # Web Audio API Procedural Synthesizer Engine
│   │   └── exportPdf.js       # High-Resolution A4 PDF Exporter
│   └── store/
│       └── useStore.js        # Zustand State Store with localStorage persistence
├── public/                    # Static Assets
├── tailwind.config.js         # Tailwind CSS Dark Academia Theme Config
├── postcss.config.js          # PostCSS Loader Configuration
└── README.md                  # Documentation
```

---

## 📄 License

This project is open source and available under the MIT License.
>>>>>>> d504da8b5bffb84cb74563c477cca16131d8b036
