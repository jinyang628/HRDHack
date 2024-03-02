import './App.css'
import { Button } from 'flowbite-react';
import React from 'react';
import { giveConsent } from './api/giveConsent.ts';

function App() {
  return (
    <div>
      <Button onClick={() => giveConsent("aaron")}>Default</Button>
    </div>
  )
}

export default App
