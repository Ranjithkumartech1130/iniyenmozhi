import { motion } from "framer-motion";

const FloatingOrbs = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    {[
      { size: 300, x: "10%", y: "20%", color: "bg-primary/5", dur: 12 },
      { size: 200, x: "80%", y: "60%", color: "bg-accent/10", dur: 15 },
      { size: 250, x: "60%", y: "10%", color: "bg-secondary/15", dur: 10 },
      { size: 180, x: "30%", y: "80%", color: "bg-primary/8", dur: 18 },
    ].map((orb, i) => (
      <motion.div
        key={i}
        className={`absolute rounded-full ${orb.color} blur-3xl`}
        style={{ width: orb.size, height: orb.size, left: orb.x, top: orb.y }}
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.1, 0.95, 1] }}
        transition={{ duration: orb.dur, repeat: Infinity, ease: "easeInOut" }}
      />
    ))}
  </div>
);

export default FloatingOrbs;
