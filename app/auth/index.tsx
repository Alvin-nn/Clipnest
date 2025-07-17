import { useRouter } from 'expo-router';
import React from 'react';
import {
    Dimensions,
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

const { width, height } = Dimensions.get('window');
const CENTER_X = width / 2;
const CENTER_Y = 170; // vertical center for collage
const RADIUS = 100;

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

  return (
    <View style={styles.container}>
      {/* --- Collage of images --- */}
      <View style={styles.collage}>
        {/* Central image */}
        <Image
          source={images[0]}
          style={[
            styles.image,
            {
              width: 100,
              height: 100,
              top: CENTER_Y - 50,
              left: CENTER_X - 50,
              zIndex: 2,
            },
          ]}
        />

        {/* Radial images around the center */}
        {images.slice(1).map((img, i) => {
          const angle = (2 * Math.PI * i) / 10;
          const x = CENTER_X + RADIUS * Math.cos(angle);
          const y = CENTER_Y + RADIUS * Math.sin(angle);

          return (
            <Image
              key={i}
              source={img}
              style={[
                styles.image,
                {
                  width: 60,
                  height: 60,
                  top: y - 30,
                  left: x - 30,
                },
              ]}
            />
          );
        })}
      </View>

      {/* --- Welcome text --- */}
      <Text style={styles.title}>
        Welcome to <Text style={styles.clipnest}>Clipnest</Text>
      </Text>

      {/* --- Pill Buttons --- */}
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.signUp}
          onPress={() => router.push('/auth/signup')}
        >
          <Text style={styles.buttonText}>Sign up</Text>
        </Pressable>

        <Pressable
          style={styles.login}
          onPress={() => router.push('/auth/login')}
        >
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 40,
  },
  collage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: 350,
  },
  image: {
    position: 'absolute',
    borderRadius: 30,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 20,
  },
  clipnest: {
    fontFamily: 'Lobster',
    fontSize: 28,
    color: '#fff',
  },
  buttonContainer: {
    width: '80%',
  },
  signUp: {
    backgroundColor: '#2E4A4A',
    width: 300,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    marginBottom: 10,
  },
  login: {
    backgroundColor: '#26A69A',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 30,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 18,
  },
});
