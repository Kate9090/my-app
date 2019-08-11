import React from 'react';
import TripInfo from '../../Components/Trip-Info'

import withActiveTrip from '../../hoc/with-active-trip'
import './style.scss'

const ListTrip = (props) =>  {
  const WrappedTripInfo = withActiveTrip(TripInfo);
  const {dataTrip, onTripClick} = props;

  return <div className="list">
    {dataTrip.map((item, i) => (
      <WrappedTripInfo onTripClick={onTripClick} data={dataTrip[i]} key={`trip-`+ i}/>
    )
    )};
  </div>;
}

export default ListTrip;


