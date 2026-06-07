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
import Pagos from './components/PagoReservas';
import RecuperarContrasenia from './pages/recuperarContrasenia'
import ConfirmarCorreo from './pages/confirmarCorreo';
import { Tienda } from './pages/tienda';
import PagoTienda from './components/PagoTienda';

// Admin
import DashboardAdmin from './Admin/Views/DashboardAdmin';
import ComidasAdmin from './Admin/Views/ComidasAdmin';
import CanchasAdmin from './Admin/Views/CanchasAdmin';
import ReservasAdmin from './Admin/Views/ReservasAdmin';
import ProductosAdmin from './Admin/Views/ProductosAdmin';

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
        <Route path='/pagos' element={<Pagos />}></Route>
        <Route path="/confirmarCorreo" element={<ConfirmarCorreo />} />
        <Route path="/recuperarContrasenia/:id/:token" element={<RecuperarContrasenia />} />
        <Route path="/tienda" element={<Tienda />} />
        <Route path='/pago-tienda' element={<PagoTienda />}></Route>
      </Route>

      {/* Rutas protegidas para admin */}
      <Route element={<ProtectedRoute allowedRoles={['ADMIN_ROLE']} />}>
        <Route element={<LayoutSinNada />}>
          <Route path="/admin" element={<AdminPanel />}>
            <Route index element={<DashboardAdmin />} />
            <Route path="comidas" element={<ComidasAdmin />} />
            <Route path="canchas" element={<CanchasAdmin />} />
            <Route path="reservas" element={<ReservasAdmin />} />
            <Route path="productos" element={<ProductosAdmin />} />
          </Route>
        </Route>
      </Route>

    </Routes>
  );
}

export default App;
