'use client';
import React, { useState, useEffect } from 'react';
import styles from './ParallaxBannerDesktop.module.css'; // Используем CSS Modules

const ParallaxBanner: React.FC = () => {
  const [mouseX, setMouseX] = useState(0); // Позиция мыши по оси X
  const [mouseY, setMouseY] = useState(0); // Позиция мыши по оси Y

  useEffect(() => {
    let animationFrameId: number;
    const handleMouseMoveOptimized = (event: MouseEvent) => {
      animationFrameId = requestAnimationFrame(() => {
        const { clientX, clientY } = event;
        const { innerWidth, innerHeight } = window;
        setMouseX((clientX / innerWidth) * 2 - 1);
        setMouseY((clientY / innerHeight) * 2 - 1);
      });
    };

    window.addEventListener('mousemove', handleMouseMoveOptimized);
    return () => {
      window.removeEventListener('mousemove', handleMouseMoveOptimized);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className={styles.banner}>
      <div className={styles.container}>
        {/* Создаем 9 слоев для параллакс-эффекта */}
        {[...Array(9).keys()].map((index) => (
          <div
            key={index}
            className={`${styles.bg} ${styles[`bg${index + 1}`]}`}
            style={{
              transform: `translate(${mouseX * (index + 1) * 5}px, ${
                mouseY * (index + 1) * 5
              }px)`,
            }}
          ></div>
        ))}
        <h1>Перевалов А.С.</h1>
      </div>
    </div>
  );
};

export default ParallaxBanner;
