import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

interface SplashScreenProps {
  onEnter: () => void;
}

const SplashScreen = ({ onEnter }: SplashScreenProps) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-hero-gradient cursor-pointer"
      onClick={onEnter}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Floating decorative orbs */}
      <motion.div
        className="absolute top-20 left-20 w-32 h-32 rounded-full bg-primary/10 blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-32 right-20 w-48 h-48 rounded-full bg-accent/20 blur-3xl"
        animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-secondary/30 blur-2xl"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      {/* Logo */}
      <motion.div
        className="perspective-1000"
        initial={{ opacity: 0, rotateY: -30, scale: 0.7 }}
        animate={{ opacity: 1, rotateY: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <motion.img
          src={logo}
          alt="Iniyenmozhi - Women Community"
          className="w-[320px] md:w-[500px] lg:w-[600px] drop-shadow-lg"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Tagline */}
      <motion.p
        className="mt-8 text-lg md:text-xl font-body text-muted-foreground tracking-widest uppercase"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        Empowering Women, Inspiring Change
      </motion.p>

      {/* Click hint */}
      <motion.div
        className="mt-16 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-primary/40 flex items-start justify-center p-1"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-3 rounded-full bg-primary/60"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
        <span className="text-sm text-muted-foreground font-body">Click anywhere to enter</span>
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen;
