import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import ChatPage from './pages/Chatpage'
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
// import PrivateRoute from './components/PrivateRoute';


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path='/chat' element={<ChatPage />} />
      </Routes>
    </>
  )
}

export default App
