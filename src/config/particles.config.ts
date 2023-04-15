import type { ISourceOptions } from "tsparticles-engine";

export const particlesConfig: ISourceOptions = {
  background: { color: { value: "#7AD7F0" } },
  fpsLimit: 120,
  particles: {
    color: { value: "#fff" },
    links: {
      color: "#fff",
      distance: 200,
      enable: true,
      opacity: 0.75,
      width: 2,
    },
    collisions: { enable: false },
    move: {
      enable: true,
      outModes: { default: "bounce" },
      random: false,
      speed: 0.5,
      straight: true,
    },
    number: {
      density: { enable: true, area: 800 },
      value: 150,
    },
    opacity: { value: 0.5 },
    shape: { type: "circle" },
    size: { value: { min: 1, max: 4 }, random: true },
  },
  detectRetina: true,
};
