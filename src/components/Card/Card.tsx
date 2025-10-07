import styles from './Card.module.css';
import Link from 'next/link';
type CardProps = {
  href: string;
  title: string;
};

export default function Card({ href, title }: CardProps) {
  return (
    <li className={styles.card}>
      <Link href={href} className={styles.card__nav_link}>
        {title}
      </Link>
    </li>
  );
}
