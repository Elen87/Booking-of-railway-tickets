// src/pages/PassengersPage.tsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar/ProgressBar';
import './PassengersPage.scss';

const PassengersPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Данные, которые мы передали из SeatsPage
  const bookingData = location.state;
  const seats = bookingData?.seats || [];
  const route = bookingData?.route?.departure;
  const coach = bookingData?.coach;

  // Создаем состояние для каждого пассажира (по количеству мест)
  const [passengers, setPassengers] = useState(
    seats.map(() => ({
      first_name: '',
      last_name: '',
      patronymic: '',
      birthday: '',
      gender: true, // true = M, false = Ж
      document_type: 'Паспорт РФ',
      document_data: '',
    }))
  );

  // Обработчик изменения полей
  const handleChange = (index: number, field: string, value: string | boolean) => {
    const newPassengers = [...passengers];
    newPassengers[index] = { ...newPassengers[index], [field]: value };
    setPassengers(newPassengers);
  };

  // Переход к оплате
  const handleNext = () => {
    // Простая валидация (все ли поля заполнены)
    const isInvalid = passengers.some(p => !p.first_name || !p.last_name || !p.birthday || !p.document_data);
    if (isInvalid) {
      alert('Пожалуйста, заполните все обязательные поля для каждого пассажира!');
      return;
    }

    // Передаем данные на следующий шаг
    navigate('/payment', { 
      state: { 
        ...bookingData, 
        passengers 
      } 
    });
  };

  return (
    <div className="passengers-page-wrapper">
      <ProgressBar currentStep={2} />
      
      <div className="container passengers-page">
        {/* Левая панель (с деталями поездки) */}
        <aside className="passengers-page__sidebar">
          <div className="sidebar-header">
            <h3>ДЕТАЛИ ПОЕЗДКИ</h3>
          </div>
          <div className="sidebar-body">
            {route ? (
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
            ) : <p>Данные о поезде не найдены</p>}
          </div>
        </aside>

        {/* Правая панель (Формы пассажиров) */}
        <main className="passengers-page__content">
          <h2>ВВОД ДАННЫХ ПАССАЖИРОВ</h2>
          
          {passengers.map((passenger, index) => (
            <div className="passenger-card" key={index}>
              <div className="passenger-card__header">
                <h3>Пассажир {index + 1}</h3>
                <span className="seat-badge">Место: {seats[index]}</span>
              </div>
              
              <div className="passenger-card__form">
                <div className="form-group">
                  <label>Фамилия</label>
                  <input 
                    type="text" 
                    placeholder="Иванов" 
                    value={passenger.last_name}
                    onChange={(e) => handleChange(index, 'last_name', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Имя</label>
                  <input 
                    type="text" 
                    placeholder="Иван" 
                    value={passenger.first_name}
                    onChange={(e) => handleChange(index, 'first_name', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Отчество</label>
                  <input 
                    type="text" 
                    placeholder="Иванович" 
                    value={passenger.patronymic}
                    onChange={(e) => handleChange(index, 'patronymic', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Дата рождения</label>
                  <input 
                    type="date" 
                    value={passenger.birthday}
                    onChange={(e) => handleChange(index, 'birthday', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Пол</label>
                  <div className="gender-toggle">
                    <button 
                      className={passenger.gender === true ? 'active' : ''}
                      onClick={() => handleChange(index, 'gender', true)}
                    >
                      М
                    </button>
                    <button 
                      className={passenger.gender === false ? 'active' : ''}
                      onClick={() => handleChange(index, 'gender', false)}
                    >
                      Ж
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label>Тип документа</label>
                  <select 
                    value={passenger.document_type}
                    onChange={(e) => handleChange(index, 'document_type', e.target.value)}
                  >
                    <option value="Паспорт РФ">Паспорт РФ</option>
                    <option value="Свидетельство о рождении">Свидетельство о рождении</option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label>Серия и номер документа</label>
                  <input 
                    type="text" 
                    placeholder="1234 567890" 
                    value={passenger.document_data}
                    onChange={(e) => handleChange(index, 'document_data', e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}

          <div className="bottom-action">
            <div className="total-price">
              Итого: <strong>{(coach?.bottom_price || coach?.price || 0) * passengers.length} ₽</strong>
            </div>
            <button onClick={handleNext}>ДАЛЕЕ</button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PassengersPage;