import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import ChatPage from './pages/Chatpage'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/chat' element={<ChatPage />} />
      </Routes>
    </>
  )
}

export default App
