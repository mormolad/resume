import styles from './Card.module.css';
import Link from 'next/link';

type CardProps = {
  href?: string;
  title?: string;
  description?: string;
  author?: string;
  image: string;
  isActive?: boolean;
};

export default function Card({
  href,
  title,
  description,
  author,
  image,
  isActive = false,
}: CardProps) {
  const content = (
    <>
      <div className={styles.card__media}>
        <img src={image} alt={title ?? 'Portfolio'} />
      </div>
      <div className={styles.card__content}>
        {title && <h3 className={styles.card__title}>{title}</h3>}
        {description && (
          <p className={styles.card__description}>{description}</p>
        )}
        {author && <span className={styles.card__author}>{author}</span>}
      </div>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={`${styles.card} ${isActive ? styles.card__active : ''}`}
      >
        {content}
      </Link>
    );
  }

  return (
    <div className={`${styles.card} ${isActive ? styles.card__active : ''}`}>
      {content}
    </div>
  );
}
