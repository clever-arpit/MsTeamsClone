import React, { useEffect, useState } from 'react';
import { Modal, View, StyleSheet } from 'react-native';
import Config from 'react-native-config';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import { useTheme } from '../hooks/ThemeContext';
import { ConnectivityManagerProps } from '../types/DataType';
import CustomText from '../component/CustomText';
import CustomButton from '../component/CustomButton';

const ConnectivityManager: React.FC<ConnectivityManagerProps> = ({ children }) => {
    const [isConnected, setIsConnected] = useState<boolean>(true);
    const { colors } = useTheme();

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
            setIsConnected(state.isConnected ?? false);
        });

        NetInfo.fetch().then((state: NetInfoState) => {
            setIsConnected(state.isConnected ?? false);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const handleRetry = () => {
        NetInfo.fetch().then((state: NetInfoState) => {
            setIsConnected(state.isConnected ?? false);
        });
    };

    return (
        <>
            {children}
            <Modal transparent={true} visible={!isConnected} animationType="slide">
                <View style={[styles.modalContainer, { backgroundColor: colors.transparent6 }]}>
                    <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
                        <CustomText
                            text='No Internet Connection'
                            fontSize={20}
                            fontFamily={Config.FONT_FAMILY_SEMI}
                            customStyle={styles.modalText}
                        />
                        <CustomText
                            text='Please check your internet connection.'
                            fontSize={20}
                            fontFamily={Config.FONT_FAMILY_SEMI}
                            customStyle={[styles.modalSubText, { color: colors.icon_color }]}
                        />
                        <CustomButton
                            title={'Retry'}
                            onPress={handleRetry}
                            buttonStyle={styles.button}
                        />
                    </View>
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: 300,
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 10,
    },
    modalSubText: {
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 20,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
});

export default ConnectivityManager;