import { PropsWithChildren, useEffect, useMemo, type CSSProperties } from "react";
import { FileSearch } from "lucide-react";
import {
  SceneSpec,
  recordingDurationBySceneId,
  totalRecordingDurationMs,
} from "../data/scenes";
import { SceneNavigator } from "./SceneNavigator";
import { SceneStage } from "./SceneStage";

interface CinematicShellProps extends PropsWithChildren {
  activeScene: SceneSpec;
  sceneIndex: number;
  scenes: SceneSpec[];
  recordingMode: boolean;
  paused: boolean;
  onNext: () => void;
  onPrevious: () => void;
  onSelectScene: (index: number) => void;
  onTogglePaused: () => void;
  onToggleRecording: () => void;
  onOpenEvidence: () => void;
}

export function CinematicShell({
  activeScene,
  sceneIndex,
  scenes,
  recordingMode,
  paused,
  onNext,
  onPrevious,
  onSelectScene,
  onTogglePaused,
  onToggleRecording,
  onOpenEvidence,
  children,
}: CinematicShellProps) {
  const sceneDurationMs = recordingDurationBySceneId[activeScene.id];
  const elapsedBeforeMs = useMemo(
    () =>
      scenes
        .slice(0, sceneIndex)
        .reduce((sum, scene) => sum + recordingDurationBySceneId[scene.id], 0),
    [sceneIndex, scenes],
  );
  const recordingProgressStart = elapsedBeforeMs / totalRecordingDurationMs;
  const recordingProgressEnd = (elapsedBeforeMs + sceneDurationMs) / totalRecordingDurationMs;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;

      if (isTyping) {
        return;
      }

      if (event.key === "ArrowRight" || event.key === " ") {
        event.preventDefault();
        onNext();
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        onPrevious();
      }

      if (event.key.toLowerCase() === "r") {
        onToggleRecording();
      }

      if (event.key.toLowerCase() === "p") {
        onTogglePaused();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onNext, onPrevious, onTogglePaused, onToggleRecording]);

  useEffect(() => {
    if (!recordingMode || paused || sceneIndex >= scenes.length - 1) {
      return;
    }

    const timer = window.setTimeout(() => {
      onNext();
    }, sceneDurationMs);

    return () => window.clearTimeout(timer);
  }, [onNext, paused, recordingMode, sceneDurationMs, sceneIndex, scenes.length]);

  return (
    <div
      className={`app-shell${recordingMode ? " is-recording" : ""}${
        paused ? " is-paused" : ""
      }`}
      style={
        {
          "--scene-duration": `${sceneDurationMs}ms`,
          "--recording-progress-start": recordingProgressStart,
          "--recording-progress-end": recordingProgressEnd,
        } as CSSProperties
      }
    >
      <header className="app-chrome">
        <div>
          <p className="eyebrow">Ghost Visualizer</p>
          <h1>Why AI Safety Scores Lie</h1>
        </div>
        <div className="chrome-meta">
          <span>{activeScene.number}</span>
          <strong>{activeScene.title}</strong>
          <button type="button" className="chrome-evidence-button" onClick={onOpenEvidence}>
            <FileSearch aria-hidden="true" />
            Evidence
          </button>
        </div>
      </header>

      <main className="stage-wrap">
        <div className="cinema-frame">
          <SceneStage activeScene={activeScene}>{children}</SceneStage>
          {recordingMode ? (
            <>
              <div className="recording-progress" aria-hidden="true">
                <span key={activeScene.id} />
              </div>
              <div className="scene-progress" aria-hidden="true" key={activeScene.id} />
            </>
          ) : null}
        </div>
      </main>

      <SceneNavigator
        activeIndex={sceneIndex}
        scenes={scenes}
        recordingMode={recordingMode}
        paused={paused}
        onNext={onNext}
        onPrevious={onPrevious}
        onSelectScene={onSelectScene}
        onTogglePaused={onTogglePaused}
        onToggleRecording={onToggleRecording}
      />
    </div>
  );
}
