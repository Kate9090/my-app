import React from 'react';
import './style.scss';

import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer/user/user';

const TripInfo = (props) =>  {

  const _handleMouseEnter = (data) => {
    // console.log(`mouseenter ` + data.tripduration);
    props.onTripClick(data);
  }
  const {data, onTripMouseOut} = props;

  return <div className="trip-block" onMouseEnter={() => _handleMouseEnter(data)} onMouseOut={onTripMouseOut}>
    <ul>
      <li>Начало поездки: {data.starttime}</li>
      <li>Конец поездки: {data.stoptime}</li>
      <li>Продолжительности поездки: {data.tripduration}</li>
      <li className="start-color">Начальная точка поездки: {data.startStationLatitude},{data.startStationLongitude}</li>
      <li className="finish-color">Конечная точка поездки: {data.endStationLatitude}, {data.endStationLongitude}</li>
    </ul>
  </div>;
}

export {TripInfo};

const mapDispatchToProps = (dispatch) => ({
  onTripClick: (trip) => {
    dispatch(ActionCreator.showActiveTrip(trip));
  },
});

export default connect(null, mapDispatchToProps)(TripInfo);

