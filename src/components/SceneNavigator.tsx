import { ArrowLeft, ArrowRight, Pause, Play, Radio } from "lucide-react";
import { SceneSpec } from "../data/scenes";

interface SceneNavigatorProps {
  activeIndex: number;
  scenes: SceneSpec[];
  recordingMode: boolean;
  paused: boolean;
  onNext: () => void;
  onPrevious: () => void;
  onSelectScene: (index: number) => void;
  onTogglePaused: () => void;
  onToggleRecording: () => void;
}

export function SceneNavigator({
  activeIndex,
  scenes,
  recordingMode,
  paused,
  onNext,
  onPrevious,
  onSelectScene,
  onTogglePaused,
  onToggleRecording,
}: SceneNavigatorProps) {
  return (
    <nav className="scene-nav" aria-label="Scene navigation">
      <div className="transport">
        <button type="button" className="icon-button" onClick={onPrevious} title="Previous scene">
          <ArrowLeft aria-hidden="true" />
        </button>
        <button
          type="button"
          className="icon-button"
          onClick={onTogglePaused}
          title={paused ? "Resume" : "Pause"}
        >
          {paused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
        </button>
        <button type="button" className="icon-button" onClick={onNext} title="Next scene">
          <ArrowRight aria-hidden="true" />
        </button>
        <button
          type="button"
          className={`icon-button${recordingMode ? " is-active" : ""}`}
          onClick={onToggleRecording}
          title="Recording mode"
        >
          <Radio aria-hidden="true" />
        </button>
      </div>

      <div className="scene-dots">
        {scenes.map((scene, index) => (
          <button
            key={scene.id}
            type="button"
            className={index === activeIndex ? "is-active" : ""}
            onClick={() => onSelectScene(index)}
            title={scene.title}
            aria-label={scene.title}
            aria-current={index === activeIndex ? "step" : undefined}
          >
            <span>{scene.number}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
