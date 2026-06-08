import React, { useMemo, useState } from 'react';
import { View, TextInput, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../hooks/ThemeContext';
import CustomText from './CustomText';
import CountryPicker from './CountryPicker';
import { Country } from '../types/DataType';

type Props = {
  defaultCode?: string;
  value?: string;
  placeholder?: string;
  onChangeCountry?: (code: string) => void;
  onChangeFormattedText?: (formatted: string) => void;
  onChangeText?: (text: string) => void;
  label?: string;
  autoFocus?: boolean;
  customStyle?: ViewStyle;
};

const PhoneTextInput: React.FC<Props> = ({
  defaultCode = '',
  value = '',
  placeholder = 'Type Here...',
  onChangeCountry,
  onChangeFormattedText,
  onChangeText,
  label = '',
  autoFocus = false,
  customStyle,
}) => {
  const { colors } = useTheme();
  const [country, setCountry] = useState<Country | null>(null);

  const activeDialCode = useMemo(() => {
    return country?.dial_code || defaultCode || '';
  }, [country, defaultCode]);

  const phone = useMemo(() => {
    if (!value) return '';
    if (activeDialCode && value.startsWith(activeDialCode)) {
      return value.slice(activeDialCode.length);
    }
    return value;
  }, [value, activeDialCode]);

  const handleSelectCountry = (selected: Country) => {
    setCountry(selected);
    onChangeCountry?.(selected.dial_code);
    onChangeFormattedText?.(
      selected.dial_code ? `${selected.dial_code}${phone}` : phone,
    );
  };

  const handlePhoneChange = (text: string) => {
    onChangeText?.(text);
    onChangeFormattedText?.(activeDialCode ? `${activeDialCode}${text}` : text);
  };

  return (
    <View style={styles.mainContainer}>
      {label && <CustomText text={label} color={colors.light_text} />}
      <View
        style={[
          styles.container,
          customStyle,
          {
            backgroundColor: colors.item_background,
            borderColor: colors.item_border_color,
          },
        ]}
      >
        <CountryPicker
          defaultCode={defaultCode}
          onSelect={handleSelectCountry}
        />
        <View
          style={{
            height: 20,
            backgroundColor: colors.gray,
            width: 1,
          }}
        />
        <TextInput
          style={[styles.input, { color: colors.input_text }]}
          placeholderTextColor={colors.placeholder_text}
          keyboardType="phone-pad"
          placeholder={placeholder}
          value={phone}
          onChangeText={handlePhoneChange}
          maxLength={15}
          autoFocus={autoFocus}
        />
      </View>
    </View>
  );
};

export default PhoneTextInput;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    gap: 8,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    height: 45,
  },
  input: {
    flex: 1,
    fontSize: 15,
    marginLeft: 10,
    height: 40,
  },
});
