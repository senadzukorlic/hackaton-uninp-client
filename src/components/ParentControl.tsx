import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
// Removed axios import as it's not used in the simulation
// import axios from 'axios';
import "leaflet/dist/leaflet.css";
import { AlertTriangle, MapPin, User, School, Wifi } from "lucide-react"; // Added more icons
import axios from "axios";

// --- Leaflet Icon Fix ---
// Fix default marker icon issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// --- Custom Icons ---

// Son Icon (Default Blue)
const sonIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
});

// Daughter Icon (Purple)
const daughterIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
});

// School Icon (Green)
const schoolIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
});

// Internet Klub Icon (Red)
const internetClubIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
});

// Internet Klub 2 Icon (Orange) - Changed color for better distinction
const internetClub2Icon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
});

// --- Helper Functions ---

// Calculate distance between two coordinates (Haversine formula)
const calculateDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number => {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in meters
};

// --- Map Updater Component ---
// Component to update map view when center location changes
const MapUpdater: React.FC<{ center: { lat: number; lng: number } }> = ({
  center,
}) => {
  const map = useMap();
  useEffect(() => {
    // Fly smoothly to the new center coordinates with a specific zoom level
    map.flyTo([center.lat, center.lng], map.getZoom()); // Keep current zoom or set a specific one like 15
  }, [center, map]);
  return null;
};

// --- Child Info Card Component ---
interface ChildInfoCardProps {
  name: string;
  iconColorClass: string; // Tailwind class for the color dot
  status: string;
  location: { lat: number; lng: number };
}

const ChildInfoCard: React.FC<ChildInfoCardProps> = ({
  name,
  iconColorClass,
  status,
  location,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-4">
      <div className="flex items-center mb-2">
        <span className={`w-3 h-3 rounded-full mr-2 ${iconColorClass}`}></span>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {name}
        </h3>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
        <span className="font-medium">Status:</span> {status}
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        <span className="font-medium">Lokacija:</span> {location.lat.toFixed(4)}
        , {location.lng.toFixed(4)}
      </p>
    </div>
  );
};

