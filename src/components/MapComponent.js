import { MapContainer, TileLayer, CircleMarker, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useState } from 'react';

function MapComponent() {
    // Set the initial map center to Malang, Indonesia
    const position = [-7.98, 112.63]
    const zoom = 13

    // State to hold the markers
    const [markers, setMarkers] = useState([]);

    // Function to add a new marker
    const addMarker = (position) => {
        const newMarkers = [...markers, position];
        setMarkers(newMarkers);
    }
    const clearMarkers = () => {
        setMarkers([]);
    }
    // Function to remove a marker
    const removeMarker = (markerToRemove) => {
        const newMarkers = markers.filter(marker => marker !== markerToRemove);
        setMarkers(newMarkers);
    }

    return (
        <MapContainer center={position} zoom={zoom} style={{ height: "100vh", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <MapEvents addMarker={addMarker} clearMarkers={clearMarkers} />
            {markers.map((position, idx) => 
                <CircleMarker center={position} radius={5} key={idx} eventHandlers={{ contextmenu: () => { removeMarker(position) } }} />
            )}
        </MapContainer>
    )
}

function MapEvents({ addMarker, clearMarkers }) {
    useMapEvents({
        mousemove: (e) => {
            window.currentMousePos = e.latlng;
        },
        keydown: (e) => {
            if (e.originalEvent.key === 'm') {
                addMarker(window.currentMousePos);
            }else if (e.originalEvent.key === 'h') {
                clearMarkers();
            }

        }
    });

    return null;
}

export default MapComponent