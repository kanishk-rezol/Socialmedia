import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import StoryBar from './home/story'; 
import Post from './home/post'

const Header = () => {
  return (
    <View>
      <View style={styles.header}>
        <Image
          source={require('../assets/img-2.jpeg')}
          style={styles.image}
          resizeMode="cover"
        />
        <Image
          source={require('../assets/img-1.png')}
          style={styles.image_1}
          resizeMode="contain"
        />
      </View>
      <StoryBar />
      <Post/>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    height: 90,
    backgroundColor: '#FF00AF',
  },
  image_1: {
    marginTop: 20,
    width: 100,
    height: 100,
  },
  image: {
    marginTop: 20,
    width: 20,
    height: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
});

export default Header;
