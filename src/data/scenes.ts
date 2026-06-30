export type SceneId =
  | "cold-open"
  | "hidden-dependence"
  | "same-scores"
  | "point-cracks"
  | "constraint-machine"
  | "endpoint-witnesses"
  | "ghost-receipt";

export interface SceneSpec {
  id: SceneId;
  number: string;
  title: string;
  kicker: string;
  thesis: string;
  duration: number;
}

export const RECORDING_SCENE_DURATIONS = {
  coldOpen: 12000,
  hiddenDependence: 12000,
  sameScoresDifferentWorlds: 17000,
  pointEstimateCracks: 11000,
  constraintMachine: 14000,
  endpointWitnesses: 12000,
  ghostReceiptFinale: 12000,
} as const;

export const recordingDurationBySceneId: Record<SceneId, number> = {
  "cold-open": RECORDING_SCENE_DURATIONS.coldOpen,
  "hidden-dependence": RECORDING_SCENE_DURATIONS.hiddenDependence,
  "same-scores": RECORDING_SCENE_DURATIONS.sameScoresDifferentWorlds,
  "point-cracks": RECORDING_SCENE_DURATIONS.pointEstimateCracks,
  "constraint-machine": RECORDING_SCENE_DURATIONS.constraintMachine,
  "endpoint-witnesses": RECORDING_SCENE_DURATIONS.endpointWitnesses,
  "ghost-receipt": RECORDING_SCENE_DURATIONS.ghostReceiptFinale,
};

export const scenes: SceneSpec[] = [
  {
    id: "cold-open",
    number: "01",
    title: "The Score Looks Safe",
    kicker: "Cold open",
    thesis: "A clean score can feel like truth before dependence enters the frame.",
    duration: RECORDING_SCENE_DURATIONS.coldOpen / 1000,
  },
  {
    id: "hidden-dependence",
    number: "02",
    title: "Hidden Dependence",
    kicker: "The missing variable",
    thesis: "The dangerous case is not a weak component. It is a shared blind spot.",
    duration: RECORDING_SCENE_DURATIONS.hiddenDependence / 1000,
  },
  {
    id: "same-scores",
    number: "03",
    title: "Same Scores, Different Worlds",
    kicker: "Visual counterexample",
    thesis: "The same marginal scores can permit radically different composed risk.",
    duration: RECORDING_SCENE_DURATIONS.sameScoresDifferentWorlds / 1000,
  },
  {
    id: "point-cracks",
    number: "04",
    title: "Point Estimate Cracks",
    kicker: "Partial identification",
    thesis: "The honest object is the interval the evidence actually permits.",
    duration: RECORDING_SCENE_DURATIONS.pointEstimateCracks / 1000,
  },
  {
    id: "constraint-machine",
    number: "05",
    title: "Constraint Machine",
    kicker: "Feasible worlds under pressure",
    thesis: "Declared evidence becomes linear constraints, then min and max bounds.",
    duration: RECORDING_SCENE_DURATIONS.constraintMachine / 1000,
  },
  {
    id: "endpoint-witnesses",
    number: "06",
    title: "Endpoint Witnesses",
    kicker: "A bound needs a world",
    thesis: "An endpoint should arrive with an inspectable atom distribution.",
    duration: RECORDING_SCENE_DURATIONS.endpointWitnesses / 1000,
  },
  {
    id: "ghost-receipt",
    number: "07",
    title: "Ghost Receipt Finale",
    kicker: "Claim discipline",
    thesis: "A serious result is a bounded claim with witnesses and non-claims attached.",
    duration: RECORDING_SCENE_DURATIONS.ghostReceiptFinale / 1000,
  },
];

export const totalDuration = scenes.reduce((sum, scene) => sum + scene.duration, 0);
export const totalRecordingDurationMs = Object.values(RECORDING_SCENE_DURATIONS).reduce(
  (sum, duration) => sum + duration,
  0,
);
