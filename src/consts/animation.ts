interface aType {
  type: string;
  property?: string;
  duration?: number;
  springDamping?: number;
}

interface asType {
  duration: number;
  create: aType;
  update: aType;
  delete: aType;
}

export const animationSpring: asType = {
  duration: 700,
  create: { type: 'linear', property: 'opacity', duration: 600 },
  update: { type: 'spring', springDamping: 0.5 },
  delete: { type: 'linear', property: 'opacity', duration: 200 }
};

export const animationLinear: asType = {
  duration: 300,
  create: { type: 'linear', property: 'opacity', duration: 200 },
  update: { type: 'linear' },
  delete: { type: 'linear', property: 'opacity', duration: 600 }
};
