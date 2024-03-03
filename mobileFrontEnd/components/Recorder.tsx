// https://stackoverflow.com/questions/76026843/androidexporeact-native-voice-voice-typeerror-cannot-read-property-sta

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import Voice from '@react-native-voice/voice';

interface RecorderProps {
    isDisabled: boolean;
}

export default function Recorder({ isDisabled }: RecorderProps) {
  const [text, setText] = useState('');
  const [listening, setListening] = useState(false);

  useEffect(() => {
    const onSpeechResults = (e: any) => {
      setText(e.value?.join(' ') ?? '');
    };

    Voice.onSpeechResults = onSpeechResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const toggleRecording = () => {
    if (listening) {
        Voice.stop();
    } else {
        Voice.start('en-US');
    }
    setListening(!listening);
  };

  return (
    <View style={styles.container}>
      <Text>{listening ? '🎤 Listening...' : ''}</Text>
      <TouchableOpacity
        onPress={toggleRecording}
        style={[styles.button, isDisabled && styles.disabledButton]}
        disabled={isDisabled} // Disable TouchableOpacity when isDisabled is true
      >
        <Text style={styles.buttonText}>{listening ? 'Stop Recording' : 'Start Recording'}</Text>
      </TouchableOpacity>
      <Text>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007bff',
    padding: 15,
  },
  buttonText: {
    color: 'white',
  },
  disabledButton: {
    backgroundColor: '#a0a0a0', // Change the color to indicate it's disabled, or adjust as needed
  },
});
