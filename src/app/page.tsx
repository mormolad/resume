import styles from './page.module.css';
import ParallaxBannerDesktop from '@/components/ParallaxBannerDesktop/ParallaxBannerDesktop';
export default function Home() {
  return (
    <main className={styles.main}>
      <ParallaxBannerDesktop />
    </main>
  );
}
