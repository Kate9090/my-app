import React from 'react';
import dataTrip from './mock/trip-data';
import ListTrip from './Components/List-Trip';
import Map from './Components/Map'
import './App.css';

import {connect} from 'react-redux';
import {getActiveTrip} from './reducer/user/selectors';


const App = (props) => {
  const {activeTrip} = props;
  console.log(`in app ` + activeTrip.tripduration)

  const data = dataTrip;
  return (
    <div className="App">
      <ListTrip dataTrip={data} />
      <Map tripList={data} activeTrip={activeTrip} />
    </div>
  );
}

export {App};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  activeTrip: getActiveTrip(state),
});

export default connect(
  mapStateToProps
)(App);