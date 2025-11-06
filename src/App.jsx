import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Layouts
import LayoutConHeader from './layouts/LayoutConHeader';
import LayoutSinNada from './layouts/LayoutSinNada';

// Páginas públicas
import { Inicio } from './pages/inicio';
import { Reservaf5 } from './pages/reservaf5';
import { Menu } from './pages/menu';
import Contacto from './pages/contacto';
import SobreNosotros from './pages/sobreNosotros';
import Registrar from './pages/registrar';
import { Construccion } from './pages/construccion';

// Admin
import DashboardAdmin from './Admin/Views/DashboardAdmin';
import ComidasAdmin from './Admin/Views/ComidasAdmin';
import ReservasAdmin from './Admin/Views/ReservasAdmin';

// Rutas protegidas
import { ProtectedRoute } from './components/ProtectedRoute';
import AdminPanel from './Admin/AdminPanel';

function App() {
  return (
    <Routes>
      {/* Página principal */}
      <Route path="/" element={<Inicio />} />

      {/* Rutas públicas con header */}
      <Route element={<LayoutConHeader />}>
        <Route path="/reservas" element={<Reservaf5 />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/sobrenosotros" element={<SobreNosotros />} />
        <Route path="/registrar" element={<Registrar />} />
        <Route path="/construccion" element={<Construccion />} />
      </Route>

      {/* Rutas protegidas para admin */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route element={<LayoutSinNada />}>
          <Route path="/admin" element={<AdminPanel />}>
            <Route index element={<DashboardAdmin />} />
            <Route path="comidas" element={<ComidasAdmin />} />
            <Route path="reservas" element={<ReservasAdmin />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
