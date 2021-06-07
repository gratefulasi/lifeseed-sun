import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function LifetreePosition({ latitude, longitude }) {
  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={3}
      scrollWheelZoom={false}
      style={{ height: '5rem', width: '100%', opacity: 1 }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[latitude, longitude]}>
        Test
        <Popup>Your lifetree</Popup>
      </Marker>
    </MapContainer>
  );
}
