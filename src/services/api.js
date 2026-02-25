// src/services/api.js
import axios from "axios";

// ✅ KEY FIX: "/api" — uses Vite proxy → forwards to localhost:5000
// "http://localhost:5000/api" bypasses proxy → CORS blocks it → appears as 401
const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
  withCredentials: true, // send HttpOnly cookie on every request
});

// RESPONSE INTERCEPTOR — handle 401/403 globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status  = error.response?.status;
    const url     = error.config?.url || "";
    const message = error.response?.data?.message || error.message;

    console.error("❌ API Error:", { status, url, message });

    if (status === 401) {
      // Cookie is already expired/invalid on the server side.
      // Dispatch event so AuthContext / protected routes can react.
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

//  ── Admin AUTH ─────────────────────────────────────────────────────────
export const adminAuthAPI = {
  login: (data) => api.post("/admin/auth/login", data),
  register: (data) => api.post("/admin/auth/register", data),
  getProfile: () => api.get("/admin/auth/profile"),
  logout: () => api.post("/admin/auth/logout"),
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
  // Dashboard stats
  getStats: () => api.get("/admin/dashboard/stats"),
  getAllAlumni: () => api.get("/admin/dashboard/alumni/all"),
  
  // Alumni approval & management
  getPendingAlumni: () => api.get("/admin/pending"),
  approveAlumni: (id) => api.put(`/admin/approve/${id}`),
  rejectAlumni: (id) => api.put(`/admin/reject/${id}`),
  makeAlumniAdmin: (id) => api.put(`/admin/make-admin/${id}`),
};

// ── DONATIONS ────────────────────────────────────────────────────
export const donationAPI = {
  getAll: () => api.get("/donations"),
  getMine: () => api.get("/donations/mine"),
  create: (data) => api.post("/donations", data),
};

export const donationsAPI = {
  getAll: () => api.get("/donations"),
  getMine: () => api.get("/donations/mine"),
  create: (data) => api.post("/donations", data),
};

// ── CONTACT ──────────────────────────────────────────────────────
export const contactAPI = {
  sendContactForm:     (data)  => api.post("/contact", data),
  subscribeNewsletter: (email) => api.post("/contact/subscribe", { email }),
};

// ── EVENTS API ──────────────────────────────────────────────────────────────
// ✅ For Events Page, Calendar, Detail Page
export const eventsAPI = {
  getAll: () => api.get("/events"),
  getById: (id) => api.get(`/events/${id}`),
  create: (data) => api.post("/events", data),
  update: (id, data) => api.put(`/events/${id}`, data),
  delete: (id) => api.delete(`/events/${id}`),
};

// ── ALBUMS API ──────────────────────────────────────────────────────────────
// ✅ For Year Albums Page
export const albumsAPI = {
  getAll: () => api.get("/albums"),
  getByYear: (year) => api.get(`/albums/year/${year}`),
  create: (data) => api.post("/albums", data),
  update: (id, data) => api.put(`/albums/${id}`, data),
  delete: (id) => api.delete(`/albums/${id}`),
};


export default api;