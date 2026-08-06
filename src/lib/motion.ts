export const motionTokens = {
  ease: [0.22, 1, 0.36, 1] as const,
  press: { duration: 0.12 },
  hover: { duration: 0.2 },
  component: { duration: 0.48, ease: [0.22, 1, 0.36, 1] as const },
  scene: { duration: 0.82, ease: [0.16, 1, 0.3, 1] as const },
};
