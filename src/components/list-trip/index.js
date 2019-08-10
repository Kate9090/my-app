import React from 'react';
import TripInfo from '../../Components/Trip-Info'

import withActiveTrip from '../../hoc/with-active-trip'
import './style.scss'

const ListTrip = (props) =>  {
  const WrappedTripInfo = withActiveTrip(TripInfo);


  const {dataTrip} = props;
  console.log(dataTrip.length);

  return <div className="list">
    {dataTrip.map((item, i) => (
      <WrappedTripInfo data={dataTrip[i]} key={`trip-`+ i}/>
    )
    )};
  </div>;
}

export default ListTrip;


