import ContentLoader, { Rect, Circle } from 'react-content-loader/native';
import { useTheme } from '../hooks/ThemeContext';

const SkeletonLoader = () => {
  const { colors } = useTheme();
  return (
    <ContentLoader
      speed={2}
      width="100%"
      height={70}
      viewBox="0 0 476 70"
      animate
      backgroundColor={colors.skeleton_background}
      foregroundColor={colors.skeleton_foreground}
    >
      <Rect x="80" y="10" rx="6" ry="6" width="75%" height="10" />
      <Rect x="80" y="32" rx="6" ry="6" width="55%" height="9" />
      <Circle cx="32" cy="32" r="32" />
    </ContentLoader>
  );
};

export default SkeletonLoader;
