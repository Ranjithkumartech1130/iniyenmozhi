import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Heart {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  type: "heart" | "sparkle" | "petal";
}

const colors = [
  "hsl(270 50% 55%)",
  "hsl(330 60% 60%)",
  "hsl(300 40% 65%)",
  "hsl(350 50% 65%)",
  "hsl(280 45% 60%)",
];

const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [isPointer, setIsPointer] = useState(false);
  const idRef = useRef(0);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName === "BUTTON" ||
        target.tagName === "A"
      );
    };

    const handleClick = (e: MouseEvent) => {
      const count = 7 + Math.floor(Math.random() * 5);
      const newHearts: Heart[] = [];
      const types: Heart["type"][] = ["heart", "sparkle", "petal"];
      for (let i = 0; i < count; i++) {
        newHearts.push({
          id: ++idRef.current,
          x: e.clientX + (Math.random() - 0.5) * 50,
          y: e.clientY + (Math.random() - 0.5) * 50,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 12 + Math.random() * 16,
          type: types[Math.floor(Math.random() * types.length)],
        });
      }
      setHearts((prev) => [...prev, ...newHearts]);
      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => !newHearts.find((n) => n.id === h.id)));
      }, 1800);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  const renderShape = (h: Heart) => {
    if (h.type === "sparkle") {
      return (
        <svg width={h.size} height={h.size} viewBox="0 0 24 24" fill={h.color}>
          <path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" />
        </svg>
      );
    }
    if (h.type === "petal") {
      return (
        <svg width={h.size} height={h.size} viewBox="0 0 24 24" fill={h.color} opacity="0.8">
          <ellipse cx="12" cy="12" rx="5" ry="10" />
        </svg>
      );
    }
    return (
      <svg width={h.size} height={h.size} viewBox="0 0 24 24" fill={h.color}>
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    );
  };

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full border-2 border-primary/50 pointer-events-none z-[9999] mix-blend-difference"
        animate={{ x: mousePos.x - 20, y: mousePos.y - 20, scale: isPointer ? 1.5 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.5 }}
      />
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-primary pointer-events-none z-[9999]"
        animate={{ x: mousePos.x - 4, y: mousePos.y - 4, scale: isPointer ? 2 : 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 15 }}
      />
      {/* Trailing glow */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full bg-primary/20 blur-md pointer-events-none z-[9998]"
        animate={{ x: mousePos.x - 12, y: mousePos.y - 12 }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.8 }}
      />

      {/* Heart / sparkle / petal blooms */}
      <AnimatePresence>
        {hearts.map((heart) => {
          const angle = Math.random() * Math.PI * 2;
          const distance = 60 + Math.random() * 80;
          return (
            <motion.div
              key={heart.id}
              className="fixed pointer-events-none z-[9999]"
              style={{ left: heart.x, top: heart.y }}
              initial={{ scale: 0, opacity: 1, x: 0, y: 0, rotate: 0 }}
              animate={{
                scale: [0, 1.4, 1, 0.6, 0],
                opacity: [0, 1, 1, 0.6, 0],
                x: Math.cos(angle) * distance,
                y: Math.sin(angle) * distance - 40,
                rotate: Math.random() * 360,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {renderShape(heart)}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </>
  );
};

export default CustomCursor;
