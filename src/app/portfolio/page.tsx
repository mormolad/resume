'use client';

import { useState } from 'react';
import styles from './page.module.css';
import PortfolioCarousel from '@/components/PortfolioCarousel/PortfolioCarousel';
import { portfolioItems } from '@/constants/portfolio';

export default function Portfolio() {
  const [isPaused, setIsPaused] = useState(false);
  const items = portfolioItems;

  return (
    <main className={styles.page}>
      <div className={styles.carousel}>
        <div
          className={styles.pauseZone}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <PortfolioCarousel
            items={items}
            radius={480}
            rotationDuration={26}
            autoPlay
            pauseOnHover={false}
            enableScroll
            isPaused={isPaused}
            isPointerInside={isPaused}
          />
        </div>
      </div>
    </main>
  );
}
