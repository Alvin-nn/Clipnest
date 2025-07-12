// modals/EditProfileModal.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Switch,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Animated,
  Easing,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useThemeContext } from '../../theme/themecontext'; // 🔥 Theme hook

interface EditProfileModalProps {
  visible: boolean;
  onClose: () => void;
  currentName: string;
  currentUsername: string;
  currentBio: string;
  onSave: (
    newName: string,
    newUsername: string,
    newBio: string,
    showPins: boolean,
    newProfilePicUri?: string
  ) => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  visible,
  onClose,
  currentName,
  currentUsername,
  currentBio,
  onSave,
}) => {
  const [name, setName] = useState(currentName);
  const [username, setUsername] = useState(currentUsername);
  const [bio, setBio] = useState(currentBio);
  const [showPins, setShowPins] = useState(false);
  const [profilePicUri, setProfilePicUri] = useState<string | undefined>(undefined);
  const [picOptionsVisible, setPicOptionsVisible] = useState(false);
  const slideAnim = useState(new Animated.Value(0))[0];
  const { isDarkMode } = useThemeContext(); // 🌙 get dark mode flag

  const handleSave = () => {
    onSave(name, username, bio, showPins, profilePicUri);
    onClose();
  };

  const openPicOptions = () => {
    setPicOptionsVisible(true);
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const closePicOptions = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setPicOptionsVisible(false);
    });
  };

  const pickImageFromGallery = async () => {
    closePicOptions();
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permission to access gallery is required!');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) {
      setProfilePicUri(result.assets[0].uri);
    }
  };

  const takePhotoWithCamera = async () => {
    closePicOptions();
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permission to access camera is required!');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      quality: 1,
    });
    if (!result.canceled) {
      setProfilePicUri(result.assets[0].uri);
    }
  };

  const slideUp = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  return (
    <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <View
          style={[
            styles.modalContent,
            { backgroundColor: isDarkMode ? '#1e1e1e' : 'white' },
          ]}
        >
          <TouchableOpacity onPress={onClose} style={styles.exitButton}>
            <Ionicons name="close" size={24} color={isDarkMode ? 'white' : 'black'} />
          </TouchableOpacity>

          <View style={styles.profilePicContainer}>
            <View style={styles.profilePic}>
              {profilePicUri && (
                <Image
                  source={{ uri: profilePicUri }}
                  style={styles.profilePicImage}
                  resizeMode="cover"
                />
              )}
            </View>
            <TouchableOpacity style={styles.editIcon} onPress={openPicOptions}>
              <Ionicons name="pencil" size={20} color="#E60023" />
            </TouchableOpacity>
          </View>

          <Text style={[styles.label, { color: isDarkMode ? '#fff' : '#000' }]}>Name</Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: isDarkMode ? '#2a2a2a' : '#fff',
                color: isDarkMode ? '#fff' : '#000',
                borderColor: isDarkMode ? '#444' : '#ccc',
              },
            ]}
            value={name}
            onChangeText={setName}
            placeholder="Enter name"
            placeholderTextColor={isDarkMode ? '#888' : '#aaa'}
          />

          <Text style={[styles.label, { color: isDarkMode ? '#fff' : '#000' }]}>Username</Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: isDarkMode ? '#2a2a2a' : '#fff',
                color: isDarkMode ? '#fff' : '#000',
                borderColor: isDarkMode ? '#444' : '#ccc',
              },
            ]}
            value={username}
            onChangeText={setUsername}
            placeholder="Enter username"
            placeholderTextColor={isDarkMode ? '#888' : '#aaa'}
          />

          <Text style={[styles.label, { color: isDarkMode ? '#fff' : '#000' }]}>Bio</Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: isDarkMode ? '#2a2a2a' : '#fff',
                color: isDarkMode ? '#fff' : '#000',
                borderColor: isDarkMode ? '#444' : '#ccc',
              },
            ]}
            value={bio}
            onChangeText={setBio}
            placeholder="Enter bio"
            placeholderTextColor={isDarkMode ? '#888' : '#aaa'}
          />

          <View style={styles.switchContainer}>
            <Text style={[styles.label, { color: isDarkMode ? '#fff' : '#000' }]}>Show all pins</Text>
            <Switch value={showPins} onValueChange={setShowPins} />
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {picOptionsVisible && (
        <View style={StyleSheet.absoluteFill}>
          <TouchableWithoutFeedback onPress={closePicOptions}>
            <View style={styles.dimBackground} />
          </TouchableWithoutFeedback>
          <Animated.View
            style={[
              styles.picOptionsContainer,
              {
                transform: [{ translateY: slideUp }],
                backgroundColor: isDarkMode ? '#2a2a2a' : '#fff',
              },
            ]}
          >
            <TouchableOpacity onPress={takePhotoWithCamera} style={styles.picOptionButton}>
              <Text style={[styles.picOptionText, { color: isDarkMode ? '#fff' : '#000' }]}>Take a photo</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={pickImageFromGallery} style={styles.picOptionButton}>
              <Text style={[styles.picOptionText, { color: isDarkMode ? '#fff' : '#000' }]}>
                Pick from camera roll
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={closePicOptions} style={styles.picOptionButton}>
              <Text style={[styles.picOptionText, { color: 'red' }]}>Close</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  // ... your original styles remain unchanged ...
  overlay: {
    flex: 1,
    backgroundColor: '#00000066',
  },
  container: {
    justifyContent: 'flex-end',
    flex: 1,
  },
  modalContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
  },
  exitButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  profilePicContainer: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePicImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editIcon: {
    position: 'absolute',
    right: -5,
    bottom: -5,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 5,
    elevation: 5,
  },
  dimBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#00000088',
  },
  picOptionsContainer: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingBottom: 20,
    paddingTop: 10,
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  picOptionButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  picOptionText: {
    fontSize: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  saveButton: {
    backgroundColor: '#E60023',
    marginTop: 20,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default EditProfileModal;
