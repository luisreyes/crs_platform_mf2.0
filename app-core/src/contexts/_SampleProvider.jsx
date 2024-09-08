import React, { useState } from 'react';

const SAMPLEContext = React.createContext();
const { Provider } = SAMPLEContext;

const SAMPLEProvider = (props) => {
  // Context's State
  const [state, setState] = useState(props.state || false);
  // Context's Methods
  const toggleState = () => setState((state) => !state);

  const values = {
    state,
    setState,
    toggleState,
  };

  return <Provider value={values}>{props.children}</Provider>;
};

export { SAMPLEProvider, SAMPLEContext };
