import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type Particle = {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
  type: 'star' | 'circle' | 'sparkle';
};

const COLORS = [
  '#fbbf24', // yellow-400
  '#f59e0b', // amber-500
  '#a78bfa', // violet-400
  '#818cf8', // indigo-400
  '#34d399', // emerald-400
  '#f472b6', // pink-400
  '#fb923c', // orange-400
];

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: 50 + (Math.random() - 0.5) * 60,
    y: 50 + (Math.random() - 0.5) * 40,
    size: Math.random() * 16 + 8,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    rotation: Math.random() * 360,
    type: (['star', 'circle', 'sparkle'] as const)[Math.floor(Math.random() * 3)],
  }));
}

function StarShape({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function SparkleShape({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41L12 0Z" />
    </svg>
  );
}

type StarAnimationProps = {
  trigger: boolean;
  onComplete?: () => void;
};

export function StarAnimation({ trigger, onComplete }: StarAnimationProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (trigger) {
      setParticles(generateParticles(18));
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        onComplete?.();
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [trigger, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                scale: 0,
                opacity: 1,
                rotate: 0,
              }}
              animate={{
                left: `${p.x + (Math.random() - 0.5) * 40}%`,
                top: `${p.y + (Math.random() - 0.5) * 50 - 20}%`,
                scale: [0, 1.3, 0.8, 0],
                opacity: [0, 1, 1, 0],
                rotate: p.rotation + (Math.random() > 0.5 ? 180 : -180),
              }}
              transition={{
                duration: 1.2 + Math.random() * 0.6,
                ease: 'easeOut',
                delay: Math.random() * 0.3,
              }}
              className="absolute"
              style={{ transform: 'translate(-50%, -50%)' }}
            >
              {p.type === 'star' && <StarShape size={p.size} color={p.color} />}
              {p.type === 'sparkle' && <SparkleShape size={p.size} color={p.color} />}
              {p.type === 'circle' && (
                <div
                  style={{
                    width: p.size,
                    height: p.size,
                    borderRadius: '50%',
                    backgroundColor: p.color,
                  }}
                />
              )}
            </motion.div>
          ))}

          {/* Central big star */}
          <motion.div
            initial={{ left: '50%', top: '45%', scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1.5, 1, 0],
              opacity: [0, 1, 1, 0],
              rotate: [0, 15, -10, 0],
            }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
          >
            <StarShape size={48} color="#fbbf24" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
