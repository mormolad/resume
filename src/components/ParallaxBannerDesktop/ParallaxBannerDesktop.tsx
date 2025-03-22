'use client';
import React, { useState, useEffect } from 'react';
import styles from './ParallaxBannerDesktop.module.css'; // Используем CSS Modules

const ParallaxBanner = () => {
  const [mouseX, setMouseX] = useState(0); // Позиция мыши по X
  const [mouseY, setMouseY] = useState(0); // Позиция мыши по Y

  // Обработчик движения мыши
  const handleMouseMove = (event: MouseEvent) => {
    const { clientX, clientY } = event;
    const { innerWidth, innerHeight } = window;

    // Нормализуем координаты мыши в диапазоне от -1 до 1
    setMouseX((clientX / innerWidth) * 2 - 1);
    setMouseY((clientY / innerHeight) * 2 - 1);
  };

  // Добавляем обработчик события движения мыши
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className={styles.banner}>
      <div className={styles.container}>
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
        <h1
          style={{
            transform: `translate(${mouseX * 40}px, ${mouseY * 40}px)`,
          }}
        >
          Perevalov
        </h1>
      </div>
    </div>
  );
};

export default ParallaxBanner;
