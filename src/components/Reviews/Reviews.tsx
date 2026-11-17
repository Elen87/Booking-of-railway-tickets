import React from 'react';
import './Reviews.scss';

const Reviews: React.FC = () => (
  <section className="reviews" id="reviews">
    <div className="container">
      <h2 className="section-title">ОТЗЫВЫ</h2>
      <div className="reviews__grid">
        <div className="review">
          <img src="https://i.pravatar.cc/150?img=1" alt="Екатерина" className="review__avatar" />
          <div className="review__content">
            <h4>Екатерина Вальнова</h4>
            <p>Доброжелательные подсказки на всех этапах помогут правильно заполнить поля и без затруднений купить ж/д билет, даже если вы заказываете онлайн билет впервые.</p>
          </div>
        </div>
        <div className="review">
          <img src="https://i.pravatar.cc/150?img=3" alt="Евгений" className="review__avatar" />
          <div className="review__content">
            <h4>Евгений Стрыкало</h4>
            <p>СМС-сопровождение до посадки. Сразу после оплаты ж/д билетов пришел вам СМС-напоминание о поездке.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Reviews; 