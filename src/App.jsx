import React from 'react';
import Console from './components/Console/Console';
import { handleCommandSubmit } from './utils/commandHandler';

const App = () => {
  return (
    <div>
      <h1>Command Console</h1>
      <Console
        onSubmit={handleCommandSubmit}
        placeholder="Enter commands here..."
        id="console-input"
        name="console-command"
      />
      {/* <RandomInterceptAmatrix ns="5,3,2" /> */}
    </div>
  );
};

export default App;
