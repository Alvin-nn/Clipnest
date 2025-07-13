import React from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function EmailScreen() {
  const router = useRouter();

  const handleNext = () => {
    router.push('/auth/signup/password');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Top nav: Back icon + Dots */}
      <View style={styles.topNav}>
        <Pressable onPress={handleBack} style={styles.backWrapper}>
          <Image
            source={require('../../../assets/images/backIcon.png')}
            style={styles.backIcon}
          />
        </Pressable>

        <View style={styles.dots}>
          {[...Array(6)].map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === 0 && styles.activeDot,
              ]}
            />
          ))}
        </View>
      </View>

      {/* Main content */}
      <View style={styles.form}>
  <Text style={styles.title}>What's your email?</Text>

  <TextInput
    style={styles.input}
    placeholder="Email"
    placeholderTextColor="#AAAAAA"
    keyboardType="email-address"
  />
</View>


      {/* Next Button */}
      <Pressable style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181D1C',
    paddingHorizontal: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  topNav: {
    position: 'absolute',
    top: 60,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  backWrapper: {
    position: 'absolute',
    left: 20,
  },
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  dots: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#AAAAAA',
  },
  activeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    backgroundColor: '#AAAAAA',
    marginTop: -1,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    width: 344,
    height: 50,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    color: '#FFFFFF',
    backgroundColor: 'transparent',
    marginBottom: 313,
  },
  nextButton: {
    backgroundColor: '#7BDAC8',
    width: 334,
    height: 43,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: '30%',
    alignSelf: 'center',
  },
  nextButtonText: {
    color: '#000000',
    fontSize: 18,
  },
  form: {
  position: 'absolute',
  top: 100,
  width: '100%',
  alignItems: 'center',
},

});
