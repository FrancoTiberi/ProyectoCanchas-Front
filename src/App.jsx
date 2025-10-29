import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Reservaf5 } from './pages/reservaf5';
import { Menu } from './pages/menu';
import { ROLES } from './roles';
import AdminPanel from "./pages/AdminPanel";
import { Construccion } from './pages/construccion';
import { Inicio } from './pages/inicio';
import LayoutConHeader from './layouts/LayoutConHeader';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Inicio />} />
        <Route element={<LayoutConHeader/>}>
        <Route path='/reservas' element={<Reservaf5 />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/contacto' element={<Construccion />} />
        <Route path='/sobrenosotros' element={<Construccion />} />
        <Route path='/registrar' element={<Construccion />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

/*   <ProtectedRoute allowedRoles={['admin', 'user']}> */