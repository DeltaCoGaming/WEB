// app/components/Background.tsx

'use client';

'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface BackgroundProps {
  children: React.ReactNode;
}

const Background: React.FC<BackgroundProps> = ({ children }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const updateDimensions = useCallback(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [updateDimensions]);

  const generateMotionElements = useCallback(() => {
    const elements = [];
    const elementCount = 15;

    for (let i = 0; i < elementCount; i++) {
      const x = Math.random() * dimensions.width;
      const y = Math.random() * dimensions.height;
      const size = Math.random() * 100 + 50; // Varied sizes for more depth

      elements.push(
        <motion.rect
          key={`element-${i}`}
          x={x}
          y={y}
          width={size}
          height={size}
          rx={10} // Rounded corners for a softer look
          fill={`rgba(40, 40, 40, ${Math.random() * 0.1 + 0.05})`} // Dark gray with varied opacity
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            rotate: Math.random() * 360,
            x: [x, x + Math.random() * 50 - 25],
            y: [y, y + Math.random() * 50 - 25],
          }}
          transition={{ 
            duration: Math.random() * 10 + 10, 
            repeat: Infinity, 
            repeatType: "reverse" 
          }}
        />
      );
    }

    return elements;
  }, [dimensions]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <svg className="absolute inset-0 w-full h-full">
        {generateMotionElements()}
      </svg>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default Background;