import '../App.css';
import './Polyline.encoded';
import './strava_api';
import { MapContainer, TileLayer, Popup, Polyline } from 'react-leaflet';



function Main() {

  return (
    <div className="main">
        <div className='main-wrapper'>
            <div id="map"></div>
        </div>
    </div>
  );
}

export default Main;