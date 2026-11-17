// src/pages/PaymentPage.tsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { submitOrder } from '../services/api';
import ProgressBar from '../components/ProgressBar/ProgressBar';
import './PaymentPage.scss';

const PaymentPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Данные, которые пришли из PassengersPage
  const bookingData = location.state;
  const route = bookingData?.route?.departure;
  const coach = bookingData?.coach;
  const seats = bookingData?.seats || [];
  const passengers = bookingData?.passengers || [];

  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    patronymic: '',
    phone: '',
    email: '',
    payment_method: 'online', // 'online' или 'cash'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (method: string) => {
    setUser({ ...user, payment_method: method });
  };

  const totalPrice = (coach?.bottom_price || coach?.price || 0) * seats.length;

  const handleSubmit = async () => {
    // Валидация
    if (!user.first_name || !user.last_name || !user.phone || !user.email) {
      setError('Пожалуйста, заполните все контактные данные');
      return;
    }

    setLoading(true);
    setError('');

    // Формируем объект для API согласно документации
    const orderPayload = {
      user: {
        first_name: user.first_name,
        last_name: user.last_name,
        patronymic: user.patronymic,
        phone: user.phone,
        email: user.email,
        payment_method: user.payment_method,
      },
      departure: {
        route_direction_id: route?._id, // ID маршрута
        seats: passengers.map((p: any, index: number) => ({
          coach_id: coach?._id,
          person_info: {
            is_adult: true, // Упрощенно считаем всех взрослыми
            first_name: p.first_name,
            last_name: p.last_name,
            patronymic: p.patronymic,
            gender: p.gender,
            birthday: p.birthday,
            document_type: p.document_type,
            document_data: p.document_data,
          },
          seat_number: seats[index],
          is_child: false,
          include_children_seat: false,
        })),
      },
    };

    try {
      const response = await submitOrder(orderPayload);
      
      // Успех! Переходим на страницу благодарности
      navigate('/success', { 
        state: { 
          orderNumber: response.order_number || Math.floor(Math.random() * 100000), // если API не вернул номер, генерируем
          totalPrice: totalPrice
        } 
      });
    } catch (err) {
      setError('Не удалось оформить заказ. Попробуйте еще раз.');
      setLoading(false);
    }
  };

  return (
    <div className="payment-page-wrapper">
      <ProgressBar currentStep={3} />
      
      <div className="container payment-page">
        {/* Сайдбар */}
        <aside className="payment-page__sidebar">
          <div className="sidebar-header">
            <h3>ДЕТАЛИ ПОЕЗДКИ</h3>
          </div>
          <div className="sidebar-body">
            {route && (
              <div className="train-info">
                <div className="time">
                  {new Date(route.from.datetime * 1000).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                </div>
                <div className="city">{route.from.city.name}</div>
                <div style={{ margin: '10px 0', color: '#FFA800' }}>↓</div>
                <div className="time">
                  {new Date(route.to.datetime * 1000).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                </div>
                <div className="city">{route.to.city.name}</div>
              </div>
            )}
          </div>
        </aside>

        {/* Основной контент */}
        <main className="payment-page__content">
          <h2>ПЕРСОНАЛЬНЫЕ ДАННЫЕ</h2>
          
          <div className="user-form">
            <div className="form-group">
              <label>Фамилия</label>
              <input name="last_name" value={user.last_name} onChange={handleChange} placeholder="Иванов" />
            </div>
            <div className="form-group">
              <label>Имя</label>
              <input name="first_name" value={user.first_name} onChange={handleChange} placeholder="Иван" />
            </div>
            <div className="form-group">
              <label>Отчество</label>
              <input name="patronymic" value={user.patronymic} onChange={handleChange} placeholder="Иванович" />
            </div>
            <div className="form-group">
              <label>Контактный телефон</label>
              <input name="phone" value={user.phone} onChange={handleChange} placeholder="+7 (999) 123-45-67" />
            </div>
            <div className="form-group">
              <label>E-mail</label>
              <input name="email" type="email" value={user.email} onChange={handleChange} placeholder="example@mail.ru" />
            </div>
          </div>

          <div className="payment-methods">
            <h3>СПОСОБ ОПЛАТЫ</h3>
            
            <label className={`method-option ${user.payment_method === 'online' ? 'active' : ''}`}>
              <input 
                type="radio" 
                name="payment_method" 
                checked={user.payment_method === 'online'}
                onChange={() => handlePaymentChange('online')}
              />
              <div className="method-info">
                <h4>Онлайн</h4>
                <p>Банковской картой, PayPal, Visa QIWI Wallet</p>
              </div>
            </label>

            <label className={`method-option ${user.payment_method === 'cash' ? 'active' : ''}`}>
              <input 
                type="radio" 
                name="payment_method" 
                checked={user.payment_method === 'cash'}
                onChange={() => handlePaymentChange('cash')}
              />
              <div className="method-info">
                <h4>Наличными</h4>
                <p>Оплата наличными в кассе вокзала</p>
              </div>
            </label>
          </div>

          {error && <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>}

          <div className="bottom-action">
            <div className="total-price">
              Итого: <span>{totalPrice} ₽</span>
            </div>
            <button onClick={handleSubmit} disabled={loading}>
              {loading ? 'ОТПРАВКА...' : 'КУПИТЬ БИЛЕТЫ'}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PaymentPage; 