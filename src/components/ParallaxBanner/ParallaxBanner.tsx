'use client';
import React, { useState, useEffect } from 'react';
import styles from './ParallaxBanner.module.css'; // Используем CSS Modules

const ParallaxBanner = () => {
  const [tiltX, setTiltX] = useState(0); // Наклон по оси X (gamma)
  const [tiltY, setTiltY] = useState(0); // Наклон по оси Y (beta)

  // Обработчик изменения ориентации устройства
  const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
    const { gamma, beta } = event;

    // Нормализуем углы наклона в диапазоне от -1 до 1
    if (gamma !== null && beta !== null) {
      setTiltX(gamma / 90); // gamma: от -90 (влево) до 90 (вправо)
      setTiltY((beta - 90) / 90); // beta: от 0 (вертикально) до 180 (перевернуто)
    }
  };

  // Добавляем обработчик события изменения ориентации
  useEffect(() => {
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleDeviceOrientation);
    } else {
      console.warn('DeviceOrientation API не поддерживается в вашем браузере.');
    }

    return () => {
      if (window.DeviceOrientationEvent) {
        window.removeEventListener(
          'deviceorientation',
          handleDeviceOrientation
        );
      }
    };
  }, []);

  // Максимальное смещение в пикселях
  const maxOffset = 100;

  return (
    <div className={styles.banner}>
      <div className={styles.container}>
        {/* Фоновые элементы с параллакс-эффектом */}
        {[...Array(9).keys()].map((index) => {
          // Ограничиваем смещение для каждого элемента
          const offsetX = Math.max(
            -maxOffset,
            Math.min(tiltX * (index + 1) * 20, maxOffset)
          );
          const offsetY = Math.max(
            -maxOffset,
            Math.min(tiltY * (index + 1) * 20, maxOffset)
          );

          return (
            <div
              key={index}
              className={`${styles.bg} ${styles[`bg${index + 1}`]}`}
              style={{
                transform: `translate(${offsetX}px, ${offsetY}px)`,
              }}
            ></div>
          );
        })}
        {/* Заголовок */}
        <h1
          style={{
            transform: `translate(
              ${Math.max(-maxOffset, Math.min(tiltX * 40, maxOffset))}px,
              ${Math.max(-maxOffset, Math.min(tiltY * 40, maxOffset))}px
            )`,
          }}
        >
          Perevalov
        </h1>
      </div>
    </div>
  );
};

export default ParallaxBanner;
