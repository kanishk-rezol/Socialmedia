import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import SearchScreen from './ScarchScreen';
import ReelsScreen from './ReelsScreen';
import ShopScreen from './ShopScreen';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get('window');

const TAB_BAR_HEIGHT = 80;  
const CURVE_HEIGHT = 30;    

const CustomTabBarBackground = () => (
  <View style={styles.svgContainer}>
    <Svg
      width={width}
      height={TAB_BAR_HEIGHT + CURVE_HEIGHT}
      viewBox={`0 ${-CURVE_HEIGHT} ${width} ${TAB_BAR_HEIGHT + CURVE_HEIGHT}`}
      fill="none"
    >
      <Path
        d={`
          M0 0
          C${width * 0.25} ${-CURVE_HEIGHT}, ${width * 0.75} ${-CURVE_HEIGHT}, ${width} 0
          L${width} ${TAB_BAR_HEIGHT}
          L0 ${TAB_BAR_HEIGHT}
          Z
        `}
        fill="#FF00AF"
      />
    </Svg>
  </View>
);

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarBackground: () => <CustomTabBarBackground />,
        tabBarStyle: {
          ...styles.tabBar,
          height: TAB_BAR_HEIGHT,
          paddingTop: CURVE_HEIGHT,
        },
        tabBarItemStyle: styles.tabBarItem,
        tabBarIconStyle: styles.tabBarIcon,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ size }) => (
            <Ionicons name="home" size={size} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ size }) => (
            <Ionicons name="search-outline" size={size} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Reels"
        component={ReelsScreen}
        options={{
          tabBarIcon: ({ size }) => (
            <MaterialCommunityIcons name="incognito" size={size} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Shop"
        component={ShopScreen}
        options={{
          tabBarIcon: ({ size }) => (
            <Ionicons name="phone-portrait-outline" size={size} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ size }) => (
            <Ionicons name="person-outline" size={size} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  svgContainer: {
    position: 'absolute',
    top: 0,
  },
  tabBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    elevation: 0,
  },
  tabBarItem: {
    marginTop: 0,
    marginBottom:10
  },
  tabBarIcon: {
    marginBottom: 5,
  },
});

export default BottomTabs;
