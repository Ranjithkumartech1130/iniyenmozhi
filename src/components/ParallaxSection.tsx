import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  speed?: number;
}

const ParallaxSection = ({ children, className = "", id, speed = 0.3 }: ParallaxSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [80 * speed, -80 * speed]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

  return (
    <motion.section ref={ref} id={id} className={className} style={{ opacity }}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </motion.section>
  );
};

export default ParallaxSection;
