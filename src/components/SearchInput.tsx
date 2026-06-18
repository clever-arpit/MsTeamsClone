import React from 'react';
import {
  Image,
  Pressable,
  StyleProp,
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import Config from 'react-native-config';
import Icons from '../utils/Icons';
import CustomIcon from './CustomIcon';
import { COLORS } from '../styles';

interface SearchInputProps {
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  onSubmitEditing?: () => void;
  onFocus?: () => void;
  onClear?: () => void;
  style?: StyleProp<ViewStyle>;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChangeText,
  placeholder = 'Search',
  onSubmitEditing,
  onFocus,
  onClear,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Image source={Icons.searchIcon} style={styles.searchIcon} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        onFocus={onFocus}
        placeholder={placeholder}
        placeholderTextColor={COLORS.TEXT_TERTIARY}
        returnKeyType="search"
        style={styles.input}
      />
      {value ? (
        <Pressable
          onPress={onClear ?? (() => onChangeText(''))}
          hitSlop={10}
          style={styles.clearButton}
        >
          <CustomIcon icon={Icons.closeIcon} color={COLORS.TEXT_SECONDARY} size={14} />
        </Pressable>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#202020',
    borderColor: '#2E2E2E',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    minHeight: 42,
    paddingHorizontal: 12,
  },
  searchIcon: {
    height: 17,
    tintColor: '#9B9B9B',
    width: 17,
  },
  input: {
    color: '#F4F4F4',
    flex: 1,
    fontFamily: Config.FONT_FAMILY,
    fontSize: 15,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  clearButton: {
    alignItems: 'center',
    height: 26,
    justifyContent: 'center',
    width: 26,
  },
});

export default SearchInput;
