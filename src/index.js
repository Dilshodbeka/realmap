import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UncontrolledCollapse, Button, CardBody, Card } from 'reactstrap';


mapboxgl.accessToken = 'pk.eyJ1IjoiY2NhbnRleSIsImEiOiJjaWVsdDNubmEwMGU3czNtNDRyNjRpdTVqIn0.yFaW4Ty6VE3GHkrDvdbW6g';

class App extends React.Component {
  constructor(props) {
  super(props);
    this.state = {
      lng: 5,
      lat: 34,
      zoom: 2
    };
  }

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom
    });

    map.on('move', () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });
    map.on('click', (e) => {
        let lng = e.lngLat.lng.toFixed(4);
        let lat = e.lngLat.lat.toFixed(4);
        this.setState({ lng, lat });
        console.log(lat, lng);
        new mapboxgl.Marker({
            draggable: true
        })
            .setLngLat([lng, lat])
            .addTo(map);
    });
}

  render() {
    return (
      <>
        <Button color="success" className="btn-round" id="toggler" style={{ margin: '5rem 5rem 2rem 10rem' }} outline>
          Toggle map
        </Button>
        <Button color="info" className="btn-round" id="toggler1" style={{ margin: '5rem 5rem 2rem 10rem' }} outline >
          Toggle status
        </Button>
        <UncontrolledCollapse toggler="#toggler1">
          <Card>
            <CardBody style={{ backgroundColor: '#404040', color: '#ffffff', fontWeight: 'bold' }}>
              Status: Latitude: {this.state.lat} | Longitude: {this.state.lng} |  Zoom: {this.state.zoom}
            </CardBody>
          </Card>
        </UncontrolledCollapse>
        <UncontrolledCollapse toggler="#toggler">
          <Card>
            <CardBody  >
            <div style={{top: '0', bottom: '0', right: '0', left: '0' }} ref={el => this.mapContainer = el} />
            </CardBody>
          </Card>
        </UncontrolledCollapse>
      </>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));