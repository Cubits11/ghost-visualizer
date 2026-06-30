import { useCallback, useEffect, useMemo, useState } from "react";
import { CinematicShell } from "./components/CinematicShell";
import { scenes } from "./data/scenes";
import { clampOverlap, toyExample } from "./data/mathExamples";
import { ColdOpen } from "./scenes/ColdOpen";
import { HiddenDependence } from "./scenes/HiddenDependence";
import { SameScoresDifferentWorlds } from "./scenes/SameScoresDifferentWorlds";
import { PointEstimateCracks } from "./scenes/PointEstimateCracks";
import { ConstraintMachineScene } from "./scenes/ConstraintMachineScene";
import { EndpointWitnesses } from "./scenes/EndpointWitnesses";
import { GhostReceiptFinale } from "./scenes/GhostReceiptFinale";
import { EvidenceMode } from "./views/EvidenceMode";

type AppMode = "story" | "evidence";

function getSearchParams() {
  if (typeof window === "undefined") {
    return new URLSearchParams();
  }

  return new URLSearchParams(window.location.search);
}

function replaceQuery(updates: Record<string, string | undefined>) {
  if (typeof window === "undefined") {
    return;
  }

  const url = new URL(window.location.href);

  Object.entries(updates).forEach(([key, value]) => {
    if (value === undefined) {
      url.searchParams.delete(key);
      return;
    }

    url.searchParams.set(key, value);
  });

  window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
}

export default function App() {
  const initialRecording = useMemo(() => {
    return getSearchParams().get("recording") === "true";
  }, []);

  const initialMode = useMemo<AppMode>(() => {
    return getSearchParams().get("mode") === "evidence" ? "evidence" : "story";
  }, []);

  const initialOverlap = useMemo(() => {
    const overlapParam = getSearchParams().get("overlap");
    if (overlapParam === null) {
      return toyExample.maxOverlap;
    }

    const overlap = Number(overlapParam);
    return Number.isFinite(overlap) ? clampOverlap(overlap) : toyExample.maxOverlap;
  }, []);

  const [sceneIndex, setSceneIndex] = useState(0);
  const [mode, setMode] = useState<AppMode>(initialMode);
  const [overlapFailures, setOverlapFailures] = useState(initialOverlap);
  const [recordingMode, setRecordingMode] = useState(initialRecording);
  const [paused, setPaused] = useState(false);

  const activeScene = scenes[sceneIndex];

  const goToScene = useCallback((index: number) => {
    setSceneIndex(Math.min(scenes.length - 1, Math.max(0, index)));
  }, []);

  const nextScene = useCallback(() => {
    setSceneIndex((index) => Math.min(scenes.length - 1, index + 1));
  }, []);

  const previousScene = useCallback(() => {
    setSceneIndex((index) => Math.max(0, index - 1));
  }, []);

  const openEvidenceMode = useCallback(() => {
    setMode("evidence");
    replaceQuery({ mode: "evidence" });
  }, []);

  const openStoryMode = useCallback(() => {
    setMode("story");
    replaceQuery({ mode: undefined });
  }, []);

  const updateOverlapFailures = useCallback((value: number) => {
    const clamped = clampOverlap(value);
    setOverlapFailures(clamped);
    replaceQuery({ overlap: String(clamped) });
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;

      if (isTyping || event.key.toLowerCase() !== "e") {
        return;
      }

      event.preventDefault();
      setMode((value) => {
        const nextMode = value === "story" ? "evidence" : "story";
        replaceQuery({ mode: nextMode === "evidence" ? "evidence" : undefined });
        return nextMode;
      });
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const scene = useMemo(() => {
    switch (activeScene.id) {
      case "cold-open":
        return <ColdOpen />;
      case "hidden-dependence":
        return <HiddenDependence />;
      case "same-scores":
        return (
          <SameScoresDifferentWorlds
            overlapFailures={overlapFailures}
            onOverlapChange={updateOverlapFailures}
          />
        );
      case "point-cracks":
        return <PointEstimateCracks />;
      case "constraint-machine":
        return <ConstraintMachineScene />;
      case "endpoint-witnesses":
        return <EndpointWitnesses />;
      case "ghost-receipt":
        return <GhostReceiptFinale />;
      default:
        return null;
    }
  }, [activeScene.id, overlapFailures, updateOverlapFailures]);

  if (mode === "evidence") {
    return <EvidenceMode onBackToStory={openStoryMode} />;
  }

  return (
    <CinematicShell
      activeScene={activeScene}
      sceneIndex={sceneIndex}
      scenes={scenes}
      recordingMode={recordingMode}
      paused={paused}
      onNext={nextScene}
      onPrevious={previousScene}
      onSelectScene={goToScene}
      onTogglePaused={() => setPaused((value) => !value)}
      onToggleRecording={() => setRecordingMode((value) => !value)}
      onOpenEvidence={openEvidenceMode}
    >
      {scene}
    </CinematicShell>
  );
}
