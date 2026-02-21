// frontend/src/pages/EventsPage.jsx
// ✅ PREMIUM EVENTS PAGE
// - Beautiful event listing
// - Filter by status (upcoming/completed)
// - Event cards with details
// - Responsive grid layout
// - Premium gold/navy/purple theme

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, ArrowRight, Search, Filter } from "lucide-react";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("upcoming");
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Sample events data (will be replaced with API call)
  useEffect(() => {
    const sampleEvents = [
      {
        _id: 1,
        title: "PSG Tech Alumni Entrepreneur Award Ceremony",
        date: "2026-02-15",
        startDate: "2026-02-15",
        endDate: "2026-02-15",
        venue: "PSG College of Technology, Avinashi Road, Coimbatore",
        description: "An exclusive event to celebrate and award our most successful entrepreneur alumni.",
        status: "upcoming",
        duration: "1 day event",
        attendees: 150,
        image: null,
      },
      {
        _id: 2,
        title: "SITA AND VIRARAGHAVAN MEMORIAL LECTURE",
        date: "2026-01-22",
        startDate: "2026-01-22",
        endDate: "2026-01-22",
        venue: "PSG College of Technology, Avinashi Road, Coimbatore",
        description: "A memorial lecture honoring the legacy of Sita and Viraraghavan.",
        status: "completed",
        duration: "1 day event",
        attendees: 200,
        image: null,
      },
      {
        _id: 3,
        title: "MINI MARATHON by ALUMNI",
        date: "2026-01-11",
        startDate: "2026-01-11",
        endDate: "2026-01-11",
        venue: "PSG College of Technology, Avinashi Road, Coimbatore",
        description: "A fun and energetic mini marathon organized by our alumni community.",
        status: "completed",
        duration: "1 day event",
        attendees: 300,
        image: null,
      },
      {
        _id: 4,
        title: "39th GRD Death Anniversary",
        date: "2026-01-10",
        startDate: "2026-01-10",
        endDate: "2026-01-10",
        venue: "PSG College of Technology, Avinashi Road, Coimbatore",
        description: "Remembrance event honoring the 39th death anniversary.",
        status: "completed",
        duration: "1 day event",
        attendees: 250,
        image: null,
      },
      {
        _id: 5,
        title: "ALUMNI CONGRESS",
        date: "2026-01-10",
        startDate: "2026-01-10",
        endDate: "2026-01-10",
        venue: "PSG College of Technology, Avinashi Road, Coimbatore",
        description: "Annual congregation of all alumni members to discuss and celebrate achievements.",
        status: "completed",
        duration: "1 day event",
        attendees: 400,
        image: null,
      },
      {
        _id: 6,
        title: "Career Development Workshop",
        date: "2026-03-01",
        startDate: "2026-03-01",
        endDate: "2026-03-01",
        venue: "PSG College of Technology, Avinashi Road, Coimbatore",
        description: "Workshop on career advancement and professional development.",
        status: "upcoming",
        duration: "1 day event",
        attendees: 100,
        image: null,
      },
      {
        _id: 7,
        title: "Networking Breakfast",
        date: "2026-02-28",
        startDate: "2026-02-28",
        endDate: "2026-02-28",
        venue: "PSG College of Technology, Avinashi Road, Coimbatore",
        description: "Casual networking event for alumni to connect and share experiences.",
        status: "upcoming",
        duration: "1 day event",
        attendees: 80,
        image: null,
      },
    ];

    setTimeout(() => {
      setEvents(sampleEvents);
      setLoading(false);
    }, 500);
  }, []);

  // ✅ Filter and search events
  const filteredEvents = events.filter((event) => {
    const matchesFilter = event.status === filter;
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.venue.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // ✅ Separate upcoming and completed events
  const upcomingEvents = filteredEvents.filter((e) => e.status === "upcoming");
  const completedEvents = filteredEvents.filter((e) => e.status === "completed");

  // ✅ Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
    const dayName = date.toLocaleString("en-US", { weekday: "long" });
    return { day, month, year, dayName };
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,600&family=Outfit:wght@300;400;500;600&display=swap');

        .events-section {
          background: linear-gradient(165deg, #f8f5ee 0%, #fdfcf9 45%, #f2f4fa 100%);
          min-height: 100vh;
          padding: 60px 24px;
          font-family: 'Outfit', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .events-section::before {
          content: '';
          position: absolute;
          top: -200px;
          right: -200px;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(201, 168, 76, 0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .events-container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .events-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .events-title {
          font-family: 'Playfair Display', serif;
          font-size: 52px;
          font-weight: 800;
          color: #0c0e1a;
          margin-bottom: 16px;
          letter-spacing: -0.025em;
        }

        .events-subtitle {
          font-size: 16px;
          color: #666e80;
          font-weight: 300;
        }

        .events-controls {
          display: flex;
          gap: 16px;
          margin-bottom: 48px;
          flex-wrap: wrap;
        }

        .search-wrapper {
          flex: 1;
          min-width: 250px;
          position: relative;
        }

        .search-input {
          width: 100%;
          padding: 12px 16px 12px 40px;
          border: 1px solid #e0e6f0;
          border-radius: 8px;
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          transition: all 0.3s;
          background: white;
        }

        .search-input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #a0aec0;
          pointer-events: none;
        }

        .filter-buttons {
          display: flex;
          gap: 12px;
        }

        .filter-btn {
          padding: 11px 24px;
          border: 1px solid #e0e6f0;
          background: white;
          border-radius: 8px;
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #a0aec0;
        }

        .filter-btn.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-color: #667eea;
        }

        .filter-btn:hover:not(.active) {
          background: #f0f3f9;
          color: #667eea;
          border-color: #667eea;
        }

        .events-section-title {
          font-family: 'Playfair Display', serif;
          font-size: 24px;
          font-weight: 700;
          color: #0c0e1a;
          margin-bottom: 24px;
          margin-top: 40px;
          padding-bottom: 16px;
          border-bottom: 2px solid #e0e6f0;
        }

        .events-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(550px, 1fr));
          gap: 24px;
          margin-bottom: 40px;
        }

        .event-card {
          background: white;
          border: 1px solid #e0e6f0;
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.3s;
          cursor: pointer;
          display: flex;
          height: 100%;
        }

        .event-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
          border-color: rgba(102, 126, 234, 0.3);
        }

        .event-date-box {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-width: 120px;
          text-align: center;
          font-weight: 700;
        }

        .event-date-box.completed {
          background: linear-gradient(135deg, #a0aec0 0%, #718096 100%);
        }

        .event-day {
          font-size: 32px;
          font-weight: 800;
          line-height: 1;
          margin-bottom: 4px;
        }

        .event-month-year {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          opacity: 0.9;
        }

        .event-content {
          padding: 24px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .event-status {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 4px 8px;
          border-radius: 4px;
          margin-bottom: 12px;
          width: fit-content;
        }

        .event-status.upcoming {
          background: #e0f2fe;
          color: #0369a1;
        }

        .event-status.completed {
          background: #f0fdf4;
          color: #166534;
        }

        .event-title {
          font-size: 16px;
          font-weight: 700;
          color: #0c0e1a;
          margin-bottom: 12px;
          line-height: 1.4;
        }

        .event-venue {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 13px;
          color: #666e80;
          margin-bottom: 12px;
          line-height: 1.4;
        }

        .event-venue svg {
          color: #667eea;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .event-duration {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #666e80;
          margin-bottom: 16px;
        }

        .event-duration svg {
          color: #667eea;
        }

        .event-attendees {
          font-size: 12px;
          color: #a0aec0;
          margin-top: auto;
          padding-top: 12px;
          border-top: 1px solid #e0e6f0;
        }

        .empty-state {
          text-align: center;
          padding: 60px 20px;
          color: #a0aec0;
        }

        .empty-state-icon {
          font-size: 64px;
          margin-bottom: 16px;
        }

        .empty-state-title {
          font-size: 18px;
          font-weight: 600;
          color: #0c0e1a;
          margin-bottom: 8px;
        }

        .empty-state-text {
          font-size: 14px;
          color: #a0aec0;
        }

        @media (max-width: 900px) {
          .events-grid {
            grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
          }

          .events-title {
            font-size: 36px;
          }

          .events-controls {
            flex-direction: column;
          }

          .search-wrapper {
            min-width: auto;
          }

          .filter-buttons {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 600px) {
          .events-section {
            padding: 40px 16px;
          }

          .events-title {
            font-size: 28px;
          }

          .event-card {
            flex-direction: column;
          }

          .event-date-box {
            min-width: auto;
            padding: 16px;
          }

          .event-date-box .event-day {
            font-size: 24px;
          }
        }
      `}</style>

      <motion.div
        className="events-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="events-container">
          {/* Header */}
          <motion.div
            className="events-header"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className="events-title">Events</h1>
            <p className="events-subtitle">
              Explore upcoming events and past celebrations from our alumni community
            </p>
          </motion.div>

          {/* Search & Filter */}
          <motion.div
            className="events-controls"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="search-wrapper">
              <Search className="search-icon" size={18} />
              <input
                type="text"
                className="search-input"
                placeholder="Search events by name or venue..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="filter-buttons">
              <button
                className={`filter-btn ${filter === "upcoming" ? "active" : ""}`}
                onClick={() => setFilter("upcoming")}
              >
                Upcoming
              </button>
              <button
                className={`filter-btn ${filter === "completed" ? "active" : ""}`}
                onClick={() => setFilter("completed")}
              >
                Completed
              </button>
            </div>
          </motion.div>

          {/* Upcoming Events */}
          {filter === "upcoming" && (
            <motion.div
              key="upcoming"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {upcomingEvents.length > 0 && (
                <h2 className="events-section-title">
                  Upcoming Events ({upcomingEvents.length})
                </h2>
              )}
              <div className="events-grid">
                {upcomingEvents.map((event, idx) => {
                  const dateInfo = formatDate(event.date);
                  return (
                    <motion.div
                      key={event._id}
                      className="event-card"
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: idx * 0.1 }}
                    >
                      <div className="event-date-box">
                        <div className="event-day">{dateInfo.day}</div>
                        <div className="event-month-year">
                          {dateInfo.month} {dateInfo.year}
                        </div>
                      </div>

                      <div className="event-content">
                        <span className="event-status upcoming">
                          {dateInfo.dayName.substring(0, 3).toUpperCase()}
                        </span>

                        <h3 className="event-title">{event.title}</h3>

                        <div className="event-venue">
                          <MapPin size={16} />
                          <span>{event.venue}</span>
                        </div>

                        <div className="event-duration">
                          <Clock size={16} />
                          <span>{event.duration}</span>
                        </div>

                        <div className="event-attendees">
                          👥 {event.attendees} expected attendees
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {upcomingEvents.length === 0 && (
                <motion.div
                  className="empty-state"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="empty-state-icon">📅</div>
                  <div className="empty-state-title">No upcoming events</div>
                  <div className="empty-state-text">
                    Check back soon for new events!
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Completed Events */}
          {filter === "completed" && (
            <motion.div
              key="completed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {completedEvents.length > 0 && (
                <h2 className="events-section-title">
                  Completed Events ({completedEvents.length})
                </h2>
              )}
              <div className="events-grid">
                {completedEvents.map((event, idx) => {
                  const dateInfo = formatDate(event.date);
                  return (
                    <motion.div
                      key={event._id}
                      className="event-card"
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: idx * 0.1 }}
                    >
                      <div className="event-date-box completed">
                        <div className="event-day">{dateInfo.day}</div>
                        <div className="event-month-year">
                          {dateInfo.month} {dateInfo.year}
                        </div>
                      </div>

                      <div className="event-content">
                        <span className="event-status completed">
                          {dateInfo.dayName.substring(0, 3).toUpperCase()}
                        </span>

                        <h3 className="event-title">{event.title}</h3>

                        <div className="event-venue">
                          <MapPin size={16} />
                          <span>{event.venue}</span>
                        </div>

                        <div className="event-duration">
                          <Clock size={16} />
                          <span>{event.duration}</span>
                        </div>

                        <div className="event-attendees">
                          👥 {event.attendees} attendees
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {completedEvents.length === 0 && (
                <motion.div
                  className="empty-state"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="empty-state-icon">✓</div>
                  <div className="empty-state-title">No completed events</div>
                  <div className="empty-state-text">
                    Past events will appear here
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default EventsPage;