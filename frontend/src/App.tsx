import './App.css'
import { Button, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import { giveConsent } from './api/giveConsent.ts';

function App() {
  const [uniqueToken, setUniqueToken] = useState('');
  const [username, setUsername] = useState('');

  const handleGiveConsent = async (username: string) => {
    try {
      const unique_token: string = await giveConsent(username);
      setUniqueToken(unique_token)
      console.log(`Unique token successfuly received and stored: ${unique_token}`)
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="m-4">
        <TextInput
          id="username_input_field"
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <Button onClick={() => handleGiveConsent(username)}>I agree</Button>
      
    </div>
  )
}

export default App
