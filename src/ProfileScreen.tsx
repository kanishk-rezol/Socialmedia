import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native';
const profileImages = [
  'https://randomuser.me/api/portraits/women/44.jpg',
  'https://randomuser.me/api/portraits/men/32.jpg',
  'https://i.pravatar.cc/300?img=12',
  'https://i.pravatar.cc/300?img=25',
  'https://i.pravatar.cc/300?img=37'
];

const username = 'Random_user';
const bio = 'Welcome to my profile! #ReactNative #Computer Science #New App \n📍 Goa, IN\n🌍 example.com';
const stats = {
  posts: 0,
  followers: '12.5M',
  following: 843,
};
const posts = Array(12).fill(0).map((_, i) => ({
  id: i.toString(),
  image: `https://source.unsplash.com/random/300x300/?${['nature', 'city', 'food', 'travel', 'art', 'fashion', 'animal', 'portrait'][i % 8]}`,
}));

const highlights = [
  { id: '1', title: 'Travel', image: 'https://source.unsplash.com/random/200x200/?travel' },
  { id: '2', title: 'Food', image: 'https://source.unsplash.com/random/200x200/?food' },
  { id: '3', title: 'Work', image: 'https://source.unsplash.com/random/200x200/?office' },
  { id: '4', title: 'Fun', image: 'https://source.unsplash.com/random/200x200/?party' },
  { id: '5', title: 'Pets', image: 'https://source.unsplash.com/random/200x200/?pet' },
  { id: '6', title: 'Fitness', image: 'https://source.unsplash.com/random/200x200/?gym' },
  { id: '7', title: 'Music', image: 'https://source.unsplash.com/random/200x200/?concert' },
];

const { width } = Dimensions.get('window');
const POST_SIZE = width / 3;
const HIGHLIGHT_SIZE = 80;
const randomProfileImage = profileImages[Math.floor(Math.random() * profileImages.length)];
const ProfileScreen = () => {
  const [activeTab, setActiveTab] = useState('posts');
  const renderPostItem = ({ item }: { item: typeof posts[0] }) => (
    <TouchableOpacity>
      <Image source={{ uri: item.image }} style={styles.postImage} />
    </TouchableOpacity>
  );
  const renderHighlightItem = ({ item }: { item: typeof highlights[0] }) => (
    <TouchableOpacity style={styles.highlightItem}>
      <View style={styles.highlightCircle}>
        <Image source={{ uri: item.image }} style={styles.highlightImage} />
      </View>
      <Text style={styles.highlightText}>{item.title}</Text>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerUsername}>{username}</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Text style={styles.headerIcon}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.headerIcon}>⋮</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.profileInfo}>
        <View style={styles.profileTop}>
          <View style={styles.profilePicContainer}>
            <Image source={{ uri: randomProfileImage }} style={styles.profilePic} />
          </View>
          <View style={styles.statsContainer}>
            <StatItem value={stats.posts} label="Posts" />
            <StatItem value={stats.followers} label="Followers" />
            <StatItem value={stats.following} label="Following" />
          </View>
        </View>

        <View style={styles.bioContainer}>
          <Text style={styles.name}>{username}</Text>
          <Text style={styles.bio}>{bio}</Text>
        </View>

        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal
        data={highlights}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.highlightsContainer}
        renderItem={renderHighlightItem}
      />
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'posts' && styles.activeTab]}
          onPress={() => setActiveTab('posts')}
        >
          <Text style={[styles.tabText, activeTab === 'posts' && styles.activeTabText]}>Posts</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'saved' && styles.activeTab]}
          onPress={() => setActiveTab('saved')}
        >
          <Text style={[styles.tabText, activeTab === 'saved' && styles.activeTabText]}>Saved</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'tagged' && styles.activeTab]}
          onPress={() => setActiveTab('tagged')}
        >
          <Text style={[styles.tabText, activeTab === 'tagged' && styles.activeTabText]}>Tagged</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        renderItem={renderPostItem}
      />
    </View>
  );
};

const StatItem = ({ value, label }: { value: string | number; label: string }) => (
  <View style={styles.statItem}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    marginTop:25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerUsername: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 20,
  },
  headerIcon: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileInfo: {
    padding: 15,
  },
  profileTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  profilePicContainer: {
    borderWidth: 2,
    borderColor: '#FF00AF',
    borderRadius: 50,
    padding: 2,
  },
  profilePic: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  bioContainer: {
    marginBottom: 15,
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  bio: {
    lineHeight: 20,
  },
  editButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingVertical: 5,
    alignItems: 'center',
  },
  editButtonText: {
    fontWeight: 'bold',
  },
  highlightsContainer: {
    paddingLeft: 15,
    paddingBottom: 15,
    // borderBottomWidth: 1,
    // borderBottomColor: '#eee',
  },
  highlightItem: {
    marginRight: 15,
    alignItems: 'center',
  },
  highlightCircle: {
    width: HIGHLIGHT_SIZE,
    height: HIGHLIGHT_SIZE,
    borderRadius: HIGHLIGHT_SIZE / 2,
    borderWidth: 2,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  highlightImage: {
    width: HIGHLIGHT_SIZE - 4,
    height: HIGHLIGHT_SIZE - 4,
    borderRadius: (HIGHLIGHT_SIZE - 4) / 2,
    
  },
  highlightText: {
    marginTop: 5,
    fontSize: 12,
    marginBottom:30
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 15,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  tabText: {
    fontWeight: '600',
    color: '#666',
  },
  activeTabText: {
    color: '#000',
  },
  postImage: {
    width: POST_SIZE,
    height: POST_SIZE,
    borderWidth: 0.5,
    borderColor: '#fff',
  },
});

export default ProfileScreen;