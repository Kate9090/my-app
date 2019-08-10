import React from 'react';
import {connect} from 'react-redux';
import TripInfo from '../../Components/Trip-Info'

import withActiveTrip from '../../hoc/with-active-trip'
import './style.scss'

import {getActiveTrip} from '../../reducer/user/selectors';


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

export {ListTrip};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  // offers: getHotels(state),
  activeTrip: getActiveTrip(state),
});

export default connect(
  mapStateToProps
)(ListTrip);
