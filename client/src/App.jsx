import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import ChatPage from './pages/ChatPage'
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AddProductPage from './pages/AddProductPage';
import CartPage from './pages/CartPage';
import PrivateRoute from './components/PrivateRoute';


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

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
