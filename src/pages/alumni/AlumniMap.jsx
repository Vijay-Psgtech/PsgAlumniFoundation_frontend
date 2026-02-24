import React, { useState, useEffect, useMemo } from "react";
import { alumniAPI } from "../../services/api";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "./alumni.css";

// Fix default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

// Auto fit map bounds
const FitBounds = ({ alumni }) => {
  const map = useMap();

  useEffect(() => {
    if (!alumni.length) return;

    const bounds = L.latLngBounds(
      alumni
        .filter((a) => a.latitude && a.longitude)
        .map((a) => [a.latitude, a.longitude])
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
      (a) => a.latitude && a.longitude
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
        <p className="subtitle">
          Click on markers to explore alumni locations
        </p>
      </div>

      {/* Stats */}
      <div className="map-stats">
        <div className="stat-card">
          <div className="stat-number">
            {mapData.stats?.totalAlumni || 0}
          </div>
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

          {validAlumni.map((alumnus) => (
            <Marker
              key={alumnus._id}
              position={[alumnus.latitude, alumnus.longitude]}
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

            <div className="modal-avatar">
              {selectedAlumni.firstName?.charAt(0)}
              {selectedAlumni.lastName?.charAt(0)}
            </div>

            <h2>
              {selectedAlumni.firstName} {selectedAlumni.lastName}
            </h2>

            <div className="modal-info">
              <div className="info-item">
                <span className="info-label">Address:</span>
                <span>
                  {selectedAlumni.address || "Not specified"}
                </span>
              </div>

              <div className="info-item">
                <span className="info-label">Location:</span>
                <span>
                  {selectedAlumni.city}, {selectedAlumni.country}
                </span>
              </div>

              <div className="info-item">
                <span className="info-label">Department:</span>
                <span>{selectedAlumni.department}</span>
              </div>

              <div className="info-item">
                <span className="info-label">Graduation:</span>
                <span>{selectedAlumni.graduationYear}</span>
              </div>

              <div className="info-item">
                <span className="info-label">Company:</span>
                <span>{selectedAlumni.currentCompany}</span>
              </div>

              <div className="info-item">
                <span className="info-label">Position:</span>
                <span>{selectedAlumni.jobTitle}</span>
              </div>
            </div>

            <div className="modal-actions">
              <a
                href={`mailto:${selectedAlumni.email}`}
                className="btn-contact"
              >
                📧 Contact
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlumniMap;