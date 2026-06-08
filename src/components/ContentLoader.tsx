import React from 'react';
import { FlatList } from 'react-native';
import SkeletonLoader from './SkeletonLoader';

const ContentLoader = ({ scrollEnabled = true }) => {
  return (
    <FlatList
      data={Array.from({ length: 15 }, (_, index) => index + 1)}
      showsVerticalScrollIndicator={false}
      renderItem={() => <SkeletonLoader />}
      scrollEnabled={scrollEnabled}
    />
  );
};

export default ContentLoader;
