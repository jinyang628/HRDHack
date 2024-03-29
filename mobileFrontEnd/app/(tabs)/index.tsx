import React, { useState } from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, TextInput, Checkbox, Button, Snackbar } from 'react-native-paper';
import { View } from '@/components/Themed';
import { giveConsent } from '@/api/giveConsent';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [isConsentGiven, setConsentGiven] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [uniqueToken, setUniqueToken] = useState(''); 

  // Update the username state
  const handleUsernameChange = (username: string) => {
    setUsername(username);
  };

  // Toggle the state of the consent checkbox
  const toggleConsent = () => {
    setConsentGiven(!isConsentGiven);
  };

  const handleLogin = async (username: string) => {
    try {
      const uniqueToken: string = await giveConsent(username);
      setUniqueToken(uniqueToken);
      if (uniqueToken) {
        setSnackbarVisible(true); // Show success message
      }
    } catch (error: any) {
      console.error(error);
    }
  }


  // Define the condition for the submit button to be enabled
  const isSubmitEnabled = username !== '' && isConsentGiven;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.innerContainer}>
        <Text variant="displayLarge" style={styles.title}>
          Miló Circles
        </Text>

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
          <Text style={styles.checkboxLabel}> {/* Fix the style reference */}
            I give my consent for data collection.
          </Text>

          <Snackbar
            visible={snackbarVisible}
            onDismiss={() => setSnackbarVisible(false)}
            duration={3000} // How long it stays visible
            style={styles.snackbar} // Add custom style here
          >
            Success! You have logged in as ${uniqueToken}.
          </Snackbar>
        </View>

        <Button
          mode="contained"
          onPress={() => handleLogin(username)}
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
    width: '50%',
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    width: '50%',
  },
  checkboxLabel: {
    marginLeft: 8, 
  },
  title: {
    marginBottom: 50,
  },
  snackbar: {
    backgroundColor: '#00C853',
    color: '#FFFFFF', 
  },
});
