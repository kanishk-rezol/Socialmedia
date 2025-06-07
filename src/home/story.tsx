import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  Modal,
  Pressable,
  Dimensions,
  GestureResponderEvent,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

type Story = {
  id: string;
  name: string;
  profilePhoto: { uri: string };
  images: { uri: string }[];
};

const storiesData: Story[] = [
  {
    id: '1',
    name: 'Dormammu',
    profilePhoto: require('./photos/profile/profile1.png'),
    images: [
      { uri: 'https://picsum.photos/500/800?random=1' },
      { uri: 'https://picsum.photos/500/800?random=2' },
      { uri: 'https://picsum.photos/500/800?random=3' },
    ],
  },
  {
    id: '2',
    name: 'Singam-Ravi',
    profilePhoto: require('./photos/profile/profile2.jpeg'),
    images: [{ uri: 'https://picsum.photos/500/800?random=4' }],
  },
  {
    id: '3',
    name: 'Retro-pandya',
    profilePhoto: require('./photos/profile/profile3.jpeg'),
    images: [{ uri: 'https://picsum.photos/500/800?random=5' }],
  },
  {
    id: '4',
    name: 'Ghajini',
    profilePhoto: require('./photos/profile/profile4.jpeg'),
    images: [{ uri: 'https://picsum.photos/500/800?random=6' }],
  },
  {
    id: '5',
    name: 'Strange',
    profilePhoto: require('./photos/profile/profile6.jpeg'),
    images: [{ uri: 'https://picsum.photos/500/800?random=7' }],
  },
];

const AUTO_ADVANCE_MS = 5000; 

const StoryBar = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [imageIndex, setImageIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const openStory = (story: Story) => {
    setSelectedStory(story);
    setImageIndex(0);
    setModalVisible(true);
  };

  const closeStory = () => {
    setModalVisible(false);
    setSelectedStory(null);
    setImageIndex(0);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const nextImage = () => {
    if (!selectedStory) return;
    if (imageIndex < selectedStory.images.length - 1) {
      setImageIndex((prev) => prev + 1);
    } else {
      closeStory();
    }
  };

  const prevImage = () => {
    if (!selectedStory) return;
    if (imageIndex > 0) {
      setImageIndex((prev) => prev - 1);
    }
  };

  const handleImagePress = (event: GestureResponderEvent) => {
    const { locationX } = event.nativeEvent;
    const screenMiddle = windowWidth / 2;

    if (locationX < screenMiddle) {
      prevImage();
    } else {
      nextImage();
    }
  };

  useEffect(() => {
    if (modalVisible && selectedStory) {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        nextImage();
      }, AUTO_ADVANCE_MS);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [modalVisible, selectedStory, imageIndex]);

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        {storiesData.map((story) => (
          <TouchableOpacity key={story.id} onPress={() => openStory(story)} style={styles.storyItem}>
            <View style={styles.profilePhotoWrapper}>
              <Image source={story.profilePhoto} style={styles.profilePhoto} />
            </View>
            <Text style={styles.storyName}>{story.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={closeStory}>
        <View style={styles.modalContainer}>
          <Pressable style={styles.modalBackground} onPress={closeStory} />

          {selectedStory && (
            <View style={styles.storyContent}>
              <View style={styles.topBar}>
                <Image source={selectedStory.profilePhoto} style={styles.modalProfilePhoto} />
                <Text style={styles.modalUserName}>{selectedStory.name}</Text>
              </View>

              <View style={styles.progressBarContainer}>
                {selectedStory.images.map((_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.progressBar,
                      {
                        backgroundColor: index <= imageIndex ? '#fff' : 'rgba(255,255,255,0.4)',
                        marginRight: index < selectedStory.images.length - 1 ? 4 : 0,
                      },
                    ]}
                  />
                ))}
              </View>

              <Pressable style={styles.storyImageContainer} onPress={handleImagePress}>
                <Image
                  source={selectedStory.images[imageIndex]}
                  style={styles.storyFullImage}
                  resizeMode="contain"
                />
              </Pressable>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    marginBottom:0,
    // borderBottomWidth: 1,
    // borderBottomColor: '#e0e0e0',
  },
  scrollContainer: {
    paddingHorizontal: 8,
  },
  storyItem: {
    marginHorizontal: 8,
    alignItems: 'center',
  },
  profilePhotoWrapper: {
    width: 70,
    height: 75,
    borderRadius: 26,
    borderWidth: 3,
    borderColor: '#FF00AF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    backgroundColor: '#fff',
  },
  profilePhoto: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  storyName: {
    marginTop: 6,
    fontSize: 12,
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
    opacity: 0.9,
  },
  storyContent: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: '#000',
  },
  topBar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    position: 'absolute',
    top: 40,
    zIndex: 1,
  },
  progressBarContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 10,
    position: 'absolute',
    top: 40,
    zIndex: 1,
  },
  progressBar: {
    height: 3,
    borderRadius: 3,
    flex: 1,
  },
  modalProfilePhoto: {
    width: 36,
    height: 36,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ff8501',
  },
  modalUserName: {
    marginLeft: 12,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
  },
  storyImageContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  storyFullImage: {
    width: '100%',
    height: '100%',
  },
});

export default StoryBar;
