/**
 * Web Audio API Procedural Sound Synthesizer Engine
 * Synthesizes Rain, Café Chatter, Library Hush, Fireplace Crackle, Forest, Soothing Music Box,
 * Pocket Watch Ticking, Acoustic Guitar, and Grand Piano procedurally using Web Audio API nodes.
 * Zero external audio files required!
 */

class AmbientSoundEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.nodes = {
      rain: null,
      cafe: null,
      library: null,
      fireplace: null,
      forest: null,
      musicBox: null,
      ticking: null,
      guitar: null,
      piano: null,
    };
    this.gains = {
      rain: null,
      cafe: null,
      library: null,
      fireplace: null,
      forest: null,
      musicBox: null,
      ticking: null,
      guitar: null,
      piano: null,
    };
    this.musicBoxInterval = null;
    this.tickingInterval = null;
    this.guitarInterval = null;
    this.pianoInterval = null;
    this.initialized = false;
  }

  init() {
    if (this.initialized || typeof window === 'undefined') return;

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AudioContext();

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.8, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    // Setup noise buffer generator (2-second loop buffer)
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    // 1. Rain Synthesizer Node
    this.setupRain(noiseBuffer);

    // 2. Café Chatter Synthesizer Node
    this.setupCafe(noiseBuffer);

    // 3. Library Hush Synthesizer Node
    this.setupLibrary(noiseBuffer);

    // 4. Fireplace Crackle Synthesizer Node
    this.setupFireplace(noiseBuffer);

    // 5. Forest Synthesizer Node
    this.setupForest(noiseBuffer);

    // 6. Soothing Music Box Synthesizer Engine
    this.setupMusicBox();

    // 7. Pocket Watch Ticking Synthesizer Engine
    this.setupPocketWatch();

    // 8. Acoustic Guitar Fingerpicking Synthesizer Engine
    this.setupGuitar();

    // 9. Grand Piano Chord Synthesizer Engine
    this.setupPiano();

    this.initialized = true;
  }

  // --- Rain Generator ---
  setupRain(buffer) {
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1000, this.ctx.currentTime);
    filter.Q.setValueAtTime(0.7, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0, this.ctx.currentTime);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(0);
    this.nodes.rain = noise;
    this.gains.rain = gain;
  }

  // --- Café Chatter Generator ---
  setupCafe(buffer) {
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, this.ctx.currentTime);

    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.3, this.ctx.currentTime);

    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(150, this.ctx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0, this.ctx.currentTime);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(0);
    lfo.start(0);
    this.nodes.cafe = noise;
    this.gains.cafe = gain;
  }

  // --- Library Hush Generator ---
  setupLibrary(buffer) {
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(220, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0, this.ctx.currentTime);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(0);
    this.nodes.library = noise;
    this.gains.library = gain;
  }

  // --- Fireplace Crackle Generator ---
  setupFireplace(buffer) {
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(350, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0, this.ctx.currentTime);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(0);
    this.nodes.fireplace = noise;
    this.gains.fireplace = gain;

    setInterval(() => {
      if (this.ctx && this.gains.fireplace && this.gains.fireplace.gain.value > 0.01) {
        if (Math.random() < 0.4) {
          const osc = this.ctx.createOscillator();
          const oscGain = this.ctx.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(100 + Math.random() * 800, this.ctx.currentTime);
          oscGain.gain.setValueAtTime(0.08 * this.gains.fireplace.gain.value, this.ctx.currentTime);
          oscGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.05);

          osc.connect(oscGain);
          oscGain.connect(this.masterGain);
          osc.start();
          osc.stop(this.ctx.currentTime + 0.05);
        }
      }
    }, 150);
  }

  // --- Forest Wind Generator ---
  setupForest(buffer) {
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(800, this.ctx.currentTime);
    filter.Q.setValueAtTime(3.0, this.ctx.currentTime);

    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.15, this.ctx.currentTime);

    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(400, this.ctx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0, this.ctx.currentTime);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(0);
    lfo.start(0);
    this.nodes.forest = noise;
    this.gains.forest = gain;
  }

  // --- Music Box Generator ---
  setupMusicBox() {
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.connect(this.masterGain);

    this.gains.musicBox = gain;

    const melody = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50, 783.99, 659.25];
    let noteIdx = 0;

    this.musicBoxInterval = setInterval(() => {
      if (this.ctx && this.gains.musicBox && this.gains.musicBox.gain.value > 0.005) {
        const freq = melody[noteIdx % melody.length];
        noteIdx++;

        const osc = this.ctx.createOscillator();
        const noteGain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        const now = this.ctx.currentTime;
        const currentVol = this.gains.musicBox.gain.value;
        noteGain.gain.setValueAtTime(0.001, now);
        noteGain.gain.linearRampToValueAtTime(0.15 * currentVol, now + 0.02);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

        osc.connect(noteGain);
        noteGain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + 1.25);
      }
    }, 450);
  }

  // --- Pocket Watch Ticking Generator ---
  setupPocketWatch() {
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.connect(this.masterGain);

    this.gains.ticking = gain;

    let isTick = true;
    this.tickingInterval = setInterval(() => {
      if (this.ctx && this.gains.ticking && this.gains.ticking.gain.value > 0.005) {
        const osc = this.ctx.createOscillator();
        const tickGain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(isTick ? 2400 : 1800, this.ctx.currentTime);

        const now = this.ctx.currentTime;
        const currentVol = this.gains.ticking.gain.value;
        tickGain.gain.setValueAtTime(0.001, now);
        tickGain.gain.linearRampToValueAtTime(0.05 * currentVol, now + 0.005);
        tickGain.gain.exponentialRampToValueAtTime(0.00001, now + 0.03);

        osc.connect(tickGain);
        tickGain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + 0.035);

        isTick = !isTick;
      }
    }, 500);
  }

  // --- 8. Acoustic Guitar Fingerpicking Synthesizer Generator ---
  setupGuitar() {
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.connect(this.masterGain);

    this.gains.guitar = gain;

    // Fingerpicked acoustic guitar notes (E3, G3, B3, E4, G4, B4, D4, A3)
    const guitarNotes = [164.81, 196.00, 246.94, 329.63, 392.00, 493.88, 293.66, 220.00];
    let noteIdx = 0;

    this.guitarInterval = setInterval(() => {
      if (this.ctx && this.gains.guitar && this.gains.guitar.gain.value > 0.005) {
        const freq = guitarNotes[noteIdx % guitarNotes.length];
        noteIdx++;

        // Layer triangle (fundamental string) + sine (warm overtone)
        const osc1 = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        const noteGain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc1.type = 'triangle';
        osc1.frequency.setValueAtTime(freq, this.ctx.currentTime);

        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(freq * 2, this.ctx.currentTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1200, this.ctx.currentTime);

        const now = this.ctx.currentTime;
        const currentVol = this.gains.guitar.gain.value;

        // Pluck attack & warm string decay envelope
        noteGain.gain.setValueAtTime(0.001, now);
        noteGain.gain.linearRampToValueAtTime(0.2 * currentVol, now + 0.015);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(noteGain);
        noteGain.connect(this.masterGain);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 1.85);
        osc2.stop(now + 1.85);
      }
    }, 600);
  }

  // --- 9. Grand Piano Synthesizer Generator ---
  setupPiano() {
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.connect(this.masterGain);

    this.gains.piano = gain;

    // Soft felt piano chord progression (Cmaj7 -> Am7 -> Fmaj7 -> G7)
    const chords = [
      [261.63, 329.63, 392.00, 493.88], // Cmaj7
      [220.00, 261.63, 329.63, 392.00], // Am7
      [174.61, 220.00, 261.63, 329.63], // Fmaj7
      [196.00, 246.94, 293.66, 349.23], // G7
    ];
    let chordIdx = 0;

    this.pianoInterval = setInterval(() => {
      if (this.ctx && this.gains.piano && this.gains.piano.gain.value > 0.005) {
        const currentChord = chords[chordIdx % chords.length];
        chordIdx++;

        currentChord.forEach((freq, i) => {
          const osc = this.ctx.createOscillator();
          const noteGain = this.ctx.createGain();
          const filter = this.ctx.createBiquadFilter();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(800, this.ctx.currentTime);

          const now = this.ctx.currentTime + i * 0.06; // Strummed piano strike delay
          const currentVol = this.gains.piano.gain.value;

          noteGain.gain.setValueAtTime(0.001, now);
          noteGain.gain.linearRampToValueAtTime(0.12 * currentVol, now + 0.03);
          noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

          osc.connect(filter);
          filter.connect(noteGain);
          noteGain.connect(this.masterGain);

          osc.start(now);
          osc.stop(now + 2.6);
        });
      }
    }, 2400);
  }

  // --- Volume Control ---
  setVolume(type, val) {
    if (!this.initialized) this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    if (this.gains[type]) {
      const volume = Math.max(0, Math.min(1, val / 100)) * 0.5;
      this.gains[type].gain.setTargetAtTime(volume, this.ctx.currentTime, 0.05);
    }
  }

  setMasterMute(isMuted) {
    if (!this.masterGain || !this.ctx) return;
    this.masterGain.gain.setTargetAtTime(isMuted ? 0 : 0.8, this.ctx.currentTime, 0.05);
  }
}

export const soundEngine = new AmbientSoundEngine();
