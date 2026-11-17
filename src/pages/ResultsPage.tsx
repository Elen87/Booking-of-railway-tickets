// src/pages/ResultsPage.tsx
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchRoutes } from '../services/api';
import type { Route } from '../types';
import ProgressBar from '../components/ProgressBar/ProgressBar';
import SidebarSelection from '../components/SidebarSelection/SidebarSelection';
import TrainSelection from '../components/TrainSelection/TrainSelection';
import './ResultsPage.scss';

const ResultsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Состояния для фильтров
  const [sort, setSort] = useState('date'); // date, price, duration
  const [priceFrom, setPriceFrom] = useState(0);
  const [priceTo, setPriceTo] = useState(10000);

  const fromId = searchParams.get('from_city_id');
  const toId = searchParams.get('to_city_id');
  const date = searchParams.get('date_start');

  useEffect(() => {
    if (!fromId || !toId) {
      setError('Не выбраны города');
      setLoading(false);
      return;
    }

    setLoading(true);
    // Формируем параметры для API с учетом фильтров
    const params = new URLSearchParams({
      from_city_id: fromId,
      to_city_id: toId,
      date_start: date || '',
      sort: sort,
      price_from: priceFrom.toString(),
      price_to: priceTo.toString(),
    });

    fetchRoutes(params)
      .then((data) => {
        setRoutes(data.items);
        setLoading(false);
      })
      .catch(() => {
        setError('Ошибка при загрузке маршрутов');
        setLoading(false);
      });
  }, [fromId, toId, date, sort, priceFrom, priceTo]); // Добавили зависимости от фильтров

  return (
    <div className="results-page">
      <ProgressBar currentStep={1} />

      <div className="container results-page__content-wrapper">
        
        {/* Передаем состояния и функции в Сайдбар */}
        <SidebarSelection 
          sort={sort} 
          setSort={setSort} 
          priceFrom={priceFrom} 
          setPriceFrom={setPriceFrom} 
          priceTo={priceTo} 
          setPriceTo={setPriceTo} 
        />

        <main className="results-page__main">
          {loading && <div className="loading">Загрузка...</div>}
          {error && <div className="error">{error}</div>}
          
          {!loading && !error && (
            <>
              <div className="results-header">
                <span>найдено {routes.length}</span>
                <span>сортировать по: <strong>{sort === 'date' ? 'времени' : sort === 'price' ? 'цене' : 'длительности'}</strong></span>
              </div>

              {routes.length === 0 && <p>По вашему запросу ничего не найдено.</p>}

              {routes.map((route, index) => (
                <TrainSelection key={index} route={route} />
              ))}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default ResultsPage;