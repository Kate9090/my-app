import React from 'react';
import './style.scss'

const TripInfo = (props) =>  {

  const {data} = props;

  return <div className="trip-block">
    <ul>
      <li>Начало поездки: #{data.starttime}</li>
      <li>Конец поездки: #{data.stoptime}</li>
      <li>Продолжительности поездки: #{data.tripduration}</li>
      <li>Начальная точка поездки: #{data.startStationLatitude},#{data.startStationLongitude}</li>
      <li>Конечная точка поездки: #{data.endStationLatitude}, #{data.endStationLongitude}</li>
    </ul>
  </div>;

}

export default TripInfo;
