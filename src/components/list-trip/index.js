import React from 'react';
import TripInfo from '../../Components/Trip-Info'

import './style.scss'

const ListTrip = (props) =>  {

  const {dataTrip, onTripClick} = props;

  return <div className="list">
    {dataTrip.map((item, i) => (
      <TripInfo onTripClick={onTripClick} data={dataTrip[i]} key={`trip-`+ i}/>
    )
    )};
  </div>;
}

export default ListTrip;
