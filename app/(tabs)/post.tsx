import { useState } from 'react';
import { View } from 'react-native';
import PostCreationModal from '../modals/PostCreationModal';

export default function PostScreen() {
  const [modalVisible, setModalVisible] = useState(true);

  return (
    <View style={{ flex: 1 }}>
      <PostCreationModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}
