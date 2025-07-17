import { useRouter } from 'expo-router';
import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native';

const COLLAGE_SIZE = 340;
const CENTER = COLLAGE_SIZE / 2;

export default function AuthIndex() {
  const router = useRouter();

  const images = [
    require('../../assets/images/img1.jpg'),
    require('../../assets/images/img2.jpg'),
    require('../../assets/images/img3.jpg'),
    require('../../assets/images/img4.jpg'),
    require('../../assets/images/img5.jpg'),
    require('../../assets/images/img6.jpg'),
    require('../../assets/images/img7.jpg'),
    require('../../assets/images/img8.jpg'),
    require('../../assets/images/img9.jpg'),
    require('../../assets/images/img10.jpg'),
    require('../../assets/images/img11.jpg'),
  ];

  // Manually position each image to match the screenshot
  const collageImages = [
    // Top left (tall)
    <Image key={0} source={images[0]} style={[styles.collageImg, { width: 70, height: 110, borderRadius: 22, left: 30, top: 10 }]} />,
    // Top center left (tall)
    <Image key={1} source={images[1]} style={[styles.collageImg, { width: 70, height: 110, borderRadius: 22, left: 100, top: 0 }]} />,
    // Top right (wide)
    <Image key={2} source={images[2]} style={[styles.collageImg, { width: 90, height: 70, borderRadius: 18, left: 200, top: 20 }]} />,
    // Middle left (square)
    <Image key={3} source={images[3]} style={[styles.collageImg, { width: 70, height: 70, borderRadius: 18, left: 10, top: 100 }]} />,
    // Center left (giraffe, wide)
    <Image key={4} source={images[4]} style={[styles.collageImg, { width: 90, height: 70, borderRadius: 18, left: 70, top: 110 }]} />,
    // Center (largest)
    <Image key={5} source={images[5]} style={[styles.collageImg, { width: 110, height: 110, borderRadius: 28, left: 115, top: 90, zIndex: 2 }]} />,
    // Center right (hand, tall)
    <Image key={6} source={images[6]} style={[styles.collageImg, { width: 70, height: 110, borderRadius: 22, left: 230, top: 90 }]} />,
    // Middle right (square)
    <Image key={7} source={images[7]} style={[styles.collageImg, { width: 70, height: 70, borderRadius: 18, left: 260, top: 140 }]} />,
    // Bottom left (cake, square)
    <Image key={8} source={images[8]} style={[styles.collageImg, { width: 70, height: 70, borderRadius: 18, left: 60, top: 200 }]} />,
    // Bottom center (statue, tall)
    <Image key={9} source={images[9]} style={[styles.collageImg, { width: 70, height: 110, borderRadius: 22, left: 140, top: 200 }]} />,
    // Bottom right (room, wide)
    <Image key={10} source={images[10]} style={[styles.collageImg, { width: 90, height: 70, borderRadius: 18, left: 210, top: 210 }]} />,
  ];

  return (
    <View style={styles.container}>
      <View style={styles.collageWrapper}>
        {collageImages}
      </View>
      <View style={{ alignItems: 'center', marginTop: 32 }}>
        <Text style={styles.title}>
          Welcome to <Text style={styles.clipnest}>Clipnest</Text>
        </Text>
        <Pressable
          style={styles.signUp}
          onPress={() => router.push('/auth/signup')}
        >
          <Text style={styles.signUpText}>Sign up</Text>
        </Pressable>
        <Pressable
          style={styles.login}
          onPress={() => router.replace('/(tabs)')}
        >
          <Text style={styles.loginText}>Login</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181D1C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  collageWrapper: {
    width: COLLAGE_SIZE,
    height: COLLAGE_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 32,
    position: 'relative',
  },
  collageImg: {
    position: 'absolute',
    backgroundColor: '#222',
    resizeMode: 'cover',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '500',
    marginBottom: 32,
    textAlign: 'center',
  },
  clipnest: {
    fontFamily: 'Lobster',
    fontSize: 28,
    color: '#fff',
  },
  signUp: {
    width: 280,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#22302C',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  signUpText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '400',
  },
  login: {
    width: 280,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#4EE0C1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    color: '#181D1C',
    fontSize: 18,
    fontWeight: '500',
  },
});
