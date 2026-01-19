import { useParams, useNavigate } from 'react-router-dom'
import './ActivityDetail.css'
import activitiesData from './data.json'

function ActivityDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const activity = activitiesData.activities.find(a => a.id === parseInt(id))

  if (!activity) {
    return (
      <div className="activity-detail">
        <div className="detail-header">
          <button className="back-btn" onClick={() => navigate('/')}>← Back</button>
        </div>
        <div className="not-found">
          <p>Activity not found</p>
        </div>
      </div>
    )
  }

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
    <div className="activity-detail">
      {/* Header with back button */}
      <div className="detail-header">
        <button className="back-btn" onClick={() => navigate('/')}>← Back to Activities</button>
      </div>

      {/* Hero section with image */}
      <div className="hero-section">
        <img 
          src={activity.image} 
          alt={activity.name}
          className="hero-image"
        />
      </div>

      {/* Icon and Badge section */}
      <div className="icon-badge-section">
        <div className="activity-icon-large">{activity.icon}</div>
        {activity.badge && <div className="activity-badge-large">{activity.badge}</div>}
      </div>

      {/* Main content */}
      <div className="detail-container">
        {/* Title and rating */}
        <div className="title-section">
          <h1 className="activity-title">{activity.name}</h1>
          <div className="rating-section-detail">
            {renderStars(activity.rating)}
            <span className="rating-number">({activity.reviews} reviews)</span>
          </div>
          <p className="category-badge">{activity.category}</p>
        </div>

        {/* Quick info cards */}
        <div className="quick-info">
          <div className="info-card">
            <span className="info-icon">⏱️</span>
            <div className="info-content">
              <p className="info-label">Duration</p>
              <p className="info-value">{activity.duration}</p>
            </div>
          </div>
          <div className="info-card">
            <span className="info-icon">👥</span>
            <div className="info-content">
              <p className="info-label">Travelers</p>
              <p className="info-value">{activity.participants} booked</p>
            </div>
          </div>
          <div className="info-card">
            <span className="info-icon">📍</span>
            <div className="info-content">
              <p className="info-label">Meeting Point</p>
              <p className="info-value">{activity.meetingPoint}</p>
            </div>
          </div>
          <div className="info-card">
            <span className="info-icon">📅</span>
            <div className="info-content">
              <p className="info-label">Availability</p>
              <p className="info-value">{activity.availability}</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="description-section">
          <h2>About this tour</h2>
          <p>{activity.longDescription}</p>
        </div>

        {/* Highlights */}
        <div className="highlights-section">
          <h2>Highlights</h2>
          <ul className="highlights-list">
            {activity.highlights.map((highlight, index) => (
              <li key={index}>✨ {highlight}</li>
            ))}
          </ul>
        </div>

        {/* What's included */}
        <div className="includes-section">
          <div className="includes-column">
            <h3>What's Included</h3>
            <ul className="includes-list">
              {activity.includes.map((item, index) => (
                <li key={index}>✅ {item}</li>
              ))}
            </ul>
          </div>
          <div className="includes-column">
            <h3>What's Not Included</h3>
            <ul className="not-includes-list">
              {activity.notIncludes.map((item, index) => (
                <li key={index}>❌ {item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Booking section */}
        <div className="booking-section">
          <div className="price-details">
            <p className="price-label">Price per person</p>
            <p className="price-value">{activity.price}</p>
          </div>
          <button className="btn-book-now">Book Now</button>
        </div>
      </div>
    </div>
  )
}

export default ActivityDetail
