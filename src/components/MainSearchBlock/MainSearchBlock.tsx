// src/components/MainSearchBlock/MainSearchBlock.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCities } from '../../services/api';
import { useDebounce } from '../../hooks/useDebounce';
import type { City } from '../../types';
import './MainSearchBlock.scss';

const MainSearchBlock: React.FC = () => {
  const navigate = useNavigate();
  
  // Состояния для полей ввода
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [date, setDate] = useState('');

  // Состояния для ID городов (нужны для API)
  const [fromId, setFromId] = useState('');
  const [toId, setToId] = useState('');

  // Состояния для выпадающих списков автодополнения
  const [fromOptions, setFromOptions] = useState<City[]>([]);
  const [toOptions, setToOptions] = useState<City[]>([]);

  // Дебаунс ввода (задержка 500мс)
  const debouncedFrom = useDebounce(fromCity, 500);
  const debouncedTo = useDebounce(toCity, 500);

  // Эффект для загрузки городов "Откуда"
  useEffect(() => {
    if (debouncedFrom.length >= 2 && !fromId) {
      fetchCities(debouncedFrom)
        .then(setFromOptions)
        .catch(console.error);
    } else {
      setFromOptions([]);
    }
  }, [debouncedFrom, fromId]);

  // Эффект для загрузки городов "Куда"
  useEffect(() => {
    if (debouncedTo.length >= 2 && !toId) {
      fetchCities(debouncedTo)
        .then(setToOptions)
        .catch(console.error);
    } else {
      setToOptions([]);
    }
  }, [debouncedTo, toId]);

  // Обработчик отправки формы
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fromId || !toId || !date) {
      alert('Пожалуйста, выберите города из списка и укажите дату');
      return;
    }

    // Формируем параметры для URL
    const params = new URLSearchParams({
      from_city_id: fromId,
      to_city_id: toId,
      date_start: date,
    });

    // Переходим на страницу результатов
    navigate(`/results?${params.toString()}`);
  };

  return (
    <section className="search-block">
      <div className="container search-block__container">
        
        <div className="search-block__text">
          <h1>Вся жизнь — <br /> путешествие!</h1>
        </div>

        <div className="search-block__form-wrapper">
          <form className="search-form" onSubmit={handleSearch}>
            
            <div className="search-form__group">
              <label>Направление</label>
              <div className="search-form__row">
                {/* Поле ОТКУДА */}
                <div className="input-wrapper">
                  <input 
                    type="text" 
                    placeholder="Откуда" 
                    value={fromCity}
                    onChange={(e) => {
                      setFromCity(e.target.value);
                      setFromId(''); // Сбрасываем ID при изменении текста
                    }}
                  />
                  {fromOptions.length > 0 && (
                    <ul className="autocomplete-list">
                      {fromOptions.map(city => (
                        <li 
                          key={city._id} 
                          onClick={() => {
                            setFromCity(city.name);
                            setFromId(city._id);
                            setFromOptions([]);
                          }}
                        >
                          {city.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Поле КУДА */}
                <div className="input-wrapper">
                  <input 
                    type="text" 
                    placeholder="Куда" 
                    value={toCity}
                    onChange={(e) => {
                      setToCity(e.target.value);
                      setToId(''); // Сбрасываем ID
                    }}
                  />
                  {toOptions.length > 0 && (
                    <ul className="autocomplete-list">
                      {toOptions.map(city => (
                        <li 
                          key={city._id} 
                          onClick={() => {
                            setToCity(city.name);
                            setToId(city._id);
                            setToOptions([]);
                          }}
                        >
                          {city.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            <div className="search-form__group">
              <label>Дата</label>
              <div className="search-form__row">
                {/* Поле ДАТА ТУДА */}
                <div className="input-wrapper">
                  <input 
                    type="date" 
                    value={date} 
                    onChange={(e) => setDate(e.target.value)} 
                  />
                </div>
                
                {/* Поле ДАТА ОБРАТНО (теперь без disabled и opacity) */}
                <div className="input-wrapper">
                  <input type="date" />
                </div>
              </div>
            </div>

            <button type="submit" className="search-btn">
              НАЙТИ БИЛЕТЫ
            </button>
          </form>
        </div>

      </div>
    </section>
  );
};

export default MainSearchBlock;