import React from "react";
import leaflet from "leaflet";
// import PropTypes from 'prop-types';

class Map extends React.PureComponent {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }
  render() {
    return <section className="map" id="map" ref={this.mapRef} style={{width: `50%`, border: `1px solid black`,overflow: `hidden`,height: `400px`}}>
    </section>;
  }

  _handleAddPinOnMap(tripCords) {
    const icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [22, 30]
    });
    // leaflet
    //   .marker(tripCords, {icon}).addTo(this.map);
    // leaflet
    //   .marker([52.3709553943509, 4.89309666406199], {icon}).addTo(this.map)
      ;
  }

  componentDidMount() {
    if (this.mapRef.current) {
      const {tripList} = this.props;

      this.city = [52.38333, 4.9];

      this.zooms = 12;
      this.map = leaflet.map(this.mapRef.current, {
        center: this.city,
        zoom: this.zooms,
        zoomControl: false,
        marker: true
      });

      this.map.setView(this.city, this.zooms);

      leaflet
        .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
          detectRetina: true,
          attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
        }).addTo(this.map);

      const tripCords = [52.3709553943508, 4.89309666406198];

      this._handleAddPinOnMap(tripCords);

      // for (let i = 0; i < tripList.length; i++) {
      //   this._handleAddPinOnMap(tripList[i].offerCoord);
      // }
    }
  }
}

// Map.propTypes = {
//   offer: PropTypes.arrayOf(PropTypes.shape({
//     src: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     stars: PropTypes.number,
//     name: PropTypes.string,
//     offerCoord: PropTypes.array.isRequired,
//   })).isRequired,

// };

export default Map;