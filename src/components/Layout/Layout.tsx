// src/components/Layout/Layout.tsx
import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './Layout.scss';

const Layout: React.FC = () => {
  return (
    <div className="app-layout">
      <header className="header">
        <div className="container header__inner">
          <Link to="/" className="header__logo">Лого</Link>
          <nav className="header__nav">
            <a href="#about">О нас</a>
            <a href="#how">Как это работает</a>
            <a href="#reviews">Отзывы</a>
            <a href="#contacts">Контакты</a>
          </nav>
        </div>
      </header>

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="footer" id="contacts">
        <div className="container footer__inner">
          <div className="footer__contacts">
            <h3>Свяжитесь с нами</h3>
            <p>8 (800) 000 00 00</p>
            <p>inbox@mail.ru</p>
            <p>tu.train.tickets</p>
            <p>г. Москва<br/>ул. Московская 27-35<br/>555 555</p>
          </div>
          <div className="footer__subscribe">
            <h3>Подписка</h3>
            <p>Будьте в курсе событий</p>
            <div className="subscribe-form">
              <input type="email" placeholder="e-mail" />
              <button type="button">ОТПРАВИТЬ</button>
            </div>
            <h3 style={{ marginTop: '30px' }}>Подписывайтесь на нас</h3>
            <div className="socials">
              <span>YouTube</span>
              <span>LinkedIn</span>
              <span>Google+</span>
              <span>Facebook</span>
              <span>Twitter</span>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <div className="container footer__bottom-inner">
            <span className="footer__logo">Лого</span>
            <button className="up-btn">↑</button>
            <span>2018 WEB</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;