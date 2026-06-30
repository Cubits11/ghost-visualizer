import { PropsWithChildren, useEffect } from "react";
import { SceneSpec } from "../data/scenes";
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
  children,
}: CinematicShellProps) {
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
    if (paused || sceneIndex >= scenes.length - 1) {
      return;
    }

    const timer = window.setTimeout(() => {
      onNext();
    }, activeScene.duration * 1000);

    return () => window.clearTimeout(timer);
  }, [activeScene.duration, onNext, paused, sceneIndex, scenes.length]);

  return (
    <div
      className={`app-shell${recordingMode ? " is-recording" : ""}${
        paused ? " is-paused" : ""
      }`}
      style={{ "--scene-duration": `${activeScene.duration}s` } as React.CSSProperties}
    >
      <header className="app-chrome">
        <div>
          <p className="eyebrow">Ghost Visualizer</p>
          <h1>Why AI Safety Scores Lie</h1>
        </div>
        <div className="chrome-meta">
          <span>{activeScene.number}</span>
          <strong>{activeScene.title}</strong>
        </div>
      </header>

      <main className="stage-wrap">
        <div className="cinema-frame">
          <SceneStage activeScene={activeScene}>{children}</SceneStage>
          <div className="scene-progress" aria-hidden="true" key={activeScene.id} />
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
