import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  ViewStyle,
  StyleProp,
  TextStyle,
} from 'react-native';
import Config from 'react-native-config';
import { Dropdown } from 'react-native-element-dropdown';
import {
  TypeMenu,
  CommNumber,
  OptionMenu,
  GroupMember,
  BusinessGroup,
} from '../types/DataType';
import Icons from '../utils/Icons';
import CustomText from './CustomText';
import { useTheme } from '../hooks/ThemeContext';
import UserAvatar from './UserAvatar';

interface CustomSelectProps {
  menu:
  | OptionMenu[]
  | TypeMenu[]
  | BusinessGroup[]
  | CommNumber[]
  | GroupMember[];
  value?: string | number;
  label?: string;
  fontSize?: TextStyle['fontSize'];
  placeholder?: string;
  setValue?: (value: string | number) => void;
  setItem?: (item: any) => void;
  customStyle?: StyleProp<ViewStyle>;
  dropdownWrapperStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  error?: string;
  required?: boolean;
  searchMode?: boolean;
  searchPlaceholder?: string;
  itemBackgroundColor?: string;
  showCount?: boolean;
  selectedTextStyle?: StyleProp<TextStyle>;
}

const CustomSelectElement: React.FC<CustomSelectProps> = ({
  menu,
  value = '',
  label = '',
  placeholder = 'Select',
  fontSize = 14,
  setValue,
  setItem,
  customStyle,
  dropdownWrapperStyle,
  disabled = false,
  error,
  searchMode = false,
  searchPlaceholder = 'Search here',
  required = false,
  itemBackgroundColor,
  showCount = false,
  selectedTextStyle
}) => {

  const { colors } = useTheme();
  const renderItem = (item: {
    value: string;
    label: string;
    image?: { thumbnail_path?: string };
    session_unread_count?: number;
  }) => {
    console.log("value--->", value, item.value)
    const count = item?.session_unread_count && item?.session_unread_count > 0 ? item?.session_unread_count : 0;
    return (
      <View
        style={[
          styles.ListItem,
          {
            backgroundColor:
              itemBackgroundColor ?? value == item.value ? colors.background : colors.dropdown_item_background,
            borderWidth: value == item.value ? 1 : 0,
            borderColor: value == item.value ? colors.border_color : "transparent"
          },
        ]}
      >
        {item?.image?.thumbnail_path && (
          <UserAvatar uri={item?.image?.thumbnail_path} size={30} />
        )}
        <CustomText
          text={item.label}
          color={colors?.text}
          fontSize={fontSize}
          customStyle={value == item.value && selectedTextStyle}
        />
        {showCount && count > 0 &&
          <View style={{ backgroundColor: colors.red, paddingHorizontal: 5, borderRadius: 20 }}>
            <CustomText
              text={`${count ?? 0}`}
              color={colors?.background}
              fontSize={fontSize}
            />
          </View>
        }
      </View>
    );
  };
  return (
    <View style={[styles.dropdownWrapper, dropdownWrapperStyle]}>
      {(required || label) && (
        <View style={{ flexDirection: 'row' }}>
          {label && <CustomText text={label} color={colors.label_text} />}
          {required && <CustomText text=" *" color={colors.red} />}
        </View>
      )}

      <Dropdown
        search={searchMode}
        searchPlaceholder={searchPlaceholder}
        inputSearchStyle={{
          borderRadius: 8,
          borderColor: colors.border_color,
          backgroundColor: colors.searchbar_background,
          fontSize,
        }}
        fontFamily={Config.FONT_FAMILY}
        disable={disabled}
        style={[
          styles.dropdown,
          customStyle,
          {
            backgroundColor: colors.item_background,
            borderColor: colors?.item_border_color,
          },
        ]}
        containerStyle={[
          styles.containerStyle,
          {
            backgroundColor: colors.dropdown_item_background,
            borderColor: colors.item_border_color,
          },
        ]}
        autoScroll={false}
        placeholderStyle={[
          styles.textStyle,
          {
            color: colors?.light_text,
            fontSize,
          },
        ]}
        selectedTextStyle={[
          styles.textStyle,
          { color: colors?.text, fontSize },
        ]}
        renderRightIcon={() => {
          if (disabled) {
            return null;
          }
          return (
            <Image
              source={Icons.dropdownIcon}
              style={[
                styles.iconStyle,
                { tintColor: disabled ? colors?.white : colors?.icon_color },
              ]}
            />
          );
        }}
        data={menu}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={value}
        onChange={item => {
          setValue && setValue(item?.value);
          setItem && setItem(item);
        }}
        keyboardAvoiding={false}
        renderItem={renderItem}
        activeColor={colors.dropdown_item_background}
        itemContainerStyle={{ borderRadius: 8 }}
      />

      {error && (
        <CustomText text={error} fontSize={12} color={colors?.dark_red} />
      )}
    </View>
  );
};

export default CustomSelectElement;

const styles = StyleSheet.create({
  dropdownWrapper: {
    gap: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  dropdown: {
    height: 45,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
  },
  containerStyle: {
    borderRadius: 8,
    borderWidth: 1,
  },
  textStyle: {
    fontSize: 14,
    fontFamily: Config.FONT_FAMILY,
  },
  iconStyle: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
  },
  ListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    gap: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
});
