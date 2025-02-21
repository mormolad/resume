import styles from './page.module.css';
import ParallaxBanner from '@/components/ParallaxBanner/ParallaxBanner';
export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ParallaxBanner />
      </main>
    </div>
  );
}
