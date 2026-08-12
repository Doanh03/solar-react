import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ProjectsPage from './pages/Projects';
import ContactPage from './pages/ContactPage';
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ve-chung-toi" element={<AboutPage />} />
        <Route path="/dich-vu" element={<ServicesPage />} />
        <Route path="/du-an" element={<ProjectsPage />} />
        <Route path="/lien-he" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;