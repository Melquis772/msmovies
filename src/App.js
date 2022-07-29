import 'swiper/css';
import './assets/boxicons-2.0.7/css/boxicons.min.css'
import './App.css';

import { BrowserRouter as Router } from 'react-router-dom';

import { Header } from './components/header/Header';
import { Footer } from './components/footer/Footer';
import { Rutas } from './routes/Routes'

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Header />
      <Rutas />
      <Footer />
    </Router>

  );
}

export default App;

