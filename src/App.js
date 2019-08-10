import React from 'react';
import dataTrip from './mock/trip-data';
import ListTrip from './Components/List-Trip';
import Map from './Components/Map'
import './App.css';

const App = () => {
  const data = dataTrip;

  return (
    <div className="App">
      <ListTrip dataTrip={data} />
      <Map tripList={data} />
    </div>
  );
}

export default App;
