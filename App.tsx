import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomTabBar from './components/CustomeBottomBar/CustomTabBar';

function App() {
  return (
    <View style={styles.container}>
      {/* Your main app content goes here */}
      <View style={styles.content}>
        {/* App screens would be rendered here */}
      </View>
      <CustomTabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
});

export default App;