import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { FontAwesome, Feather } from '@expo/vector-icons';

const { width: windowWidth } = Dimensions.get('window');

type Post = {
  id: string;
  userName: string;
  profilePhoto: { uri: string };
  date: string;
  postImage: { uri: string };
  commentCount: number;
  latestComment: string;
};

const postsData: Post[] = [
  {
    id: '1',
    userName: 'Dormammu',
    profilePhoto: require('./photos/profile/profile1.png'),
    date: 'June 5, 2025',
    postImage: { uri: 'https://picsum.photos/600/800?random=1' },
    commentCount: 12,
    latestComment: 'Looks amazing!',
  },
  {
    id: '2',
    userName: 'Singam-Ravi',
    profilePhoto: require('./photos/profile/profile5.png'),
    date: 'June 4, 2025',
    postImage: { uri: 'https://picsum.photos/600/800?random=2' },
    commentCount: 8,
    latestComment: 'Great view!',
  },
];

const PostItem = ({ post }: { post: Post }) => {
  const [liked, setLiked] = useState(false);
  const [following, setFollowing] = useState(false);  

  const toggleLike = () => setLiked(!liked);
  const toggleFollow = () => setFollowing(!following); 

  return (
    <View style={styles.postContainer}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <View>
            <Text style={styles.userName}>{post.userName}</Text>
            <Text style={styles.date}>{post.date}</Text>
          </View>
          <TouchableOpacity
            style={styles.followButton}
            onPress={toggleFollow} 
          >
            <Text style={styles.followButtonText}>
              {following ? 'Following' : 'Follow'}
            </Text>
          </TouchableOpacity>
        </View>
        <Image source={post.profilePhoto} style={styles.profilePhoto} />
      </View>
      <Image
        source={post.postImage}
        style={styles.postImage}
        resizeMode="cover"
      />
      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.iconButton}>
          <FontAwesome name="comment-o" size={22} color="#333" />
          <Text style={styles.commentCount}>{post.commentCount}</Text>
        </TouchableOpacity>

        <View style={styles.rightActions}>
          <TouchableOpacity onPress={toggleLike} style={styles.likeButton}>
            <FontAwesome
              name={liked ? "heart":"heart-o"}
              size={26}
              color={liked ? 'hotpink' : '#333'}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareButton}>
            <Feather name="send" size={22} color="#333" />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.commentText}>{post.latestComment}</Text>
    </View>
  );
};

const ListFooter = () => <View style={{ height: 100 }} />;

const Posts = () => {
  return (
    <FlatList
      data={postsData}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PostItem post={item} />}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={ListFooter}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    paddingBottom: 150,
  },
  postContainer: {
    paddingVertical: 14,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 14,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
  followButton: {
    backgroundColor: '#FF00AF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 10,
  },
  followButtonText: {
    color: '#fff',
    fontSize: 12,
  },
  profilePhoto: {
    width: 32,
    height: 32,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: '#FF00AF',
    marginRight: 14,
  },
  postImage: {
    width: windowWidth,
    height: 480,
    marginVertical: 10,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentCount: {
    fontSize: 13,
    marginLeft: 5,
    color: '#444',
  },
  shareButton: {
    marginLeft: 15,
  },
  likeButton: {},
  commentText: {
    marginTop: 6,
    fontSize: 14,
    color: '#333',
    paddingHorizontal: 14,
  },
});

export default Posts;
