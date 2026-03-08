import { motion } from "framer-motion";

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
      className="group perspective-1000"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay }}
    >
      <motion.div
        className="relative rounded-3xl bg-card-gradient border border-border p-8 text-center preserve-3d transition-all duration-500 overflow-hidden"
        whileHover={{ rotateY: 5, rotateX: -3, scale: 1.03 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-3xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -skew-x-12"
          animate={{ x: ["-200%", "200%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: delay * 2 }}
        />

        {/* Image - no circle, realistic presentation */}
        <motion.div
          className="relative mx-auto mb-6 w-48 h-56 overflow-hidden rounded-2xl"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent z-10"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          />
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover object-top"
          />
        </motion.div>

        {/* Info */}
        <motion.h3
          className="text-xl font-display text-foreground mb-1"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: delay + 0.3 }}
        >
          {name}
        </motion.h3>
        <motion.p
          className="text-sm font-body font-semibold text-primary mb-3 tracking-wide uppercase"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: delay + 0.4 }}
        >
          {role}
        </motion.p>
        <motion.p
          className="text-sm font-body text-muted-foreground leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: delay + 0.5 }}
        >
          {description}
        </motion.p>

        {/* Decorative line */}
        <motion.div
          className="mt-5 mx-auto h-0.5 bg-gradient-to-r from-transparent via-primary/40 to-transparent rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: "80%" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: delay + 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
};

export default TeamCard;
