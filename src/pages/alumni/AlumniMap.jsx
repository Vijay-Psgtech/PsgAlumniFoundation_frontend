import React, { useState, useEffect, useCallback, useMemo } from "react";
import { alumniAPI } from "../../services/api";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "./alumni.css";
import MarkerClusterGroup from "react-leaflet-markercluster";

import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

// Fix default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

// Auto fit map bounds
const FitBounds = ({ alumni }) => {
  const map = useMap();

  useEffect(() => {
    if (!alumni.length) return;

    const bounds = L.latLngBounds(
      alumni
        .filter(
          (a) =>
            a.location &&
            a.location.coordinates &&
            a.location.coordinates[1] &&
            a.location.coordinates[0],
        )
        .map((a) => [a.location.coordinates[1], a.location.coordinates[0]]),
    );

    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [alumni, map]);

  return null;
};

const AlumniMap = () => {
  const [selectedAlumni, setSelectedAlumni] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [mapData, setMapData] = useState({
    alumni: [],
    stats: {
      totalAlumni: 0,
      countriesRepresented: 0,
      citiesRepresented: 0,
    },
  });

  useEffect(() => {
    const loadMapData = async () => {
      try {
        setLoading(true);
        const response = await alumniAPI.getMapData();
        const responseData = response.data?.data || {};

        setMapData({
          alumni: responseData.alumni || [],
          stats: responseData.stats || {},
        });
      } catch (err) {
        setError("Failed to load map data");
      } finally {
        setLoading(false);
      }
    };

    loadMapData();
  }, []);

  const validAlumni = useMemo(() => {
    return mapData.alumni.filter(
      (a) =>
        a.location &&
        a.location.coordinates &&
        a.location.coordinates[1] &&
        a.location.coordinates[0],
    );
  }, [mapData.alumni]);

  if (loading) {
    return (
      <div className="alumni-container">
        <div className="loading-message">
          <p>🌍 Loading interactive alumni world map...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alumni-container">
        <div className="error-message">
          <p>⚠️ {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="alumni-container">
      {/* Header */}
      <div className="map-header">
        <h1>Alumni World Map</h1>
        <p className="subtitle">Click on markers to explore alumni locations</p>
      </div>

      {/* Stats */}
      <div className="map-stats">
        <div className="stat-card">
          <div className="stat-number">{mapData.stats?.totalAlumni || 0}</div>
          <div className="stat-label">Alumni Located</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">
            {mapData.stats?.countriesRepresented || 0}
          </div>
          <div className="stat-label">Countries</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">
            {mapData.stats?.citiesRepresented || 0}
          </div>
          <div className="stat-label">Cities</div>
        </div>
      </div>

      {/* Interactive Map */}
      <div className="map-wrapper">
        <MapContainer
          center={[20, 0]}
          zoom={2}
          style={{ height: "500px", width: "100%", borderRadius: "16px" }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <FitBounds alumni={validAlumni} />
          <MarkerClusterGroup>
            {validAlumni.map((alumnus) => (
              <Marker
                key={alumnus._id}
                position={[
                  alumnus.location.coordinates[1],
                  alumnus.location.coordinates[0],
                ]}
                eventHandlers={{
                  click: () => setSelectedAlumni(alumnus),
                }}
              >
                <Popup>
                  <strong>
                    {alumnus.firstName} {alumnus.lastName}
                  </strong>
                  <br />
                  {alumnus.city}, {alumnus.country}
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        </MapContainer>
      </div>

      {/* Modal */}
      {selectedAlumni && (
        <div className="alumni-detail-modal">
          <div className="modal-content">
            <button
              className="modal-close"
              onClick={() => setSelectedAlumni(null)}
            >
              ✕
            </button>

            {/* Header with gradient background */}
            <div className="modal-header">
              <div className="modal-avatar">
                {selectedAlumni.firstName?.charAt(0)}
                {selectedAlumni.lastName?.charAt(0)}
              </div>
              <div className="modal-title-group">
                <h2>
                  {selectedAlumni.firstName} {selectedAlumni.lastName}
                </h2>
                {selectedAlumni.isApproved && (
                  <span className="modal-badge">✓ Verified</span>
                )}
              </div>
            </div>

            {/* Body with information */}
            <div className="modal-body">
              {/* Quick stats */}
              <div className="modal-meta">
                <div className="meta-card">
                  <span className="meta-label">Graduation</span>
                  <span className="meta-value">
                    {selectedAlumni.graduationYear}
                  </span>
                </div>
                <div className="meta-card">
                  <span className="meta-label">Department</span>
                  <span className="meta-value" style={{ fontSize: "12px" }}>
                    {selectedAlumni.department || "N/A"}
                  </span>
                </div>
              </div>
              {/* Detailed information */}
              <div className="modal-info">
                <div className="info-item">
                  <span className="info-label">📧 Email</span>
                  <span>
                    <a href={`mailto:${selectedAlumni.email}`}>
                      {selectedAlumni.email}
                    </a>
                  </span>
                </div>

                <div className="info-item">
                  <span className="info-label">📍 Location</span>
                  <span className="location-badge">
                    📍 {selectedAlumni.fullAddress || `${selectedAlumni.city}, ${selectedAlumni.country}`}
                  </span>
                </div>

                {selectedAlumni.currentCompany && (
                  <div className="info-item">
                    <span className="info-label">🏢 Company</span>
                    <span>{selectedAlumni.currentCompany}</span>
                  </div>
                )}

                {selectedAlumni.jobTitle && (
                  <div className="info-item">
                    <span className="info-label">💼 Position</span>
                    <span>{selectedAlumni.jobTitle}</span>
                  </div>
                )}

                {selectedAlumni.linkedin && (
                  <div className="info-item">
                    <span className="info-label">💬 LinkedIn</span>
                    <span>
                      <a
                        href={selectedAlumni.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Profile ↗
                      </a>
                    </span>
                  </div>
                )}

                {selectedAlumni.phone && (
                  <div className="info-item">
                    <span className="info-label">📱 Phone</span>
                    <span>
                      <a href={`tel:${selectedAlumni.phone}`}>
                        {selectedAlumni.phone}
                      </a>
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlumniMap;
