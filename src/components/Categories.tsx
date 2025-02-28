import React from 'react';
import {StyleSheet, Text, ScrollView, TouchableOpacity} from 'react-native';

type CategoriesProps = {
  activeIndex: number;
  onCategoryChange: (index: number) => void;
};

const Categories: React.FC<CategoriesProps> = ({
  activeIndex,
  onCategoryChange,
}) => {
  const categories = [
    {id: 1, title: 'Now Playing'},
    {id: 2, title: 'Popular'},
    {id: 3, title: 'Top Rated'},
    {id: 4, title: 'Upcoming'},
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}>
      {categories.map(category => (
        <TouchableOpacity
          key={category.id}
          style={{
            ...styles.primaryContainer,
            backgroundColor:
              activeIndex === category.id ? '#2196F3' : '#E5E7EB',
          }}
          onPress={() => onCategoryChange(category.id)}>
          <Text style={styles.primaryText}>{category.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    maxHeight: 60,
  },
  primaryContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  primaryText: {},
});

export default React.memo(Categories);
