import * as React from 'react';
import * as leaflet from 'leaflet';
import './style.scss';

const icon = leaflet.icon({
  iconUrl: `/img/pin.svg`,
  iconSize: [10, 12]
});

// const activeIconPin = leaflet.icon({
//   iconUrl: `/img/pin-active.svg`,
//   iconSize: [30, 30]
// });

// const activeIconFinish = leaflet.icon({
//   iconUrl: `/img/pin-active-finish.svg`,
//   iconSize: [30, 30]
// });

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

  // componentDidMount() {
  //   try {
  //     if (mapMain) {
  //       mapMain.remove();
  //     }
  //     this._init();
  //   } catch (err) {
  //     return true;
  //   }

  //   return true;
  // }

  shouldComponentUpdate() {
    if (mapMain) {
      mapMain.remove();
    }

    this._init();
    return true;
  }

  _init() {
    const {tripList, activeTrip} = this.props;

    if (this.props.tripList.length > 0) {
      if (this.mapRef.current) {

        const zooms = map.ZOOM;
        const center = map.CENTER;

        const activeIconPin = leaflet.icon({
          iconUrl: `/img/pin-active.svg`,
          iconSize: [50*activeTrip.tripduration/1000, 60*activeTrip.tripduration/1000]
        });

        const activeIconFinish = leaflet.icon({
          iconUrl: `/img/pin-active-finish.svg`,
          iconSize: [50*activeTrip.tripduration/1000, 60*activeTrip.tripduration/1000]
        });

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
          if (activeTrip && tripList[i].bikeid === activeTrip.bikeid && tripList[i].tripduration === activeTrip.tripduration) {
            console.log(`bikeid is ` + tripList[i].tripduration);
            leaflet
              .marker([tripList[i].startStationLatitude, tripList[i].startStationLongitude],
                  {
                    icon: activeIconPin
                  })
              .bindTooltip(tripList[i].startStationName,
                {
                    permanent: true,
                    direction: 'right'
                })
              .addTo(mapMain);
            leaflet
              .marker([tripList[i].endStationLatitude, tripList[i].endStationLongitude],
                  {
                    icon: activeIconFinish
                  }).bindTooltip(tripList[i].endStationName,
                  {
                      permanent: true,
                      direction: 'right'
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

    return <section className="map" id="map" ref={this.mapRef}>
    </section>;
  }

}

export default Map;
