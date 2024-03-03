import React, { useState } from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Checkbox, Button } from 'react-native-paper';
import { View } from '@/components/Themed';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [isConsentGiven, setConsentGiven] = useState(false);

  // Update the username state
  const handleUsernameChange = (username) => {
    setUsername(username);
  };

  // Toggle the state of the consent checkbox
  const toggleConsent = () => {
    setConsentGiven(!isConsentGiven);
  };

  // Define the condition for the submit button to be enabled
  const isSubmitEnabled = username !== '' && isConsentGiven;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.innerContainer}>
        <TextInput
          label="Username"
          value={username}
          onChangeText={handleUsernameChange}
          mode="outlined"
          style={styles.input}
        />

        <View style={styles.checkboxContainer}>
          <Checkbox
            status={isConsentGiven ? 'checked' : 'unchecked'}
            onPress={toggleConsent}
          />
          <TextInput label="I give my consent for data collection." />
        </View>

        <Button
          mode="contained"
          onPress={() => console.log('Submitted')}
          disabled={!isSubmitEnabled}
          style={styles.button}
        >
          Submit
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    width: '100%',
  },
});
