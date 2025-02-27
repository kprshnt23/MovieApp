import React from 'react';
import {Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NowPlaying, Popular, TopRated, Upcoming} from './src/pages';
import {NavigationContainer} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="NowPlaying"
          component={NowPlaying}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Popular"
          component={Popular}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="TopRated"
          component={TopRated}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Upcoming"
          component={Upcoming}
          options={{headerShown: false}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
