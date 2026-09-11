let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let unlocked = false;

function context(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AudioCtx = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return null;
    ctx = new AudioCtx();
    master = ctx.createGain();
    master.gain.value = 0.22;
    master.connect(ctx.destination);
  }
  return ctx;
}

export async function unlockSounds() {
  const audio = context();
  if (!audio || !master) return;
  if (audio.state === "suspended") {
    try {
      await audio.resume();
    } catch {
      return;
    }
  }
  unlocked = audio.state === "running";
}

function ready(): AudioContext | null {
  const audio = context();
  if (!audio || !master || audio.state !== "running") return null;
  unlocked = true;
  return audio;
}

function tone(
  audio: AudioContext,
  dest: AudioNode,
  freq: number,
  when: number,
  dur: number,
  peak: number,
  type: OscillatorType = "sine",
) {
  const osc = audio.createOscillator();
  const gain = audio.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, when);
  gain.gain.setValueAtTime(0.0001, when);
  gain.gain.exponentialRampToValueAtTime(peak, when + 0.016);
  gain.gain.exponentialRampToValueAtTime(0.0001, when + dur);
  osc.connect(gain);
  gain.connect(dest);
  osc.start(when);
  osc.stop(when + dur + 0.03);
}

function noiseBurst(audio: AudioContext, dest: AudioNode, when: number, dur: number, peak: number) {
  const length = Math.max(1, Math.floor(audio.sampleRate * dur));
  const buffer = audio.createBuffer(1, length, audio.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i += 1) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
  }
  const src = audio.createBufferSource();
  src.buffer = buffer;
  const filter = audio.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(1800, when);
  const gain = audio.createGain();
  gain.gain.setValueAtTime(0.0001, when);
  gain.gain.exponentialRampToValueAtTime(peak, when + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, when + dur);
  src.connect(filter);
  filter.connect(gain);
  gain.connect(dest);
  src.start(when);
  src.stop(when + dur + 0.02);
}

export function playClick() {
  const audio = ready();
  if (!audio || !master) return;
  const t = audio.currentTime;
  tone(audio, master, 1640, t, 0.06, 0.18, "triangle");
  tone(audio, master, 980, t, 0.05, 0.08, "sine");
}

export function playSelect() {
  const audio = ready();
  if (!audio || !master) return;
  const t = audio.currentTime;
  tone(audio, master, 660, t, 0.08, 0.14, "triangle");
  tone(audio, master, 990, t + 0.05, 0.1, 0.16, "sine");
}

export function playDeselect() {
  const audio = ready();
  if (!audio || !master) return;
  const t = audio.currentTime;
  tone(audio, master, 420, t, 0.08, 0.1, "sine");
}

export function playStart() {
  const audio = ready();
  if (!audio || !master) return;
  const t = audio.currentTime;
  tone(audio, master, 392, t, 0.12, 0.16, "triangle");
  tone(audio, master, 523, t + 0.08, 0.14, 0.18, "triangle");
  tone(audio, master, 784, t + 0.16, 0.22, 0.2, "sine");
}

export function playSubmit() {
  const audio = ready();
  if (!audio || !master) return;
  const t = audio.currentTime;
  tone(audio, master, 523, t, 0.1, 0.14, "sine");
  tone(audio, master, 659, t + 0.09, 0.16, 0.16, "triangle");
}

export function playAttractChime() {
  const audio = ready();
  if (!audio || !master) return;
  const t = audio.currentTime;
  tone(audio, master, 523.25, t, 0.22, 0.2, "sine");
  tone(audio, master, 659.25, t + 0.16, 0.24, 0.22, "sine");
  tone(audio, master, 783.99, t + 0.32, 0.38, 0.24, "triangle");
}

export function playCheer() {
  const audio = ready();
  if (!audio || !master) return;
  const dest = master;
  const t = audio.currentTime;
  noiseBurst(audio, dest, t, 0.55, 0.12);
  const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5];
  notes.forEach((freq, i) => {
    tone(audio, dest, freq, t + i * 0.09, 0.28, 0.2, i % 2 ? "triangle" : "sine");
  });
  tone(audio, dest, 1568, t + 0.48, 0.4, 0.12, "sine");
  noiseBurst(audio, dest, t + 0.2, 0.7, 0.08);
}

export function isSoundUnlocked() {
  return unlocked;
}
