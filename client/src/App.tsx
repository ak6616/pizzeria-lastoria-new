
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../../client/src/components/Layout';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Gallery from './pages/Gallery';
import News from './pages/News';
import Order from './pages/Order';
import Admin from '../../client/src/components/Admin';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFailed from './pages/PaymentFailed';
import RegulationsPage from './pages/RegulationsPage';
import RodoPage from './pages/RodoPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="menu/:location" element={<Menu />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="news" element={<News />} />
          <Route path="order" element={<Order />} />
          <Route path="admin" element={<Admin />} />
          <Route path="paymentSuccess" element={<PaymentSuccess />} />
          <Route path="paymentFailed" element={<PaymentFailed />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/regulamin" element={<RegulationsPage />} />
          <Route path="/rodo" element={<RodoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;