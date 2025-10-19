import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Footer } from './components/footer'
import './styles/footer.css'
import { Header } from './components/Header'
import { Reservaf5 } from './pages/reservaf5';
import './styles/reserva.css'
import { Menu } from './pages/menu';

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' Component={Reservaf5} />
        <Route path='/reservas' Component={Reservaf5} />
        <Route path='/menu' Component={Menu} />
        <Route path='/contacto' Component={Reservaf5} />
        <Route path='/sobrenosotros' Component={Reservaf5} />
        <Route path='/iniciarsesion' Component={Reservaf5} />
        <Route path='/registrar' Component={Reservaf5} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
