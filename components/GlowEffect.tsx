'use client';

import { motion } from 'framer-motion';

export default function GlowEffect() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.4, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-blue-600/20 blur-[120px] rounded-full"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] bg-indigo-600/15 blur-[100px] rounded-full"
      />
    </div>
  );
}
