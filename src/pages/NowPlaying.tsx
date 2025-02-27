import React from 'react';
import {Text, View} from 'react-native';
import {Header, SearchBar} from '../components';

const NowPlaying: React.FC = () => {
  return (
    <View style={{flex: 1}}>
      <Header />
      <SearchBar onChangeText={() => {}} value={''} />
      <Text>Now Playing</Text>
    </View>
  );
};

export default NowPlaying;
