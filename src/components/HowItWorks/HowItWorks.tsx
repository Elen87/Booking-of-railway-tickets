// src/components/HowItWorks/HowItWorks.tsx
import React from 'react';
import './HowItWorks.scss';

const HowItWorks: React.FC = () => (
  <section className="how-it-works" id="how">
    <div className="how-it-works__overlay"></div>
    <div className="container how-it-works__container">
      <div className="how-it-works__header">
        <h2 className="section-title" style={{ color: '#fff' }}>КАК ЭТО РАБОТАЕТ</h2>
        <button className="btn-outline">Узнать больше</button>
      </div>
      
      <div className="how-it-works__steps">
        {/* Шаг 1 (Синяя иконка монитора) */}
        <div className="step">
          <div className="step__icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#00BFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
          </div>
          <p>Удобный заказ<br/>на сайте</p>
        </div>

        {/* Шаг 2 (Белая иконка здания) */}
        <div className="step">
          <div className="step__icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
              <path d="M9 22v-4h6v4"></path>
              <path d="M8 6h.01"></path>
              <path d="M16 6h.01"></path>
              <path d="M12 6h.01"></path>
              <path d="M12 10h.01"></path>
              <path d="M12 14h.01"></path>
              <path d="M16 10h.01"></path>
              <path d="M16 14h.01"></path>
              <path d="M8 10h.01"></path>
              <path d="M8 14h.01"></path>
            </svg>
          </div>
          <p>Нет необходимости<br/>ехать в офис</p>
        </div>

        {/* Шаг 3 (Синяя иконка глобуса) */}
        <div className="step">
          <div className="step__icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#00BFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
          </div>
          <p>Огромный выбор<br/>направлений</p>
        </div>
      </div>
    </div>
  </section>
);

export default HowItWorks; 