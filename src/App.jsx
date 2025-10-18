import { BrowserRouter,Routes,Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Footer } from './components/footer'
import './styles/footer.css'
import { Reservaf5 } from './pages/reservaf5';
import './styles/reserva.css'


function App() {

  return (
    <>
      <Reservaf5/>
      <Footer/>
    </>
  )
}

export default App
