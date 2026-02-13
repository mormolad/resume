'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Card from '@/components/Card/Card';
import styles from './PortfolioCarousel.module.css';

export type PortfolioCarouselItem = {
  image: string;
  title?: string;
  description?: string;
  author?: string;
  href?: string;
};

type PortfolioCarouselProps = {
  items: PortfolioCarouselItem[];
  radius?: number;
  rotationDuration?: number;
  autoPlay?: boolean;
  pauseOnHover?: boolean;
  enableScroll?: boolean;
  isPaused?: boolean;
  isPointerInside?: boolean;
};

export default function PortfolioCarousel({
  items,
  radius = 360,
  rotationDuration = 20,
  autoPlay = true,
  pauseOnHover = true,
  enableScroll = false,
  isPaused = false,
  isPointerInside = false,
}: PortfolioCarouselProps) {
  const [rotationOffset, setRotationOffset] = useState(0);
  const [autoRotation, setAutoRotation] = useState(0);
  const [isHoverPaused, setIsHoverPaused] = useState(false);

  const angleStep = useMemo(() => 360 / Math.max(items.length, 1), [items]);
  const rotationSpeed = useMemo(
    () => 360 / Math.max(rotationDuration, 1),
    [rotationDuration]
  );
  const totalRotation = autoRotation + rotationOffset;
  const isRunning = autoPlay && !(isPaused || (pauseOnHover && isHoverPaused));

  useEffect(() => {
    if (!autoPlay) {
      return;
    }
    let frameId: number;
    let lastTime: number | null = null;

    const tick = (time: number) => {
      if (lastTime === null) {
        lastTime = time;
      }
      const deltaSeconds = (time - lastTime) / 1000;
      lastTime = time;
      if (isRunning) {
        setAutoRotation((prev) => prev + rotationSpeed * deltaSeconds);
      }
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [autoPlay, isRunning, rotationSpeed]);

  const handleWheel = useCallback(
    (event: React.WheelEvent<HTMLElement>) => {
      if (!enableScroll) {
        return;
      }
      event.preventDefault();
      const delta = event.deltaY > 0 ? 12 : -12;
      setRotationOffset((prev) => prev + delta);
    },
    [enableScroll]
  );

  const normalizeAngle = (angle: number) => {
    const normalized = ((angle % 360) + 360) % 360;
    return normalized > 180 ? normalized - 360 : normalized;
  };

  return (
    <section
      className={`${styles.scene} ${enableScroll ? styles.sceneScroll : ''}`}
      onWheel={handleWheel}
      onMouseEnter={() => setIsHoverPaused(true)}
      onMouseLeave={() => setIsHoverPaused(false)}
    >
      <div
        className={styles.rotatorBase}
        style={{
          transform: `rotateX(-10deg) rotateY(${totalRotation}deg)`,
        }}
      >
        <ul className={styles.rotator}>
          {items.map((item, index) => {
            const angle = index * angleStep;
            const facingAngle = normalizeAngle(angle + totalRotation);
            const isFront = Math.abs(facingAngle) <= angleStep / 2;
            const isActive = isFront && isPointerInside;
            return (
              <li
                key={`${item.title ?? 'slide'}-${index}`}
                className={styles.slide}
                style={{
                  transform: `translate(-50%, -50%) rotateY(${angle}deg) translateZ(${radius}px)`,
                }}
              >
                <Card
                  href={item.href}
                  title={item.title}
                  description={item.description}
                  author={item.author}
                  image={item.image}
                  isActive={isActive}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
