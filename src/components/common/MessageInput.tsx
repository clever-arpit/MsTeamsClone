import React, { useState } from 'react';
import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SPACING } from '../../styles';
import CustomIcon from '../CustomIcon';
import Icons from '../../utils/Icons';

const MessageInput: React.FC<{ onSend: (text: string) => void }> = ({ onSend }) => {
  const insets = useSafeAreaInsets();
  const [text, setText] = useState('');

  const handleSend = () => {
    const t = text.trim();
    if (!t) return;
    onSend(t);
    setText('');
  };

  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, SPACING.S) }]}>
      <Pressable style={styles.addButton}>
        <CustomIcon icon={Icons.addIcon} color="#000000" size={24} />
      </Pressable>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Type a message"
        placeholderTextColor="#9B9B9B"
        style={styles.input}
        multiline
      />
      <Pressable style={styles.sideButton}>
        <CustomIcon icon={Icons.emojiIcon} color="#BDBDBD" size={24} />
      </Pressable>
      <Pressable style={styles.sideButton}>
        <CustomIcon icon={Icons.cameraIcon} color="#BDBDBD" size={24} />
      </Pressable>
      <Pressable onPress={handleSend} style={styles.sendButton}>
        <CustomIcon icon={text.trim() ? Icons.sendIcon : Icons.micIcon} color="#BDBDBD" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  addButton: {
    alignItems: 'center',
    backgroundColor: '#7E84FF',
    borderRadius: 22,
    height: 44,
    justifyContent: 'center',
    marginRight: SPACING.S,
    width: 44,
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#000000',
    borderTopColor: '#000000',
    borderTopWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: SPACING.S,
    paddingTop: SPACING.S,
  },
  input: {
    backgroundColor: '#242424',
    borderRadius: 22,
    color: '#F4F4F4',
    flex: 1,
    maxHeight: 120,
    minHeight: 44,
    paddingHorizontal: SPACING.M,
  },
  sendButton: {
    alignItems: 'center',
    height: 42,
    justifyContent: 'center',
    width: 42,
  },
  sideButton: {
    alignItems: 'center',
    height: 42,
    justifyContent: 'center',
    width: 42,
  },
});

export default MessageInput;
