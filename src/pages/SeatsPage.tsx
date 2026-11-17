// src/pages/SeatsPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { fetchSeats } from '../services/api';
import type { Coach, Seat } from '../types';
import ProgressBar from '../components/ProgressBar/ProgressBar'; // Добавим полосу прогресса
import './SeatsPage.scss';

const SeatsPage: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const routeData = location.state?.route;

  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [selectedCoachId, setSelectedCoachId] = useState<string>('');
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  useEffect(() => {
    if (!id) return;
    fetchSeats(id)
      .then((data) => {
        setCoaches(data);
        if (data.length > 0) setSelectedCoachId(data[0]._id);
        setLoading(false);
      })
      .catch(() => {
        setError('Не удалось загрузить места');
        setLoading(false);
      });
  }, [id]);

  const currentCoach = coaches.find(c => c._id === selectedCoachId);

  const toggleSeat = (seat: Seat) => {
    if (!seat.available) return;
    setSelectedSeats(prev => 
      prev.includes(seat.index) 
        ? prev.filter(s => s !== seat.index) 
        : [...prev, seat.index]
    );
  };

  // Переход на страницу пассажиров
  const handleNext = () => {
    if (!currentCoach || selectedSeats.length === 0) return;

    // Сохраняем выбранные данные и передаем их через state
    const bookingData = {
      route: routeData,
      coach: currentCoach,
      seats: selectedSeats,
    };

    navigate('/passengers', { state: bookingData });
  };

  if (loading) return <div className="container" style={{ padding: '50px' }}>Загрузка мест...</div>;
  if (error) return <div className="container" style={{ padding: '50px', color: 'red' }}>{error}</div>;

  return (
    <div className="seats-page-wrapper">
      <ProgressBar currentStep={1} />
      
      <div className="container seats-page">
        {/* Левая панель (оставляем как было) */}
        <aside className="seats-page__sidebar">
          <div className="sidebar-header">
            <h3>ДЕТАЛИ ПОЕЗДКИ</h3>
          </div>
          <div className="sidebar-body">
            {routeData && (
              <div className="train-info">
                <div className="time">
                  {new Date(routeData.departure.from.datetime * 1000).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                </div>
                <div className="city">{routeData.departure.from.city.name}</div>
                <div style={{ margin: '10px 0', color: '#FFA800' }}>↓</div>
                <div className="time">
                  {new Date(routeData.departure.to.datetime * 1000).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                </div>
                <div className="city">{routeData.departure.to.city.name}</div>
              </div>
            )}
          </div>
        </aside>

        {/* Правая панель (Выбор мест) */}
        <main className="seats-page__content">
          <h2 style={{ marginBottom: '20px' }}>ВЫБОР МЕСТ</h2>

          {/* Выбор типа вагона */}
          <div className="coach-types">
            {coaches.map(coach => (
              <button 
                key={coach._id}
                className={selectedCoachId === coach._id ? 'active' : ''}
                onClick={() => { setSelectedCoachId(coach._id); setSelectedSeats([]); }} // Сбрасываем места при смене вагона
              >
                {coach.class_type === 'fourth' ? 'Сидячий' : 
                 coach.class_type === 'third' ? 'Плацкарт' : 
                 coach.class_type === 'second' ? 'Купе' : 'Люкс'} 
                <br/>
                <small>{coach.avaliable_seats} свободных</small>
              </button>
            ))}
          </div>

          {currentCoach && (
            <div className="coach-scheme">
              <div className="coach-scheme__info">
                <span>Вагон: {currentCoach.name}</span>
                <span>Цена: {currentCoach.bottom_price || currentCoach.price} ₽</span>
              </div>

              {/* Сетка мест */}
              <div className="seats-grid">
                {currentCoach.seats.map(seat => {
                  const isSelected = selectedSeats.includes(seat.index);
                  const isAvailable = seat.available;
                  
                  return (
                    <div 
                      key={seat.index} 
                      className={`seat ${!isAvailable ? 'occupied' : isSelected ? 'selected' : 'available'}`}
                      onClick={() => toggleSeat(seat)}
                    >
                      {seat.index}
                    </div>
                  );
                })}
              </div>

              <div className="bottom-action">
                <div className="total-price">
                  Выбрано мест: <strong>{selectedSeats.length}</strong>
                </div>
                <button disabled={selectedSeats.length === 0} onClick={handleNext}>
                  ДАЛЕЕ
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default SeatsPage; 