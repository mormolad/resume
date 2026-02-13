import styles from './page.module.css';

export default function AboutMe() {
  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <h1 className={styles.title}>Обо мне</h1>
        <p className={styles.text}>
          Фокусируюсь на интерфейсах и визуальной подаче. Люблю лаконичные
          решения, внимателен к типографике и анимациям.
        </p>
        <p className={styles.text}>
          Работаю с React, Next.js и современными UI-подходами, умею превращать
          сложные данные в понятные интерфейсы.
        </p>
      </section>
    </main>
  );
}
