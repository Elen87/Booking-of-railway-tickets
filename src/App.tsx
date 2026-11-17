import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import MainPage from './pages/MainPage';
import ResultsPage from './pages/ResultsPage';
import SeatsPage from './pages/SeatsPage';
import PassengersPage from './pages/PassengersPage';
import PaymentPage from './pages/PaymentPage'; // <-- Импорт
import SuccessPage from './pages/SuccessPage'; // <-- Импорт

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="results" element={<ResultsPage />} />
          <Route path="seats/:id" element={<SeatsPage />} />
          <Route path="passengers" element={<PassengersPage />} />
          <Route path="payment" element={<PaymentPage />} /> {/* <-- Маршрут */}
          <Route path="success" element={<SuccessPage />} /> {/* <-- Маршрут */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App; 