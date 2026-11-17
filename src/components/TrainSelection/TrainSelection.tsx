// src/components/TrainSelection/TrainSelection.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Route } from '../../types';
import './TrainSelection.scss';

interface TrainSelectionProps {
  route: Route;
}

const TrainSelection: React.FC<TrainSelectionProps> = ({ route }) => {
  const navigate = useNavigate();
  const dep = route.departure;

  // Форматирование времени (секунды -> ЧЧ:ММ)
  const formatTime = (sec: number) => new Date(sec * 1000).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  
  // Форматирование длительности
  const formatDuration = (sec: number) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    return `${h}:${m < 10 ? '0' : ''}${m}`;
  };

  const handleSelect = () => {
    navigate(`/seats/${dep._id}`, { state: { route } });
  };

  return (
    <div className="train-card">
      {/* Левая часть (фиолетовая) */}
      <div className="train-card__left">
        <div className="train-icon">🚆</div>
        <h3 className="train-name">{dep.train.name}</h3>
        <div className="train-route">
          <span>{dep.from.city.name}</span>
          <span>→</span>
          <span>{dep.to.city.name}</span>
        </div>
      </div>

      {/* Центральная часть (время) */}
      <div className="train-card__middle">
        <div className="time-block">
          <div className="time">{formatTime(dep.from.datetime)}</div>
          <div className="city">{dep.from.city.name}</div>
          <div className="station">{dep.from.railway_station_name}</div>
        </div>
        
        <div className="duration-block">
          <div className="duration">{formatDuration(dep.duration)}</div>
          <div className="arrow">→</div>
        </div>

        <div className="time-block">
          <div className="time">{formatTime(dep.to.datetime)}</div>
          <div className="city">{dep.to.city.name}</div>
          <div className="station">{dep.to.railway_station_name}</div>
        </div>
      </div>

      {/* Правая часть (цены) */}
      <div className="train-card__right">
        {dep.price_info.fourth && (
          <div className="price-row">
            <span className="type">Сидячий</span>
            <span className="seats">{route.available_seats_info.fourth || 0}</span>
            <span className="price">от {dep.price_info.fourth.top_price} ₽</span>
          </div>
        )}
        {dep.price_info.third && (
          <div className="price-row">
            <span className="type">Плацкарт</span>
            <span className="seats">{route.available_seats_info.third || 0}</span>
            <span className="price">от {dep.price_info.third.bottom_price} ₽</span>
          </div>
        )}
        {dep.price_info.second && (
          <div className="price-row">
            <span className="type">Купе</span>
            <span className="seats">{route.available_seats_info.second || 0}</span>
            <span className="price">от {dep.price_info.second.top_price} ₽</span>
          </div>
        )}
        {dep.price_info.first && (
          <div className="price-row">
            <span className="type">Люкс</span>
            <span className="seats">{route.available_seats_info.first || 0}</span>
            <span className="price">от {dep.price_info.first.price} ₽</span>
          </div>
        )}

        <button className="select-btn" onClick={handleSelect}>Выбрать места</button>
      </div>
    </div>
  );
};

export default TrainSelection; 