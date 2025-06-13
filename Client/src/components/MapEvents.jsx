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
    async function BuscarEventos() {
      try {
        const querySnapshot = await getDocs(collection(db, "eventos")); //pega a coleção eventos
        const presencialEvents = []; //array para eventos presenciais
        querySnapshot.forEach((doc) => {
          // percorre cada elemnto de doc= cada evento
          const event = doc.data(); //event é oq o doc contem, no caso as informacoes do evento

          if (
            event.latitude &&
            event.longitude &&
            !event.location.toLowerCase().includes("streaming")
          ) {
            //se tem latitude e altitude e o evento nao conmtem streaming ele entra no arry de preenciais
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

        setEvents(presencialEvents); //mexendo no use state, ou sej aatualizando o array
      } catch (error) {
        console.error("Erro ao buscar eventos para mapa:", error);
      }
    }

    BuscarEventos(); //chama a funcao para executrar os passos acima
  }, []);

  const center = [-15.7801, -47.9292]; //define o centro do mapa

  return (
    //estrutura do componente
    <div>
      <h2 className="map-title">Índice 3: Mapa dos Eventos</h2>
      <div className="map-container-wrapper">
        <MapContainer center={center} zoom={4} className="map-container">
          <TileLayer
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {events.map(
            (
              event //, map percorre cada elemnto do array, e vai definir um marker
            ) => (
              <Marker
                key={event.id} //define a key unica para cada eento, senda ela o seu id
                position={[event.latitude, event.longitude]} //posicao do marker
              >
                <Popup>
                  {
                    <strong>
                      {event.title}
                    </strong> /* quando clicar sobre o evento trazer o popup com as informacoes do evento */
                  }
                  <br />
                  {event.location}
                  <br />
                  <a href={event.link} target="_blank" rel="noreferrer">
                    Ver evento
                  </a>
                </Popup>
              </Marker>
            )
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapEvents;
