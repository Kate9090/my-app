import React from 'react';
import dataTrip from './mock/trip-data';
import ListTrip from './Components/List-Trip';
import Map from './Components/Map'
import './App.css';

import withActiveTrip from './hoc/with-active-trip'

import {connect} from 'react-redux';
import {getActiveTrip} from './reducer/user/selectors';


const App = (props) => {
  const WrappedListTrip = withActiveTrip(ListTrip);
  const {activeTripData} = props;
  const data = dataTrip;

  console.log(`activeTrip from app ` + activeTripData.tripduration);

  return (
    <div className="App">
      <WrappedListTrip dataTrip={data} />
      <Map tripList={data}
       activeTrip={activeTripData}
        />
    </div>
  );
}

export  {App};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  activeTripData: getActiveTrip(state),
});

export default connect(
  mapStateToProps
)(App);