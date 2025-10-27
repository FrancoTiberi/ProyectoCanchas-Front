import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Footer } from './components/footer';
import  { Header }  from './components/Header';
import { Reservaf5 } from './pages/reservaf5';
import { Menu } from './pages/menu';
import { ROLES } from './roles';
import AdminPanel from "./pages/AdminPanel";
import { Construccion } from './pages/construccion';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Construccion />} />
        <Route path='/reservas' element={<Reservaf5 />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/contacto' element={<Construccion />} />
        <Route path='/sobrenosotros' element={<Construccion />} />
        <Route path='/registrar' element={<Construccion />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

/*   <ProtectedRoute allowedRoles={['admin', 'user']}> */