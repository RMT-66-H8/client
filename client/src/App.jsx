import { Route, Routes } from 'react-router'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { checkAuth } from './store/slices/authSlice'
import HomePage from './pages/HomePage'
import ChatPage from './pages/ChatPage'
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AddProductPage from './pages/AddProductPage';
import CartPage from './pages/CartPage';
import PrivateRoute from './components/PrivateRoute';


function App() {
  const dispatch = useDispatch()

  // Check authentication on app load
  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (token) {
      dispatch(checkAuth())
    }
  }, [dispatch])

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route 
          path='/add-product' 
          element={
            <PrivateRoute>
              <AddProductPage />
            </PrivateRoute>
          } 
        />

        <Route 
          path='/cart' 
          element={
            <PrivateRoute>
              <CartPage />
            </PrivateRoute>
          } 
        />

        <Route 
          path='/chat' 
          element={
            <PrivateRoute>
              <ChatPage />
            </PrivateRoute>
          } 
        />
      </Routes>
    </>
  )
}

export default App
