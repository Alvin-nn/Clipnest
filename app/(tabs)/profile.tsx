import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useThemeContext } from '../../theme/themecontext'; //  FIXED PATH
import EditProfileModal from '../modals/EditProfileModal';

export default function ProfileScreen() {
  const [isModalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const { isDarkMode } = useThemeContext(); //  Use theme context

  const [name, setName] = useState('Alvin');
  const [username, setUsername] = useState('alvinnn');
  const [bio, setBio] = useState('Basketball, Fragrance, Cars');

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const openSettings = () => {
    router.push('/settings');
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={{ backgroundColor: isDarkMode ? '#181D1C' : '#F3FAF8' }} // updated
    >
      <View style={styles.topBar}>
        <TouchableOpacity onPress={openSettings}>
          <Ionicons name="settings-outline" size={28} color={isDarkMode ? 'white' : 'black'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert('Share profile tapped')}>
          <Ionicons name="share-social-outline" size={28} color={isDarkMode ? 'white' : 'black'} />
        </TouchableOpacity>
      </View>
      <View style={styles.topSection}>
        <View style={[styles.profilePic, { backgroundColor: isDarkMode ? '#333' : '#ccc' }]} />
        <Text style={[styles.name, { color: isDarkMode ? '#fff' : '#000' }]}>{name}</Text>
        <Text style={[styles.username, { color: isDarkMode ? '#aaa' : '#888' }]}>@{username}</Text>
        <View className={styles.stats}>
          <View style={styles.stat}>
            <Text style={[styles.statNumber, { color: isDarkMode ? '#fff' : '#000' }]}>0</Text>
            <Text style={[styles.statLabel, { color: isDarkMode ? '#aaa' : '#666' }]}>Followers</Text>
          </View>
          <View style={styles.stat}>
            <Text style={[styles.statNumber, { color: isDarkMode ? '#fff' : '#000' }]}>0</Text>
            <Text style={[styles.statLabel, { color: isDarkMode ? '#aaa' : '#666' }]}>Following</Text>
          </View>
        </View>
        <Text style={[styles.bio, { color: isDarkMode ? '#ccc' : '#555' }]}>{bio}</Text>

        <TouchableOpacity
          style={[
            styles.editButton,
            { backgroundColor: isDarkMode ? '#444' : '#ddd' },
          ]}
          onPress={openModal}
        >
          <Text
            style={[
              styles.editButtonText,
              { color: isDarkMode ? '#fff' : '#000' },
            ]}
          >
            Edit profile
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.noPinsContainer}>
        <Text style={[styles.noPinsText, { color: isDarkMode ? '#888' : '#aaa' }]}>
          No pins here yet
        </Text>
      </View>

      <EditProfileModal
        visible={isModalVisible}
        onClose={closeModal}
        currentName={name}
        currentUsername={username}
        currentBio={bio}
        onSave={(newName, newUsername, newBio) => {
          setName(newName);
          setUsername(newUsername);
          setBio(newBio);
          closeModal();
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
    paddingBottom: 30,
    justifyContent: 'flex-start',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  topSection: {
    alignItems: 'center',
  },
  profilePic: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  username: {
    marginTop: 2,
    fontSize: 16,
  },
  stats: {
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 10,
  },
  stat: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  statNumber: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  statLabel: {},
  bio: {
    marginTop: 5,
    fontSize: 14,
    textAlign: 'center',
  },
  editButton: {
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  noPinsContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  noPinsText: {
    fontSize: 16,
  },
});
