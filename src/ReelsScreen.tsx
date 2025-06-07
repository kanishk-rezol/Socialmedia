import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  SafeAreaView,
  Modal,
  TextInput,
} from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

type ReelItemType = {
  id: string;
  username: string;
  description: string;
  likes: number;
  comments: number;
  videoUri: string;
  userAvatar: string;
};

const reelsData: ReelItemType[] = Array(10).fill(0).map((_, i) => ({
  id: i.toString(),
  username: `user${i + 1}`,
  description: `This is reel #${i + 1} showing amazing content! ${'🔥'.repeat(i % 5)}`,
  likes: Math.floor(Math.random() * 10000) + 1000,
  comments: Math.floor(Math.random() * 500) + 50,
  videoUri: `http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4`,
  userAvatar: `https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${i + 10}.jpg`,
}));

const ReelItem = ({ item }: { item: ReelItemType }) => {
  const videoRef = useRef<Video | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState('');

  const togglePlay = async () => {
    setIsPlaying(!isPlaying);
    if (videoRef.current) {
      if (isPlaying) {
        await videoRef.current.pauseAsync();
      } else {
        await videoRef.current.playAsync();
      }
    }
  };

  const toggleMute = async () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      await videoRef.current.setIsMutedAsync(!isMuted);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={togglePlay}>
      <View style={styles.reelItem}>
        <Video
          ref={videoRef}
          source={{ uri: item.videoUri }}
          style={styles.video}
          resizeMode={ResizeMode.COVER}
          shouldPlay
          isLooping
          isMuted={isMuted}
        />

        <SafeAreaView style={styles.overlay}>
          <View style={styles.leftColumn}>
            <View style={styles.userInfo}>
              <Image source={{ uri: item.userAvatar }} style={styles.avatar} />
              <Text style={styles.username}>@{item.username}</Text>
              <TouchableOpacity
                style={[
                  styles.followButton,
                  isFollowing && styles.followingButton,
                ]}
                onPress={() => setIsFollowing(!isFollowing)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.followButtonText,
                    isFollowing && { color: '#FF00AF' },
                  ]}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.description} numberOfLines={2}>
              {item.description}
            </Text>

            <View style={styles.musicContainer}>
              <Ionicons name="musical-note" size={16} color="white" />
              <Text style={styles.musicText}>Original Sound</Text>
            </View>
          </View>

          <View style={styles.rightColumn}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => setIsLiked(!isLiked)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={isLiked ? 'heart' : 'heart-outline'}
                size={32}
                color={isLiked ? 'red' : 'white'}
              />
              <Text style={styles.actionText}>
                {isLiked ? item.likes + 1 : item.likes}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => setShowComments(true)}
              activeOpacity={0.7}
            >
              <Ionicons name="chatbubble-outline" size={28} color="white" />
              <Text style={styles.actionText}>{item.comments}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
              <MaterialIcons name="send" size={28} color="white" />
              <Text style={styles.actionText}>Share</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => setIsSaved(!isSaved)}
              activeOpacity={0.7}
            >
              <FontAwesome
                name={isSaved ? 'bookmark' : 'bookmark-o'}
                size={28}
                color={isSaved ? '#0095f6' : 'white'}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={toggleMute}
              activeOpacity={0.7}
            >
              <Ionicons
                name={isMuted ? 'volume-mute' : 'volume-high'}
                size={28}
                color="white"
              />
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        {/* Comments Modal */}
        <Modal
          visible={showComments}
          animationType="slide"
          transparent={false}
          onRequestClose={() => setShowComments(false)}
        >
          <View style={styles.commentsContainer}>
            <View style={styles.commentsHeader}>
              <Text style={styles.commentsTitle}>Comments</Text>
              <TouchableOpacity
                onPress={() => setShowComments(false)}
                activeOpacity={0.7}
              >
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>

            <View style={styles.commentsList}>
              <Text style={styles.noCommentsText}>No comments yet</Text>
            </View>

            <View style={styles.commentInputContainer}>
              <TextInput
                style={styles.commentInput}
                placeholder="Add a comment..."
                value={comment}
                onChangeText={setComment}
              />
              <TouchableOpacity
                style={styles.commentSubmitButton}
                onPress={() => {
                  setComment('');
                  setShowComments(false);
                }}
                activeOpacity={0.7}
              >
                <Text style={styles.commentSubmitText}>Post</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
};

const ReelsScreen = () => {
  return (
    <FlatList
      data={reelsData}
      keyExtractor={(item) => item.id}
      pagingEnabled
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <ReelItem item={item} />}
    />
  );
};

const styles = StyleSheet.create({
  reelItem: {
    height: height,
    position: 'relative',
  },
  video: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    zIndex: 2,
  },
  leftColumn: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 80,
  },
  rightColumn: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 80,
    zIndex: 3,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'white',
  },
  username: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 8,
    
  },
  followButton: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginLeft: 8,
  },
  followingButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderColor: '#FF00AF',
    borderWidth: 1,
  },
  followButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  description: {
    color: 'white',
    fontSize: 14,
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  musicContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  musicText: {
    color: 'white',
    fontSize: 12,
    marginLeft: 4,
  },
  actionButton: {
    alignItems: 'center',
    marginBottom: 24,
  },
  actionText: {
    color: 'white',
    fontSize: 12,
    marginTop: 4,
  },
  commentsContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 40,
  },
  commentsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  commentsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  commentsList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noCommentsText: {
    color: '#888',
    fontSize: 16,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  commentSubmitButton: {
    backgroundColor: '#FF00AF',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  commentSubmitText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ReelsScreen;
