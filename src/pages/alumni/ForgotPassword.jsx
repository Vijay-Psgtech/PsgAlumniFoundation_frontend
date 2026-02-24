// src/pages/alumni/ForgotPassword.jsx
// ✅ Forgot Password Flow:
//   Step 1 → Enter registered email
//   Step 2 → Enter OTP sent to email
//   Step 3 → Enter & confirm new password
// Adjust the API endpoints to match your backend

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const STEPS = { EMAIL: 1, OTP: 2, RESET: 3, DONE: 4 };

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(STEPS.EMAIL);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // ─── Step 1: Send OTP ──────────────────────────────────────────
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError(""); setInfo(""); setLoading(true);
    try {
      // ✅ Replace with your actual API endpoint
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Email not found.");
      setInfo(`OTP sent to ${email}. Check your inbox.`);
      setStep(STEPS.OTP);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ─── Step 2: Verify OTP ────────────────────────────────────────
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      // ✅ Replace with your actual API endpoint
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Invalid or expired OTP.");
      setStep(STEPS.RESET);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ─── Step 3: Reset Password ────────────────────────────────────
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
    if (password !== confirm) { setError("Passwords do not match."); return; }
    setLoading(true);
    try {
      // ✅ Replace with your actual API endpoint
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword: password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to reset password.");
      setStep(STEPS.DONE);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Outfit:wght@300;400;500;600&display=swap');

        .fp-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #060810 0%, #0d1220 50%, #060810 100%);
          display: flex; align-items: center; justify-content: center;
          padding: 100px 20px 40px;
          font-family: 'Outfit', sans-serif;
        }

        .fp-card {
          width: 100%; max-width: 440px;
          background: rgba(10,14,26,0.9);
          border: 1px solid rgba(201,168,76,0.2);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,168,76,0.05) inset;
          backdrop-filter: blur(20px);
        }

        .fp-gold-bar {
          height: 3px;
          background: linear-gradient(90deg, #b8882a, #e8c560, #b8882a);
        }

        .fp-body { padding: 36px 36px 40px; }

        .fp-icon {
          width: 56px; height: 56px; border-radius: 50%;
          background: rgba(201,168,76,0.1);
          border: 1px solid rgba(201,168,76,0.25);
          display: flex; align-items: center; justify-content: center;
          font-size: 24px; margin: 0 auto 20px;
        }

        .fp-title {
          font-family: 'Playfair Display', serif;
          font-size: 24px; font-weight: 700;
          background: linear-gradient(130deg, #c9a84c, #f0d080, #c4a045);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          text-align: center; margin-bottom: 6px;
        }

        .fp-subtitle {
          font-size: 13px; color: rgba(200,210,235,0.5);
          text-align: center; margin-bottom: 28px; line-height: 1.6;
        }

        /* Stepper */
        .fp-stepper {
          display: flex; align-items: center; justify-content: center;
          gap: 0; margin-bottom: 28px;
        }
        .fp-step {
          display: flex; flex-direction: column; align-items: center; gap: 5px;
        }
        .fp-step-circle {
          width: 28px; height: 28px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 600;
          border: 1.5px solid rgba(201,168,76,0.25);
          color: rgba(200,210,235,0.4);
          background: transparent;
          transition: all 0.3s;
        }
        .fp-step-circle.active {
          border-color: #c9a84c; color: #c9a84c;
          background: rgba(201,168,76,0.1);
          box-shadow: 0 0 12px rgba(201,168,76,0.2);
        }
        .fp-step-circle.done {
          border-color: #4caf7a; color: #4caf7a;
          background: rgba(76,175,122,0.1);
        }
        .fp-step-label { font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(200,210,235,0.3); }
        .fp-step-label.active { color: rgba(201,168,76,0.7); }
        .fp-step-line {
          flex: 1; height: 1px; max-width: 40px;
          background: rgba(201,168,76,0.15);
          margin: 0 6px; margin-bottom: 18px;
        }

        .fp-label {
          display: block; font-size: 11px; font-weight: 500;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: rgba(200,215,245,0.45); margin-bottom: 8px;
        }

        .fp-input {
          width: 100%; padding: 12px 16px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(201,168,76,0.18);
          border-radius: 8px; color: rgba(220,228,245,0.9);
          font-family: 'Outfit', sans-serif; font-size: 14px;
          transition: border-color 0.25s, box-shadow 0.25s;
          outline: none; box-sizing: border-box;
        }
        .fp-input:focus {
          border-color: rgba(201,168,76,0.5);
          box-shadow: 0 0 0 3px rgba(201,168,76,0.07);
        }
        .fp-input::placeholder { color: rgba(200,210,235,0.25); }

        .fp-pw-wrap { position: relative; }
        .fp-pw-toggle {
          position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
          background: none; border: none; cursor: pointer;
          color: rgba(201,168,76,0.5); font-size: 13px; padding: 0;
          transition: color 0.2s;
        }
        .fp-pw-toggle:hover { color: rgba(201,168,76,0.9); }

        .fp-field { margin-bottom: 18px; }

        .fp-otp-info {
          font-size: 12px; color: rgba(200,210,235,0.4);
          margin-top: 8px; line-height: 1.5;
        }

        .fp-btn {
          width: 100%; padding: 13px;
          background: linear-gradient(135deg, #b8882a 0%, #e0bc55 50%, #b8882a 100%);
          background-size: 200% 100%; background-position: right center;
          border: none; border-radius: 9px;
          font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 600;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: #08090f; cursor: pointer; margin-top: 8px;
          transition: background-position 0.4s, box-shadow 0.3s, transform 0.2s, opacity 0.2s;
        }
        .fp-btn:hover:not(:disabled) {
          background-position: left center;
          box-shadow: 0 0 24px rgba(201,168,76,0.4);
          transform: translateY(-1px);
        }
        .fp-btn:disabled { opacity: 0.55; cursor: not-allowed; }

        .fp-error {
          background: rgba(220,50,50,0.1); border: 1px solid rgba(220,50,50,0.3);
          border-radius: 8px; padding: 10px 14px;
          font-size: 13px; color: rgba(255,110,110,0.9);
          margin-bottom: 16px;
        }

        .fp-info {
          background: rgba(76,175,122,0.08); border: 1px solid rgba(76,175,122,0.25);
          border-radius: 8px; padding: 10px 14px;
          font-size: 13px; color: rgba(120,210,160,0.9);
          margin-bottom: 16px;
        }

        .fp-back {
          display: block; text-align: center; margin-top: 20px;
          font-size: 12px; color: rgba(200,210,235,0.35);
          transition: color 0.2s; text-decoration: none;
        }
        .fp-back:hover { color: rgba(201,168,76,0.7); }

        .fp-resend {
          background: none; border: none; cursor: pointer; padding: 0;
          font-size: 12px; color: rgba(201,168,76,0.5);
          font-family: 'Outfit', sans-serif;
          transition: color 0.2s;
        }
        .fp-resend:hover { color: rgba(201,168,76,0.9); }

        /* Success State */
        .fp-success {
          text-align: center; padding: 8px 0;
        }
        .fp-success-icon {
          width: 64px; height: 64px; border-radius: 50%;
          background: rgba(76,175,122,0.1);
          border: 2px solid rgba(76,175,122,0.4);
          display: flex; align-items: center; justify-content: center;
          font-size: 28px; margin: 0 auto 20px;
          box-shadow: 0 0 30px rgba(76,175,122,0.15);
        }
        .fp-success-title {
          font-family: 'Playfair Display', serif; font-size: 22px;
          color: #e8d8a8; margin-bottom: 10px;
        }
        .fp-success-text {
          font-size: 13px; color: rgba(200,210,235,0.5); line-height: 1.6; margin-bottom: 28px;
        }
      `}</style>

      <div className="fp-page">
        <div className="fp-card">
          <div className="fp-gold-bar" />
          <div className="fp-body">

            {/* ── Stepper ── */}
            {step !== STEPS.DONE && (
              <div className="fp-stepper">
                {["Email", "Verify", "Reset"].map((label, i) => {
                  const num = i + 1;
                  const isDone = step > num;
                  const isActive = step === num;
                  return (
                    <React.Fragment key={label}>
                      <div className="fp-step">
                        <div className={`fp-step-circle ${isDone ? "done" : isActive ? "active" : ""}`}>
                          {isDone ? "✓" : num}
                        </div>
                        <span className={`fp-step-label ${isActive ? "active" : ""}`}>{label}</span>
                      </div>
                      {i < 2 && <div className="fp-step-line" />}
                    </React.Fragment>
                  );
                })}
              </div>
            )}

            {/* ── Step 1: Enter Email ── */}
            {step === STEPS.EMAIL && (
              <>
                <div className="fp-icon">🔑</div>
                <div className="fp-title">Forgot Password?</div>
                <div className="fp-subtitle">Enter your registered email and we'll send you a one-time code to reset your password.</div>
                {error && <div className="fp-error">⚠ {error}</div>}
                <form onSubmit={handleSendOtp}>
                  <div className="fp-field">
                    <label className="fp-label">Email Address</label>
                    <input
                      type="email" required
                      className="fp-input"
                      placeholder="you@example.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      autoComplete="email"
                    />
                  </div>
                  <button type="submit" className="fp-btn" disabled={loading}>
                    {loading ? "Sending OTP…" : "Send Reset Code →"}
                  </button>
                </form>
                <Link to="/alumni/login" className="fp-back">← Back to Login</Link>
              </>
            )}

            {/* ── Step 2: Enter OTP ── */}
            {step === STEPS.OTP && (
              <>
                <div className="fp-icon">📧</div>
                <div className="fp-title">Check Your Email</div>
                <div className="fp-subtitle">Enter the 6-digit code sent to <strong style={{color:"rgba(201,168,76,0.8)"}}>{email}</strong></div>
                {error && <div className="fp-error">⚠ {error}</div>}
                {info && <div className="fp-info">✓ {info}</div>}
                <form onSubmit={handleVerifyOtp}>
                  <div className="fp-field">
                    <label className="fp-label">One-Time Password (OTP)</label>
                    <input
                      type="text" required
                      className="fp-input"
                      placeholder="123456"
                      value={otp}
                      onChange={e => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      maxLength={6}
                      style={{letterSpacing:"0.3em", fontSize:"18px", textAlign:"center"}}
                      autoComplete="one-time-code"
                    />
                    <div className="fp-otp-info">
                      Didn't receive it?{" "}
                      <button type="button" className="fp-resend" onClick={handleSendOtp} disabled={loading}>
                        Resend OTP
                      </button>
                      {" "}· Check your spam folder too.
                    </div>
                  </div>
                  <button type="submit" className="fp-btn" disabled={loading || otp.length < 4}>
                    {loading ? "Verifying…" : "Verify Code →"}
                  </button>
                </form>
                <button className="fp-back" style={{border:"none",cursor:"pointer"}} onClick={() => { setStep(STEPS.EMAIL); setError(""); }}>
                  ← Use a different email
                </button>
              </>
            )}

            {/* ── Step 3: New Password ── */}
            {step === STEPS.RESET && (
              <>
                <div className="fp-icon">🔒</div>
                <div className="fp-title">Set New Password</div>
                <div className="fp-subtitle">Choose a strong password with at least 8 characters.</div>
                {error && <div className="fp-error">⚠ {error}</div>}
                <form onSubmit={handleResetPassword}>
                  <div className="fp-field">
                    <label className="fp-label">New Password</label>
                    <div className="fp-pw-wrap">
                      <input
                        type={showPw ? "text" : "password"} required
                        className="fp-input"
                        placeholder="Min. 8 characters"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        autoComplete="new-password"
                      />
                      <button type="button" className="fp-pw-toggle" onClick={() => setShowPw(p => !p)}>
                        {showPw ? "🙈" : "👁"}
                      </button>
                    </div>
                  </div>
                  <div className="fp-field">
                    <label className="fp-label">Confirm Password</label>
                    <div className="fp-pw-wrap">
                      <input
                        type={showConfirm ? "text" : "password"} required
                        className="fp-input"
                        placeholder="Re-enter password"
                        value={confirm}
                        onChange={e => setConfirm(e.target.value)}
                        autoComplete="new-password"
                      />
                      <button type="button" className="fp-pw-toggle" onClick={() => setShowConfirm(p => !p)}>
                        {showConfirm ? "🙈" : "👁"}
                      </button>
                    </div>
                    {confirm && password !== confirm && (
                      <div style={{fontSize:"12px", color:"rgba(255,110,110,0.7)", marginTop:"6px"}}>Passwords do not match</div>
                    )}
                  </div>
                  <button
                    type="submit" className="fp-btn"
                    disabled={loading || password.length < 8 || password !== confirm}
                  >
                    {loading ? "Saving…" : "Reset Password →"}
                  </button>
                </form>
              </>
            )}

            {/* ── Step 4: Done ── */}
            {step === STEPS.DONE && (
              <div className="fp-success">
                <div className="fp-success-icon">✓</div>
                <div className="fp-success-title">Password Reset!</div>
                <div className="fp-success-text">
                  Your password has been updated successfully.<br />
                  You can now sign in with your new password.
                </div>
                <button className="fp-btn" onClick={() => navigate("/alumni/login")}>
                  Go to Login →
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
}