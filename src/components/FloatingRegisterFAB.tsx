import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, Sparkles } from 'lucide-react';

interface FloatingRegisterFABProps {
    onClick: () => void;
}

const FloatingRegisterFAB = ({ onClick }: FloatingRegisterFABProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [pulseRings, setPulseRings] = useState<number[]>([]);

    // Show tooltip after a short delay on first appearance
    useEffect(() => {
        const timer = setTimeout(() => setShowTooltip(true), 3000);
        const hideTimer = setTimeout(() => setShowTooltip(false), 8000);
        return () => { clearTimeout(timer); clearTimeout(hideTimer); };
    }, []);

    // Periodic pulse rings
    useEffect(() => {
        const interval = setInterval(() => {
            const id = Date.now();
            setPulseRings(prev => [...prev, id]);
            setTimeout(() => {
                setPulseRings(prev => prev.filter(r => r !== id));
            }, 2000);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-2">
            {/* Tooltip */}
            <AnimatePresence>
                {(showTooltip || isHovered) && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.8 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                        className="mb-1 px-4 py-2 rounded-xl text-sm font-body font-semibold text-white whitespace-nowrap"
                        style={{
                            background: 'linear-gradient(135deg, hsl(270, 50%, 45%), hsl(330, 60%, 50%))',
                            boxShadow: '0 8px 32px rgba(120, 60, 200, 0.35)',
                        }}
                    >
                        <div className="flex items-center gap-1.5">
                            <Sparkles size={14} />
                            Join Our Community!
                        </div>
                        {/* Arrow */}
                        <div
                            className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45"
                            style={{
                                background: 'linear-gradient(135deg, hsl(300, 55%, 48%), hsl(330, 60%, 50%))',
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* FAB Button Container */}
            <div className="relative">
                {/* Pulse rings */}
                <AnimatePresence>
                    {pulseRings.map(id => (
                        <motion.div
                            key={id}
                            className="absolute inset-0 rounded-full"
                            style={{
                                border: '2px solid hsl(270, 50%, 45%)',
                            }}
                            initial={{ scale: 1, opacity: 0.6 }}
                            animate={{ scale: 2.5, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 2, ease: 'easeOut' }}
                        />
                    ))}
                </AnimatePresence>

                {/* Rotating gradient ring */}
                <motion.div
                    className="absolute -inset-1 rounded-full"
                    style={{
                        background: 'conic-gradient(from 0deg, hsl(270, 50%, 45%), hsl(330, 60%, 55%), hsl(270, 60%, 60%), hsl(280, 50%, 50%), hsl(270, 50%, 45%))',
                        padding: '2px',
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                >
                    <div className="w-full h-full rounded-full bg-background" />
                </motion.div>

                {/* Main FAB */}
                <motion.button
                    onClick={onClick}
                    onMouseEnter={() => { setIsHovered(true); setShowTooltip(true); }}
                    onMouseLeave={() => { setIsHovered(false); setShowTooltip(false); }}
                    className="relative w-14 h-14 rounded-full flex items-center justify-center overflow-hidden cursor-pointer"
                    style={{
                        background: 'linear-gradient(135deg, hsl(270, 50%, 45%), hsl(330, 60%, 50%))',
                        boxShadow: '0 4px 24px rgba(120, 60, 200, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
                    }}
                    whileHover={{
                        scale: 1.15,
                        boxShadow: '0 8px 40px rgba(120, 60, 200, 0.6), inset 0 1px 0 rgba(255,255,255,0.3)',
                    }}
                    whileTap={{ scale: 0.9 }}
                    animate={{
                        y: [0, -4, 0],
                    }}
                    transition={{
                        y: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                    }}
                >
                    {/* Glassmorphism inner layer */}
                    <div
                        className="absolute inset-0 rounded-full"
                        style={{
                            background: 'linear-gradient(145deg, rgba(255,255,255,0.15) 0%, transparent 50%)',
                        }}
                    />

                    {/* Shimmer sweep */}
                    <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{
                            background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)',
                        }}
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2 }}
                    />

                    {/* Icon */}
                    <motion.div
                        className="relative z-10 text-white"
                        animate={isHovered ? { rotate: [0, -10, 10, 0] } : {}}
                        transition={{ duration: 0.5 }}
                    >
                        <UserPlus size={22} strokeWidth={2.5} />
                    </motion.div>
                </motion.button>

                {/* Orbiting particles */}
                {[0, 120, 240].map((deg, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full"
                        style={{
                            background: i === 0 ? 'hsl(270, 50%, 60%)' : i === 1 ? 'hsl(330, 60%, 60%)' : 'hsl(290, 45%, 55%)',
                            top: '50%',
                            left: '50%',
                            boxShadow: `0 0 8px ${i === 0 ? 'hsl(270, 50%, 60%)' : i === 1 ? 'hsl(330, 60%, 60%)' : 'hsl(290, 45%, 55%)'}`,
                        }}
                        animate={{
                            x: [
                                Math.cos((deg * Math.PI) / 180) * 28,
                                Math.cos(((deg + 120) * Math.PI) / 180) * 28,
                                Math.cos(((deg + 240) * Math.PI) / 180) * 28,
                                Math.cos((deg * Math.PI) / 180) * 28,
                            ],
                            y: [
                                Math.sin((deg * Math.PI) / 180) * 28,
                                Math.sin(((deg + 120) * Math.PI) / 180) * 28,
                                Math.sin(((deg + 240) * Math.PI) / 180) * 28,
                                Math.sin((deg * Math.PI) / 180) * 28,
                            ],
                            scale: [0.8, 1.2, 0.8],
                            opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: 'linear',
                            delay: i * 0.5,
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default FloatingRegisterFAB;
