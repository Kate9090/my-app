import * as React from 'react';
import * as leaflet from 'leaflet';
import './style.scss';
import {connect} from 'react-redux';
import {getActiveTrip} from '../../reducer/user/selectors';

const icon = leaflet.icon({
  iconUrl: `/img/pin.svg`,
  iconSize: [10, 12]
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

  activeTrip = this.props;

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

  componentDidUpdate(activeTrip) {
    try {
      if (mapMain) {
        mapMain.remove();
      }
      this._init(activeTrip);
    } catch (err) {
      return true;
    }

    return true;
  }

  shouldComponentUpdate(activeTrip) {
    if (mapMain) {
      mapMain.remove();
    }

    this._init(activeTrip);
    return true;
  }

  _init() {
    const {tripList, activeTrip} = this.props;

    console.log(`in map ` + activeTrip.tripduration)
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
        zoomControl: true,
        marker: true,
      });

      mapMain.setView(center, zooms);

      leaflet
        .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
          detectRetina: true,
          attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
        }).addTo(mapMain);

      for (let i = 0; i < tripList.length; i++) {
        if (activeTrip && tripList[i].bikeid === activeTrip.bikeid && tripList[i].tripduration === activeTrip.tripduration) {
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
          leaflet
            .marker([tripList[i].startStationLatitude, tripList[i].startStationLongitude], {icon}).addTo(mapMain)
          leaflet
            .marker([tripList[i].endStationLatitude, tripList[i].endStationLongitude], {icon}).addTo(mapMain);
        }
      }
    }
  }

  render() {

    return <section className="map" id="map" ref={this.mapRef}>
    </section>;
  }

}

export {Map};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  activeTrip: getActiveTrip(state),
});

export default connect(
  mapStateToProps
)(Map);
