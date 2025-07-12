import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function PostCreationModal({ visible, onClose }: Props) {
  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable style={styles.background} onPress={onClose} />

        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Start creating now</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <ScrollView>
            <TouchableOpacity style={styles.option}>
              <MaterialIcons name="image" size={24} color="#555" style={styles.icon} />
              <Text style={styles.optionText}>Pin</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.option}>
              <FontAwesome5 name="th-large" size={22} color="#555" style={styles.icon} />
              <Text style={styles.optionText}>Collage</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.option}>
              <Ionicons name="folder-outline" size={24} color="#555" style={styles.icon} />
              <Text style={styles.optionText}>Board</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    maxHeight: '60%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  icon: {
    marginRight: 14,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
});
