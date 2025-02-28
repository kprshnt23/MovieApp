import React, {useState} from 'react';
import {View} from 'react-native';
import {Header, SearchBar, Categories} from '../components';

const Home: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(1);
  return (
    <View style={{flex: 1}}>
      <Header />
      <SearchBar onChangeText={() => {}} value="" />
      <View style={{flex: 1}}>
        <Categories
          activeIndex={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </View>
    </View>
  );
};

export default Home;
