import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import './Header.css'

function Header({ user, setUser }) {
  const handleLoginSuccess = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential)
      setUser({
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
      })
      localStorage.setItem('user', JSON.stringify({
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
      }))
    } catch (error) {
      console.error('Error decoding token:', error)
    }
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <header className="header-banner">
      <div className="header-container">
        <div className="logo-section">
          <h1 className="logo">🏖️ Cartagena Tours</h1>
        </div>

        <div className="account-section">
          {user ? (
            <div className="user-info">
              <img 
                src={user.picture} 
                alt={user.name}
                className="user-avatar"
              />
              <div className="user-details">
                <p className="user-name">{user.name}</p>
                <p className="user-email">{user.email}</p>
              </div>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <div className="login-section">
              <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={() => console.log('Login Failed')}
              />
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
