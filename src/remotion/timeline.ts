export const VIDEO_WIDTH = 1920;
export const VIDEO_HEIGHT = 1080;
export const FPS = 30;

export const VIS001_DURATION_SECONDS = 62;
export const VIS001_DURATION_FRAMES = seconds(VIS001_DURATION_SECONDS, FPS);

export const SHOWCASE_DURATION_SECONDS = 12;
export const SHOWCASE_DURATION_FRAMES = seconds(SHOWCASE_DURATION_SECONDS, FPS);

export type CueEasing = (value: number) => number;

export function seconds(value: number, fps = FPS) {
  return Math.round(value * fps);
}

export function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

export function cue(
  frame: number,
  startSec: number,
  durationSec: number,
  fps = FPS,
  easing: CueEasing = (value) => value,
) {
  const startFrame = seconds(startSec, fps);
  const durationFrames = Math.max(1, seconds(durationSec, fps));
  const raw = clamp01((frame - startFrame) / durationFrames);
  return clamp01(easing(raw));
}

export function hold(frame: number, startSec: number, endSec: number, fps = FPS) {
  return frame >= seconds(startSec, fps) && frame <= seconds(endSec, fps);
}

export const vis001Beats = [
  {
    id: "false-certainty",
    title: "False certainty",
    startSec: 0,
    endSec: 12,
    frameStart: seconds(0),
    frameEnd: seconds(12),
  },
  {
    id: "hidden-assumption",
    title: "Hidden assumption revealed",
    startSec: 12,
    endSec: 22,
    frameStart: seconds(12),
    frameEnd: seconds(22),
  },
  {
    id: "world-split",
    title: "World split",
    startSec: 20,
    endSec: 36,
    frameStart: seconds(20),
    frameEnd: seconds(36),
  },
  {
    id: "interval-boundary",
    title: "Interval fully revealed",
    startSec: 34,
    endSec: 50,
    frameStart: seconds(34),
    frameEnd: seconds(50),
  },
  {
    id: "receipt-snap",
    title: "Receipt snap",
    startSec: 48,
    endSec: 62,
    frameStart: seconds(48),
    frameEnd: seconds(62),
  },
] as const;

export const vis001StillFrames = {
  falseCertainty: seconds(4.5),
  hiddenAssumptionRevealed: seconds(16.5),
  worldSplit: seconds(29),
  intervalFullyRevealed: seconds(42),
  receiptSnap: seconds(56),
} as const;
