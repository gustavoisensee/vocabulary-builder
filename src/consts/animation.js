export const animationSpring = {
  duration: 700,
  create: { type: 'linear', property: 'opacity', duration: 600 },
  update: { type: 'spring', springDamping: 0.5 },
  delete: { type: 'linear', property: 'opacity', duration: 200 }
};
