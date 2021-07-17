import React from 'react';
import Column from './components/Column';

function App() {
  return (
    <header className="app">
      <Column header="To Do"></Column>
      <Column header="In progress"></Column>
      <Column header="Testing"></Column>
      <Column header="Done"></Column>
    </header>
  );
}

export default App;
