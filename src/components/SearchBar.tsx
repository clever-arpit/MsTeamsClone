import React, { useState } from 'react';
import {
  View,
  Image,
  Keyboard,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Config from 'react-native-config';
import Icons from '../utils/Icons';
import IconButton from './IconButton';
import CustomText from './CustomText';
import { useTheme } from '../hooks/ThemeContext';

const SearchBar: React.FC<{
  value: string;
  onChangeText: (text: string) => void;
  onSubmitEditing: () => void;
  onCancel?: () => void;
  onClear?: () => void;
  searchBarStyle?: any;
}> = ({
  value,
  onChangeText,
  onSubmitEditing,
  onCancel = () => {},
  onClear = () => {},
  searchBarStyle,
}) => {
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);

  const handleBlur = () => {
    if (!value) setIsFocused(false);
  };

  const handleCancel = () => {
    onClear();
    setIsFocused(false);
    onCancel();
    Keyboard.dismiss();
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.item_background,
          borderWidth: 1,
          borderColor: colors.item_border_color,
        },
        searchBarStyle,
      ]}
    >
      <Image
        source={Icons.searchIcon}
        style={[styles.searchIcon, { tintColor: colors.icon_color }]}
        resizeMode="contain"
      />
      <TextInput
        style={[styles.input, { color: colors.text }]}
        placeholder="Search"
        placeholderTextColor={colors.light_text}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        onFocus={handleFocus}
        onBlur={handleBlur}
        returnKeyType="search"
      />

      {value !== '' && (
        <IconButton
          onPress={onClear}
          icon={Icons.closeIcon}
          size={16}
          iconColor={colors.icon_color}
        />
      )}

      {(isFocused || value) && (
        <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
          <CustomText text="Cancel" color={colors.light_text} fontSize={14} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    height: 43,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 100,
    paddingHorizontal: 15,
  },
  searchIcon: {
    height: 19,
    width: 19,
  },
  input: {
    flex: 1,
    fontSize: 13,
    fontFamily: Config.FONT_FAMILY,
    marginLeft: 10,
    paddingVertical: 7,
  },
  cancelButton: {
    marginLeft: 10,
    padding: 5,
  },
});
