'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={styles.header}>
      {/* Контейнер с бургером и меню */}
      <div
        className={`${styles.burgerMenu} ${isOpen ? styles.open : ''}`}
        onClick={toggleMenu}
      >
        {/* Иконка бургера / крестика */}
        <div className={styles.burgerIcon}>
          <span></span>
        </div>

        {/* Навигационное меню (плавное раскрытие) */}
        <nav className={`${styles.nav} ${isOpen ? styles.open : ''}`}>
          <ul className={styles.nav__list}>
            <li className={styles.nav__item}>
              <Link href="/" className={styles.nav__link}>
                В начало
              </Link>
            </li>
            <li className={styles.nav__item}>
              <Link
                href="https://github.com/mormolad"
                className={styles.nav__link}
              >
                Портфолио
              </Link>
            </li>{' '}
            <li className={styles.nav__item}>
              <Link href="#" className={styles.nav__link}>
                Анимация
              </Link>
            </li>
            <li className={styles.nav__item}>
              <Link href="#" className={styles.nav__link}>
                Обо мне
              </Link>
            </li>
            <li className={styles.nav__item}>
              <Link href="#" className={styles.nav__link}>
                Контакты
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
