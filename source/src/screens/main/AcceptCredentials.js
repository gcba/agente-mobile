import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { Alert, BackHandler, Dimensions, ImageBackground, ScrollView, View } from 'react-native';
import BasicLayout from '../../components/BasicLayout';
// Libs
import Checkbox from 'expo-checkbox';
import { lighten, transparentize } from 'polished';
import styled, { useTheme } from 'styled-components/native';

// Providers
import Button from '../../components/Button';
import i18n from '../../locale';

// import { useStorageProvider } from '../../contexts/StorageContext';
import CredentialAbstract from '../../components/CredentialAbstract';

import { shallow } from 'zustand/shallow';
import EntityHeader from '../../components/EntityHeader';
import { useApplicationStore, websocketTransport } from '../../contexts/useApplicationStore';
import Popup from '../../components/Popup';
import { TouchableHighlight } from 'react-native-gesture-handler';
import ListLayout from '../../components/ListLayout';

const AcceptCredentials = ({ navigation, route }) => {
    const theme = useTheme();
    const [credentials, setCredentials] = useState(
        () =>
            route.params?.credentials?.map((credential) => ({
                ...credential,
                selected: true,
            })) || []
    );
    const [enableButton, setEnableButton] = useState(true)
    const count = useMemo(() => credentials.filter((credential) => credential.selected).length || 0, [credentials]);
    const issuer = useMemo(() => route.params?.issuer, [route.params?.issuer]);
    const { credential } = useApplicationStore(
        (state) => ({
            credential: state.credential,
        }),
        shallow
    );

    const [visible, setVisible] = useState(false);
    const [btnPress1, isBtnPress1] = useState(false);
    const [btnPress2, isBtnPress2] = useState(false);

    const [logo, setLogo] = useState({
        width: '50%',
        height: 35,
        opacity: 1,
        enabled: true,
    });

    const setSelected = useCallback(
        (index) => {
            setCredentials((prev) => {
                const newCredentials = [...prev];
                newCredentials[index].selected = !newCredentials[index].selected;
                const enable = newCredentials.filter((cred)=>cred.selected)
                setEnableButton(enable.length > 0)
                return newCredentials;
            });
        },
        [credentials]
    );

    const acceptCredentials = useCallback(async () => {
        try {
            const selectedCredentials = credentials
                .filter((item) => item.selected)
                .map((item) => ({
                    data: item.data,
                    display: item.display,
                    styles: item.styles,
                }));

            for (let index = 0; index < selectedCredentials.length; index++) {
                const element = selectedCredentials[index];
                await credential.add(element);
            }

            navigation.navigate('Credentials');
        } catch (error) {
            console.log(error);
        }
    }, [credentials]);

    const rejectCredentials = useCallback(() => {
        websocketTransport.dispose();
        navigation.goBack()
    }, []);

    useEffect(() => {
        console.log('isu: ', issuer)
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            setVisible(true);
            return true;
        });

        return () => backHandler.remove();
    }, []);

    return (
        <BasicLayout
            title={i18n.t('acceptCredentialsScreen.header')}
            contentStyle={{
                paddingBottom: 30,
            }}
            backText={false}
            onBack={() => {
                setVisible(true);
            }}
        >
            <Popup navigation={navigation} title={i18n.t('acceptCredentialsScreen.reject')} description={i18n.t('acceptCredentialsScreen.rejectDescription')}
                acceptHandler={() => { rejectCredentials() }} declineHandler={() => { setVisible(false) }} visible={visible} warning={true} />
            <Container>
                {/* <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{
                        width: '100%',
                    }}
                >
                    {/* {issuer?.styles && <EntityHeader entityStyles={issuer.styles} />}
                    <View
                        style={{
                            width: '100%',
                            alignItems: 'center',
                        }}
                    >
                        <View
                            style={{
                                width: '90%',
                            }}
                        >
                            {/* <Title>
                                {issuer?.name || issuer?.id || issuer} {i18n.t('acceptCredentialsScreen.description')}
                            </Title>
                            {credentials?.map((credential, index) => (
                                <View key={index}>
                                    {!!index && <View style={{ height: 10 }} />}
                                    <CredentialAbstract
                                        key={index}
                                        credential={credential}
                                        children={
                                            <Checkbox
                                                value={credential.selected}
                                                color={credential.selected ? '#97CC00' : transparentize(0.6, credential.styles?.text?.color || 'black')}
                                                onValueChange={() => setSelected(index)}
                                                style={{
                                                    padding: 14,
                                                    borderColor: transparentize(0.8, 'black'),
                                                }}
                                            />
                                        }
                                    />
                                </View>
                            ))}
                        </View>
                    </View>
                </ScrollView> */}

                {credentials?.length > 0 && (<ListLayout
                    title={(issuer?.name ? issuer?.name : i18n.t('someone')) + ' ' + i18n.t('acceptCredentialsScreen.addTitle')}
                    showsVerticalScrollIndicator={false}
                    data={credentials}
                    EmptyComponent={() => (
                        <></>
                    )}
                    contentContainerStyle={{
                        paddingHorizontal: 40,
                        paddingVertical: 10,
                    }}
                    ItemSeparatorComponent={() => <Separator style={{ marginBottom: -20 }} />}
                    RenderItemComponent={({ item, index }) => {
                        return (
                            <View key={index}>
                                {!!index && <View style={{ height: 10 }} />}
                                <CredentialItem activeOpacity={0.8} style={{ backgroundColor: 'white', borderRadius: 15, padding: 10, paddingVertical: 25, flexDirection:'row', justifyContent: 'space-between', alignItems:'center' }}
                                    onPress={() => {
                                        item?.data &&
                                            navigation.navigate('CredentialDetails', {
                                                credential: item,
                                                color: item?.styles?.text?.color,
                                            });
                                    }}
                                >
                                    <View>
                                        {/* <ImageBkgStyled imageStyle={{ borderRadius: 15 }} style={{ padding: 10, paddingBottom:50 }} source={{ uri: item?.styles?.hero?.uri }}> */}
                                        <Title color={theme.color.font} style={{ marginLeft: 10, marginBottom: 10 }}>{item?.display?.title?.text || item?.display?.title?.fallback || i18n.t('credential')}</Title>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                                            {item?.styles?.thumbnail?.uri && (
                                                <ViewStyled style={{ backgroundColor: item?.styles?.background?.color || theme.color.tertiary, borderRadius: 100, height: 35, width: 35, marginRight: 10, alignItems: 'center', justifyContent: 'center' }}>
                                                    <ImageStyled
                                                        source={{ uri: logo.enabled ? item?.styles?.thumbnail?.uri : 'https://i.ibb.co/Krv9jRg/Quark-ID-iso.png' , cache: 'force-cache'}}
                                                        style={{ height: 25, width: 25 }}
                                                        resizeMode="contain"
                                                        onLoad={(e) => {
                                                            // setLogo((logo) => ({
                                                            //     ...logo,
                                                            //     width: Number(((35 * e.nativeEvent.source.width) / e.nativeEvent.source.height).toFixed(0)),
                                                            //     height: 35,
                                                            //     opacity: 1,
                                                            // }));
                                                        }}
                                                        onError={(e) => {
                                                            setLogo((logo) => ({
                                                                ...logo,
                                                                enabled: false,
                                                            }));
                                                        }}
                                                    />
                                                </ViewStyled>
                                            )}
                                            <Title  ellipsizeMode={'tail'} numberOfLines={2}  style={{ color: theme.color.secondary, width:'65%' }}>{item?.data?.issuer?.name || item?.data?.issuer?.id || item?.data?.issuer || i18n.t('credential')}</Title>
                                        </View>
                                    </View>
                                    <Checkbox
                                        value={item.selected}
                                        color={item.selected ? '#7BD1E0' : transparentize(0.6, item.styles?.text?.color || 'black')}
                                        onValueChange={() => setSelected(index)}
                                        style={{
                                            padding:15,
                                            borderRadius: 100,
                                            borderColor: transparentize(0.8, '#7BD1E0'),
                                        }}
                                    />
                                    {/* </ImageBkgStyled> */}
                                </CredentialItem>
                            </View>
                        )
                    }}
                />)}
                {/* <ButtonWrapper>
                    <Button
                        backgroundColor={lighten(0.1, 'red')}
                        onPress={rejectCredentials}
                        style={{
                            width: '47%',
                            position: 'relative',
                        }}
                    >
                        {i18n.t('cancel')}
                    </Button>
                    <Button
                        onPress={acceptCredentials}
                        disabled={count <= 0}
                        backgroundColor={theme.color.secondary}
                        style={{
                            width: '47%',
                            position: 'relative',
                        }}
                    >
                        {i18n.t('acceptCredentialsScreen.accept')}
                    </Button>
                </ButtonWrapper> */}
                <ButtonsWrapper>
                    <EmailButton onPress={enableButton ? acceptCredentials : null}
                        disable={enableButton} style={{backgroundColor:enableButton ? theme.color.secondary : '#D5D5D5'}}
                        onShowUnderlay={() => isBtnPress1(true)} onHideUnderlay={() => isBtnPress1(false)} theme={theme}>
                        <Texto style={{ color: theme.color.primary }} btnPressed={btnPress1}>{i18n.t('add')}</Texto>
                    </EmailButton>
                    <SendButton onPress={() => { setVisible(true) }}
                        onShowUnderlay={() => isBtnPress2(true)} onHideUnderlay={() => isBtnPress2(false)} theme={theme}>
                        <Texto style={{ color: theme.color.font }} btnPressed={btnPress2}>{i18n.t('cancel')}</Texto>
                    </SendButton>
                </ButtonsWrapper>
            </Container>
        </BasicLayout>
    );
};

