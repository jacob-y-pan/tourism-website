import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
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
    <>
      <Header user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<CartagenaHome />} />
        <Route path="/activity/:id" element={<ActivityDetail />} />
      </Routes>
    </>
  )
}

export default App
