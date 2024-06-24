import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from "./components/NavBar"
import HomePage from "./routes/HomePage"
import Retete from "./routes/Retete"
import './styles/app.scss'
import RetetaPage from './routes/RetetaPage';
import Layout from './routes/Layout';
import ReteteleMele from './components/ReteteleMele';
import AdaugaReteta from './routes/AdaugaReteta';
import PlanAlimentar from './components/PlanAlimentar';
import SetariPage from './routes/SetariPage';
import EditeazaReteta from './routes/EditeazaReteta';
import RegisterPage from './routes/RegisterPage';
import ProtectedRoute from './functional/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <>
<div className="homepage">
  <Router>
  <AuthProvider>
  <NavBar />
  <Routes>
    <Route path="/" element={<HomePage />} />
      <Route path="/retete" element={<Retete />}>  
    </Route> 
      <Route path="/retete/:recipeId" element={<RetetaPage />}/>
      <Route path="/retete/edit/:recipeId" element={<EditeazaReteta />} />
    <Route 
      path="/retetele_mele" 
      element={<ProtectedRoute roles={['user']}><Layout /></ProtectedRoute>}>
      <Route path='' element={<ReteteleMele />} />
      <Route path='plan' element={<PlanAlimentar />}/>
    </Route>
    <Route path='/adauga' element={<AdaugaReteta />} />
    <Route path='/setari' element={<SetariPage />} />
    <Route path='/inregistrare' element={<RegisterPage />} />
  </Routes>
  </AuthProvider>
  </Router>
</div>
    </>
  )
}

export default App
