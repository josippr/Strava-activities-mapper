
import Header from './Components/header';

import './App.css';
//import './main.css';
import React, {useEffect, useState} from 'react';
import { MapContainer, TileLayer, Popup, Polyline } from 'react-leaflet'

import axios from 'axios';
import polyline from '@mapbox/polyline';



function App() {
  interface Node {
    activityPositions: any;
    activityName: string;
  }

  const [nodes, setNodes] = useState<Node[]>([]);

  const clientID = "96595";
  const clientSecret = "f2719f8b67598069475b93bce67e27129f3c9ff0";
  const refreshToken = "76e8e52b623f3e7b2b296b9a3e5a52845db3aa04";
  const auth_link = "https://www.strava.com/oauth/token";
  const activities_link = `https://www.strava.com/api/v3/athlete/activities`;

  useEffect(() => {
    async function fetchData() {
      const stravaAuthResponse = await axios.all([
        axios.post(`${auth_link}?client_id=${clientID}&client_secret=${clientSecret}&refresh_token=${refreshToken}&grant_type=refresh_token`)
      ]);
      
      const stravaActivityResponse = await axios.get(`${activities_link}?per_page=200&access_token=${stravaAuthResponse[0].data.access_token}`);
      console.log(stravaActivityResponse.data[0]);
      const polylines = [];
      for (let i = 0; i < stravaActivityResponse.data.length; i += 1) {
        const activity_polyline = stravaActivityResponse.data[i].map.summary_polyline;
        const activity_name = stravaActivityResponse.data[i].name;
        polylines.push({activityPositions: polyline.decode(activity_polyline), activityName: activity_name});
      }
      console.log(polylines)
      setNodes(polylines);
    }

    fetchData();
  }, []);
  return (
    <div className="App">
      <Header></Header>
      <MapContainer center={[42.585444, 13.257684]} zoom={6} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {nodes.map((activity, i) => (
        <Polyline key = {i} positions={activity.activityPositions}>
          <Popup>
            <div>
              <h2>{"Title: " + activity.activityName}</h2>
            </div>
          </Popup>
        </Polyline>
      ))}
    </MapContainer>
    </div>
  );
}

export default App;
