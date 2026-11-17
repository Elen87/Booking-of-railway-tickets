// src/components/SidebarSelection/SidebarSelection.tsx
import React from 'react';
import './SidebarSelection.scss';

interface SidebarSelectionProps {
  sort: string;
  setSort: (sort: string) => void;
  priceFrom: number;
  setPriceFrom: (val: number) => void;
  priceTo: number;
  setPriceTo: (val: number) => void;
}

const SidebarSelection: React.FC<SidebarSelectionProps> = ({ 
  sort, setSort, priceFrom, setPriceFrom, priceTo, setPriceTo 
}) => {
  return (
    <aside className="sidebar">
      
      {/* Блок сортировки */}
      <div className="sidebar__block">
        <h3>Сортировка</h3>
        <div className="sidebar__sort-buttons">
          <button className={sort === 'date' ? 'active' : ''} onClick={() => setSort('date')}>По времени</button>
          <button className={sort === 'price' ? 'active' : ''} onClick={() => setSort('price')}>По цене</button>
          <button className={sort === 'duration' ? 'active' : ''} onClick={() => setSort('duration')}>По длительности</button>
        </div>
      </div>

      {/* Блок стоимости (ползунки) */}
      <div className="sidebar__block">
        <h3>Стоимость</h3>
        <div className="sidebar__price-inputs">
          <input 
            type="number" 
            value={priceFrom} 
            onChange={(e) => setPriceFrom(Number(e.target.value))} 
            placeholder="от"
          />
          <span>—</span>
          <input 
            type="number" 
            value={priceTo} 
            onChange={(e) => setPriceTo(Number(e.target.value))} 
            placeholder="до"
          />
        </div>
      </div>

      {/* Блок типов вагонов (пока для визуала) */}
      <div className="sidebar__block">
        <h3>Тип вагона</h3>
        <label className="toggle"><input type="checkbox" /> Купе</label>
        <label className="toggle"><input type="checkbox" /> Плацкарт</label>
        <label className="toggle"><input type="checkbox" /> Сидячий</label>
        <label className="toggle"><input type="checkbox" /> Люкс</label>
      </div>

    </aside>
  );
};

export default SidebarSelection; 