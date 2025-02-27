import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const Header: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎥 TMDB 📸</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    backgroundColor: '#1E1E1E',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default React.memo(Header);
