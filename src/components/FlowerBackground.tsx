import { useMemo } from 'react';
import { motion } from 'framer-motion';

/* ─── Individual SVG Flower ─── */
const FlowerSVG = ({ size, color1, color2 }: { size: number; color1: string; color2: string }) => (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Outer petals */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <ellipse
                key={deg}
                cx="50"
                cy="22"
                rx="14"
                ry="26"
                fill={color1}
                opacity="0.7"
                transform={`rotate(${deg} 50 50)`}
            />
        ))}
        {/* Inner petals */}
        {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((deg) => (
            <ellipse
                key={deg}
                cx="50"
                cy="28"
                rx="10"
                ry="20"
                fill={color2}
                opacity="0.55"
                transform={`rotate(${deg} 50 50)`}
            />
        ))}
        {/* Center */}
        <circle cx="50" cy="50" r="12" fill="#fff" opacity="0.9" />
        <circle cx="50" cy="50" r="7" fill={color2} opacity="0.6" />
        {/* Sparkle dots */}
        <circle cx="50" cy="50" r="3" fill="#fff" />
    </svg>
);

/* ─── Small Petal Particle ─── */
const PetalSVG = ({ size, color }: { size: number; color: string }) => (
    <svg width={size} height={size * 1.6} viewBox="0 0 30 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="15" cy="24" rx="12" ry="22" fill={color} opacity="0.5" />
        <ellipse cx="15" cy="24" rx="6" ry="16" fill="#fff" opacity="0.3" />
    </svg>
);

/* ─── Animated Floating Flower (GPU-optimized) ─── */
const AnimatedFlower = ({ x, y, size, color1, color2, duration, delay, rotDir }: any) => (
    <motion.div
        className="absolute will-change-transform"
        style={{
            left: `${x}%`,
            top: `${y}%`,
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
        }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
            opacity: [0, 0.75, 0.75, 0],
            scale: [0.5, 1, 1, 0.5],
            y: [0, -50, -100, -150],
            x: [0, rotDir * 25, rotDir * -15, rotDir * 8],
            rotateZ: [0, rotDir * 180, rotDir * 360],
        }}
        transition={{
            duration,
            repeat: Infinity,
            delay,
            ease: 'easeInOut',
        }}
    >
        <FlowerSVG size={size} color1={color1} color2={color2} />
    </motion.div>
);

/* ─── Animated Falling Petal (GPU-optimized) ─── */
const AnimatedPetal = ({ x, size, color, duration, delay, swayDir }: any) => (
    <motion.div
        className="absolute top-0 will-change-transform"
        style={{
            left: `${x}%`,
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
        }}
        initial={{ opacity: 0, y: -40 }}
        animate={{
            opacity: [0, 0.6, 0.6, 0],
            y: [-40, 400, 800],
            x: [0, swayDir * 60, swayDir * -30],
            rotateZ: [0, swayDir * 120, swayDir * 360],
        }}
        transition={{
            duration,
            repeat: Infinity,
            delay,
            ease: 'easeInOut',
        }}
    >
        <PetalSVG size={size} color={color} />
    </motion.div>
);

/* ─── Main Background Component ─── */
export default function FlowerBackground() {
    // Reduced count for better performance: 12 flowers instead of 18
    const flowers = useMemo(() => {
        const palette = [
            { c1: '#d4b5ff', c2: '#e8d5ff' },
            { c1: '#c9a0ff', c2: '#dfc4ff' },
            { c1: '#e6ccff', c2: '#f3e6ff' },
            { c1: '#b388ff', c2: '#d1b3ff' },
            { c1: '#f0d6ff', c2: '#faf0ff' },
            { c1: '#dbb4f6', c2: '#ebd6fb' },
        ];

        return Array.from({ length: 12 }).map((_, i) => {
            const pal = palette[i % palette.length];
            return {
                id: `flower-${i}`,
                x: Math.random() * 95,
                y: 30 + Math.random() * 65,
                size: 40 + Math.random() * 50,
                color1: pal.c1,
                color2: pal.c2,
                duration: 18 + Math.random() * 12,
                delay: Math.random() * -30,
                rotDir: Math.random() > 0.5 ? 1 : -1,
            };
        });
    }, []);

    // Reduced count: 14 petals instead of 20
    const petals = useMemo(() => {
        const colors = ['#d4b5ff', '#e8d5ff', '#f5ebff', '#c9a0ff', '#ffcce6', '#ffe0f0'];
        return Array.from({ length: 14 }).map((_, i) => ({
            id: `petal-${i}`,
            x: Math.random() * 100,
            size: 10 + Math.random() * 16,
            color: colors[i % colors.length],
            duration: 12 + Math.random() * 10,
            delay: Math.random() * -20,
            swayDir: Math.random() > 0.5 ? 1 : -1,
        }));
    }, []);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Gradient Background */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        'linear-gradient(145deg, hsl(270 55% 96%) 0%, hsl(280 40% 94%) 25%, hsl(290 30% 96%) 50%, hsl(300 20% 98%) 75%, #ffffff 100%)',
                }}
            />

            {/* Soft glowing orbs — using CSS animation for perf */}
            <div
                className="absolute rounded-full animate-pulse"
                style={{
                    width: 450,
                    height: 450,
                    top: '10%',
                    left: '15%',
                    background: 'radial-gradient(circle, rgba(180,130,255,0.2) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                    animationDuration: '8s',
                }}
            />
            <div
                className="absolute rounded-full animate-pulse"
                style={{
                    width: 500,
                    height: 500,
                    bottom: '5%',
                    right: '10%',
                    background: 'radial-gradient(circle, rgba(220,170,255,0.15) 0%, transparent 70%)',
                    filter: 'blur(80px)',
                    animationDuration: '12s',
                    animationDelay: '3s',
                }}
            />
            <div
                className="absolute rounded-full animate-pulse"
                style={{
                    width: 350,
                    height: 350,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: 'radial-gradient(circle, rgba(255,190,230,0.12) 0%, transparent 70%)',
                    filter: 'blur(70px)',
                    animationDuration: '10s',
                    animationDelay: '5s',
                }}
            />

            {/* Floating 3D flowers */}
            {flowers.map((f) => (
                <AnimatedFlower key={f.id} {...f} />
            ))}

            {/* Falling petals */}
            {petals.map((p) => (
                <AnimatedPetal key={p.id} {...p} />
            ))}

            {/* Subtle glass overlay */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        'radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(255,255,255,0.2) 0%, transparent 50%)',
                }}
            />
        </div>
    );
}
