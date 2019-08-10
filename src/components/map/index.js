import * as React from 'react';
import * as leaflet from 'leaflet';
import './style.scss';
// import {connect} from 'react-redux';

// import {getCities} from '../../reducer/data/selectors';
// import {getSelectCity, getPinColor} from '../../reducer/user/selectors';
// import { FavouriteOfferType } from '../../types';

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

// interface Props {
//   offer: FavouriteOfferType[],
//   nameCityOnMap: string,
//   offerCities: string[],
//   activeCard: FavouriteOfferType,
//   color: string,
// }
let mapMain = null;
// let city = [];

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

  // componentWillUpdate(exProps) {
  //   if (exProps.offer !== this.props.offer) {
  //     this._init();
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
    const {tripList,
      //  activeTrip
    } = this.props;

    if (this.props.tripList.length > 0) {
      if (this.mapRef.current) {
        // if (nameCityOnMap !== ``) {
        //   let coordOffer = tripList.filter((it) => it.city.name === nameCityOnMap).slice(0, 1);

        //   const offerCoordCity = [coordOffer[0].location.latitude, coordOffer[0].location.longitude];
        //   city = offerCoordCity;
        // } else {
        //   let coordOffer = offer.filter((it) => it.city.name === this.props.offerCities[0]).slice(0, 1);

        //   const offerCoordCity = [coordOffer[0].city.location.latitude, coordOffer[0].city.location.longitude];
        //   city = offerCoordCity;
        // }

        // const city = [40.7287448,-74.0321082];
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
          // if (activetrip) {
          //   leaflet
          //     .marker([tripList[i].startStationLatitude, tripList[i].startStationLongitude],
          //         {
          //           icon: offer[i].id === activeCard.id ?
          //             activeIcon
          //             : icon
          //         }).addTo(mapMain);
          //   leaflet
          //     .marker([tripList[i].endStationLatitude, tripList[i].endStationLongitude],
          //         {
          //           icon: tripList[i].id === activeCard.id ?
          //             activeIcon
          //             : icon
          //         }).addTo(mapMain);
          // } else {
            leaflet
              .marker([tripList[i].startStationLatitude, tripList[i].startStationLongitude], {icon}).addTo(mapMain)
            leaflet
              .marker([tripList[i].endStationLatitude, tripList[i].endStationLongitude], {icon}).addTo(mapMain);
          // }
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

// const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
//   offerCities: getCities(state),
//   nameCityOnMap: getSelectCity(state),
//   color: getPinColor(state),
// });

// export default connect(
//     mapStateToProps
// )(Map);
