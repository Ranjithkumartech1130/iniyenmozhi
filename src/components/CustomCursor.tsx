import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Heart {
  id: number;
  x: number;
  y: number;
}

const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    let idCounter = 0;

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
      const count = 5 + Math.floor(Math.random() * 4);
      const newHearts: Heart[] = [];
      for (let i = 0; i < count; i++) {
        newHearts.push({
          id: ++idCounter,
          x: e.clientX + (Math.random() - 0.5) * 40,
          y: e.clientY + (Math.random() - 0.5) * 40,
        });
      }
      setHearts((prev) => [...prev, ...newHearts]);
      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => !newHearts.find((n) => n.id === h.id)));
      }, 1200);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("click", handleClick);
    };
  }, []);

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

      {/* Heart blooms */}
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="fixed pointer-events-none z-[9999] text-primary"
            style={{ left: heart.x, top: heart.y }}
            initial={{ scale: 0, opacity: 1, y: 0, rotate: Math.random() * 60 - 30 }}
            animate={{
              scale: [0, 1.2, 0.8],
              opacity: [1, 1, 0],
              y: -80 - Math.random() * 60,
              x: (Math.random() - 0.5) * 80,
              rotate: Math.random() * 90 - 45,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <svg
              width={16 + Math.random() * 12}
              height={16 + Math.random() * 12}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
};

export default CustomCursor;
