import React, { useCallback } from 'react';
import {
    Image,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import Config from 'react-native-config';

import CustomText from './CustomText';
import { useTheme } from '../hooks/ThemeContext';
import { handleTemplateButtonAction } from '../utils/Helper';

const TemplateMessage: React.FC<{
    messages: any;
    onPress: (item: any) => void;
}> = ({ messages, onPress }) => {
    const { colors } = useTheme();
    const preview = messages?.[0]?.preview_message;
    const message = messages?.[0]?.message;

    if (!messages || messages?.length === 0) return null;

    if (!preview && !message) return null;

    if (!preview && message) {
        return <CustomText text={message} fontSize={14} />;
    }

    const { header, body, footer, buttons } = preview;

    const handleButtonPress = useCallback((button: any) => {
        if (button) {
            handleTemplateButtonAction(button);
        }
    }, []);

    return (
        <View style={styles.container}>
            {header && header?.type === 'text' && (
                <CustomText
                    text={header?.value}
                    fontFamily={Config.FONT_FAMILY_SEMI}
                />
            )}

            {header && header?.type === 'image' && (
                <TouchableOpacity
                    onPress={() => onPress && onPress(header)}
                >
                    <Image
                        source={{ uri: header?.url }}
                        style={styles.headerImage}
                    />
                </TouchableOpacity>
            )}

            {body && (
                <CustomText
                    text={body?.value}
                    fontSize={14}
                />
            )}

            {footer && (
                <CustomText
                    text={footer?.value}
                    fontSize={12}
                    color={colors.light_text}
                />
            )}

            {buttons?.map((button: any, index: number) => (
                <CustomText
                    key={index}
                    text={button?.title}
                    fontSize={12}
                    color={colors.dark_blue}
                    onPress={() => handleButtonPress(button)}
                />
            ))}
        </View>
    );
};

export default TemplateMessage;

const styles = StyleSheet.create({
    container: {
        gap: 10,
    },
    headerImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        resizeMode: 'cover',
    },
});
