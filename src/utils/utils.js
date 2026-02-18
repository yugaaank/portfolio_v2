export const cl = (v) => Math.min(Math.max(v, 0), 1);
export const lerp = (a, b, t) => a + (b - a) * cl(t);
export const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
export const easeInCubic = (t) => t * t * t;

export function applyLayer(ref, leftVw, widthVw) {
  if (!ref.current) return;
  ref.current.style.left = `${leftVw}vw`;
  ref.current.style.width = `${Math.max(0, widthVw)}vw`;
}

export function applyPanel(ref, leftVw, widthVw, alpha, ty = 0) {
  if (!ref.current) return;
  const s = ref.current.style;
  s.left = `${leftVw}vw`;
  s.width = `${Math.max(0, widthVw)}vw`;
  s.opacity = alpha;
  s.transform = ty ? `translateY(${ty}px)` : "";
}
