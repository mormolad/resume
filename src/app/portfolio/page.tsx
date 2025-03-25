import styles from './page.module.css';
import Card from '@/components/Card/Card';

export default function Portfolio() {
  return (
    <main className={styles.portfolio}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <Card />
        </li>
        <li className={styles.item}>
          <Card />
        </li>
        <li className={styles.item}>
          <Card />
        </li>
        <li className={styles.item}>
          <Card />
        </li>
        <li className={styles.item}>
          <Card />
        </li>
        <li className={styles.item}>
          <Card />
        </li>
        <li className={styles.item}>
          <Card />
        </li>
        <li className={styles.item}>
          <Card />
        </li>
        <li className={styles.item}>
          <Card />
        </li>
      </ul>
    </main>
  );
}
