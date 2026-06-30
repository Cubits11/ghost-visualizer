import { PropsWithChildren } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { SceneSpec } from "../data/scenes";

interface SceneStageProps extends PropsWithChildren {
  activeScene: SceneSpec;
}

export function SceneStage({ activeScene, children }: SceneStageProps) {
  const reducedMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      <motion.section
        key={activeScene.id}
        className="scene-stage"
        data-scene={activeScene.id}
        initial={reducedMotion ? false : { opacity: 0, y: 10, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={reducedMotion ? undefined : { opacity: 0, y: -8, filter: "blur(8px)" }}
        transition={{ duration: reducedMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="scene-copy">
          <p className="scene-kicker">{activeScene.kicker}</p>
          <h2>{activeScene.title}</h2>
          <p>{activeScene.thesis}</p>
        </div>
        {children}
      </motion.section>
    </AnimatePresence>
  );
}
