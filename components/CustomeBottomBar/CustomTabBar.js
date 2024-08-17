import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

function CustomTabBar() {
  return (
    <View style={styles.container}>
      <Icon name="home" size={24} color="tomato" style={styles.icon} />
      <Icon name="search" size={24} color="gray" style={styles.icon} />
      <View style={styles.plusButtonContainer}>
        <View style={styles.plusButton}>
          <Icon name="add" size={35} color="white" />
        </View>
      </View>
      <Icon name="settings" size={24} color="gray" style={styles.icon} />
      <Icon name="chat" size={24} color="gray" style={styles.icon} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: 60,
    alignItems: 'center', // Aligns icons vertically centered
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingBottom: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
  plusButtonContainer: {
    position: 'relative', 
    bottom: 30, 
  },
  plusButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
});

export default CustomTabBar;
