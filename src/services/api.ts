// src/services/api.ts
import type { City, Route, Coach } from '../types';

// Базовый URL для всех запросов к API
const BASE_URL = 'https://students.netoservices.ru/fe-diplom';

/**
 * Поиск городов для автодополнения на главной странице
 */
export const fetchCities = async (name: string): Promise<City[]> => {
  if (!name) return [];
  const res = await fetch(`${BASE_URL}/routes/cities?name=${name}`);
  if (!res.ok) throw new Error('Ошибка при загрузке городов');
  return res.json();
};

/**
 * Поиск маршрутов (поездов) по заданным параметрам (города, дата, фильтры)
 */
export const fetchRoutes = async (params: URLSearchParams): Promise<{ total_count: number; items: Route[] }> => {
  const res = await fetch(`${BASE_URL}/routes?${params.toString()}`);
  if (!res.ok) throw new Error('Ошибка при загрузке маршрутов');
  return res.json();
};

/**
 * Загрузка списка вагонов и мест для конкретного маршрута
 */
export const fetchSeats = async (routeId: string): Promise<Coach[]> => {
  const res = await fetch(`${BASE_URL}/routes/${routeId}/seats`);
  if (!res.ok) throw new Error('Ошибка при загрузке мест');
  return res.json();
};

/**
 * Загрузка последних билетов (для отображения на главной или странице результатов)
 */
export const fetchLastTickets = async (): Promise<Route[]> => {
  const res = await fetch(`${BASE_URL}/routes/last`);
  if (!res.ok) throw new Error('Ошибка при загрузке последних билетов');
  return res.json();
};

/**
 * Отправка оформленного заказа на сервер
 */
export const submitOrder = async (orderData: any) => {
  const res = await fetch(`${BASE_URL}/order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  });
  
  if (!res.ok) {
    throw new Error('Ошибка при оформлении заказа');
  }
  
  return res.json();
}; 