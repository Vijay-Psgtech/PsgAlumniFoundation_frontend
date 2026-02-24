// frontend/src/pages/alumni/AlumniDirectory_PREMIUM.jsx
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Filter, X, Mail, Linkedin } from "lucide-react";
import { alumniAPI } from "../../services/api";

const AlumniDirectory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [alumniData, setAlumniData] = useState({
    alumni: [],
    departments: [],
    years: [],
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,                                  
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // ✅ Load all alumni from backend API
  useEffect(() => {
    const loadAlumni = async () => {
      try {
        setLoading(true);
        const response = await alumniAPI.getAllAlumni();
        const alumni = response.data.alumni || [];

        const uniqueDepartments = [
          ...new Set(alumni.map((a) => a.department)),
        ].filter(Boolean).sort();

        const uniqueYears = [
          ...new Set(alumni.map((a) => a.graduationYear)),
        ].sort((a, b) => b - a);

        setAlumniData({
          alumni,
          departments: uniqueDepartments,
          years: uniqueYears,
        });
      } catch (err) {
        console.error("Error loading alumni:", err);
        setError(err.response?.data?.message || "Failed to load alumni");
      } finally {
        setLoading(false);
      }
    };

    loadAlumni();
  }, []);

  // ✅ Filter alumni
  const filteredAlumni = useMemo(() => {
    let filtered = alumniData.alumni;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.firstName.toLowerCase().includes(term) ||
          a.lastName.toLowerCase().includes(term) ||
          a.email.toLowerCase().includes(term) ||
          (a.currentCompany && a.currentCompany.toLowerCase().includes(term))
      );
    }

    if (filterDepartment) {
      filtered = filtered.filter((a) => a.department === filterDepartment);
    }

    if (filterYear) {
      filtered = filtered.filter(
        (a) => Number(a.graduationYear) === Number(filterYear)
      );
    } 

    return filtered;
  }, [searchTerm, filterDepartment, filterYear, alumniData.alumni]);

  const handleClearFilters = useCallback(() => {
    setSearchTerm("");
    setFilterDepartment("");
    setFilterYear("");
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,600&family=Outfit:wght@300;400;500;600&display=swap');

        .directory-section {
          background: linear-gradient(165deg, #f8f5ee 0%, #fdfcf9 45%, #f2f4fa 100%);
          min-height: 100vh;
          padding: 80px 24px 60px;
          font-family: 'Outfit', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .directory-section::before {
          content: '';
          position: absolute;
          top: -200px;
          right: -200px;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(201, 168, 76, 0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .directory-section::after {
          content: '';
          position: absolute;
          bottom: -150px;
          left: -150px;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(102, 126, 234, 0.06) 0%, transparent 70%);
          pointer-events: none;
        }

        .directory-inner {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .directory-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .directory-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(36px, 5vw, 56px);
          font-weight: 800;
          color: #0c0e1a;
          margin-bottom: 16px;
          letter-spacing: -0.025em;
        }

        .directory-subtitle {
          font-size: 16px;
          color: #666e80;
          font-weight: 300;
        }

        .filters-card {
          background: white;
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 16px;
          padding: 32px;
          margin-bottom: 40px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
        }

        .filters-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #667eea 0%, #764ba2 50%, #667eea 100%);
          border-radius: 16px 16px 0 0;
        }

        .search-wrapper {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
        }

        .search-input {
          flex: 1;
          padding: 13px 18px;
          border: 1px solid #e0e6f0;
          border-radius: 10px;
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          color: #0c0e1a;
          background: #fafbfc;
          transition: all 0.3s;
        }

        .search-input:focus {
          outline: none;
          border-color: #667eea;
          background: white;
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
        }

        .search-icon {
          color: #a0aec0;
          flex-shrink: 0;
        }

        .filter-controls {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          align-items: center;
        }

        .filter-select {
          padding: 10px 14px;
          border: 1px solid #e0e6f0;
          border-radius: 8px;
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          color: #0c0e1a;
          background: #fafbfc;
          cursor: pointer;
          transition: all 0.3s;
          min-width: 160px;
        }

        .filter-select:focus {
          outline: none;
          border-color: #667eea;
          background: white;
        }

        .btn-clear {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 10px 16px;
          background: transparent;
          border: 1px solid #c9a84c;
          color: #c9a84c;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .btn-clear:hover {
          background: rgba(201, 168, 76, 0.08);
          border-color: #e8c960;
          color: #e8c960;
        }

        .alumni-count {
          text-align: center;
          margin-bottom: 40px;
          font-size: 15px;
          color: #666e80;
          font-weight: 400;
        }

        .alumni-count strong {
          color: #667eea;
          font-weight: 700;
          font-size: 16px;
        }

        .alumni-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 28px;
          margin-bottom: 40px;
        }

        .alumni-card {
          background: white;
          border: 1px solid #e0e6f0;
          border-radius: 14px;
          overflow: hidden;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .alumni-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
          opacity: 0;
          transition: opacity 0.3s;
        }

        .alumni-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 16px 48px rgba(0, 0, 0, 0.12);
          border-color: rgba(102, 126, 234, 0.3);
        }

        .alumni-card:hover::before {
          opacity: 1;
        }

        .card-header {
          padding: 24px 24px 0;
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }

        .card-avatar {
          width: 64px;
          height: 64px;
          border-radius: 12px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 20px;
          flex-shrink: 0;
        }

        .card-name-section h3 {
          font-size: 18px;
          font-weight: 700;
          color: #0c0e1a;
          margin: 0 0 4px 0;
        }

        .card-email {
          font-size: 12px;
          color: #666e80;
          word-break: break-all;
        }

        .card-body {
          padding: 20px 24px;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .card-info-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding-bottom: 12px;
          border-bottom: 1px solid #e2e8f0;
        }

        .card-info-group:last-of-type {
          border-bottom: none;
          padding-bottom: 0;
        }

        .info-label {
          font-size: 11px;
          font-weight: 700;
          color: #a0aec0;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .info-value {
          font-size: 14px;
          color: #0c0e1a;
          font-weight: 500;
        }

        .company-name {
          color: #667eea;
          font-weight: 600;
        }

        .card-location {
          font-size: 13px;
          color: #666e80;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .card-footer {
          padding: 0 24px 20px;
          display: flex;
          gap: 10px;
          margin-top: auto;
        }

        .btn-action {
          flex: 1;
          padding: 10px 14px;
          border-radius: 8px;
          border: none;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: all 0.3s;
          text-decoration: none;
          font-family: 'Outfit', sans-serif;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .btn-linkedin {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .btn-linkedin:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(102, 126, 234, 0.3);
        }

        .btn-email {
          background: rgba(201, 168, 76, 0.1);
          color: #c9a84c;
          border: 1px solid rgba(201, 168, 76, 0.3);
        }

        .btn-email:hover {
          background: rgba(201, 168, 76, 0.2);
          border-color: #c9a84c;
        }

        .no-results {
          background: white;
          border: 1px solid #e0e6f0;
          border-radius: 14px;
          padding: 80px 40px;
          text-align: center;
        }

        .no-results p {
          font-size: 18px;
          color: #666e80;
          margin: 0;
        }

        .error-banner {
          background: #fee2e2;
          border: 1px solid #fecaca;
          border-radius: 10px;
          padding: 16px 20px;
          color: #991b1b;
          font-size: 14px;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .loading-message {
          text-align: center;
          padding: 60px 20px;
          font-size: 16px;
          color: #666e80;
        }

        @media (max-width: 900px) {
          .alumni-grid {
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 24px;
          }

          .filter-controls {
            flex-direction: column;
            width: 100%;
          }

          .filter-select {
            width: 100%;
          }
        }

        @media (max-width: 600px) {
          .directory-section {
            padding: 60px 16px 40px;
          }

          .filters-card {
            padding: 24px;
          }

          .alumni-grid {
            grid-template-columns: 1fr;
          }

          .directory-title {
            font-size: 28px;
          }
        }
      `}</style>

      <motion.div
        className="directory-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="directory-inner">
          {/* Header */}
          <motion.div
            className="directory-header"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className="directory-title">Alumni Directory</h1>
            <p className="directory-subtitle">
              Find and connect with alumni from around the world
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            className="filters-card"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Search */}
            <div className="search-wrapper">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                className="search-input"
                placeholder="Search by name, email, or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search alumni"
              />
            </div>

            {/* Filter Controls */}
            <div className="filter-controls">
              <Filter size={18} style={{ color: "#a0aec0" }} />
              <select
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                className="filter-select"
              >
                <option value="">All Departments</option>
                {alumniData.departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>

              <select
                value={filterYear}
                onChange={(e) => setFilterYear(e.target.value)}
                className="filter-select"
              >
                <option value="">All Graduation Years</option>
                {alumniData.years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>

              {(searchTerm || filterDepartment || filterYear) && (
                <motion.button
                  className="btn-clear"
                  onClick={handleClearFilters}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X size={14} />
                  Clear Filters
                </motion.button>
              )}
            </div>
          </motion.div>

          {/* Loading State */}
          {loading && (
            <div className="loading-message">
              <p>🔍 Loading alumni directory...</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="error-banner">
              ⚠️ {error}
            </div>
          )}

          {/* Alumni Count */}
          {!loading && !error && (
            <motion.div
              className="alumni-count"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              Showing <strong>{filteredAlumni.length}</strong> alumni
              {searchTerm && ` matching "${searchTerm}"`}
            </motion.div>
          )}

          {/* Alumni Grid */}
          {!loading && !error && filteredAlumni.length > 0 && (
            <motion.div
              className="alumni-grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredAlumni.map((alumnus) => (
                <motion.div
                  key={alumnus._id}
                  className="alumni-card"
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                >
                  <div className="card-header">
                    <div className="card-avatar">
                      {alumnus.firstName?.charAt(0)}
                      {alumnus.lastName?.charAt(0)}
                    </div>
                    <div className="card-name-section">
                      <h3>
                        {alumnus.firstName} {alumnus.lastName}
                      </h3>
                      <p className="card-email">{alumnus.email}</p>
                    </div>
                  </div>

                  <div className="card-body">
                    <div className="card-info-group">
                      <span className="info-label">Department & Year</span>
                      <span className="info-value">
                        {alumnus.department} • {alumnus.graduationYear}
                      </span>
                    </div>

                    {alumnus.currentCompany && (
                      <div className="card-info-group">
                        <span className="info-label">Professional</span>
                        <span className="info-value">
                          <span className="company-name">
                            {alumnus.jobTitle || "Professional"}
                          </span>
                          <br />
                          {alumnus.currentCompany}
                        </span>
                      </div>
                    )}

                    {alumnus.city && (
                      <div className="card-location">
                        📍 {alumnus.city}, {alumnus.country}
                      </div>
                    )}
                  </div>

                  <div className="card-footer">
                    {alumnus.linkedin && (
                      <a
                        href={alumnus.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-action btn-linkedin"
                      >
                        <Linkedin size={14} />
                        LinkedIn
                      </a>
                    )}
                    <a
                      href={`mailto:${alumnus.email}`}
                      className="btn-action btn-email"
                    >
                      <Mail size={14} />
                      Email
                    </a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* No Results */}
          {!loading && !error && filteredAlumni.length === 0 && (
            <motion.div
              className="no-results"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <p>No alumni found matching your criteria. Try adjusting your filters!</p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default AlumniDirectory;