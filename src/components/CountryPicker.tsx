import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icons from '../utils/Icons';
import { Country } from '../types/DataType';
import { Countries } from '../utils/Countries';
import { useTheme } from '../hooks/ThemeContext';
import CustomText from './CustomText';
import CustomIcon from './CustomIcon';
import CustomModal from './CustomModal';
import ItemSeparator from './ItemSeparator';
import SearchBar from './SearchBar';
import { useDebouncedCallback } from 'use-debounce';

type Props = {
  onSelect?: (item: Country) => void;
  defaultCode?: string;
  countryStyle?: StyleProp<ViewStyle>;
};

const CountryPicker: React.FC<Props> = ({
  onSelect,
  defaultCode = '',
  countryStyle = {},
}) => {
  const { colors } = useTheme();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<Country | null>(null);
  const [searchText, setSearchText] = useState<string>('');
  const [filteredCountries, setFilteredCountries] =
    useState<Country[]>(Countries);

  useEffect(() => {
    if (defaultCode) {
      const found = Countries.find(c => c.dial_code === defaultCode);
      if (found) {
        setSelected(found);
        onSelect?.(found);
      }
    }
  }, [defaultCode]);

  const handleSelect = (item: Country) => {
    setSelected(item);
    onSelect?.(item);
    setVisible(false);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onChangeText = useCallback((text: string) => {
    setSearchText(text);
    debouncedSearch();
  }, []);

  const debouncedSearch = useDebouncedCallback(() => {
    console.log('searchText-----', searchText);
    if (!searchText) {
      setFilteredCountries(Countries);
      return;
    }
    const filtered = Countries.filter(
      c =>
        c.name.toLowerCase().includes(searchText.toLowerCase()) ||
        c.dial_code.includes(searchText),
    );
    console.log('filtered-----', filtered);
    setFilteredCountries(filtered);
  }, 300);

  const onCancelSearch = () => {
    setSearchText('');
    setFilteredCountries(Countries);
  };

  const onClearSearch = () => {
    setSearchText('');
  };

  return (
    <View>
      <TouchableOpacity
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            paddingHorizontal: 8,
          },
          countryStyle,
        ]}
        onPress={() => setVisible(true)}
      >
        {selected ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <CustomText fontSize={20} text={selected.flag} />
            <CustomText
              fontSize={14}
              text={`${selected.dial_code}`}
              customStyle={{ color: colors.blue }}
            />
          </View>
        ) : (
          <CustomText fontSize={14} text="Select" />
        )}
        <CustomIcon icon={Icons.dropdownIcon} size={14} />
      </TouchableOpacity>

      <CustomModal
        visible={visible}
        title="Select Country"
        onClose={onClose}
        modalContainerStyle={{ width: '95%', height: '70%' }}
        modalContentStyle={{ flex: 1 }}
        offsetTop={1}
      >
        <SearchBar
          value={searchText}
          onChangeText={onChangeText}
          onCancel={onCancelSearch}
          onClear={onClearSearch}
          searchBarStyle={{ marginVertical: 10 }}
        />
        <FlatList
          data={filteredCountries}
          keyExtractor={(item: Country) => item.code}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 15,
                gap: 12,
              }}
              onPress={() => handleSelect(item)}
            >
              <CustomText fontSize={22} text={item.flag} />
              <CustomText
                fontSize={14}
                text={`${item.name} (${item.dial_code})`}
              />
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={ItemSeparator}
        />
      </CustomModal>
    </View>
  );
};

export default CountryPicker;
