import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initializeLoginState } from './redux/authSlice';

import { Routes, Route } from 'react-router-dom';
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
import { AppDispatch } from './redux/store';
import NotAuthorized from './routes/NotAuthorized';
import PaginaAdmin from './routes/PaginaAdmin';


function App () {

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(initializeLoginState());
  }, [dispatch]);

  return (
    <>
  <div className="homepage">
  <NavBar />
  <Routes>
    <Route path="/" element={<HomePage />} />
      <Route path="/retete" element={<Retete />}>  
    </Route> 
      <Route path="/retete/:recipeId" element={<RetetaPage />}/>
      <Route path="/retete/edit/:recipeId" element={<EditeazaReteta />} />
    <Route 
      path="/retetele_mele" 
      element={
      <ProtectedRoute requiredRoles={['ROLE_USER', 'ROLE_ADMIN']}>
        <Layout />
      </ProtectedRoute>}>
      <Route path='' element={<ReteteleMele />} />
      <Route path='plan' element={<PlanAlimentar />}/>
    </Route>
    <Route path='/adauga' element={<AdaugaReteta />} />
    <Route path='/setari' element={<SetariPage />} />
    <Route path='/inregistrare' element={<RegisterPage />} />
    <Route path='/not-authorized' element={<NotAuthorized />} />
    <Route path='/admin' element={<PaginaAdmin />} />
  </Routes>
  </div>
    </>
  )
}

export default App
