import React from 'react';
import './style.scss';


import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer/user/user';

const TripInfo = (props) =>  {

  const {data, onTripClick, onTripMouseEnter, onTripMouseOut} = props;

  const _handleClick = () => {
    onTripClick(data);
  }

  return <div className="trip-block" onMouseEnter={_handleClick} onMouseOut={onTripMouseOut}>
    <ul>
      <li>Начало поездки: #{data.starttime}</li>
      <li>Конец поездки: #{data.stoptime}</li>
      <li>Продолжительности поездки: #{data.tripduration}</li>
      <li>Начальная точка поездки: #{data.startStationLatitude},#{data.startStationLongitude}</li>
      <li>Конечная точка поездки: #{data.endStationLatitude}, #{data.endStationLongitude}</li>
    </ul>
  </div>;

}

export {TripInfo};

// const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
// });

const mapDispatchToProps = (dispatch) => ({
  onTripClick: (trip) => {
    dispatch(ActionCreator.showActiveTrip(trip));
  },
});

export default connect(null, mapDispatchToProps)(TripInfo);

