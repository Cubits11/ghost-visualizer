import { Composition, registerRoot } from "remotion";
import { ComponentShowcase } from "./remotion/ComponentShowcase";
import { ShatteringPointEstimateScene } from "./remotion/ShatteringPointEstimateScene";
import {
  FPS,
  SHOWCASE_DURATION_FRAMES,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
  VIS001_DURATION_FRAMES,
} from "./remotion/timeline";
import "./remotion/remotion.css";

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="ShatteringPointEstimateScene"
        component={ShatteringPointEstimateScene}
        durationInFrames={VIS001_DURATION_FRAMES}
        fps={FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />
      <Composition
        id="ComponentShowcase"
        component={ComponentShowcase}
        durationInFrames={SHOWCASE_DURATION_FRAMES}
        fps={FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />
    </>
  );
};

registerRoot(RemotionRoot);