// --- Main Parent Control Component ---
const ParentControl: React.FC = () => {
  // State for children's locations (simulated)
  const [sonLocation, setSonLocation] = useState({
    lat: 44.7866,
    lng: 20.4489,
  }); // Starting point (e.g., Belgrade)
  const [daughterLocation, setDaughterLocation] = useState({
    lat: 44.787,
    lng: 20.4495,
  }); // Slightly different start
  const [sonStatus, setSonStatus] = useState<string>("Kretanje...");
  const [daughterStatus, setDaughterStatus] = useState<string>("Kretanje...");
  const [alert, setAlert] = useState<string | null>(null);
  const [mapCenter, setMapCenter] = useState(sonLocation); // Center map initially on son

  // Fixed locations
  const schoolLocation = { lat: 44.7966, lng: 20.4589 }; // School coordinates
  const internetClubLocation = { lat: 44.7766, lng: 20.4389 }; // Internet Klub coordinates
  const internetClub2Location = { lat: 44.77, lng: 20.435 }; // Internet Klub 2 coordinates

  // Simulate children's movement
  useEffect(() => {
    // Son's movement towards Internet Klub 2
    const sonDestinations = [
      { lat: 44.784, lng: 20.446 }, // Step 1
      { lat: 44.778, lng: 20.44 }, // Step 2
      { lat: 44.772, lng: 20.436 }, // Step 3 (closer to Internet Klub 2)
      internetClub2Location, // Final destination
    ];

    // Daughter's movement towards School
    const daughterDestinations = [
      { lat: 44.79, lng: 20.452 }, // Step 1
      { lat: 44.793, lng: 20.455 }, // Step 2
      { lat: 44.796, lng: 20.458 }, // Step 3 (closer to School)
      schoolLocation, // Final destination
    ];

    let step = 0;
    const interval = setInterval(() => {
      if (step < sonDestinations.length) {
        setSonLocation(sonDestinations[step]);
        // Update map center to follow the son
        setMapCenter(sonDestinations[step]);
      }
      if (step < daughterDestinations.length) {
        setDaughterLocation(daughterDestinations[step]);
      }

      if (
        step >= sonDestinations.length &&
        step >= daughterDestinations.length
      ) {
        clearInterval(interval); // Stop when both finished
      } else {
        step++;
      }
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount

    // --- Real API Call Example (Commented Out) ---
    /*
    const fetchSonLocation = async () => {
      try {
        // Replace with your actual API endpoint and authentication
        const response = await axios.get('http://localhost:8080/api/location/son', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setSonLocation(response.data); // Expect { lat, lng }
        setMapCenter(response.data); // Update map center
      } catch (error) {
        console.error('Greška pri dohvatanju lokacije sina:', error);
        // Handle error appropriately, maybe set an error state
      }
    };
     const fetchDaughterLocation = async () => {
      try {
        // Replace with your actual API endpoint and authentication
        const response = await axios.get('http://localhost:8080/api/location/daughter', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setDaughterLocation(response.data); // Expect { lat, lng }
      } catch (error) {
        console.error('Greška pri dohvatanju lokacije ćerke:', error);
        // Handle error appropriately
      }
    };

    // Fetch initial locations
    fetchSonLocation();
    fetchDaughterLocation();

    // Set up intervals to fetch locations periodically
    const sonInterval = setInterval(fetchSonLocation, 15000); // Fetch every 15 seconds
    const daughterInterval = setInterval(fetchDaughterLocation, 15000);

    // Cleanup intervals on component unmount
    return () => {
      clearInterval(sonInterval);
      clearInterval(daughterInterval);
    };
    */
  }, []); // Empty dependency array ensures this runs only once on mount

  // Update statuses and check for alerts based on son's location
  useEffect(() => {
    const distanceToSchool = calculateDistance(
      sonLocation.lat,
      sonLocation.lng,
      schoolLocation.lat,
      schoolLocation.lng
    );
    const distanceToInternetClub = calculateDistance(
      sonLocation.lat,
      sonLocation.lng,
      internetClubLocation.lat,
      internetClubLocation.lng
    );
    const distanceToInternetClub2 = calculateDistance(
      sonLocation.lat,
      sonLocation.lng,
      internetClub2Location.lat,
      internetClub2Location.lng
    );

    const alertThreshold = 150; // Distance in meters to trigger alerts/status changes

    // Son Status & Alerts
    if (distanceToInternetClub2 < alertThreshold) {
      setSonStatus(
        `Blizu Internet Kluba 2 (${distanceToInternetClub2.toFixed(0)}m)`
      );
      if (distanceToInternetClub2 < distanceToSchool) {
        setAlert("Upozorenje: Sin je blizu Internet Kluba 2 umesto škole!");
      } else {
        setAlert(null); // Clear alert if near club but school is further
      }
    } else if (distanceToInternetClub < alertThreshold) {
      setSonStatus(
        `Blizu Internet Kluba (${distanceToInternetClub.toFixed(0)}m)`
      );
      if (distanceToInternetClub < distanceToSchool) {
        setAlert("Upozorenje: Sin je blizu Internet Kluba umesto škole!");
      } else {
        setAlert(null);
      }
    } else if (distanceToSchool < alertThreshold) {
      setSonStatus(`Blizu Škole (${distanceToSchool.toFixed(0)}m)`);
      setAlert(null); // Clear alert when near school
    } else {
      setSonStatus("Kretanje...");
      setAlert(null); // Clear alert if not near any key location
    }
    if (alert) {
      axios.post(
        "http://localhost:8080/api/chat/warn",
        {
          prompt: alert,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
    }
  }, [
    sonLocation,
    schoolLocation,
    internetClubLocation,
    internetClub2Location,
  ]); // Recalculate when son moves or locations change

  // Update daughter's status based on location
  useEffect(() => {
    const distanceToSchool = calculateDistance(
      daughterLocation.lat,
      daughterLocation.lng,
      schoolLocation.lat,
      schoolLocation.lng
    );
    const distanceToInternetClub = calculateDistance(
      daughterLocation.lat,
      daughterLocation.lng,
      internetClubLocation.lat,
      internetClubLocation.lng
    );
    const distanceToInternetClub2 = calculateDistance(
      daughterLocation.lat,
      daughterLocation.lng,
      internetClub2Location.lat,
      internetClub2Location.lng
    );

    const statusThreshold = 150; // Distance in meters for status changes

    if (distanceToSchool < statusThreshold) {
      setDaughterStatus(`Blizu Škole (${distanceToSchool.toFixed(0)}m)`);
    } else if (distanceToInternetClub < statusThreshold) {
      setDaughterStatus(
        `Blizu Internet Kluba (${distanceToInternetClub.toFixed(0)}m)`
      );
    } else if (distanceToInternetClub2 < statusThreshold) {
      setDaughterStatus(
        `Blizu Internet Kluba 2 (${distanceToInternetClub2.toFixed(0)}m)`
      );
    } else {
      setDaughterStatus("Kretanje...");
    }
  }, [
    daughterLocation,
    schoolLocation,
    internetClubLocation,
    internetClub2Location,
  ]); // Recalculate when daughter moves

  return (
    // Use flex container for overall layout
    <section className="flex mt-10 flex-col md:flex-row min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black">
      {/* Left Column: Map */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-screen p-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center md:text-left">
          Lokacija u Realnom Vremenu
        </h2>
        <div className="h-[calc(100%-4rem)] w-full rounded-lg overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
          <MapContainer
            center={[mapCenter.lat, mapCenter.lng]} // Use state for center
            zoom={15}
            style={{ height: "100%", width: "100%" }}
            className="z-0" // Ensure map is behind potential overlays if needed
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <MapUpdater center={mapCenter} /> {/* Use the state center */}
            {/* Son's Marker */}
            <Marker
              position={[sonLocation.lat, sonLocation.lng]}
              icon={sonIcon}
            >
              <Popup>Moj Sin</Popup>
            </Marker>
            {/* Daughter's Marker */}
            <Marker
              position={[daughterLocation.lat, daughterLocation.lng]}
              icon={daughterIcon}
            >
              <Popup>Moja Ćerka</Popup>
            </Marker>
            {/* School Marker */}
            <Marker
              position={[schoolLocation.lat, schoolLocation.lng]}
              icon={schoolIcon}
            >
              <Popup>Škola</Popup>
            </Marker>
            {/* Internet Klub Marker */}
            <Marker
              position={[internetClubLocation.lat, internetClubLocation.lng]}
              icon={internetClubIcon}
            >
              <Popup>Internet Klub</Popup>
            </Marker>
            {/* Internet Klub 2 Marker */}
            <Marker
              position={[internetClub2Location.lat, internetClub2Location.lng]}
              icon={internetClub2Icon}
            >
              <Popup>Internet Klub 2</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>

      {/* Right Column: Info Panel */}
      <div className="w-full md:w-1/2 p-6 md:pt-10 overflow-y-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center md:text-left">
          Roditeljska Kontrola
        </h1>
        <p className="text-md md:text-lg text-gray-700 dark:text-gray-300 mb-6 text-center md:text-left">
          Pratite kretanje vaše dece.
        </p>

        {/* Alert Section */}
        {alert && (
          <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg flex items-center shadow">
            <AlertTriangle size={24} className="mr-3 flex-shrink-0" />
            <span className="font-medium">{alert}</span>
          </div>
        )}

        {/* Children Info Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 border-b pb-2 border-gray-300 dark:border-gray-700">
            Informacije o Deci
          </h2>
          {/* Son Info Card */}
          <ChildInfoCard
            name="Sin"
            iconColorClass="bg-blue-500" // Matches sonIcon color reference
            status={sonStatus}
            location={sonLocation}
          />

          {/* Daughter Info Card */}
          <ChildInfoCard
            name="Ćerka"
            iconColorClass="bg-purple-500" // Matches daughterIcon color reference
            status={daughterStatus}
            location={daughterLocation}
          />
        </div>

        {/* Legend Section */}
        <div className="mt-8 pt-4 border-t border-gray-300 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
            Legenda Mape
          </h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-700 dark:text-gray-300">
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full mr-2 bg-blue-500"></span>{" "}
              Sin
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full mr-2 bg-purple-500"></span>{" "}
              Ćerka
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full mr-2 bg-green-500"></span>{" "}
              Škola
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full mr-2 bg-red-500"></span>{" "}
              Internet Klub 1
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full mr-2 bg-orange-500"></span>{" "}
              Internet Klub 2
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParentControl;
