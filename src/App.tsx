import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import MainPage from './pages/MainPage';
import ResultsPage from './pages/ResultsPage';
import SeatsPage from './pages/SeatsPage';
import PassengersPage from './pages/PassengersPage';
import PaymentPage from './pages/PaymentPage';
import SuccessPage from './pages/SuccessPage';

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="results" element={<ResultsPage />} />
          <Route path="seats/:id" element={<SeatsPage />} />
          <Route path="passengers" element={<PassengersPage />} />
          <Route path="payment" element={<PaymentPage />} />
          <Route path="success" element={<SuccessPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;