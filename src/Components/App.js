import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '../Contexts/AuthContext'
import Chats from './Chats/Chats'
import Login from './Login/Login'

function App() {
  return (
    <div style={{ fontFamily: 'Avenir' }}>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<Login />} exact />
            <Route path='/chats' element={<Chats />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App
