import { HashRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import LoadingScreen from './components/LoadingScreen'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Login from './pages/Login'

import ProductoDetail from './pages/ProductDetail'
import Purchases from './pages/Purchases'
import {useSelector} from 'react-redux'
import { Container } from 'react-bootstrap'
import ProtectedRoutes from './components/ProtectedRoutes'

function App() {

  /*CODIGO PARA DARLE TIEMPO AL SPINNER*/
  const isLoading = useSelector(state => state.isLoading)
  return (
      <HashRouter>   
        <NavBar/>
        {isLoading && <LoadingScreen/>}
        <Container className='my-5'>
          <Routes>
          {/*CREANDO RUTAS*/}
          <Route path="/" element={<Home/>} />
          <Route path="/product/:id" element = {<ProductoDetail/>}/>
          <Route path="/login" element={<Login/>}/>

         {/*CREANDO TOKEN PARA PEDIR LOGUEO SI INGRESA A PURCHASES */} 
         <Route element={<ProtectedRoutes/>}>
          <Route path="/purchases" element = {<Purchases/>}/>
          </Route>
        </Routes>
        </Container>
      </HashRouter>
  )
}

export default App
