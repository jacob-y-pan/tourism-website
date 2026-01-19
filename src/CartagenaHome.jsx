import { useState } from 'react'
import { Link } from 'react-router-dom'
import './CartagenaHome.css'
import activitiesData from './data.json'

function CartagenaHome() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const activities = activitiesData.activities
  const categories = ['All', 'Historical', 'Beach', 'Water Sports', 'Food & Drink', 'Nature', 'Entertainment']

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = selectedCategory === 'All' || activity.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    return (
      <span className="stars">
        {'⭐'.repeat(fullStars)}
        {hasHalfStar && '✨'}
      </span>
    )
  }

  return (
    <div className="cartagena-home">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <h1 className="header-title">Cartagena Tours & Activities</h1>
          <p className="header-subtitle">Discover and book the best experiences in Colombia's Caribbean gem</p>
        </div>
      </header>

      {/* Search Bar */}
      <section className="search-section">
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search tours, activities, experiences..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>
      </section>

      {/* Category Filters */}
      <section className="filter-section">
        <div className="category-filters">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <p className="results-count">
          Showing {filteredActivities.length} of {activities.length} activities
        </p>
      </section>

      {/* Activities Grid */}
      <section className="activities-section">
        <div className="activities-grid">
          {filteredActivities.length > 0 ? (
            filteredActivities.map(activity => (
              <Link 
                key={activity.id}
                to={`/activity/${activity.id}`}
                className="activity-card-link"
              >
                <div className="activity-card">
                  {activity.badge && <div className="activity-badge">{activity.badge}</div>}
                  <div className="activity-icon">{activity.icon}</div>
                  <h3 className="activity-name">{activity.name}</h3>
                  
                  <div className="rating-section">
                    {renderStars(activity.rating)}
                    <span className="rating-number">({activity.reviews})</span>
                  </div>

                  <p className="activity-category">{activity.category}</p>
                  <p className="activity-description">{activity.description}</p>

                  <div className="activity-details">
                    <div className="detail-item">
                      <span className="detail-icon">⏱️</span>
                      <span className="detail-text">{activity.duration}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">👥</span>
                      <span className="detail-text">{activity.participants} booked</span>
                    </div>
                  </div>

                  <div className="activity-footer">
                    <div className="price-section">
                      <span className="activity-price">{activity.price}</span>
                      <span className="per-person">/person</span>
                    </div>
                    <button className="btn-book">View Details</button>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="no-results">
              <p>🔍 No activities found</p>
              <p>Try different search terms or categories</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <p>✅ Verified reviews from real travelers | 🌍 Book with confidence | 💰 Best price guarantee</p>
      </footer>
    </div>
  )
}

export default CartagenaHome
