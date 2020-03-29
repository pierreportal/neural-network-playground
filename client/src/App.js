import React, { useState } from 'react';
import './App.css';
import Playground from './components/Playground'
import LogPannel from './components/LogPannel';


function App() {
  const [state, setState] = useState({
    parameters: null,
    data: []
  })

  const getData = data => setState({ ...state, data: data })

  const getNParameters = params => {
    if (params && params.nParams) {
      setState({
        ...state,
        parameters: params
      })
    }
  }
  return (
    <div className="App">
      <Playground getNParameters={getNParameters} getData={getData} />
      <LogPannel networkParams={state.parameters} data={state.data} />
    </div>
  );
}

export default App;
