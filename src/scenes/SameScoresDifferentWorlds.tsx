import { CSSProperties, KeyboardEvent, PointerEvent } from "react";
import { DotWorld } from "../components/DotWorld";
import { IntervalBand } from "../components/IntervalBand";
import { boundedClaim, composedRisk, composedSafety, toyExample } from "../data/mathExamples";

interface SameScoresDifferentWorldsProps {
  overlapFailures: number;
  onOverlapChange: (overlapFailures: number) => void;
}

export function SameScoresDifferentWorlds({
  overlapFailures,
  onOverlapChange,
}: SameScoresDifferentWorldsProps) {
  const risk = composedRisk(overlapFailures);
  const safety = composedSafety(overlapFailures);

  const syncOverlap = (value: number) => {
    onOverlapChange(
      Math.min(toyExample.maxOverlap, Math.max(toyExample.minOverlap, Math.round(value))),
    );
  };

  const syncFromPointer = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = (event.clientX - rect.left) / rect.width;
    syncOverlap(toyExample.minOverlap + ratio * (toyExample.maxOverlap - toyExample.minOverlap));
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    syncFromPointer(event);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.buttons === 1) {
      syncFromPointer(event);
    }
  };

  const onSliderKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      event.preventDefault();
      event.stopPropagation();
      syncOverlap(overlapFailures - 1);
    }

    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      event.preventDefault();
      event.stopPropagation();
      syncOverlap(overlapFailures + 1);
    }

    if (event.key === "Home") {
      event.preventDefault();
      event.stopPropagation();
      syncOverlap(toyExample.minOverlap);
    }

    if (event.key === "End") {
      event.preventDefault();
      event.stopPropagation();
      syncOverlap(toyExample.maxOverlap);
    }
  };

  const sliderPosition =
    ((overlapFailures - toyExample.minOverlap) / (toyExample.maxOverlap - toyExample.minOverlap)) *
    100;

  return (
    <div className="scene-layout same-worlds-layout">
      <div className="world-panels">
        <DotWorld
          title="World 1"
          subtitle="failures separated"
          overlapFailures={toyExample.minOverlap}
          variant="separated"
        />
        <DotWorld
          title="World 2"
          subtitle="shared blind spot"
          overlapFailures={overlapFailures}
          variant="shared"
        />
      </div>

      <div className="overlap-control">
        <div className="control-readout">
          <span>failure overlap</span>
          <strong>{overlapFailures}%</strong>
          <em>composed risk {risk}% / composed safety {safety}%</em>
        </div>
        <div
          className="overlap-slider"
          role="slider"
          tabIndex={0}
          aria-label="Failure overlap"
          aria-valuemin={toyExample.minOverlap}
          aria-valuemax={toyExample.maxOverlap}
          aria-valuenow={overlapFailures}
          aria-valuetext={`${overlapFailures}% shared failure overlap`}
          style={{ "--slider-pos": `${sliderPosition}%` } as CSSProperties}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onKeyDown={onSliderKeyDown}
        >
          <span className="overlap-slider-fill" />
          <span className="overlap-slider-thumb" />
        </div>
        <IntervalBand
          lower={boundedClaim.safetyLower}
          upper={boundedClaim.safetyUpper}
          point={safety}
          label="permitted composed safety"
        />
      </div>
    </div>
  );
}
