import React from 'react';
import TripInfo from '../../Components/Trip-Info'
import './style.scss'

const ListTrip = (props) =>  {

  const {dataTrip} = props;
  console.log(dataTrip.length);

  return <div className="list">
    {dataTrip.map((item, i) => (
      <TripInfo data={dataTrip[i]} key={`trip-`+ i}/>
    )
    )};
  </div>


}

export default ListTrip;
