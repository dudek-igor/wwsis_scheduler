import type { Engine } from "tsparticles-engine";
import Particles from "react-tsparticles";
import { useCallback } from "react";
import { particlesConfig } from "@/config";

const ParticlesBackground = (): JSX.Element => {
  const particlesInit = useCallback(async (engine: Engine) => {
    // console.log(engine)

    // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    const { loadSlim } = await import("tsparticles-slim");
    // console.log(data)

    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async () => {
    // console.log(container)
    // container: Container | undefined
  }, []);
  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={particlesConfig}
      style={{
        zIndex: 0,
      }}
    />
  );
};

export default ParticlesBackground;
