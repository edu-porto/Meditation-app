// App.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import RepeatableCountdownTimer from './RepeatableCountdownTimer'; // Import the component


const App = () => {
  const [seconds, setSeconds] = useState(0); // Time interval input
  const [counter, setCounter] = useState(0); // Countdown timer
  const [running, setRunning] = useState(false); // Track if timer is running

  // Handle timer countdown and reset on reaching target seconds
  useEffect(() => {
    let timer;
    if (running) {
      timer = setInterval(() => {
        setCounter((prevCounter) => {
          if (prevCounter + 1 === seconds) {
            return 0; // Reset when reaching set seconds
          }
          return prevCounter + 1;
        });
      }, 1000); // Tick every second
    } else if (!running && counter !== 0) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [running, seconds, counter]);

  // Start or Stop the Timer
  const toggleTimer = () => {
    setRunning(!running);
    if (!running) setCounter(0); // Reset counter when starting
  };




  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Timer Interval (seconds):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter seconds"
        value={seconds.toString()}
        onChangeText={(text) => setSeconds(Number(text))}
      />
      <Text style={styles.timer}>Timer: {counter}s</Text>
      <Button title={running ? "Stop Timer" : "Start Timer"} onPress={toggleTimer} />

      <RepeatableCountdownTimer duration={5} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#494949',
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: '80%',
    textAlign: 'center',
    marginBottom: 16,
  },
  timer: {
    fontSize: 24,
    marginVertical: 20,
  },
});

export default App;
