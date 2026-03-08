import { useEffect, useRef, useCallback } from "react";

/**
 * GPU-accelerated custom cursor using direct DOM manipulation
 * instead of React state + Framer Motion on every mouse move.
 * This eliminates the expensive React re-renders on mousemove events.
 */

const COLORS = [
  "hsl(270 50% 55%)",
  "hsl(330 60% 60%)",
  "hsl(300 40% 65%)",
  "hsl(350 50% 65%)",
  "hsl(280 45% 60%)",
];

interface ClickParticle {
  el: HTMLDivElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  scale: number;
}

const CustomCursor = () => {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const particlesRef = useRef<ClickParticle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const createParticleSVG = (type: 'heart' | 'sparkle' | 'petal', color: string, size: number): string => {
    if (type === 'sparkle') {
      return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}"><path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z"/></svg>`;
    }
    if (type === 'petal') {
      return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}" opacity="0.8"><ellipse cx="12" cy="12" rx="5" ry="10"/></svg>`;
    }
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
  };

  const spawnParticles = useCallback((x: number, y: number) => {
    if (!containerRef.current) return;
    const types: ('heart' | 'sparkle' | 'petal')[] = ['heart', 'sparkle', 'petal'];
    const count = 6 + Math.floor(Math.random() * 4);

    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      el.style.cssText = `position:fixed;pointer-events:none;z-index:9999;will-change:transform,opacity;`;
      const type = types[Math.floor(Math.random() * 3)];
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const size = 12 + Math.random() * 16;
      el.innerHTML = createParticleSVG(type, color, size);
      containerRef.current.appendChild(el);

      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 4;
      particlesRef.current.push({
        el,
        x: x + (Math.random() - 0.5) * 30,
        y: y + (Math.random() - 0.5) * 30,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        life: 0,
        maxLife: 50 + Math.random() * 30,
        scale: 0,
      });
    }
  }, []);

  useEffect(() => {
    let animId: number;

    const handleMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;

      const target = e.target as HTMLElement;
      const isPointer =
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName === "BUTTON" ||
        target.tagName === "A";

      if (outerRef.current) {
        outerRef.current.style.width = isPointer ? '48px' : '40px';
        outerRef.current.style.height = isPointer ? '48px' : '40px';
      }
      if (innerRef.current) {
        innerRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px) scale(${isPointer ? 2 : 1})`;
      }
    };

    const handleClick = (e: MouseEvent) => {
      spawnParticles(e.clientX, e.clientY);
    };

    const animate = () => {
      const m = mouseRef.current;
      m.x = lerp(m.x, m.targetX, 0.15);
      m.y = lerp(m.y, m.targetY, 0.15);

      if (outerRef.current) {
        const w = parseFloat(outerRef.current.style.width) || 40;
        outerRef.current.style.transform = `translate(${m.x - w / 2}px, ${m.y - w / 2}px)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${lerp(parseFloat(glowRef.current.dataset.x || '0'), m.targetX - 12, 0.08)}px, ${lerp(parseFloat(glowRef.current.dataset.y || '0'), m.targetY - 12, 0.08)}px)`;
        glowRef.current.dataset.x = String(lerp(parseFloat(glowRef.current.dataset.x || '0'), m.targetX - 12, 0.08));
        glowRef.current.dataset.y = String(lerp(parseFloat(glowRef.current.dataset.y || '0'), m.targetY - 12, 0.08));
      }

      // Update particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08; // gravity
        p.vx *= 0.98;

        const progress = p.life / p.maxLife;
        const opacity = progress < 0.2 ? progress * 5 : 1 - (progress - 0.2) / 0.8;
        p.scale = progress < 0.15 ? progress / 0.15 : 1 - Math.max(0, progress - 0.6) / 0.4;
        const rotation = p.life * 3;

        p.el.style.transform = `translate(${p.x}px, ${p.y}px) scale(${p.scale}) rotate(${rotation}deg)`;
        p.el.style.opacity = String(Math.max(0, opacity));

        if (p.life >= p.maxLife) {
          p.el.remove();
          particlesRef.current.splice(i, 1);
        }
      }

      animId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("click", handleClick);
    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("click", handleClick);
      cancelAnimationFrame(animId);
    };
  }, [spawnParticles]);

  return (
    <>
      {/* Outer ring */}
      <div
        ref={outerRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          width: 40,
          height: 40,
          border: '2px solid hsl(270 50% 55% / 0.5)',
          willChange: 'transform',
          transition: 'width 0.2s, height 0.2s',
        }}
      />
      {/* Inner dot */}
      <div
        ref={innerRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999]"
        style={{
          background: 'hsl(270 50% 55%)',
          willChange: 'transform',
          transition: 'transform 0.1s ease-out',
        }}
      />
      {/* Trailing glow */}
      <div
        ref={glowRef}
        data-x="0"
        data-y="0"
        className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-[9998]"
        style={{
          background: 'hsl(270 50% 55% / 0.2)',
          filter: 'blur(8px)',
          willChange: 'transform',
        }}
      />
      {/* Particle container */}
      <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[9999]" />
    </>
  );
};

export default CustomCursor;
