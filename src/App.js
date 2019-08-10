import React from 'react';
import dataTrip from './mock/trip-data';
import ListTrip from './components/list-trip'
import './App.css';

const App = () => {
  const data = dataTrip;

  return (
    <div className="App">
      <ListTrip dataTrip={data} />
    </div>
  );
}

export default App;
