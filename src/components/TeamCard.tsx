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
        className="relative rounded-2xl bg-card-gradient border border-border p-6 text-center preserve-3d transition-all duration-500"
        whileHover={{ rotateY: 5, rotateX: -3, scale: 1.03 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Image */}
        <motion.div
          className="relative mx-auto mb-5 w-40 h-40 rounded-full overflow-hidden border-4 border-secondary shadow-glow"
          whileHover={{ scale: 1.08 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover object-top"
          />
        </motion.div>

        {/* Info */}
        <h3 className="text-xl font-display text-foreground mb-1">{name}</h3>
        <p className="text-sm font-body font-semibold text-primary mb-3 tracking-wide uppercase">{role}</p>
        <p className="text-sm font-body text-muted-foreground leading-relaxed">{description}</p>

        {/* Decorative line */}
        <motion.div
          className="mt-4 mx-auto h-0.5 bg-primary/30 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: "60%" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: delay + 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
};

export default TeamCard;
