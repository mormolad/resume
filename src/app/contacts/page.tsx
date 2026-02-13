import styles from './page.module.css';
import { contactCards, contactTopics } from '@/constants/contacts';

export default function Contacts() {
  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <h1 className={styles.title}>Контакты</h1>
        <p className={styles.subtitle}>
          Открыт к интересным проектам и техническим идеям. Напишите, если
          хотите обсудить сотрудничество или предложить задачу.
        </p>

        <div className={styles.contactsGrid}>
          {contactCards.map((card) => {
            const externalProps = card.external
              ? { target: '_blank', rel: 'noreferrer' }
              : {};

            return (
              <a
                key={card.id}
                className={styles.contactCard}
                href={card.href}
                {...externalProps}
              >
                <div className={styles.contactHeader}>
                  <span className={styles.contactIcon}>{card.icon}</span>
                  <span>{card.title}</span>
                </div>
                <span>{card.value}</span>
                <span className={styles.contactHint}>{card.hint}</span>
              </a>
            );
          })}
        </div>

        <h2 className={styles.sectionTitle}>По каким вопросам можно писать</h2>
        <ul className={styles.list}>
          {contactTopics.map((topic) => (
            <li key={topic} className={styles.item}>
              {topic}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
