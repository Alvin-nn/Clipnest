// Step-by-step wheel-style date picker with faded top/bottom using @react-native-picker/picker
// Install first: npm install @react-native-picker/picker

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const days = Array.from({ length: 31 }, (_, i) => `${i + 1}`);
const years = Array.from({ length: 100 }, (_, i) => `${new Date().getFullYear() - i}`);

export default function BirthdateScreen() {
  const router = useRouter();
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const isBirthdateComplete =
    selectedMonth !== '' &&
    selectedDay !== '' &&
    selectedYear !== '';


  const handleNext = () => {
    router.push('/auth/signup/gender' as any);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Back button + dots */}
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
              style={[styles.dot, index === 2 && styles.activeDot]}
            />
          ))}
        </View>
      </View>


    <View style ={styles.form}>
      {/* Title */}
      <Text style={styles.title}>What's your birthdate?</Text>

      {/* Picker container */}
      <View style={styles.pickerWrapper}>
        <View style={styles.fadedOverlay} pointerEvents="none" />
        <View style={styles.pickerRow}>
          <Picker
            selectedValue={selectedMonth}
            onValueChange={(itemValue) => setSelectedMonth(itemValue)}
            style={styles.picker}
            itemStyle={styles.pickerItem}
          >
            {months.map((month) => (
              <Picker.Item key={month} label={month} value={month} />
            ))}
          </Picker>

          <Picker
            selectedValue={selectedDay}
            onValueChange={(itemValue) => setSelectedDay(itemValue)}
            style={styles.picker}
            itemStyle={styles.pickerItem}
          >
            {days.map((day) => (
              <Picker.Item key={day} label={day} value={day} />
            ))}
          </Picker>

          <Picker
            selectedValue={selectedYear}
            onValueChange={(itemValue) => setSelectedYear(itemValue)}
            style={styles.picker}
            itemStyle={styles.pickerItem}
          >
            {years.map((year) => (
              <Picker.Item key={year} label={year} value={year} />
            ))}
          </Picker>
        </View>
        <View style={[styles.fadedOverlay, { bottom: 0, top: 'auto' }]} pointerEvents="none" />
      </View>
    </View>
    

      {/* Next button */}
      <Pressable style={[styles.nextButton,!isBirthdateComplete && {opacity: 0.5},]} 
        onPress={handleNext}
        disabled={!isBirthdateComplete}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181D1C',
    paddingTop: 60,
    alignItems: 'center',
  },
  topNav: {
    position: 'absolute',
    top: 80,
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
    marginBottom: 0,
    marginTop: 100,
  },
  pickerWrapper: {
    height: 150,
    overflow: 'hidden',
    position: 'relative',
  },
  pickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 340,
  },
  picker: {
    width: 110,
    height: 150,
    backgroundColor: 'transparent',
  },
  pickerItem: {
    color: '#FFFFFF',
    fontSize: 18,
    height: 150,
  },
  fadedOverlay: {
    position: 'absolute',
    top: 0,
    height: 30,
    width: '100%',
    backgroundColor: '#181D1C',
    opacity: 0.7,
    zIndex: 1,
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
  },
  nextButtonText: {
    color: '#000000',
    fontSize: 18,
  },
  form: {
  position: 'absolute',
  top: 20,
  width: '100%',
  alignItems: 'center',
},

});
