import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { collection, getDocs } from "firebase/firestore";
import db from "../services/firebase";
import "./MapEvents.css"; // Importando o CSS

// Corrige o ícone default do Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const MapEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const querySnapshot = await getDocs(collection(db, "eventos"));
        const presencialEvents = [];
        querySnapshot.forEach((doc) => {
          const event = doc.data();

          if (
            event.latitude &&
            event.longitude &&
            !event.location.toLowerCase().includes("streaming")
          ) {
            presencialEvents.push({
              id: doc.id,
              title: event.title,
              location: event.location,
              latitude: parseFloat(event.latitude),
              longitude: parseFloat(event.longitude),
              link: event.link,
            });
          }
        });

        setEvents(presencialEvents);
      } catch (error) {
        console.error("Erro ao buscar eventos para mapa:", error);
      }
    }

    fetchEvents();
  }, []);

  const center = [-15.7801, -47.9292]; // Brasília, Brasil

  return (
    <div>
      <h2 className="map-title">Índice 3: Mapa dos Eventos</h2>
      <div className="map-container-wrapper">
        <MapContainer center={center} zoom={4} className="map-container">
          <TileLayer
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {events.map((event) => (
            <Marker key={event.id} position={[event.latitude, event.longitude]}>
              <Popup>
                <strong>{event.title}</strong>
                <br />
                {event.location}
                <br />
                <a href={event.link} target="_blank" rel="noreferrer">
                  Ver evento
                </a>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapEvents;
