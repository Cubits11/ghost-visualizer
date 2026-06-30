import { Easing, interpolate } from "remotion";
import { clamp01 } from "./timeline";

export const officialEnter = Easing.bezier(0.16, 1, 0.3, 1);
export const mechanicalSort = Easing.bezier(0.33, 0, 0.2, 1);
export const fractureSnap = Easing.bezier(0.7, 0, 0.18, 1);
export const intervalInevitable = Easing.bezier(0.45, 0, 0.05, 1);
export const artifactImpact = Easing.bezier(0.18, 0.95, 0.24, 1);

export function mix(from: number, to: number, progress: number) {
  return from + (to - from) * clamp01(progress);
}

export function clampedInterpolate(
  frame: number,
  inputRange: [number, number],
  outputRange: [number, number],
  easing: (value: number) => number = Easing.linear,
) {
  return interpolate(frame, inputRange, outputRange, {
    easing,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}
