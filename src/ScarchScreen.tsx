import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  StyleSheet, 
  Text, 
  FlatList, 
  Image, 
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
const initialRecentSearches = [
  { id: '1', username: 'travel_enthusiast', name: 'Travel' },
  { id: '2', username: 'food_lover', name: 'Food' },
  { id: '3', username: 'fashion_icon', name: 'Fashion' },
  { id: '4', username: 'nature_photography', name: 'Nature' },
  { id: '5', username: 'fitness_guru', name: 'Fitness' },
];

const suggestedAccounts = [
  { id: 's1', username: 'photography_world', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { id: 's2', username: 'art_lover', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { id: 's3', username: 'travel_diaries', avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
];
type FollowMap = { [key: string]: boolean };

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('top');
  const [followingMap, setFollowingMap] = useState<FollowMap>({});
  const [recentSearches, setRecentSearches] = useState(initialRecentSearches);
  const toggleFollow = (userId: string) => {
    setFollowingMap((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };
  const removeRecentSearch = (userId: string) => {
    setRecentSearches((prev) => prev.filter(user => user.id !== userId));
  };

  const renderSearchResults = () => {
    if (query.length === 0) {
      return (
        <ScrollView style={styles.flex}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent</Text>
            {recentSearches.map((item) => (
              <TouchableOpacity key={item.id} style={styles.userRow}>
                <View style={styles.avatarPlaceholder} />
                <View style={styles.userInfo}>
                  <Text style={styles.username}>{item.username}</Text>
                  <Text style={styles.name}>{item.name}</Text>
                </View>
                <TouchableOpacity onPress={() => removeRecentSearch(item.id)}>
                  <Ionicons name="close" size={20} color="#888" />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Suggested</Text>
            {suggestedAccounts.map((item) => (
              <TouchableOpacity key={item.id} style={styles.userRow}>
                <Image source={{ uri: item.avatar }} style={styles.avatar} />
                <View style={styles.userInfo}>
                  <Text style={styles.username}>{item.username}</Text>
                  <Text style={styles.name}>Suggested for you</Text>
                </View>
                <TouchableOpacity
                  style={styles.followButton}
                  onPress={() => toggleFollow(item.id)} 
                >
                  <Text style={styles.followButtonText}>
                    {followingMap[item.id] ? 'Following' : 'Follow'}
                  </Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      );
    }

    return (
      <View style={styles.flex}>
        <View style={styles.tabHeader}>
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'top' && styles.activeTab]}
            onPress={() => setActiveTab('top')}
          >
            <Text style={[styles.tabText, activeTab === 'top' && styles.activeTabText]}>Top</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'accounts' && styles.activeTab]}
            onPress={() => setActiveTab('accounts')}
          >
            <Text style={[styles.tabText, activeTab === 'accounts' && styles.activeTabText]}>Accounts</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'tags' && styles.activeTab]}
            onPress={() => setActiveTab('tags')}
          >
            <Text style={[styles.tabText, activeTab === 'tags' && styles.activeTabText]}>Tags</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'places' && styles.activeTab]}
            onPress={() => setActiveTab('places')}
          >
            <Text style={[styles.tabText, activeTab === 'places' && styles.activeTabText]}>Places</Text>
          </TouchableOpacity>
        </View>
        {(activeTab === 'accounts' || activeTab === 'places') && (
          <View style={[styles.flex, styles.center]}>
            <Text style={{ color: '#888' }}>No content available.</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#8e8e8e"
          value={query}
          onChangeText={setQuery}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TouchableOpacity onPress={() => setQuery('')}>
          <Text style={styles.cancelButton}>Cancel</Text>
        </TouchableOpacity>
      </View>

      {renderSearchResults()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flex: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd',
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#efefef',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 16,
  },
  cancelButton: {
    marginLeft: 15,
    color: '#262626',
    fontSize: 16,
  },
  section: {
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd',
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingHorizontal: 15,
    paddingVertical: 5,
    color: '#262626',
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ddd',
    marginRight: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#262626',
  },
  name: {
    fontSize: 14,
    color: '#8e8e8e',
  },
  followButton: {
    backgroundColor: '#0095f6',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 4,
  },
  followButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  tabHeader: {
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 15,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#262626',
  },
  tabText: {
    color: '#8e8e8e',
    fontWeight: 'bold',
  },
  activeTabText: {
    color: '#262626',
  },
  gridItem: {
    flex: 1 / 3,
    aspectRatio: 1,
  },
  gridImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 5,
    left: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 3,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  likesText: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 3,
  },
  tagItem: {
    backgroundColor: '#efefef',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  tagText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#262626',
  },
});

export default SearchScreen;
