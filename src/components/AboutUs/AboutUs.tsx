import React from 'react';
import './AboutUs.scss';

const AboutUs: React.FC = () => (
  <section className="about" id="about">
    <div className="container">
      <h2 className="section-title">О НАС</h2>
      <div className="about__content">
        <p>Мы рады видеть вас! Мы работаем для Вас с 2003 года. 14 лет мы наблюдаем, как с каждым днем все больше людей заказывают жд билеты через интернет.</p>
        <p>Сегодня можно заказать железнодорожные билеты онлайн всего в 2 клика, но стоит ли это делать? Мы расскажем о преимуществах заказа через интернет.</p>
        <p className="about__bold">Покупать жд билеты дешево можно за 90 суток до отправления поезда. Благодаря динамическому ценообразованию цена на билеты в это время самая низкая.</p>
      </div>
    </div>
  </section>
);

export default AboutUs; 