import React, { useState } from 'react';
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../styles';
import CustomIcon from '../CustomIcon';
import Icons from '../../utils/Icons';

const MessageInput: React.FC<{ onSend: (text: string) => void }> = ({ onSend }) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    const t = text.trim();
    if (!t) return;
    onSend(t);
    setText('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Type a message"
        placeholderTextColor={COLORS.TEXT_SECONDARY}
        style={styles.input}
        multiline
      />
      <Pressable onPress={handleSend} style={styles.sendButton}>
        <CustomIcon icon={Icons.sendIcon} color={COLORS.TEXT_INVERSE} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', padding: SPACING.S, borderTopColor: COLORS.DIVIDER, borderTopWidth: 1, backgroundColor: COLORS.BACKGROUND },
  input: { flex: 1, minHeight: 40, maxHeight: 120, paddingHorizontal: SPACING.M, backgroundColor: COLORS.SURFACE, borderRadius: 20, color: COLORS.TEXT_PRIMARY },
  sendButton: { backgroundColor: COLORS.PRIMARY, borderRadius: 20, padding: SPACING.S, marginLeft: SPACING.S },
});

export default MessageInput;
