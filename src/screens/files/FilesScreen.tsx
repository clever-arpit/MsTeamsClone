import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { setSelectedFile, toggleFileFavorite } from '../../redux';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import CustomIcon from '../../components/CustomIcon';
import SearchInput from '../../components/SearchInput';
import Icons from '../../utils/Icons';
import { COLORS, SPACING, TYPOGRAPHY } from '../../styles';
import { TeamsFile } from '../../types';

const fileIcon = (type: TeamsFile['type']) => {
  switch (type) {
    case 'pdf':
      return Icons.pdfIcon;
    case 'sheet':
      return Icons.sheetsIcon ?? Icons.documentIcon;
    case 'image':
      return Icons.galleryIcon;
    default:
      return Icons.documentIcon;
  }
};

const FilesScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const files = useAppSelector(state => state.teams.files);
  const selectedFileId = useAppSelector(state => state.teams.selectedFileId);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return files.filter(file => {
      const haystack = `${file.name} ${file.channel} ${file.owner.firstName} ${file.owner.lastName}`.toLowerCase();
      return !normalized || haystack.includes(normalized);
    });
  }, [files, query]);

  return (
    <View style={styles.screen}>
      <View style={styles.headerBand}>
        <Text style={styles.title}>Files</Text>
        <Pressable style={styles.uploadButton}>
          <CustomIcon icon={Icons.uploadIcon} color={COLORS.TEXT_INVERSE} size={18} />
          <Text style={styles.uploadText}>Upload</Text>
        </Pressable>
      </View>

      <SearchInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search shared files"
        style={styles.search}
      />

      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.storageStrip}>
            <View>
              <Text style={styles.storageTitle}>OneDrive</Text>
              <Text style={styles.storageMeta}>24.8 GB used of 1 TB</Text>
            </View>
            <Text style={styles.storageLink}>Manage</Text>
          </View>
        }
        renderItem={({ item }) => (
          <Pressable
            onPress={() => dispatch(setSelectedFile(item.id))}
            style={[
              styles.row,
              selectedFileId === item.id && styles.selectedRow,
            ]}
          >
            <View style={styles.fileIcon}>
              <CustomIcon icon={fileIcon(item.type)} color={COLORS.PRIMARY} size={22} />
            </View>
            <View style={styles.info}>
              <Text style={styles.name} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.meta} numberOfLines={1}>
                {item.channel} · {item.owner.firstName} {item.owner.lastName} · {item.size}
              </Text>
              <Text style={styles.time}>
                Edited {new Date(item.updatedAt).toLocaleDateString('en', {
                  month: 'short',
                  day: 'numeric',
                })}
              </Text>
            </View>
            <Pressable
              onPress={() => dispatch(toggleFileFavorite(item.id))}
              style={styles.favoriteButton}
            >
              <CustomIcon
                icon={item.favorite ? Icons.bookmarkIcon : Icons.unselectedIcon}
                color={item.favorite ? COLORS.PRIMARY : COLORS.TEXT_TERTIARY}
                size={20}
              />
            </Pressable>
          </Pressable>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  favoriteButton: {
    alignItems: 'center',
    height: 38,
    justifyContent: 'center',
    width: 38,
  },
  fileIcon: {
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY_LIGHT,
    borderRadius: 8,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  headerBand: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.M,
    paddingTop: SPACING.M,
  },
  info: {
    flex: 1,
    marginLeft: SPACING.M,
  },
  list: {
    paddingBottom: SPACING.L,
  },
  meta: {
    ...TYPOGRAPHY.BODY2,
    color: COLORS.TEXT_SECONDARY,
    marginTop: 3,
  },
  name: {
    ...TYPOGRAPHY.SUBTITLE2,
    color: COLORS.TEXT_PRIMARY,
  },
  row: {
    alignItems: 'center',
    backgroundColor: COLORS.BACKGROUND,
    borderBottomColor: '#EEEEF4',
    borderBottomWidth: 1,
    flexDirection: 'row',
    padding: SPACING.M,
  },
  screen: {
    backgroundColor: '#F7F7FB',
    flex: 1,
  },
  search: {
    margin: SPACING.M,
    marginBottom: SPACING.S,
  },
  selectedRow: {
    borderLeftColor: COLORS.PRIMARY,
    borderLeftWidth: 4,
  },
  storageLink: {
    color: COLORS.PRIMARY,
    fontWeight: '700',
  },
  storageMeta: {
    ...TYPOGRAPHY.BODY2,
    color: COLORS.TEXT_SECONDARY,
    marginTop: 2,
  },
  storageStrip: {
    alignItems: 'center',
    backgroundColor: COLORS.BACKGROUND,
    borderColor: '#E1E1EC',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: SPACING.M,
    marginTop: 0,
    padding: SPACING.M,
  },
  storageTitle: {
    ...TYPOGRAPHY.SUBTITLE2,
    color: COLORS.TEXT_PRIMARY,
  },
  time: {
    ...TYPOGRAPHY.CAPTION,
    color: COLORS.TEXT_TERTIARY,
    marginTop: 4,
  },
  title: {
    ...TYPOGRAPHY.H2,
    color: COLORS.TEXT_PRIMARY,
  },
  uploadButton: {
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 8,
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: SPACING.M,
    paddingVertical: SPACING.S,
  },
  uploadText: {
    color: COLORS.TEXT_INVERSE,
    fontWeight: '700',
  },
});

export default FilesScreen;
