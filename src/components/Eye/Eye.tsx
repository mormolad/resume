'use client';
import React, { useState, useEffect, useRef } from 'react';
import styles from './Eye.module.css';

const Eye: React.FC = () => {
  const eyeRef = useRef<HTMLDivElement>(null);
  const [eyeData, setEyeData] = useState({
    iris: { x: 35, y: 15 },
    pupil: { x: 35, y: 15 },
    target: { x: 35, y: 15 },
  });

  // Константы размеров
  const eyeSize = { width: 70, height: 30 };
  const irisRadius = 10;
  const pupilRadius = 5;
  const maxMovement = 8;
  const center = { x: 35, y: 15 };

  // Refs для анимации
  const animationRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!eyeRef.current) return;

      const rect = eyeRef.current.getBoundingClientRect();
      const eyeCenter = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };

      const dx = e.clientX - eyeCenter.x;
      const dy = e.clientY - eyeCenter.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      const direction = {
        x: dx / (distance || 1),
        y: dy / (distance || 1),
      };

      const movement = Math.min(distance * 0.025, maxMovement);
      setEyeData((prev) => ({
        ...prev,
        target: {
          x: center.x + direction.x * movement,
          y: center.y + direction.y * movement,
        },
      }));
    };

    const animate = (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const deltaTime = time - lastTimeRef.current;
      lastTimeRef.current = time;

      const smoothFactor = Math.min(0.2 * (deltaTime / 16), 0.3);

      setEyeData((prev) => {
        // Рассчитываем новые позиции с округлением
        const irisX = Math.round(
          prev.iris.x + (prev.target.x - prev.iris.x) * smoothFactor
        );
        const irisY = Math.round(
          prev.iris.y + (prev.target.y - prev.iris.y) * smoothFactor
        );

        const pupilX = Math.round(
          irisX + (prev.target.x - irisX) * smoothFactor * 1.3
        );
        const pupilY = Math.round(
          irisY + (prev.target.y - irisY) * smoothFactor * 1.3
        );

        return {
          ...prev,
          iris: { x: irisX, y: irisY },
          pupil: { x: pupilX, y: pupilY },
        };
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // Запускаем анимацию
    animationRef.current = requestAnimationFrame(animate);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      // Очистка
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={eyeRef} className={styles.eye}>
      <svg
        width={eyeSize.width}
        height={eyeSize.height}
        viewBox={`0 0 ${eyeSize.width} ${eyeSize.height}`}
        className={styles.eyeSvg}
      >
        {/* Белок глаза */}
        <ellipse
          cx={center.x}
          cy={center.y}
          rx={30}
          ry={12}
          fill="#f5f5f5"
          stroke="#333"
          strokeWidth="1"
        />

        {/* Радужная оболочка */}
        <circle
          cx={eyeData.iris.x}
          cy={eyeData.iris.y}
          r={irisRadius}
          fill="url(#irisGradient)"
          className={styles.iris}
        />

        {/* Зрачок */}
        <circle
          cx={eyeData.pupil.x}
          cy={eyeData.pupil.y}
          r={pupilRadius}
          fill="#111"
          className={styles.pupil}
        />

        {/* Блик */}
        <circle
          cx={eyeData.pupil.x + 2}
          cy={eyeData.pupil.y - 2}
          r={2}
          fill="white"
          opacity="0.8"
          className={styles.highlight}
        />

        {/* Градиент для радужки */}
        <defs>
          <radialGradient
            id="irisGradient"
            cx="50%"
            cy="50%"
            r="50%"
            fx="30%"
            fy="30%"
          >
            <stop offset="0%" stopColor="#4b6cb7" />
            <stop offset="100%" stopColor="#182848" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};

export default Eye;
