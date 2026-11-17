// src/pages/SuccessPage.tsx
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar/ProgressBar';
import './SuccessPage.scss';

const SuccessPage: React.FC = () => {
  const location = useLocation();
  const orderInfo = location.state || { orderNumber: '123456', totalPrice: 0 };

  return (
    <div className="success-page-wrapper">
      <ProgressBar currentStep={4} />
      
      <div className="container success-page">
        <div className="success-card">
          <div className="success-icon">✓</div>
          <h1>Благодарим Вас за заказ!</h1>
          
          <div className="order-info">
            <p>Номер заказа: <strong>№{orderInfo.orderNumber}</strong></p>
            <p>Сумма: <strong>{orderInfo.totalPrice} ₽</strong></p>
          </div>

          <p className="success-text">
            Билеты будут отправлены на ваш e-mail.<br/>
            Распечатайте их и сохраните до даты поездки.
          </p>

          <Link to="/" className="back-home-btn">ВЕРНУТЬСЯ НА ГЛАВНУЮ</Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage; 