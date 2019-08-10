import React from 'react';
import Trip from ''

const ListTrip = (props) =>  {

  const {dataTrip} = props;
  console.log(dataTrip.length);

  return (
      <div>
        {dataTrip.map((item, i) => (
          <Trip data={dataTrip[i]} key={`trip-`+ i}/>
        )
      )}
      </div>
    )

}


export default ListTrip;
