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
          <Route path="/purchases" element = {<Purchases/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
        </Container>
      </HashRouter>
  )
}

export default App
