// src/pages/alumni/AlumniProfile.jsx
// ✅ FIXED:
//   1. Uses AuthContext logout() — NavBar updates instantly on logout
//   2. Defensive profile data loading — handles response.data.alumni OR
//      response.data.user OR response.data (whichever your backend returns)
//   3. Error state shows a visible, styled card instead of plain text
//      so the page is never silently blank
//   4. padding-top accounts for fixed navbar height

import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Edit, Save, X, LogOut, AlertCircle, CheckCircle, RefreshCw } from "lucide-react";
import { alumniAPI, authAPI } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const AlumniProfile = () => {
  const navigate = useNavigate();
  const { logout } = useAuth(); // ✅ FIX 1: use context logout

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [profileData, setProfileData] = useState(null);
  const [editData, setEditData] = useState({});
  const [locationQuery, setLocationQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  // helper to convert whatever the backend returns into a shape usable by the UI
  const normalizeAlumni = (alumni) => {
    if (!alumni) return alumni;
    let locString = "";
    let coords = [];

    if (alumni.location) {
      if (typeof alumni.location === "object") {
        coords = Array.isArray(alumni.location.coordinates)
          ? alumni.location.coordinates
          : alumni.coordinates || [];
        locString = alumni.location.display_name ||
          (alumni.city && alumni.country ? `${alumni.city}, ${alumni.country}` : alumni.city || alumni.country || "");
      } else {
        locString = alumni.location;
        coords = alumni.coordinates || [];
      }
    } else {
      locString = alumni.city && alumni.country ? `${alumni.city}, ${alumni.country}` : alumni.city || alumni.country || "";
      coords = alumni.coordinates || [];
    }

    return {
      ...alumni,
      location: locString,
      coordinates: coords,
    };
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (locationQuery.length > 2) {
        fetch(`https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${locationQuery}`)
          .then((res) => res.json())
          .then((data) => setSuggestions(data));
      }
    }, 300);
    return () => clearTimeout(timeout);
  },[locationQuery]);

   const handleSelect = (place) => {
    // when user picks a suggestion, update both the query shown in the input
    // and the editable data object so it will be sent to the API
    console.log('Place',place);
    const lat = parseFloat(place.lat);
    const lon = parseFloat(place.lon);
    const city = place.address?.city || place.address?.state_district || place.address?.town || place.address?.village || '';
    const country = place.address?.country || '';

    setEditData((prev) => ({
      ...prev,
      city: city || place.display_name,
      country: country || place.display_name.split(",").slice(-1)[0].trim(),
      fullAddress: place.display_name,
      coordinates: [lon, lat],
    }));
    setLocationQuery(place.display_name);
    setSuggestions([]);
  };

  // ✅ FIX 2: Defensive data extraction — tries multiple response shapes
  const extractAlumni = (data) =>
    data?.alumni ?? data?.user ?? data?.data ?? data ?? null;

  const loadProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const response = await authAPI.getProfile();

      // Handle whichever shape your backend returns
      const alumni = extractAlumni(response.data);

      if (!alumni) {
        setError("Profile data not found. Please contact support.");
        return;
      }

      const normalized = normalizeAlumni(alumni);

      setProfileData(normalized);
      setEditData(normalized);
      setLocationQuery(normalized.location || "");
    } catch (err) {
      console.error("Error loading profile:", err);
      if (err.response?.status === 401) {
        navigate("/alumni/login");
      } else {
        setError(err.response?.data?.message || "Failed to load profile. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    if (name === 'location') {
      setLocationQuery(value);
      // clear coords until a suggestion is chosen again
      setEditData((prev) => ({ ...prev, location: value, coordinates: [] }));
    } else {
      setEditData((prev) => ({ ...prev, [name]: value }));
    }
  }, []);

  const handleSaveProfile = useCallback(async () => {
    // require that a typed location be matched with coords
    if (locationQuery && !editData.coordinates?.length) {
      setError("Please select a location from suggestions.");
      return;
    }

    try {
      setError("");
      setSuccess("");
      // ensure the text input's query (which may have changed without selection)
      // is included; coordinates array remains whatever was set by handleSelect
      const payload = { ...editData, location: locationQuery };
      const response = await alumniAPI.updateProfile(profileData._id, payload);
      const updatedRaw = extractAlumni(response.data);
      const updated = normalizeAlumni(updatedRaw || {});
      setProfileData(updated || payload);
      setIsEditing(false);
      setSuccess("Profile updated successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Save error:", err);
      setError(err.response?.data?.message || "Failed to save profile");
    }
  }, [profileData?._id, editData, locationQuery]);

  const handleCancel = useCallback(() => {
    setEditData(profileData);
    setIsEditing(false);
  }, [profileData]);

  // ✅ FIX 1: logout() clears context state so NavBar updates immediately
  const handleLogout = useCallback(() => {
    logout();
    navigate("/");
  }, [logout, navigate]);

  // ── Loading State ──────────────────────────────────────────────
  if (loading) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: "16px",
        background: "linear-gradient(165deg, #f8f5ee 0%, #fdfcf9 45%, #f2f4fa 100%)",
        fontFamily: "'Outfit', sans-serif",
      }}>
        <div style={{
          width: "44px", height: "44px", borderRadius: "50%",
          border: "3px solid #e2e8f0", borderTop: "3px solid #667eea",
          animation: "spin 0.8s linear infinite",
        }} />
        <p style={{ color: "#666e80", fontSize: "15px" }}>Loading your profile…</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // ✅ FIX 3: Error state — visible styled card, not invisible empty div
  if (!profileData) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px",
        background: "linear-gradient(165deg, #f8f5ee 0%, #fdfcf9 45%, #f2f4fa 100%)",
        fontFamily: "'Outfit', sans-serif",
      }}>
        <div style={{
          background: "white", borderRadius: "16px", padding: "40px",
          maxWidth: "440px", width: "100%", textAlign: "center",
          boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
          border: "1px solid rgba(0,0,0,0.08)",
        }}>
          <div style={{
            width: "56px", height: "56px", borderRadius: "50%",
            background: "#fee2e2", display: "flex", alignItems: "center",
            justifyContent: "center", margin: "0 auto 20px",
          }}>
            <AlertCircle size={28} color="#dc2626" />
          </div>
          <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#0c0e1a", marginBottom: "10px" }}>
            Couldn't Load Profile
          </h2>
          <p style={{ color: "#666e80", fontSize: "14px", marginBottom: "24px", lineHeight: "1.6" }}>
            {error || "Something went wrong while loading your profile."}
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            <button
              onClick={loadProfile}
              style={{
                padding: "11px 22px", borderRadius: "8px", border: "none", cursor: "pointer",
                background: "linear-gradient(135deg, #667eea, #764ba2)", color: "white",
                fontFamily: "'Outfit', sans-serif", fontSize: "13px", fontWeight: "600",
                display: "flex", alignItems: "center", gap: "8px",
              }}
            >
              <RefreshCw size={15} /> Try Again
            </button>
            <button
              onClick={handleLogout}
              style={{
                padding: "11px 22px", borderRadius: "8px", border: "1px solid #e2e8f0",
                cursor: "pointer", background: "#f8f9fc", color: "#666e80",
                fontFamily: "'Outfit', sans-serif", fontSize: "13px", fontWeight: "600",
                display: "flex", alignItems: "center", gap: "8px",
              }}
            >
              <LogOut size={15} /> Logout
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Main Profile UI ────────────────────────────────────────────
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,600&family=Outfit:wght@300;400;500;600&display=swap');

        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .profile-section {
          background: linear-gradient(165deg, #f8f5ee 0%, #fdfcf9 45%, #f2f4fa 100%);
          min-height: 100vh;
          /* ✅ FIX 4: top padding accounts for fixed navbar (72px) + breathing room */
          padding: 96px 24px 60px;
          font-family: 'Outfit', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .profile-section::before {
          content: '';
          position: absolute;
          top: -200px; right: -200px;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .profile-inner {
          max-width: 900px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .profile-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
          flex-wrap: wrap;
          gap: 20px;
        }

        .profile-title {
          font-family: 'Playfair Display', serif;
          font-size: 42px;
          font-weight: 800;
          color: #0c0e1a;
          margin: 0;
          letter-spacing: -0.025em;
        }

        .profile-actions { display: flex; gap: 12px; flex-wrap: wrap; }

        .btn-header {
          display: flex; align-items: center; gap: 8px;
          padding: 11px 22px; border: none; border-radius: 8px;
          font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 600;
          cursor: pointer; transition: all 0.3s;
          text-transform: uppercase; letter-spacing: 0.05em;
        }

        .btn-logout { background: #fee2e2; color: #991b1b; }
        .btn-logout:hover { background: #fecaca; transform: translateY(-2px); }
        .btn-edit {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }
        .btn-edit:hover { transform: translateY(-2px); box-shadow: 0 6px 16px rgba(102,126,234,0.3); }

        .message-banner {
          padding: 14px 18px; border-radius: 10px; margin-bottom: 24px;
          font-size: 14px; display: flex; align-items: center; gap: 10px;
          animation: slideDown 0.3s ease;
        }
        .error-banner  { background: #fee2e2; border: 1px solid #fecaca; color: #991b1b; }
        .success-banner{ background: #dcfce7; border: 1px solid #bbf7d0; color: #166534; }

        .profile-card {
          background: white; border: 1px solid rgba(0,0,0,0.08);
          border-radius: 16px; padding: 40px; margin-bottom: 32px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.08);
          display: flex; align-items: center; gap: 28px; position: relative;
        }
        .profile-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, #667eea 0%, #764ba2 50%, #667eea 100%);
          border-radius: 16px 16px 0 0;
        }

        .profile-avatar {
          width: 100px; height: 100px; border-radius: 16px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white; display: flex; align-items: center; justify-content: center;
          font-weight: 700; font-size: 36px; flex-shrink: 0; text-transform: uppercase;
        }

        .profile-name  { font-size: 28px; font-weight: 700; color: #0c0e1a; margin: 0 0 8px; }
        .profile-email { font-size: 14px; color: #666e80; }

        .profile-badge {
          display: inline-block; margin-top: 8px;
          padding: 4px 12px; border-radius: 999px; font-size: 11px; font-weight: 600;
          letter-spacing: 0.07em; text-transform: uppercase;
          background: #dcfce7; color: #166534; border: 1px solid #bbf7d0;
        }

        .profile-details {
          background: white; border: 1px solid rgba(0,0,0,0.08);
          border-radius: 16px; padding: 40px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.08);
        }

        .edit-form { display: flex; flex-direction: column; gap: 36px; }
        .form-section { display: flex; flex-direction: column; gap: 20px; }
        .form-section h3 {
          font-size: 16px; font-weight: 700; color: #0c0e1a; margin: 0;
          padding-bottom: 16px; border-bottom: 2px solid #e2e8f0;
        }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        .form-row.full { grid-template-columns: 1fr; }
        .form-group { display: flex; flex-direction: column; gap: 8px; }
        .form-group.location-group { position: relative; }
        .form-label {
          font-size: 12px; font-weight: 600; color: #0c0e1a;
          text-transform: uppercase; letter-spacing: 0.05em;
        }
        .location-suggestions {
          position: absolute; top: 100%; left: 0; right: 0;
          background: white; border: 1px solid #e0e6f0; border-radius: 8px;
          margin-top: 6px; z-index: 10; max-height: 200px; overflow-y: auto;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .location-suggestion-item {
          padding: 12px 14px; cursor: pointer; border-bottom: 1px solid #f0f3f9;
          font-size: 13px; color: #0c0e1a; transition: background 0.2s;
        }
        .location-suggestion-item:last-child { border-bottom: none; }
        .location-suggestion-item:hover {
          background: #f8f9fc; color: #667eea; font-weight: 600;
        }
        .form-input {
          padding: 12px 14px; border: 1px solid #e0e6f0; border-radius: 8px;
          font-family: 'Outfit', sans-serif; font-size: 14px; color: #0c0e1a;
          background: #fafbfc; transition: all 0.3s; box-sizing: border-box; width: 100%;
        }

        .form-actions {
          display: flex; gap: 12px; margin-top: 20px;
          padding-top: 24px; border-top: 2px solid #e2e8f0;
        }
        .btn-save, .btn-cancel {
          flex: 1; padding: 13px 20px; border: none; border-radius: 8px;
          font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 700;
          cursor: pointer; transition: all 0.3s;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          text-transform: uppercase; letter-spacing: 0.05em;
        }
        .btn-save {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }
        .btn-save:hover { transform: translateY(-2px); box-shadow: 0 6px 16px rgba(102,126,234,0.3); }
        .btn-cancel { background: #f0f3f9; color: #666e80; border: 1px solid #e2e8f0; }
        .btn-cancel:hover { background: #e2e8f0; }

        .profile-view { display: flex; flex-direction: column; gap: 32px; }
        .info-section { display: flex; flex-direction: column; gap: 0; }
        .info-section h3 {
          font-size: 16px; font-weight: 700; color: #0c0e1a; margin: 0 0 4px;
          padding-bottom: 12px; border-bottom: 2px solid #e2e8f0;
        }
        .info-row {
          display: grid; grid-template-columns: 180px 1fr; gap: 16px;
          padding: 13px 0; align-items: start;
          border-bottom: 1px solid #f0f3f9;
        }
        .info-row:last-child { border-bottom: none; }
        .info-label { font-weight: 700; color: #0c0e1a; font-size: 13px; }
        .info-value { color: #666e80; font-size: 14px; line-height: 1.6; }
        .info-value a { color: #667eea; text-decoration: none; font-weight: 600; }
        .info-value a:hover { color: #764ba2; text-decoration: underline; }
        .info-empty { color: #c0c8d8; font-style: italic; font-size: 13px; }

        @media (max-width: 768px) {
          .profile-section { padding: 80px 16px 40px; }
          .profile-header { flex-direction: column; align-items: flex-start; }
          .profile-title { font-size: 28px; }
          .profile-card { flex-direction: column; text-align: center; padding: 28px; }
          .form-row { grid-template-columns: 1fr; }
          .info-row { grid-template-columns: 1fr; gap: 4px; }
          .profile-card, .profile-details { padding: 24px; }
        }
        @media (max-width: 600px) {
          .profile-actions { width: 100%; }
          .btn-header { flex: 1; justify-content: center; }
        }
      `}</style>

      <motion.div
        className="profile-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="profile-inner">

          {/* ── Header ── */}
          <motion.div className="profile-header" variants={itemVariants} initial="hidden" animate="visible">
            <h1 className="profile-title">My Profile</h1>
            <div className="profile-actions">
              {!isEditing && (
                <motion.button
                  className="btn-header btn-edit"
                  onClick={() => setIsEditing(true)}
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                >
                  <Edit size={16} /> Edit Profile
                </motion.button>
              )}
              <motion.button
                className="btn-header btn-logout"
                onClick={handleLogout}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              >
                <LogOut size={16} /> Logout
              </motion.button>
            </div>
          </motion.div>

          {/* ── Messages ── */}
          {error && (
            <motion.div className="message-banner error-banner" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
              <AlertCircle size={18} /> {error}
            </motion.div>
          )}
          {success && (
            <motion.div className="message-banner success-banner" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
              <CheckCircle size={18} /> {success}
            </motion.div>
          )}

          {/* ── Avatar Card ── */}
          <motion.div className="profile-card" variants={itemVariants} initial="hidden" animate="visible">
            <div className="profile-avatar">
              {profileData.firstName?.charAt(0)}{profileData.lastName?.charAt(0)}
            </div>
            <div className="profile-info">
              <h2 className="profile-name">{profileData.firstName} {profileData.lastName}</h2>
              <p className="profile-email">{profileData.email}</p>
              {profileData.isApproved && (
                <span className="profile-badge">✓ Verified Alumni</span>
              )}
            </div>
          </motion.div>

          {/* ── Details Card ── */}
          <motion.div className="profile-details" variants={itemVariants} initial="hidden" animate="visible">
            {isEditing ? (
              /* ── Edit Form ── */
              <form className="edit-form">
                <div className="form-section">
                  <h3>Personal Information</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">First Name</label>
                      <input type="text" name="firstName" className="form-input"
                        value={editData.firstName || ""} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Last Name</label>
                      <input type="text" name="lastName" className="form-input"
                        value={editData.lastName || ""} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Phone Number</label>
                      <input type="tel" name="phone" className="form-input"
                        value={editData.phone || ""} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">LinkedIn Profile</label>
                      <input type="url" name="linkedin" className="form-input"
                        placeholder="https://linkedin.com/in/yourname"
                        value={editData.linkedin || ""} onChange={handleChange} />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3>Academic Information</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Department</label>
                      <input type="text" name="department" className="form-input"
                        value={editData.department || ""} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Graduation Year</label>
                      <input type="number" name="graduationYear" className="form-input"
                        value={editData.graduationYear || ""} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="form-row full">
                    <div className="form-group">
                      <label className="form-label">Roll Number</label>
                      <input type="text" name="rollNumber" className="form-input"
                        value={editData.rollNumber || ""} onChange={handleChange} />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3>Professional Information</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Current Company</label>
                      <input type="text" name="currentCompany" className="form-input"
                        value={editData.currentCompany || ""} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Job Title</label>
                      <input type="text" name="jobTitle" className="form-input"
                        value={editData.jobTitle || ""} onChange={handleChange} />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3>📍 Location</h3>
                  <div className="form-group location-group">
                    <label className="form-label">Location</label>
                    <input type="text" name="location" className="form-input"
                    value={locationQuery} onChange={handleChange} placeholder="Search location..." />
                    {suggestions.length > 0 && (
                      <div className="location-suggestions">
                        {suggestions.map((place) => (
                          <div key={place.place_id} className="location-suggestion-item" onClick={() => handleSelect(place)}>
                            {place.display_name}
                          </div>  
                        ))}
                      </div>
                    )}
                  </div> 
                </div>

                <div className="form-actions">
                  <button type="button" className="btn-save" onClick={handleSaveProfile}>
                    <Save size={16} /> Save Changes
                  </button>
                  <button type="button" className="btn-cancel" onClick={handleCancel}>
                    <X size={16} /> Cancel
                  </button>
                </div>
              </form>
            ) : (
              /* ── View Mode ── */
              <div className="profile-view">
                <div className="info-section">
                  <h3>Personal Information</h3>
                  <div className="info-row">
                    <span className="info-label">Email</span>
                    <span className="info-value">{profileData.email}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Phone</span>
                    <span className="info-value">
                      {profileData.phone || <span className="info-empty">Not provided</span>}
                    </span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">LinkedIn</span>
                    <span className="info-value">
                      {profileData.linkedin
                        ? <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer">View Profile ↗</a>
                        : <span className="info-empty">Not provided</span>}
                    </span>
                  </div>
                </div>

                <div className="info-section">
                  <h3>Academic Information</h3>
                  <div className="info-row">
                    <span className="info-label">Department</span>
                    <span className="info-value">
                      {profileData.department || <span className="info-empty">Not provided</span>}
                    </span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Graduation Year</span>
                    <span className="info-value">
                      {profileData.graduationYear || <span className="info-empty">Not provided</span>}
                    </span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Roll Number</span>
                    <span className="info-value">
                      {profileData.rollNumber || <span className="info-empty">Not provided</span>}
                    </span>
                  </div>
                </div>

                <div className="info-section">
                  <h3>Professional Information</h3>
                  <div className="info-row">
                    <span className="info-label">Company</span>
                    <span className="info-value">
                      {profileData.currentCompany || <span className="info-empty">Not provided</span>}
                    </span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Job Title</span>
                    <span className="info-value">
                      {profileData.jobTitle || <span className="info-empty">Not provided</span>}
                    </span>
                  </div>
                </div>

                <div className="info-section">
                  <h3>📍 Location</h3>
                  <div className="info-row">
                    <span className="info-label">Location</span>
                    <span className="info-value">
                      {profileData.fullAddress || profileData.location || <span className="info-empty">Not provided</span>}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

        </div>
      </motion.div>
    </>
  );
};

export default AlumniProfile;