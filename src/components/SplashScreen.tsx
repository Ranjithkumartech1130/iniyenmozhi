import { motion } from "framer-motion";
import logo from "@/assets/logo.png";
import splashBg from "@/assets/splash-bg.jpeg";

interface SplashScreenProps {
  onEnter: () => void;
}

const SplashScreen = ({ onEnter }: SplashScreenProps) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center cursor-pointer overflow-hidden"
      onClick={onEnter}
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* Full-screen background image */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: 'easeOut' }}
      >
        <img
          src={splashBg}
          alt=""
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 30%' }}
        />
      </motion.div>

      {/* Dark gradient overlay to ensure text visibility */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              to bottom,
              rgba(30, 10, 50, 0.45) 0%,
              rgba(40, 15, 60, 0.55) 30%,
              rgba(30, 10, 50, 0.50) 60%,
              rgba(20, 5, 40, 0.75) 100%
            )
          `,
        }}
      />

      {/* Subtle animated light effects over the image */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 40%, rgba(180,130,255,0.12) 0%, transparent 60%)',
        }}
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Floating particles for magical feel */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 3 + i * 2,
            height: 3 + i * 2,
            background: `rgba(220, 190, 255, ${0.3 + (i % 3) * 0.1})`,
            left: `${10 + i * 11}%`,
            top: `${15 + (i % 4) * 20}%`,
            filter: 'blur(1px)',
          }}
          animate={{
            y: [0, -30 - i * 8, 0],
            x: [0, (i % 2 === 0 ? 15 : -15), 0],
            opacity: [0.2, 0.7, 0.2],
          }}
          transition={{
            duration: 5 + i * 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.6,
          }}
        />
      ))}

      {/* Logo with 3D perspective entrance */}
      <motion.div
        className="relative z-10"
        style={{ perspective: 1200 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ opacity: 0, rotateY: -40, rotateX: 15, scale: 0.6, z: -200 }}
          animate={{ opacity: 1, rotateY: 0, rotateX: 0, scale: 1, z: 0 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <motion.img
            src={logo}
            alt="Iniyenmozhi - Women Community"
            className="w-[280px] md:w-[440px] lg:w-[540px]"
            style={{
              filter: 'drop-shadow(0 8px 30px rgba(180, 120, 255, 0.5)) brightness(1.15)',
            }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>

      {/* Tagline - always visible with strong contrast */}
      <motion.div
        className="mt-8 overflow-hidden relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <motion.p
          className="text-lg md:text-xl font-body tracking-[0.3em] uppercase text-center px-4"
          style={{
            color: 'rgba(230, 210, 255, 0.95)',
            textShadow: '0 2px 20px rgba(120, 60, 200, 0.6), 0 0 40px rgba(180, 130, 255, 0.3)',
          }}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Where Words Bloom from the Heart
        </motion.p>
      </motion.div>

      {/* Animated scroll hint - always visible */}
      <motion.div
        className="mt-16 flex flex-col items-center gap-3 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <motion.div
          className="relative w-7 h-12 rounded-full flex items-start justify-center p-1.5"
          style={{
            border: '2px solid rgba(220, 190, 255, 0.4)',
            background: 'rgba(220, 190, 255, 0.08)',
          }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-3 rounded-full"
            style={{ background: 'rgba(220, 190, 255, 0.7)' }}
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
        <motion.span
          className="text-sm font-body tracking-wider"
          style={{
            color: 'rgba(220, 200, 255, 0.85)',
            textShadow: '0 1px 10px rgba(120, 60, 200, 0.4)',
          }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Click anywhere to enter
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen;
