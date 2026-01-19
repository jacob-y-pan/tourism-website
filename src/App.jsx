import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Header from './Header'
import CartagenaHome from './CartagenaHome'
import ActivityDetail from './ActivityDetail'
import './App.css'

function App() {
  const [user, setUser] = useState(null)

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error('Error loading user:', error)
        localStorage.removeItem('user')
      }
    }
  }, [])

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <Router>
        <Header user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<CartagenaHome />} />
          <Route path="/activity/:id" element={<ActivityDetail />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  )
}

export default App
