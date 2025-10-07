import styles from './page.module.css';
import Card from '@/components/Card/Card';
import {linksPortfolio} from '../../../shared/constante/links'

export default function Portfolio() {


  return (
    <main className={styles.portfolio}>
      <ul className={styles.list}> {Object.entries(linksPortfolio).map(([title, href]) => (
        <Card href={href} title={title} />
      ))}</ul>
     
    </main>
  );
}
