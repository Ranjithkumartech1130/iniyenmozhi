import { useRef, useState, ReactNode, CSSProperties } from 'react';
import { motion } from 'framer-motion';

interface Tilt3DCardProps {
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
    glareColor?: string;
    intensity?: number;
}

/**
 * GPU-accelerated 3D tilt card using CSS transforms.
 * Uses onMouseMove with throttled RAF instead of expensive Framer spring animations.
 */
const Tilt3DCard = ({
    children,
    className = '',
    style,
    glareColor = 'rgba(180,130,255,0.15)',
    intensity = 12,
}: Tilt3DCardProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
    const rafRef = useRef<number>(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
            if (!ref.current) return;
            const rect = ref.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const dx = (e.clientX - centerX) / (rect.width / 2);
            const dy = (e.clientY - centerY) / (rect.height / 2);
            setTransform({
                rotateX: -dy * intensity,
                rotateY: dx * intensity,
                glareX: ((e.clientX - rect.left) / rect.width) * 100,
                glareY: ((e.clientY - rect.top) / rect.height) * 100,
            });
        });
    };

    const handleMouseLeave = () => {
        cancelAnimationFrame(rafRef.current);
        setTransform({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
    };

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: '1200px' }}
        >
            <motion.div
                className={className}
                animate={{
                    rotateX: transform.rotateX,
                    rotateY: transform.rotateY,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 25, mass: 0.5 }}
                style={{ transformStyle: 'preserve-3d', ...style }}
            >
                {/* Dynamic glare effect */}
                <div
                    className="absolute inset-0 rounded-[inherit] pointer-events-none z-10"
                    style={{
                        background: `radial-gradient(circle at ${transform.glareX}% ${transform.glareY}%, ${glareColor}, transparent 60%)`,
                        transition: 'background 0.15s ease-out',
                    }}
                />
                {children}
            </motion.div>
        </div>
    );
};

export default Tilt3DCard;
