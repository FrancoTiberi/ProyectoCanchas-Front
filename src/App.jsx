import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Reservaf5 } from './pages/reservaf5';
import { Menu } from './pages/menu';
import { ROLES } from './roles';
import Admin from "./Admin/AdminPanel";
import { Construccion } from './pages/construccion';
import { Inicio } from './pages/inicio';
import LayoutConHeader from './layouts/LayoutConHeader';
import LayoutSinNada from './layouts/LayoutSinNada';
import ComidasAdmin from './Admin/Views/ComidasAdmin';
import ReservasAdmin from './Admin/Views/ReservasAdmin';
import DashboardAdmin from './Admin/Views/DashboardAdmin';
import Contacto from './pages/contacto';
import SobreNosotros from './pages/sobreNosotros';
import Registrar from './pages/registrar';


function App() {
  return (
    <Routes>
      <Route path='/' element={<Inicio />} />

      {/* Público */}
      <Route element={<LayoutConHeader />}>
        <Route path='/reservas' element={<Reservaf5 />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/contacto' element={<Contacto />} />
        <Route path='/sobrenosotros' element={<SobreNosotros />} />
        <Route path='/registrar' element={<Registrar />} />
        <Route path='/construccion' element={<Construccion />} />
      </Route>

      {/* Admin */}
      <Route element={<LayoutSinNada />}>
        <Route path='/admin' element={<Admin />}>
          <Route index element={<DashboardAdmin />} />
          <Route path='comidas' element={<ComidasAdmin />} />
          <Route path='reservas' element={<ReservasAdmin />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

/*   <ProtectedRoute allowedRoles={['admin', 'user']}> */