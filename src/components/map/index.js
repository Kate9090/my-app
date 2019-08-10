import * as React from 'react';
import * as leaflet from 'leaflet';
import './style.scss';

const icon = leaflet.icon({
  iconUrl: `/img/pin.svg`,
  iconSize: [10, 12]
});
const activeIcon = leaflet.icon({
  iconUrl: `/img/pin-active.svg`,
  iconSize: [30, 30]
});

let map = {
  ZOOM: 13,
  CENTER: [40.728,-74.032],
};

let mapMain = null;

class Map extends React.Component {

  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }

  componentDidMount() {
    try {
      if (mapMain) {
        mapMain.remove();
      }
      this._init();
    } catch (err) {
      return true;
    }

    return true;
  }

  componentWillUpdate(exProps) {
    if (exProps.tripList !== this.props.tripList) {
      this._init();
    }
    return true;
  }


  shouldComponentUpdate() {
    if (mapMain) {
      mapMain.remove();
    }

    this._init();
    return true;
  }

  _init() {
    const {tripList,
       activeTrip
    } = this.props;

    // console.log(`init map`)
    // console.log(activeTrip)

    if (this.props.tripList.length > 0) {
      if (this.mapRef.current) {

        const zooms = map.ZOOM;
        const center = map.CENTER;

        mapMain = leaflet.map(this.mapRef.current, {
          center: center,
          zoom: zooms,
          scrollWheelZoom: true,
          zoomControl: false,
          marker: true,
        });

        mapMain.setView(center, zooms);

        leaflet
          .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
            detectRetina: true,
            attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
          }).addTo(mapMain);

        leaflet
          .marker(center, {icon}).addTo(mapMain);


        for (let i = 0; i < tripList.length; i++) {
          if (activeTrip && tripList[i].bikeid === activeTrip.bikeid) {
            console.log(activeTrip.bikeid);
            leaflet
              .marker([tripList[i].startStationLatitude, tripList[i].startStationLongitude],
                  {
                    // icon: tripList[i].bikeid === activeTrip.bikeid ?
                      activeIcon
                      // : icon
                  }).addTo(mapMain);
            leaflet
              .marker([tripList[i].endStationLatitude, tripList[i].endStationLongitude],
                  {
                    // icon: tripList[i].id === activeTrip.id ?
                      activeIcon
                      // : icon
                  }).addTo(mapMain);
          } else {
            console.log(`not active`);
            leaflet
              .marker([tripList[i].startStationLatitude, tripList[i].startStationLongitude], {icon}).addTo(mapMain)
            leaflet
              .marker([tripList[i].endStationLatitude, tripList[i].endStationLongitude], {icon}).addTo(mapMain);
          }
        }
      }
    }
  }

  render() {
    const {tripList} = this.props;

    return <section
      className="map" id="map" ref={this.mapRef}
    >
    </section>;
  }

}

export default Map;
