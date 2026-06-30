import { useMemo, useState } from "react";
import { CinematicShell } from "./components/CinematicShell";
import { scenes } from "./data/scenes";
import { toyExample } from "./data/mathExamples";
import { ColdOpen } from "./scenes/ColdOpen";
import { HiddenDependence } from "./scenes/HiddenDependence";
import { SameScoresDifferentWorlds } from "./scenes/SameScoresDifferentWorlds";
import { PointEstimateCracks } from "./scenes/PointEstimateCracks";
import { ConstraintMachineScene } from "./scenes/ConstraintMachineScene";
import { EndpointWitnesses } from "./scenes/EndpointWitnesses";
import { GhostReceiptFinale } from "./scenes/GhostReceiptFinale";

export default function App() {
  const initialRecording = useMemo(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return new URLSearchParams(window.location.search).get("recording") === "true";
  }, []);

  const [sceneIndex, setSceneIndex] = useState(0);
  const [overlapFailures, setOverlapFailures] = useState(toyExample.maxOverlap);
  const [recordingMode, setRecordingMode] = useState(initialRecording);
  const [paused, setPaused] = useState(false);

  const activeScene = scenes[sceneIndex];

  const goToScene = (index: number) => {
    setSceneIndex(Math.min(scenes.length - 1, Math.max(0, index)));
  };

  const nextScene = () => goToScene(sceneIndex + 1);
  const previousScene = () => goToScene(sceneIndex - 1);

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
            onOverlapChange={setOverlapFailures}
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
  }, [activeScene.id, overlapFailures]);

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
    >
      {scene}
    </CinematicShell>
  );
}
