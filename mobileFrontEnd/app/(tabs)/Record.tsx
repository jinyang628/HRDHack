import { StyleSheet } from 'react-native';

import { generateQuestion } from '@/api/generateQuestion';
import { View } from '@/components/Themed';
import { Text, Button } from 'react-native-paper';
import { useState } from 'react';
import Recorder from '@/components/Recorder';

export default function MainScreen() {

  const [question, setQuestion] = useState('');
  const isDisabled = question == '';


  const handleGenerateQuestion = async () => { 
    try {
      const newQuestion: string = await generateQuestion();
      setQuestion(newQuestion);
    } catch (error: any) {
      console.error(error);
    } 
  }

  return (
    <View style={styles.container}>
      <Button
          mode="contained"
          onPress={() => handleGenerateQuestion()}
          style={styles.button}
        >
        Generate Question
      </Button>
      {question !== '' && (
        <Text style={styles.question}>
          {question}
        </Text>
      )}
      <Recorder isDisabled={isDisabled} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginBottom: 50,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  button: {
    marginTop: 20,
    width: '30%',
  },
  question: {
    marginTop: 20,
    marginBottom: 50,
    fontSize: 18,
    textAlign: 'center', 
  },
});
