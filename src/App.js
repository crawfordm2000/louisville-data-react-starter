import React from 'react';
import './App.css';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
const Map = ReactMapboxGl({
  accessToken:
  'pk.eyJ1IjoiY3Jhd2ZvcmRtMjAwMCIsImEiOiJjazN2cHhqZXYwbGVhM25teTM5bmlxaDY3In0.ZlnlJV16aqa8N4r0RAwyvQ'
});

// const data = require('./aqigeo.json')
const data = require("./apigeo.json")
const assaultData = require("./novAssaults.json")

const layerPaint = {
  'heatmap-weight': {
    property: 'Index',
    type: 'exponential',
    stops: [[0, 0], [5, 2]]
  },
  // Increase the heatmap color weight weight by zoom level
  // heatmap-ntensity is a multiplier on top of heatmap-weight
  'heatmap-intensity': {
    stops: [[0, 0], [5, 1.2]]
  },
  // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
  // Begin color ramp at 0-stop with a 0-transparancy color
  // to create a blur-like effect.
  'heatmap-color': [
    'interpolate',
    ['linear'],
    ['heatmap-density'],
    0,
    'rgba(33,102,172,0)',
    0.25,
    'rgb(103,169,207)',
    0.5,
    'rgb(20,229,24)',
    0.8,
    'rgb(153,219,199)',
    1,
    'rgb(239,138,98)',
    2,
    'rgb(378,24,43)'
  ],
  // Adjust the heatmap radius by zoom level
  'heatmap-radius': {
    stops: [[0, 1], [5, 50]]
  }
};

const layerPaint2 = {
  'heatmap-weight': {
    property: 'Index',
    type: 'exponential',
    stops: [[0, 0], [5, 2]]
  },
  // Increase the heatmap color weight weight by zoom level
  // heatmap-ntensity is a multiplier on top of heatmap-weight
  'heatmap-intensity': {
    stops: [[0, 0], [5, 1.5]]
  },
  // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
  // Begin color ramp at 0-stop with a 0-transparancy color
  // to create a blur-like effect.
  'heatmap-color': [
    'interpolate',
    ['linear'],
    ['heatmap-density'],
    0,
    'rgba(133,1,17,0)',
    0.25,
    'rgba(203,1,0,0.4)',
    0.5,
    'rgba(300,2,4,0.4)',
    0.8,
    'rgba(453,1,19,0.4)',
    1,
    'rgba(439,1,8,0.4)',
    2,
    'rgba(578,2,43,0.4)'
  ],
  // Adjust the heatmap radius by zoom level
  'heatmap-radius': {
    stops: [[0, 1], [5, 20]]
  }
};


class App extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //   lng: 5,
  //   lat: 34,
  //   zoom: 2
  //   };
  //   }

  componentDidMount() {
    // const map = new mapboxgl.Map({
    //   container: this.mapContainer,
    //   style: 'mapbox://styles/mapbox/streets-v11',
    //   // center: [this.state.lng, this.state.lat],
    //   center: [-85.75, 38.25],
    //   zoom: 10
    //   // zoom: this.state.zoom
    //   }); 
  }

  render() {
    console.log(assaultData)
    return (
      <div className="App" >
        {/* <div ref={el => this.mapContainer = el} className="mapContainer" /> */}
        <Map
          style="mapbox://styles/mapbox/dark-v10"
          containerStyle={{
            height: '100vh',
            width: '100vw'
          }}
          center={[-85.75, 38.2527]}
        >
          {/* <header className="App-header"> */}
        <h1>Air Pollutions</h1>
      {/* </header> */}
          <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
            <Feature center={[-23.45, 10.43]} />
          </Layer>
          <Layer type="heatmap" paint={layerPaint}>
          {data[1].features.map((feature, i) => {
            console.log(feature)
            return (<Feature key={i} properties={feature.properties} coordinates={feature.geometry.coordinates}  />)
          })}
        </Layer>
      
        <Layer type="heatmap" paint={layerPaint2}>
          {assaultData.features.map((feature, i) => {
            console.log(feature)
            return (<Feature key={i} properties={feature.properties} coordinates={feature.geometry.coordinates}  />)
          })}
        </Layer>

        </Map>;
        <div id='map'></div>
      </div>
    );
  }
}

export default App;








