// frontend/src/pages/admin/AdminLogin_PREMIUM.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogIn, AlertCircle, Eye, EyeOff, Lock } from "lucide-react";
import { authAPI } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user, login: authLogin } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  // ✅ Redirect if already logged in as admin (cookie-based session)
  useEffect(() => {
    if (user?.isAdmin) {
      navigate("/admin/dashboard");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!email || !password) {
        setError("Please enter both email and password");
        setLoading(false);
        return;
      }

      console.log("🔐 Attempting admin login with:", { email });

      const response = await authAPI.login({ email, password });

      // Server sets HttpOnly cookie automatically — no token in response body
      const alumni = response.data.alumni;

      if (!alumni) {
        setError("Login failed: No user data received");
        setLoading(false);
        return;
      }

      if (!alumni.isAdmin) {
        setError("You do not have admin privileges");
        setLoading(false);
        return;
      }

      if (!alumni.isApproved) {
        setError("Your account is not approved yet");
        setLoading(false);
        return;
      }

      console.log("✅ Admin login successful");
      await authLogin(alumni); // seed AuthContext state; cookie already set by server
      navigate("/admin/dashboard");
    } catch (err) {
      console.error("❌ Login error:", err);

      if (err.response?.status === 400) {
        setError(err.response?.data?.message || "Invalid email or password");
      } else if (err.response?.status === 401) {
        setError(err.response?.data?.message || "Invalid email or password");
      } else if (err.response?.status === 403) {
        setError(err.response?.data?.message || "Admin account is inactive or not approved");
      } else if (err.response?.status === 500) {
        setError("Server error. Please try again later.");
      } else if (err.message === "Network Error") {
        setError("Cannot connect to server. Is the backend running?");
      } else {
        setError(err.response?.data?.message || "Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,600&family=Outfit:wght@300;400;500;600&display=swap');

        .admin-login-premium {
          background: linear-gradient(165deg, #f8f5ee 0%, #fdfcf9 45%, #f2f4fa 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          font-family: 'Outfit', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .admin-login-premium::before {
          content: '';
          position: absolute;
          top: -200px;
          right: -200px;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(201, 168, 76, 0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .admin-login-premium::after {
          content: '';
          position: absolute;
          bottom: -150px;
          left: -150px;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(102, 126, 234, 0.06) 0%, transparent 70%);
          pointer-events: none;
        }

        .admin-login-inner {
          max-width: 480px;
          width: 100%;
          position: relative;
          z-index: 2;
        }

        .admin-login-card {
          background: white;
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 16px;
          padding: 48px 40px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
          position: relative;
        }

        .admin-login-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #667eea 0%, #764ba2 50%, #667eea 100%);
          border-radius: 16px 16px 0 0;
        }

        .admin-login-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .admin-login-icon {
          width: 70px;
          height: 70px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          color: white;
        }

        .admin-login-title {
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          font-weight: 700;
          color: #0c0e1a;
          margin-bottom: 8px;
        }

        .admin-login-subtitle {
          font-size: 14px;
          color: #666e80;
          font-weight: 300;
        }

        .admin-login-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .admin-form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .admin-form-label {
          font-size: 12px;
          font-weight: 600;
          color: #0c0e1a;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .admin-form-input-group {
          position: relative;
          display: flex;
          align-items: center;
        }

        .admin-form-input {
          width: 100%;
          padding: 12px 14px 12px 14px;
          border: 1px solid #e0e6f0;
          border-radius: 8px;
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          color: #0c0e1a;
          transition: all 0.3s ease;
          background: #fafbfc;
        }

        .admin-form-input:focus {
          outline: none;
          border-color: #667eea;
          background: white;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .admin-password-toggle {
          position: absolute;
          right: 12px;
          background: none;
          border: none;
          cursor: pointer;
          color: #a0aec0;
          padding: 4px 8px;
          transition: color 0.2s;
          display: flex;
          align-items: center;
        }

        .admin-password-toggle:hover {
          color: #667eea;
        }

        .admin-form-error {
          font-size: 12px;
          color: #dc2626;
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 4px;
        }

        .admin-error-banner {
          background: #fee2e2;
          border: 1px solid #fecaca;
          border-radius: 8px;
          padding: 12px 14px;
          color: #991b1b;
          font-size: 13px;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 20px;
        }

        .admin-login-button {
          padding: 13px 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-height: 46px;
        }

        .admin-login-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
        }

        .admin-login-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .admin-divider {
          height: 1px;
          background: #e2e8f0;
          margin: 24px 0;
          position: relative;
        }

        .admin-divider-text {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          background: white;
          padding: 0 12px;
          font-size: 12px;
          color: #a0aec0;
          font-weight: 500;
        }

        .admin-info-box {
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05));
          border: 1px solid rgba(102, 126, 234, 0.2);
          border-radius: 8px;
          padding: 12px;
          margin-top: 20px;
          font-size: 12px;
          color: #0c0e1a;
        }

        .admin-info-box p {
          margin: 6px 0;
          line-height: 1.5;
        }

        .admin-info-title {
          font-weight: 600;
          color: #667eea;
          margin-bottom: 8px;
        }

        .admin-info-box code {
          background: white;
          padding: 2px 6px;
          border-radius: 4px;
          font-family: 'Courier New', monospace;
          color: #764ba2;
          font-weight: 500;
        }

        @media (max-width: 600px) {
          .admin-login-card {
            padding: 32px 24px;
          }

          .admin-login-title {
            font-size: 24px;
          }
        }
      `}</style>

      <motion.div
        className="admin-login-premium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="admin-login-inner">
          <motion.div
            className="admin-login-card"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Header */}
            <div className="admin-login-header">
              <motion.div
                className="admin-login-icon"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Lock size={32} />
              </motion.div>
              <h1 className="admin-login-title">Admin Portal</h1>
              <p className="admin-login-subtitle">PSG Alumni Foundation Management</p>
            </div>

            {/* Form */}
            <motion.form onSubmit={handleSubmit} className="admin-login-form" variants={containerVariants}>
              {/* Error Banner */}
              {error && (
                <motion.div className="admin-error-banner" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                  <AlertCircle size={16} />
                  {error}
                </motion.div>
              )}

              {/* Email */}
              <motion.div className="admin-form-group" variants={containerVariants}>
                <label className="admin-form-label">Email Address *</label>
                <input
                  type="email"
                  className="admin-form-input"
                  placeholder="psg_ct_admin@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </motion.div>

              {/* Password */}
              <motion.div className="admin-form-group" variants={containerVariants}>
                <label className="admin-form-label">Password *</label>
                <div className="admin-form-input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="admin-form-input"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="admin-password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="admin-login-button"
                disabled={loading}
                variants={containerVariants}
              >
                {loading ? (
                  <>
                    <div style={{ width: "16px", height: "16px", border: "2px solid white", borderTop: "2px solid transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn size={18} />
                    Sign In
                  </>
                )}
              </motion.button>
            </motion.form>

            <div className="admin-divider">
              <span className="admin-divider-text">Admin Credentials</span>
            </div>

            {/* Info Box */}
            <motion.div className="admin-info-box" variants={containerVariants}>
              <p className="admin-info-title">📌 Demo Credentials</p>
              {/* <p>Email: <code>psg_ct_admin@gmail.com</code></p> */}
              {/* <p>Password: <code>123456</code></p> */}
              <p style={{ marginTop: "10px", color: "#a0aec0", fontSize: "11px" }}>
                ⚠️ Change password immediately after first login for security.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
};

export default AdminLogin;