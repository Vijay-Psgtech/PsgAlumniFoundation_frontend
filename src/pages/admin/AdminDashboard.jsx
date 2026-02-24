// frontend/src/pages/admin/AdminDashboard_PREMIUM.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut, Users, FileText, TrendingUp, Search, Filter, X, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { adminAPI, alumniAPI, donationAPI } from "../../services/api";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("alumni");
  const [activeSubTab, setActiveSubTab] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [alumniList, setAlumniList] = useState([]);
  const [donationList, setDonationList] = useState([]);
  const [stats, setStats] = useState({
    totalAlumni: 0,
    pendingAlumni: 0,
    totalDonatedAmount: 0,
    completedDonations: 0,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

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

  // ✅ Load dashboard data
  useEffect(() => {
    const loadData = async () => {
  try {
    setLoading(true);

    const statsResponse = await adminAPI.getDashboardStats();
    setStats(statsResponse.data.stats || {});

    const alumniResponse = await adminAPI.getAllAlumniForAdmin();
    setAlumniList(alumniResponse.data.alumni || []);

    const donationResponse = await adminAPI.getAllDonations();
    setDonationList(donationResponse.data.donations || []);
  } catch (err) {
    console.error("Error loading dashboard:", err);
  } finally {
    setLoading(false);
  }
};

    loadData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("alumniUser");
    navigate("/admin");
  };

  const handleApproveAlumni = async (alumniId) => {
    try {
      await adminAPI.approveAlumni(alumniId);
      setSuccess("Alumni approved successfully!");
      setSelectedItem(null);
      // Refresh list
      const response = await adminAPI.getAllAlumniForAdmin();
      setAlumniList(response.data.alumni || []);
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to approve alumni");
    }
  };

  const handleMakeAdmin = async (alumniId) => {
    try {
      await adminAPI.makeAlumniAdmin(alumniId);
      setSuccess("Admin privileges granted!");
      setSelectedItem(null);
      const response = await adminAPI.getAllAlumniForAdmin();
      setAlumniList(response.data.alumni || []);
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to make admin");
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,600&family=Outfit:wght@300;400;500;600&display=swap');

        .admin-dashboard-premium {
          background: linear-gradient(165deg, #f8f5ee 0%, #fdfcf9 45%, #f2f4fa 100%);
          min-height: 100vh;
          padding: 80px 24px 60px;
          font-family: 'Outfit', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .admin-dashboard-premium::before {
          content: '';
          position: absolute;
          top: -200px;
          right: -200px;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(201, 168, 76, 0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .dashboard-inner {
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 48px;
          flex-wrap: wrap;
          gap: 20px;
        }

        .dashboard-title {
          font-family: 'Playfair Display', serif;
          font-size: 42px;
          font-weight: 800;
          color: #0c0e1a;
          margin: 0;
          letter-spacing: -0.025em;
        }

        .dashboard-subtitle {
          font-size: 14px;
          color: #666e80;
          margin-top: 8px;
        }

        .btn-logout-premium {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 11px 22px;
          background: #fee2e2;
          color: #991b1b;
          border: none;
          border-radius: 8px;
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .btn-logout-premium:hover {
          background: #fecaca;
          transform: translateY(-2px);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }

        .stat-card {
          background: white;
          border: 1px solid #e0e6f0;
          border-radius: 12px;
          padding: 28px;
          text-align: center;
          transition: all 0.3s;
          position: relative;
        }

        .stat-card::before {
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

        .stat-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
          border-color: rgba(102, 126, 234, 0.3);
        }

        .stat-card:hover::before {
          opacity: 1;
        }

        .stat-icon {
          font-size: 36px;
          margin-bottom: 12px;
        }

        .stat-value {
          font-family: 'Playfair Display', serif;
          font-size: 32px;
          font-weight: 700;
          color: #667eea;
          margin-bottom: 8px;
        }

        .stat-label {
          font-size: 13px;
          color: #a0aec0;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-weight: 600;
        }

        .message-banner {
          padding: 14px 18px;
          border-radius: 10px;
          margin-bottom: 24px;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 10px;
          animation: slideDown 0.3s ease;
        }

        .error-banner-premium {
          background: #fee2e2;
          border: 1px solid #fecaca;
          color: #991b1b;
        }

        .success-banner-premium {
          background: #dcfce7;
          border: 1px solid #bbf7d0;
          color: #166534;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .tabs-section {
          background: white;
          border: 1px solid #e0e6f0;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 32px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }

        .tabs-container {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .tab-button {
          padding: 11px 24px;
          background: transparent;
          border: none;
          border-radius: 8px;
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          color: #a0aec0;
          transition: all 0.3s;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          position: relative;
        }

        .tab-button.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .tab-button:hover:not(.active) {
          background: #f0f3f9;
          color: #667eea;
        }

        .filters-section {
          background: white;
          border: 1px solid #e0e6f0;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 24px;
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          align-items: center;
        }

        .search-input-premium {
          flex: 1;
          min-width: 200px;
          padding: 10px 14px;
          border: 1px solid #e0e6f0;
          border-radius: 8px;
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          transition: all 0.3s;
        }

        .search-input-premium:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .list-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 16px;
          background: white;
          border: 1px solid #e0e6f0;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }

        .list-item-premium {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 16px;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #e2e8f0;
          cursor: pointer;
          transition: all 0.3s;
        }

        .list-item-premium:last-child {
          border-bottom: none;
        }

        .list-item-premium:hover {
          background: #f8fafc;
        }

        .list-avatar {
          width: 50px;
          height: 50px;
          border-radius: 10px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          margin-right: 16px;
          flex-shrink: 0;
        }

        .list-content {
          flex: 1;
        }

        .list-title {
          font-size: 15px;
          font-weight: 700;
          color: #0c0e1a;
          margin: 0 0 4px 0;
        }

        .list-meta {
          font-size: 12px;
          color: #a0aec0;
        }

        .list-status {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 700;
          margin-right: 16px;
        }

        .status-approved {
          background: #dcfce7;
          color: #166534;
        }

        .status-pending {
          background: #fef3c7;
          color: #92400e;
        }

        .status-completed {
          background: #dcfce7;
          color: #166534;
        }

        .modal-overlay-premium {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .modal-premium {
          background: white;
          border-radius: 14px;
          width: 100%;
          max-width: 600px;
          max-height: 90vh;
          overflow-y: auto;
          padding: 32px;
          position: relative;
          animation: modalSlideIn 0.3s ease;
        }

        @keyframes modalSlideIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        .modal-close-premium {
          position: absolute;
          top: 16px;
          right: 16px;
          background: #f0f3f9;
          border: none;
          width: 36px;
          height: 36px;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s;
        }

        .modal-close-premium:hover {
          background: #e2e8f0;
        }

        .modal-title {
          font-family: 'Playfair Display', serif;
          font-size: 24px;
          font-weight: 700;
          color: #0c0e1a;
          margin-bottom: 24px;
        }

        .modal-section {
          margin-bottom: 24px;
        }

        .modal-section h4 {
          font-size: 13px;
          font-weight: 700;
          color: #0c0e1a;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 12px;
        }

        .modal-content {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        .modal-item {
          padding: 12px;
          background: #f8fafc;
          border-radius: 6px;
          border-left: 2px solid #667eea;
        }

        .modal-item-label {
          font-size: 11px;
          color: #a0aec0;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .modal-item-value {
          font-size: 14px;
          color: #0c0e1a;
          font-weight: 600;
          margin-top: 4px;
        }

        .modal-actions {
          display: flex;
          gap: 12px;
          margin-top: 28px;
          padding-top: 24px;
          border-top: 1px solid #e2e8f0;
          flex-wrap: wrap;
        }

        .modal-action-btn {
          flex: 1;
          min-width: 120px;
          padding: 11px 20px;
          border: none;
          border-radius: 8px;
          font-family: 'Outfit', sans-serif;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .btn-approve-premium {
          background: #dcfce7;
          color: #166534;
        }

        .btn-approve-premium:hover {
          background: #bbf7d0;
        }

        .btn-admin-premium {
          background: #bee3f8;
          color: #2c5282;
        }

        .btn-admin-premium:hover {
          background: #90cdf4;
        }

        .btn-close-modal {
          background: #f0f3f9;
          color: #a0aec0;
        }

        .btn-close-modal:hover {
          background: #e2e8f0;
        }

        .empty-state {
          text-align: center;
          padding: 60px 20px;
          color: #a0aec0;
        }

        @media (max-width: 768px) {
          .dashboard-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .dashboard-title {
            font-size: 28px;
          }

          .tabs-container {
            flex-direction: column;
            width: 100%;
          }

          .tab-button {
            width: 100%;
          }

          .modal-content {
            grid-template-columns: 1fr;
          }

          .modal-actions {
            flex-direction: column;
          }

          .modal-action-btn {
            width: 100%;
          }
        }
      `}</style>

      <motion.div
        className="admin-dashboard-premium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="dashboard-inner">
          {/* Header */}
          <motion.div
            className="dashboard-header"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <div>
              <h1 className="dashboard-title">Admin Dashboard</h1>
              <p className="dashboard-subtitle">Manage alumni and donations</p>
            </div>
            <motion.button
              className="btn-logout-premium"
              onClick={handleLogout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LogOut size={16} />
              Logout
            </motion.button>
          </motion.div>

          {/* Messages */}
          {error && (
            <motion.div className="message-banner error-banner-premium" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <AlertCircle size={18} />
              {error}
            </motion.div>
          )}
          {success && (
            <motion.div className="message-banner success-banner-premium" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <CheckCircle size={18} />
              {success}
            </motion.div>
          )}

          {/* Stats Grid */}
          <motion.div className="stats-grid" variants={containerVariants} initial="hidden" animate="visible">
            <motion.div className="stat-card" variants={itemVariants}>
              <div className="stat-icon">👥</div>
              <div className="stat-value">{stats.totalAlumni}</div>
              <div className="stat-label">Total Alumni</div>
            </motion.div>

            <motion.div className="stat-card" variants={itemVariants}>
              <div className="stat-icon">⏳</div>
              <div className="stat-value">{stats.pendingAlumni}</div>
              <div className="stat-label">Pending Approval</div>
            </motion.div>

            <motion.div className="stat-card" variants={itemVariants}>
              <div className="stat-icon">💰</div>
              <div className="stat-value">{stats.totalDonatedAmount}</div>
              <div className="stat-label">Total Donations</div>
            </motion.div>

            <motion.div className="stat-card" variants={itemVariants}>
              <div className="stat-icon">✓</div>
              <div className="stat-value">{stats.completedDonations}</div>
              <div className="stat-label">Completed</div>
            </motion.div>
          </motion.div>

          {/* Tabs */}
          <motion.div className="tabs-section" variants={itemVariants} initial="hidden" animate="visible">
            <div className="tabs-container">
              <button
                className={`tab-button ${activeTab === "alumni" ? "active" : ""}`}
                onClick={() => setActiveTab("alumni")}
              >
                <Users size={16} style={{ marginRight: "6px" }} />
                Alumni Management
              </button>
              <button
                className={`tab-button ${activeTab === "donations" ? "active" : ""}`}
                onClick={() => setActiveTab("donations")}
              >
                <FileText size={16} style={{ marginRight: "6px" }} />
                Donations
              </button>
            </div>
          </motion.div>

          {/* Alumni Tab */}
          {activeTab === "alumni" && (
            <motion.div variants={itemVariants} initial="hidden" animate="visible">
              <div className="filters-section">
                <Search size={18} style={{ color: "#a0aec0" }} />
                <input
                  type="text"
                  className="search-input-premium"
                  placeholder="Search alumni by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {alumniList.length > 0 ? (
                <div className="list-container">
                  {alumniList.map((alumni) => (
                    <motion.div
                      key={alumni._id}
                      className="list-item-premium"
                      onClick={() => setSelectedItem(alumni)}
                      whileHover={{ backgroundColor: "#f8fafc" }}
                    >
                      <div className="list-avatar">
                        {alumni.firstName?.charAt(0)}
                        {alumni.lastName?.charAt(0)}
                      </div>
                      <div className="list-content">
                        <h4 className="list-title">
                          {alumni.firstName} {alumni.lastName}
                        </h4>
                        <p className="list-meta">{alumni.email}</p>
                      </div>
                      {alumni.isApproved ? (
                        <span className="list-status status-approved">
                          <CheckCircle size={14} />
                          Approved
                        </span>
                      ) : (
                        <span className="list-status status-pending">
                          <Clock size={14} />
                          Pending
                        </span>
                      )}
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <p>No alumni records found</p>
                </div>
              )}
            </motion.div>
          )}

          {/* Donations Tab */}
          {activeTab === "donations" && (
            <motion.div variants={itemVariants} initial="hidden" animate="visible">
              <div className="filters-section">
                <Filter size={18} style={{ color: "#a0aec0" }} />
                <input
                  type="text"
                  className="search-input-premium"
                  placeholder="Search donations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {donationList.length > 0 ? (
                <div className="list-container">
                  {donationList.map((donation) => (
                    <motion.div
                      key={donation._id}
                      className="list-item-premium"
                      onClick={() => setSelectedItem(donation)}
                      whileHover={{ backgroundColor: "#f8fafc" }}
                    >
                      <div className="list-avatar" style={{ background: "#edf2f7", color: "#667eea" }}>
                        💰
                      </div>
                      <div className="list-content">
                        <h4 className="list-title">
                          {donation.currency === "INR" ? "₹" : "$"}{donation.amount}
                        </h4>
                        <p className="list-meta">
                          {new Date(donation.donatedAt).toLocaleDateString()} • {donation.paymentMethod}
                        </p>
                      </div>
                      <span className={`list-status status-${donation.status}`}>
                        {donation.status === "completed" && <CheckCircle size={14} />}
                        {donation.status === "pending" && <Clock size={14} />}
                        {donation.status}
                      </span>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <p>No donation records found</p>
                </div>
              )}
            </motion.div>
          )}

          {/* Modal */}
          {selectedItem && (
            <motion.div
              className="modal-overlay-premium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setSelectedItem(null)}
            >
              <motion.div
                className="modal-premium"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="modal-close-premium"
                  onClick={() => setSelectedItem(null)}
                >
                  <X size={18} />
                </button>

                {selectedItem.firstName ? (
                  <>
                    <h2 className="modal-title">
                      {selectedItem.firstName} {selectedItem.lastName}
                    </h2>

                    <div className="modal-section">
                      <h4>Contact Information</h4>
                      <div className="modal-content">
                        <div className="modal-item">
                          <div className="modal-item-label">Email</div>
                          <div className="modal-item-value">{selectedItem.email}</div>
                        </div>
                        <div className="modal-item">
                          <div className="modal-item-label">Phone</div>
                          <div className="modal-item-value">{selectedItem.phone || "N/A"}</div>
                        </div>
                      </div>
                    </div>

                    <div className="modal-section">
                      <h4>Academic Info</h4>
                      <div className="modal-content">
                        <div className="modal-item">
                          <div className="modal-item-label">Department</div>
                          <div className="modal-item-value">{selectedItem.department || "N/A"}</div>
                        </div>
                        <div className="modal-item">
                          <div className="modal-item-label">Graduation Year</div>
                          <div className="modal-item-value">{selectedItem.graduationYear || "N/A"}</div>
                        </div>
                      </div>
                    </div>

                    <div className="modal-actions">
                      {!selectedItem.isApproved && (
                        <button
                          className="modal-action-btn btn-approve-premium"
                          onClick={() => handleApproveAlumni(selectedItem._id)}
                        >
                          <CheckCircle size={14} />
                          Approve
                        </button>
                      )}
                      {selectedItem.isApproved && !selectedItem.isAdmin && (
                        <button
                          className="modal-action-btn btn-admin-premium"
                          onClick={() => handleMakeAdmin(selectedItem._id)}
                        >
                          Make Admin
                        </button>
                      )}
                      <button
                        className="modal-action-btn btn-close-modal"
                        onClick={() => setSelectedItem(null)}
                      >
                        <X size={14} />
                        Close
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="modal-title">Donation Details</h2>

                    <div className="modal-section">
                      <h4>Donation Info</h4>
                      <div className="modal-content">
                        <div className="modal-item">
                          <div className="modal-item-label">Amount</div>
                          <div className="modal-item-value">
                            {selectedItem.currency === "INR" ? "₹" : "$"}{selectedItem.amount}
                          </div>
                        </div>
                        <div className="modal-item">
                          <div className="modal-item-label">Status</div>
                          <div className="modal-item-value">{selectedItem.status}</div>
                        </div>
                      </div>
                    </div>

                    <div className="modal-actions">
                      <button
                        className="modal-action-btn btn-close-modal"
                        onClick={() => setSelectedItem(null)}
                      >
                        <X size={14} />
                        Close
                      </button>
                    </div>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default AdminDashboard;