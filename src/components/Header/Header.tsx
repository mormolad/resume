'use client';
import React, { useState } from 'react';
import styles from './Header.module.css'; // Импортируем CSS-модуль

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Функция для переключения состояния меню
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={styles.header}>
      {/* Бургер-кнопка */}
      <div
        className={`${styles.burger} ${isOpen ? styles.open : ''}`}
        onClick={toggleMenu}
      >
        <span></span>
      </div>

      {/* Навигационное меню */}
      <nav className={`${styles.nav} ${isOpen ? styles.open : ''}`}>
        {/* <ul className={styles.nav__list}>
          <li className={styles.nav__item}>
            <a href="#" className={styles.nav__link}>
              Home
            </a>
          </li>
          <li className={styles.nav__item}>
            <a href="#" className={styles.nav__link}>
              About
            </a>
          </li>
          <li className={styles.nav__item}>
            <a href="#" className={styles.nav__link}>
              Services
            </a>
          </li>
          <li className={styles.nav__item}>
            <a href="#" className={styles.nav__link}>
              Portfolio
            </a>
          </li>
          <li className={styles.nav__item}>
            <a href="#" className={styles.nav__link}>
              Contact
            </a>
          </li>
        </ul> */}
      </nav>
    </header>
  );
};

export default Header;
