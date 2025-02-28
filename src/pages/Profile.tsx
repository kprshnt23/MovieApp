import React from 'react';
import {Text, View} from 'react-native';
import {Header} from '../components';

const Profile: React.FC = () => {
  return (
    <View style={{flex: 1}}>
      <Header />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 18, fontWeight: '500'}}>
          Profile setting screen
        </Text>
      </View>
    </View>
  );
};

export default Profile;
