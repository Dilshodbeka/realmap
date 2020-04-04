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
        <div>
        <Button color="success" id="toggler" style={{ margin: '10rem 5rem 10rem 10rem' }}>
          Toggle
        </Button>
        <UncontrolledCollapse toggler="#toggler">
          <Card>
            <CardBody>
            <div ref={el => this.mapContainer = el} className='mapContainer' />
            </CardBody>
          </Card>
        </UncontrolledCollapse>

        <Button color="success" id="toggler1" style={{ margin: '10rem 5rem 10rem 10rem' }}>
          Toggle 2
        </Button>
        <UncontrolledCollapse toggler="#toggler1">
          <Card>
            <CardBody>
            <div className='sidebarStyle'>
                <div>status: Latitude: {this.state.lat} | Longitude: {this.state.lng} |  Zoom: {this.state.zoom}</div>
            </div>
            </CardBody>
          </Card>
        </UncontrolledCollapse>
      </div>

    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));