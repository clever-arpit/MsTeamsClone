import React, { FC, JSX } from 'react';
import {
  View,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icons from '../utils/Icons';
import { downloadAttachmentFile, fileType } from '../utils/Helper';
import { useTheme } from '../hooks/ThemeContext';
import { Attachment, MessageThread } from '../types/DataType';
import CustomText from './CustomText';
import CustomVideoPlayer from './CustomVideoPlayer';
import CustomAudioPlayer from './CustomAudioPlayer';
import IconButton from './IconButton';

interface CustomMediaGalleryProps {
  item: MessageThread;
  navigation: any;
  onPress?: (itm: Attachment) => void;
}

const IMAGE_SIZE = 120;
const GAP = 5;

const CustomMediaGallery: FC<CustomMediaGalleryProps> = props => {
  const { item, onPress } = props;
  const { colors } = useTheme();

  const media = (item.sub_messages || [])
    .map(sm => sm.attachment)
    .filter(Boolean) as Attachment[];

  const count = media.length;
  const caption = item.sub_messages[0]?.message;

  const renderMedia = (
    attachment: Attachment,
    style: any,
    key: string,
  ): JSX.Element | null => {
    const mediaType = fileType(attachment.file_extension);

    if (mediaType === 'image') {
      return (
        <TouchableOpacity
          key={key}
          onPress={() => onPress && onPress(attachment)}
          style={{ width: IMAGE_SIZE }}
        >
          <Image
            key={key}
            source={{ uri: attachment.thumbnail_path }}
            style={style}
          />
        </TouchableOpacity>
      );
    }

    if (mediaType === 'document') {
      return (
        <View
          key={key}
          style={{
            backgroundColor: colors.white,
            padding: 7,
            borderRadius: 8,
            gap: 7,
            alignItems: 'center',
          }}
        >
          <Image key={key} source={Icons.documentIcon} style={style} />
          <View
            style={{
              width: 80,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <CustomText
              text={attachment.file_extension.toUpperCase()}
              color={colors.black}
              fontSize={13}
            />
            <IconButton
              onPress={() => downloadAttachmentFile(attachment.file_path, attachment.file_extension)}
              icon={Icons.downloadIcon}
              iconColor={colors.icon_color}
              size={21}
            />
          </View>
        </View>
      );
    }

    if (mediaType === 'audio') {
      return (
        <CustomAudioPlayer
          key={key}
          {...props}
          uri={attachment.file_path}
        />
      );
    }

    if (mediaType === 'video') {
      return (
        <CustomVideoPlayer
          key={key}
          {...props}
          uri={attachment.file_path}
          title={item?.sender?.full_name}
          style={style}
          playVisible={key !== 'm-3'}
        />
      );
    }

    return null;
  };

  if (!count) {
    return (
      <CustomText
        text="Unsupported"
        color={colors.light_text}
        fontStyle="italic"
      />
    );
  }
  if (count === 1) {
    return (
      <View style={styles.container}>
        {renderMedia(media[0], styles.single, 'm-0')}
        {caption && <CustomText customStyle={{ marginTop: 10 }} text={caption} color={colors.text} />}
      </View>
    );
  }

  if (count === 2) {
    return (
      <View
        style={[styles.container, { width: IMAGE_SIZE * 2 + GAP, gap: GAP }]}
      >
        {media
          .slice(0, 2)
          .map((m, i) => renderMedia(m, styles.fullWidth, `m-${i}`))}
        {caption && <CustomText text={caption} color={colors.text} />}
      </View>
    );
  }

  if (count === 3) {
    return (
      <View
        style={[styles.container, { width: IMAGE_SIZE * 2 + GAP, gap: GAP }]}
      >
        {renderMedia(
          media[0],
          fileType(media[0]?.file_extension) === 'video'
            ? styles.fullVideoWidth
            : styles.fullWidth,
          'm-0',
        )}
        <View style={{ flexDirection: 'row', gap: GAP }}>
          {media
            .slice(1, 3)
            .map((m, i) => renderMedia(m, styles.half, `m-${i + 1}`))}
        </View>
        {caption && <CustomText text={caption} color={colors.text} />}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={media.slice(0, 4)}
        numColumns={2}
        keyExtractor={(_, i) => `m-${i}`}
        columnWrapperStyle={{ gap: GAP }}
        renderItem={({ item, index }) =>
          count > 4 && index === 3 ? (
            <View>
              {renderMedia(item, styles.grid, `m-${index}`)}
              <TouchableOpacity
                onPress={() => null}
                style={[styles.overlay, { backgroundColor: colors.transparent3 }]}
              >
                <CustomText
                  text={`+ ${count - 4}`}
                  color={colors.white}
                  fontSize={20}
                />
              </TouchableOpacity>
            </View>
          ) : (
            renderMedia(item, styles.grid, `m-${index}`)
          )
        }
      />
      {caption && <CustomText text={caption} color={colors.text} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  single: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  fullWidth: {
    width: '100%',
    height: IMAGE_SIZE,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  fullVideoWidth: {
    width: 240,
  },
  half: {
    width: IMAGE_SIZE - 3,
    height: IMAGE_SIZE,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  grid: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 10,
    resizeMode: 'cover',
    marginBottom: GAP,
  },
  overlay: {
    position: 'absolute',
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
});

export default CustomMediaGallery;
