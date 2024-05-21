import * as LocalAuthentication from 'expo-local-authentication';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Dimensions, Vibration } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'styled-components';
import styled from 'styled-components/native';
import { shallow } from 'zustand/shallow';
import { useApplicationStore } from '../contexts/useApplicationStore';
import { Layout } from '../styled-components/Layouts';
import NumberPad from './NumberPad';
import PinItems from './PinItems';
import app from '../../app.json'
import i18n from '../locale';

const Authenticate = () => {
    const theme: any = useTheme();
    const [value, setValue] = useState('');
    const authenticationPinLength = useMemo(() => 8, []);
    const [biometricSupported, setBiometricSupported] = useState(false);
    const [error, setError] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const { top, bottom } = useSafeAreaInsets();
    const { pin } = useApplicationStore(
        (state) => ({
            pin: state.pin,
        }),
        shallow
    );

    const authenticate = useCallback(async () => {
        await LocalAuthentication.authenticateAsync().then(async (result) => {
            if (result.success) {
                Vibration.vibrate(50);
                await pin.authenticate()
                //onAuthenticate();
            }
        });
    }, []);

    const submitPassword = useCallback(async (authPin: string) => {
        if (authPin.length <= authenticationPinLength && !disabled) {
            setValue(authPin);
            if (authPin.length === authenticationPinLength) {
                if (await pin.validate(authPin)) {
                    await pin.authenticate()
                    //onAuthenticate();
                } else {
                    Vibration.vibrate(50);
                    setError(true);
                    setDisabled(true);
                    setTimeout(() => {
                        setError(false);
                        setDisabled(false);
                        setValue('');
                    }, 500);
                }
            }
        }
    }, []);

    useEffect(() => {
        LocalAuthentication.isEnrolledAsync().then((result) => {
            if (result) {
                setBiometricSupported(true);
                authenticate();
            }
        });
    }, []);
    const bkcolor = app.expo.name == "RockID" ? {backgroundColor: theme.color.primary} : null;
    return (
        <Container
            style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                backgroundColor: theme.color.primary
            }}
        >
            <Layout {...bkcolor} style={{backgroundColor: theme.color.primary}}>
                <Wrapper safeAreaHeight={top + bottom}>
                    <TitleWrapper>
                        <Title style={{ ...theme.font.title }}>{i18n.t('authentication')}</Title>
                    </TitleWrapper>

                    <ImageStyled
                        style={{
                            width: Dimensions.get('window').width * 0.4,
                            height: Dimensions.get('window').height * 0.2,
                        }}
                        source={theme.images.logo}
                        resizeMode="contain"
                    />

                    <PinItems length={authenticationPinLength} value={value} error={error} color={theme.color.secondary} style={{ marginBottom: 15 }} />

                    <NumberPad
                        style={{
                            width: '90%',
                        }}
                        maxLength={authenticationPinLength}
                        value={value}
                        setValue={submitPassword}
                        fingerPrint={biometricSupported}
                        authenticate={authenticate}
                    />
                </Wrapper>
            </Layout>
        </Container>
    );
};

const ImageStyled = styled.Image``;

const Container = styled.SafeAreaView`
    flex: 1;
    align-items: center;
    z-index: 10;
`;

const Wrapper = styled.View`
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    padding-bottom: 20px;
`;

const TitleWrapper = styled.View`
    align-items: center;
    width: 100%;
`;

const Title = styled.Text`
    color: ${(props) => props.theme.color.secondary};
    font-size: 24px;
    padding: 20px;
`;

export default Authenticate;
