import React, { useRef, useEffect } from 'react';
import { Animated, View, StyleSheet } from 'react-native';

const LoadingScreen = () => {
  const flipAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Define the sequence of animations
    const sequenceAnimation = Animated.sequence([
      // Create flip animation
      Animated.timing(flipAnimation, {
        toValue: 1,
        duration: 1500, // 1 second
        useNativeDriver: true,
      }),
      // Pause for 1 second
      Animated.delay(500),
      // Reset flip animation
      Animated.timing(flipAnimation, {
        toValue: 0,
        duration: 0, // No duration, instant reset
        useNativeDriver: true,
      }),
    ]);

    // Repeat the sequence 5 times
    Animated.loop(sequenceAnimation, { iterations: 5 }).start();
  }, []);

  const flipInterpolate = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const animatedStyle = {
    transform: [{ rotateY: flipInterpolate }],
  };

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../../assets/favicon.png')}
        style={[styles.logo, animatedStyle]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 150, // Adjust the width as needed
    height: 150, // Adjust the height as needed
    position: 'absolute',
    resizeMode: 'contain',
  },
});

export default LoadingScreen;
