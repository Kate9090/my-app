import React from 'react';
import dataTrip from './mock/trip-data';
import ListTrip from './Components/List-Trip';
import Map from './Components/Map'
import './App.css';

import {connect} from 'react-redux';
import {getActiveTrip} from './reducer/user/selectors';


const App = (props) => {
  const {activeTripData} = props;
  const data = dataTrip;

  return (
    <div className="App">
      <ListTrip dataTrip={data} />
      <Map tripList={data} activeTrip={activeTripData} />
    </div>
  );
}

export {App};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  activeTripData: getActiveTrip(state),
});

export default connect(
  mapStateToProps
)(App);