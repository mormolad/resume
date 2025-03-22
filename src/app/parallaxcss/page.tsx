import styles from './page.module.css';

export default function Page() {
  return (
    <div className={styles.parallax}>
      {/* Первая группа слоев
      <div className={styles.parallax__group}>
        <div
          className={`${styles.parallax__layer} ${styles.parallax__layer_back} `}
        >
          .111. (Фоновый слой)
        </div>
        <div
          className={`${styles.parallax__layer} ${styles.parallax__layer_base} ${styles.parallax__layer_111}`}
        >
          .222. (Основной слой)
        </div>
      </div> */}

      {/* Вторая группа слоев */}
      <div className={styles.parallax__group}>
        <div
          className={`${styles.parallax__layer} ${styles.parallax__layer_back}`}
        >
          .333. (Фоновый слой)
        </div>
        <div
          className={`${styles.parallax__layer} ${styles.parallax__layer_base}`}
        >
          .444. (Основной слой)
        </div>
      </div>

      {/* Добавляем контент для прокрутки */}
      <div
        style={{
          height: '200vh',
          background: '#f0f0f0',
          padding: '20px',
          top: '-200px',
          position: 'relative',
        }}
      >
        <h1>Прокрутите вниз, чтобы увидеть эффект параллакса</h1>
      </div>
    </div>
  );
}
