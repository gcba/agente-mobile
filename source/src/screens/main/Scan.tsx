// Imports
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { shallow } from 'zustand/shallow';
import * as WebBrowser from 'expo-web-browser';
import i18n from '../../locale';

// Components
import { Entypo } from '@expo/vector-icons';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera, CameraType } from 'expo-camera';
import { transparentize } from 'polished';
import { Alert, BackHandler, Platform, StatusBar, StyleSheet, Vibration } from 'react-native';
import { useApplicationStore } from '../../contexts/useApplicationStore';
import { ContainerLayout, Layout } from '../../styled-components/Layouts';
import validator from 'validator';

const Scan = ({ navigation }) => {
    const [type] = useState(CameraType.back);
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { processMessage } = useApplicationStore(
        (state) => ({
            processMessage: state.processMessage,
        }),
        shallow
    );
    const getPermissions = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
    };

    useEffect(() => {
        getPermissions();
    }, []);

    const handleBarCodeScanned = useCallback(async ({ data }) => {
        setScanned(true);
        try {
            console.info('QR Scanner:', data);
            setIsLoading(true);
            if (validator.isURL(data, {protocols: ['http', 'https']})) {
                Alert.alert(i18n.t('scanScreen.urlTitle') + data, i18n.t('scanScreen.urlDescription'), [
                    {
                        text: i18n.t('accept'),
                        onPress: async () => {
                            WebBrowser.openBrowserAsync(data);
                        },
                    },
                    {
                        text: i18n.t('cancel')
                    },
                ])
            } else {
                await processMessage({
                    message: data,
                });
            }
            Vibration.vibrate(200);
            Platform.OS === 'android' && StatusBar.setHidden(false);
        } catch (error) {
            Alert.alert('Error', i18n.t('scanScreen.error'));
            console.error('QR Scanner', error);
        } finally {
            navigation.navigate('Credentials');
            setScanned(false);
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            Platform.OS === 'android' && StatusBar.setHidden(false);
            return false;
        });
        Platform.OS === 'android' && StatusBar.setHidden(true);
        return () => backHandler.remove();
    }, []);

    return (
        <ContainerLayout style={{ backgroundColor: 'black' }}>
            {hasPermission && (
                <Camera
                    type={type}
                    barCodeScannerSettings={{
                        barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
                    }}
                    onBarCodeScanned={scanned ? null : handleBarCodeScanned}
                    style={{
                        ...StyleSheet.absoluteFillObject,
                    }}
                    ratio="16:9"
                >
                    <Layout style={{ backgroundColor: transparentize(isLoading ? 0.1 : 1, 'black'), position: 'relative' }}>
                        <HeaderWrapper>
                            <BackWrapper
                                onPress={() => {
                                    navigation.goBack();
                                    Platform.OS === 'android' && StatusBar.setHidden(false);
                                }}
                            >
                                <EntypoStyled name="chevron-left" size={20} color={'white'} />
                                <BackText>{i18n.t('back')}</BackText>
                            </BackWrapper>
                            <TitleText>{i18n.t('scanScreen.title')}</TitleText>
                            <TitleText></TitleText>
                        </HeaderWrapper>
                        <ViewStyled>{isLoading && <ActivityIndicatorStyled size={'large'} />}</ViewStyled>
                    </Layout>
                </Camera>
            )}
        </ContainerLayout>
    );
};

const ViewStyled = styled.View`
    flex: 1;
    justify-content: center;
`;

const ActivityIndicatorStyled = styled.ActivityIndicator``;

const EntypoStyled = styled(Entypo)``;

const HeaderWrapper = styled.View`
    margin-top: 15px;
    flex-direction: row;
    width: 100%;
`;

const BackWrapper = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    flex: 1;
`;

const BackText = styled.Text`
    font-size: 14px;
    padding-bottom: 2px;
    font-weight: bold;
    color: white;
`;

const TitleText = styled.Text`
    font-size: 16px;
    padding-bottom: 2px;
    flex: 1;
    font-weight: bold;
    color: white;
    text-align: center;
`;

export default Scan;
