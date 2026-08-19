import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useMotionValue, type MotionValue } from 'motion/react';

interface CircularTextProps {
  text: string;
  spinDuration?: number;
  className?: string;
}

// ========================================
// ⚙️ SPIN CONFIG
// ========================================

const SPIN_CONFIG = {
  // Startgeschwindigkeit:
  // Sekunden für eine komplette Umdrehung
  startDuration: 75,

  // Wie lange die Startgeschwindigkeit gehalten wird
  // bevor die Beschleunigung beginnt
  accelerationDelay: 2000,

  // Geschwindigkeit pro Schritt
  // 0.9 = langsamere Beschleunigung
  // 0.8 = deutlich schneller
  // 0.7 = aggressive Beschleunigung
  accelerationFactor: 0.8,

  // Schnellste erlaubte Geschwindigkeit
  // Je kleiner, desto schneller
  minDuration: 1,

  // Wie oft die Geschwindigkeit angepasst wird
  accelerationInterval: 100
};

// ========================================
// 🎨 ROTATION
// ========================================

const getRotationTransition = (
  duration: number,
  from: number
) => ({
  from,
  to: from + 360,
  ease: 'linear' as const,
  duration,
  type: 'tween' as const,
  repeat: Infinity
});

// ========================================
// COMPONENT
// ========================================

interface CircularTextProps {
  text: string;
  spinDuration?: number;
  className?: string;
}

const CircularText: React.FC<CircularTextProps> = ({
  text,
  spinDuration = SPIN_CONFIG.startDuration,
  className = ''
}) => {
  const letters = Array.from(text);

  const controls = useAnimation();
  const rotation: MotionValue<number> = useMotionValue(0);

  const currentDuration = useRef(spinDuration);

  useEffect(() => {
    let duration = spinDuration;
    currentDuration.current = duration;

    let accelerationInterval: ReturnType<typeof setInterval> | undefined;

    const startRotation = () => {
      const start = rotation.get();

      controls.start({
        rotate: start + 360,
        transition: {
          rotate: getRotationTransition(duration, start)
        }
      });
    };

    // Start mit normaler Geschwindigkeit
    startRotation();

    // Erst nach dem Delay anfangen zu beschleunigen
    const accelerationTimeout = setTimeout(() => {
      accelerationInterval = setInterval(() => {
        duration = Math.max(
          duration * SPIN_CONFIG.accelerationFactor,
          SPIN_CONFIG.minDuration
        );

        currentDuration.current = duration;

        startRotation();
      }, SPIN_CONFIG.accelerationInterval);
    }, SPIN_CONFIG.accelerationDelay);

    return () => {
      clearTimeout(accelerationTimeout);

      if (accelerationInterval) {
        clearInterval(accelerationInterval);
      }

      controls.stop();
    };
  }, [spinDuration, text, controls, rotation]);

  return (
    <motion.div
      className={`m-0 mx-auto rounded-full w-[200px] h-[200px] relative font-black text-white text-center origin-center ${className}`}
      style={{ rotate: rotation }}
      initial={{ rotate: 0 }}
      animate={controls}
    >
      {letters.map((letter, i) => {
        const rotationDeg = (360 / letters.length) * i;

        const factor = Math.PI / letters.length;
        const x = factor * i;
        const y = factor * i;

        const transform = `rotateZ(${rotationDeg}deg) translate3d(${x}px, ${y}px, 0)`;

        return (
          <span
            key={i}
            className="absolute inline-block inset-0 text-2xl text-slate-800 transition-all duration-500 ease-[cubic-bezier(0,0,0,1)]"
            style={{
              transform,
              WebkitTransform: transform
            }}
          >
            {letter}
          </span>
        );
      })}
    </motion.div>
  );
};

export default CircularText;