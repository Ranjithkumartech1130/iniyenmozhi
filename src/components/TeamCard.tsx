import { motion } from "framer-motion";
import Tilt3DCard from "./Tilt3DCard";

interface TeamCardProps {
  name: string;
  role: string;
  description: string;
  image: string;
  delay?: number;
}

const TeamCard = ({ name, role, description, image, delay = 0 }: TeamCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay }}
    >
      <Tilt3DCard
        className="relative rounded-3xl border border-border p-8 text-center overflow-hidden group"
        glareColor="rgba(180,130,255,0.12)"
        intensity={10}
      >
        {/* Card background */}
        <div
          className="absolute inset-0 rounded-3xl"
          style={{
            background: 'linear-gradient(145deg, hsl(270, 30%, 98%), hsl(300, 25%, 96%))',
          }}
        />

        {/* Hover glow */}
        <div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: 'linear-gradient(135deg, rgba(180,130,255,0.06), rgba(255,192,230,0.06))',
          }}
        />

        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(105deg, transparent 40%, rgba(180,130,255,0.05) 50%, transparent 60%)',
            transform: 'skewX(-12deg)',
          }}
          animate={{ x: ['-200%', '200%'] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: (delay || 0) * 2 }}
        />

        {/* Realistic Image Container */}
        <motion.div
          className="relative mx-auto mb-6 w-52 h-60 overflow-hidden rounded-2xl"
          style={{
            boxShadow: '0 16px 48px rgba(120, 60, 200, 0.18), 0 6px 16px rgba(0,0,0,0.1)',
            transform: 'translateZ(30px)',
          }}
          whileHover={{ scale: 1.03, y: -4 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* Realistic image with pro-photo treatment */}
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover object-top"
            loading="lazy"
            style={{
              imageRendering: 'auto',
              filter: 'contrast(1.04) saturate(1.05) brightness(1.02)',
            }}
          />

          {/* Subtle vignette overlay for depth */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.08) 100%),
                linear-gradient(to top, rgba(120, 60, 200, 0.12) 0%, transparent 40%)
              `,
            }}
          />

          {/* Top highlight for studio-light effect */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 30%)',
            }}
          />

          {/* Hover border glow */}
          <div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              boxShadow: 'inset 0 0 20px rgba(180,130,255,0.15)',
            }}
          />
        </motion.div>

        {/* Name */}
        <motion.h3
          className="text-xl font-display text-foreground mb-1 relative"
          style={{ transform: 'translateZ(20px)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: delay + 0.3 }}
        >
          {name}
        </motion.h3>

        {/* Role with gradient text */}
        <motion.p
          className="text-sm font-body font-semibold mb-3 tracking-wide uppercase relative"
          style={{
            transform: 'translateZ(15px)',
            background: 'linear-gradient(135deg, hsl(270, 50%, 45%), hsl(330, 60%, 55%))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: delay + 0.4 }}
        >
          {role}
        </motion.p>

        {/* Description */}
        <motion.p
          className="text-sm font-body text-muted-foreground leading-relaxed relative"
          style={{ transform: 'translateZ(10px)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: delay + 0.5 }}
        >
          {description}
        </motion.p>

        {/* Decorative gradient line */}
        <motion.div
          className="mt-5 mx-auto h-0.5 rounded-full relative"
          style={{
            background: 'linear-gradient(90deg, transparent, hsl(270, 50%, 60%), hsl(330, 60%, 60%), transparent)',
            transform: 'translateZ(5px)',
          }}
          initial={{ width: 0 }}
          whileInView={{ width: "80%" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: delay + 0.3 }}
        />
      </Tilt3DCard>
    </motion.div>
  );
};

export default TeamCard;
