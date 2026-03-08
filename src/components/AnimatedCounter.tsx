import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface CounterProps {
    end: number;
    suffix?: string;
    label: string;
    duration?: number;
    delay?: number;
}

const AnimatedCounter = ({ end, suffix = '', label, duration = 2, delay = 0 }: CounterProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isInView) return;
        const startTime = Date.now() + delay * 1000;
        let frameId: number;

        const tick = () => {
            const elapsed = (Date.now() - startTime) / 1000;
            if (elapsed < 0) {
                frameId = requestAnimationFrame(tick);
                return;
            }
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) {
                frameId = requestAnimationFrame(tick);
            }
        };

        frameId = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frameId);
    }, [isInView, end, duration, delay]);

    return (
        <motion.div
            ref={ref}
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay }}
        >
            <div
                className="text-5xl md:text-6xl font-display font-bold bg-clip-text text-transparent"
                style={{
                    backgroundImage: 'linear-gradient(135deg, hsl(270, 50%, 45%), hsl(330, 60%, 55%))',
                }}
            >
                {count}{suffix}
            </div>
            <p className="mt-2 text-sm font-body text-muted-foreground uppercase tracking-widest">{label}</p>
        </motion.div>
    );
};

export default AnimatedCounter;
