// src/services/api.js
import axios from "axios";

// ✅ KEY FIX: "/api" — uses Vite proxy → forwards to localhost:5000
// "http://localhost:5000/api" bypasses proxy → CORS blocks it → appears as 401
const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

// REQUEST INTERCEPTOR — attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    console.error("❌ Request error:", error.message);
    return Promise.reject(error);
  }
);

// RESPONSE INTERCEPTOR — handle 401/403 globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status  = error.response?.status;
    const url     = error.config?.url || "";
    const message = error.response?.data?.message || error.message;

    console.error("❌ API Error:", { status, url, message });

    if (status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("alumniUser");
      window.dispatchEvent(new CustomEvent("auth:logout", { detail: { url } }));
    }

    if (status === 403) {
      window.dispatchEvent(new CustomEvent("auth:forbidden"));
    }

    return Promise.reject(error);
  }
);

// ── AUTH ─────────────────────────────────────────────────────────
export const authAPI = {
  register:       (data)                    => api.post("/auth/register", data),
  login:          (data)                    => api.post("/auth/login", data),
  getProfile:     ()                        => api.get("/auth/profile"),
  changePassword: (currentPassword, newPassword) =>
    api.put("/auth/change-password", { currentPassword, newPassword }),
  forgotPassword: (email)                   => api.post("/auth/forgot-password", { email }),
  verifyOtp:      (email, otp)              => api.post("/auth/verify-otp", { email, otp }),
  resetPassword:  (email, otp, newPassword) =>
    api.post("/auth/reset-password", { email, otp, newPassword }),
};

// ── ALUMNI ───────────────────────────────────────────────────────
export const alumniAPI = {
  getAllAlumni:   ()          => api.get("/alumni"),
  getAlumniById: (id)        => api.get(`/alumni/${id}`),
  updateProfile: (id, data)  => api.put(`/alumni/${id}`, data),
  getStats:      ()          => api.get("/alumni/stats/get-stats"),
  getMapData:    ()          => api.get("/alumni/map/data"),
};

// ── ADMIN ────────────────────────────────────────────────────────
export const adminAPI = {
  getDashboardStats:    ()           => api.get("/admin/dashboard/stats"),
  getAllAlumniForAdmin: (params)      => api.get("/admin/dashboard/alumni/all", { params }),
  getPendingAlumni:    ()            => api.get("/admin/pending"),
  getApprovedAlumni:   ()            => api.get("/admin/approved"),
  getAlumniDetail:     (id)          => api.get(`/admin/dashboard/alumni/${id}`),
  approveAlumni:       (id)          => api.put(`/admin/approve/${id}`),
  rejectAlumni:        (id)          => api.put(`/admin/reject/${id}`),
  makeAlumniAdmin:     (id)          => api.put(`/admin/make-admin/${id}`),
  getAllDonations:      (params)      => api.get("/admin/dashboard/donations", { params }),
  getDonationDetail:   (id)          => api.get(`/admin/dashboard/donations/${id}`),
  updateDonationStatus:(id, status)  => api.put(`/admin/dashboard/donations/${id}/status`, { status }),
};

// ── DONATIONS ────────────────────────────────────────────────────
export const donationAPI = {
  createDonation:        (data) => api.post("/donations", data),
  verifyRazorpayPayment: (data) => api.post("/donations/verify-razorpay", data),
  verifyStripePayment:   (data) => api.post("/donations/verify-stripe", data),
  getMyDonations:        ()     => api.get("/donations/mine"),
  getAllDonations:        ()     => api.get("/donations/admin/all"),
};

// ── CONTACT ──────────────────────────────────────────────────────
export const contactAPI = {
  sendContactForm:     (data)  => api.post("/contact", data),
  subscribeNewsletter: (email) => api.post("/contact/subscribe", { email }),
};

// ── UTILS (read-only helpers) ─────────────────────────────────────
export const isAuthenticated = () => !!localStorage.getItem("token");

export const isAdmin = () => {
  try { return JSON.parse(localStorage.getItem("alumniUser"))?.isAdmin === true; }
  catch { return false; }
};

export const getCurrentUser = () => {
  try { return JSON.parse(localStorage.getItem("alumniUser")); }
  catch { return null; }
};

export default api;