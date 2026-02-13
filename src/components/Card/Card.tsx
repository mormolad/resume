import styles from './Card.module.css';
import Eye from '@/components/Eye/Eye';
export default function Card() {
  return (
    <div className={styles.card}>
      <Eye />
    </div>
  );
}