const ViewStyled = styled.View``;

const ImageStyled = styled.Image``;
const ImageBkgStyled = styled(ImageBackground)``;

const Separator = styled.View`
    width: 100%;
`;

const Container = styled.View`
    align-items: center;
    width: ${Dimensions.get('window').width}px;
    height: 100%;
`;

const ButtonWrapper = styled.View`
    flex-direction: row;
    margin-top: 25px;
    width: 90%;
    position: relative;
    justify-content: space-between;
`;

const ButtonsWrapper = styled.View`
align-items: center;
`

const CredentialItem = styled.TouchableOpacity``

const Title = styled.Text`
    font-size: 16px;
    font-weight: 500;
    color: ${transparentize(0.3, 'black')};
`;

const EmailButton = styled(TouchableHighlight)`
display: flex;
height: 52px;
justify-content: center;
align-items: center;
gap: 10px;
width: ${Dimensions.get('window').width - 64}px;
border-radius: 50px;
background: ${props => props.theme.color.secondary};
margin-bottom: 16px;
`;

const SendButton = styled(TouchableHighlight)`
display: flex;
height: 52px;
justify-content: center;
align-items: center;
gap: 10px;
width: ${Dimensions.get('window').width - 64}px;
border-radius: 50px;
background: #D5D5D5;
`;

const Texto = styled.Text`
    text-align: center;
    font-family: Manrope-Bold;
    font-size: 16px;
    font-style: normal;
    line-height: 20px;
    letter-spacing: 0.32px;
`

export default AcceptCredentials;
