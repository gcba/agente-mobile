import React, { useCallback, useEffect, useState } from 'react';

import { Alert, BackHandler, Dimensions, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import BasicLayout from '../../components/BasicLayout';
// Libs
import { lighten, transparentize } from 'polished';
import styled, { useTheme } from 'styled-components/native';

// Providers
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import Button from '../../components/Button';
import CredentialAbstract from '../../components/CredentialAbstract';
import EntityHeader from '../../components/EntityHeader';
import { useApplicationStore, websocketTransport } from '../../contexts/useApplicationStore';
import i18n from '../../locale';
import Popup from '../../components/Popup';
import ListLayout from '../../components/ListLayout';

const PresentSection = ({ descriptor, credentials, selectCredential, selectedIndex }) => {
    const theme = useTheme();
    const navigation = useNavigation();

    const [logo, setLogo] = useState({
        width: '50%',
        height: 35,
        opacity: 1,
        enabled: true,
    });

    //const [creds, setCreds] = useState([]);

    const setSelected = useCallback((index) => {
        const c = (credentials || []).map((credential, i) => ({
            credential,
            selected: i === index,
        }));
        //setCreds(c);
        selectCredential(c[index].credential, index);
    }, [])

    // useEffect(() => {
    //     console.log('credos: ', creds)
    // }, [creds])

    // useEffect(() => {
    //     console.log('rerendering')
    //     if (creds.length == 0) {
    //         const creds = (credentials || []).map((credential, index) => ({
    //             credential,
    //             selected: index === 0,
    //         }));
    //         setCreds(creds);
    //     }
    //     // if (creds.length === 0) {
    //     //       selectCredential(creds[0].credential);
    //     // }
    // }, []);

    return (<>
        <Title color={theme.color.font} style={{ margin: 10 }}>{descriptor?.name}</Title>
        <ListLayout
            data={credentials}
            EmptyComponent={() => <></>}
            RenderItemComponent={({ item: input, index }) => {
                //console.log('i: ', input)
                return (<View key={index}>
                    {!!index && <View style={{ height: 10 }} />}
                    <CredentialItem style={{ backgroundColor: 'white', borderRadius: 15, padding: 20 }}
                        onPress={() => {
                            input.data &&
                                navigation.navigate('CredentialDetails', {
                                    credential: input,
                                    color: input?.styles?.text?.color,
                                });
                        }}
                    >
                        <Title color={theme.color.font} style={{ marginLeft: 20, marginBottom:5 }}>{input.display?.title?.text || i18n.t('credential')}</Title>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}>
                            {input.styles?.thumbnail?.uri && (
                                <ImageStyled
                                    source={{ uri: logo.enabled ? input.styles?.thumbnail?.uri : 'https://i.ibb.co/Krv9jRg/Quark-ID-iso.png' , cache: 'force-cache' }}
                                    style={{ height: 35, width: 35, marginRight: 10, backgroundColor: input.styles?.background?.color || theme.color.tertiary, borderRadius: 100 }}
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
                            )}
                            <Title ellipsizeMode={'tail'} numberOfLines={2} style={{width:'60%'}} color={theme.color.font}>{input.data?.issuer?.name || input.data?.issuer?.id || input.data?.issuer || i18n.t('credential')}</Title>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                setSelected(index);
                            }}
                            style={{ position: 'absolute', right: 20, top: 35}}
                        >
                            <View
                                style={{
                                    width: 32,
                                    height: 32,
                                    marginRight: 5,
                                    borderRadius: 20,
                                    borderWidth: index == selectedIndex ? 2 : 1,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderColor: index == selectedIndex ? '#97CC00' : transparentize(0.6, input.styles?.text?.color || 'black'),
                                }}
                            >
                                <View
                                    style={{
                                        width: 23,
                                        height: 23,
                                        borderRadius: 20,
                                        backgroundColor: index == selectedIndex ? '#97CC00' : 'transparent',
                                    }}
                                />
                            </View>
                        </TouchableOpacity>
                    </CredentialItem>
                </View>
                )
            }}
        />
    </>)
    //     <ListWrapper>
    //         <View
    //             style={{
    //                 marginBottom: 10,
    //                 width: '100%',
    //                 paddingHorizontal: 5,
    //             }}
    //         >
    //             {descriptor.name && (
    //                 <Text
    //                     style={{
    //                         ...theme?.font.subtitle,
    //                         width: '100%',
    //                         color: transparentize(0.5, 'black'),
    //                     }}
    //                 >
    //                     {descriptor.name}
    //                 </Text>
    //             )}
    //             {descriptor.purpose && (
    //                 <Text
    //                     style={{
    //                         width: '100%',
    //                         marginTop: 5,
    //                         color: transparentize(0.7, 'black'),
    //                     }}
    //                 >
    //                     {descriptor.purpose}
    //                 </Text>
    //             )}
    //         </View>
    //         {creds.length > 0 ? (
    //             creds.map((item, index) => {
    //                 return (
    //                     <View
    //                         key={index}
    //                         style={{
    //                             width: '100%',
    //                         }}
    //                     >
    //                         {!!index && <View style={{ height: 10 }} />}
    //                         <CredentialAbstract
    //                             minimal
    //                             credential={item.credential}
    //                             children={
    //                                 <TouchableOpacity
    //                                     onPress={() => {
    //                                         setSelected(index);
    //                                     }}
    //                                 >
    //                                     <View
    //                                         style={{
    //                                             width: 32,
    //                                             height: 32,
    //                                             marginRight: 5,
    //                                             borderRadius: 20,
    //                                             borderWidth: item?.selected ? 2 : 1,
    //                                             display: 'flex',
    //                                             justifyContent: 'center',
    //                                             alignItems: 'center',
    //                                             borderColor: item?.selected ? '#97CC00' : transparentize(0.6, item?.styles?.text?.color || 'black'),
    //                                         }}
    //                                     >
    //                                         <View
    //                                             style={{
    //                                                 width: 23,
    //                                                 height: 23,
    //                                                 borderRadius: 20,
    //                                                 backgroundColor: item?.selected ? '#97CC00' : 'transparent',
    //                                             }}
    //                                         />
    //                                     </View>
    //                                 </TouchableOpacity>
    //                             }
    //                         />
    //                     </View>
    //                 );
    //             })
    //         ) : (
    //             <View
    //                 style={{
    //                     width: '100%',
    //                 }}
    //             >
    //                 <CredentialAbstract children={<Ionicons name="wallet" size={20} color={transparentize(0.7, 'black')} />} />
    //             </View>
    //         )}
    //     </ListWrapper>
    // );
};

const ListWrapper = styled.View`
    align-items: center;
    margin-bottom: 15px;
    width: 100%;
`;

const PresentCredentials = ({ route }) => {
    const theme = useTheme();
    const navigation = useNavigation();

    const { resolve, inputs, credentialsToReceive, issuer } = route.params;
    const [selectedCredentials, setSelectedCredentials] = useState(inputs.map((input) => { return input.credentials[0] }));
    const [selectedIndex, setSelectedIndex] = useState(inputs.map((input) => { return 0 }))
    const { setIsConnected } = useApplicationStore((state) => ({
        setIsConnected: state.setIsConnected,
    }));
    const [visible, setVisible] = useState(false);
    const [btnPress1, isBtnPress1] = useState(false);
    const [btnPress2, isBtnPress2] = useState(false);

    const [logo, setLogo] = useState({
        width: '50%',
        height: 35,
        opacity: 1,
        enabled: true,
    });

    const acceptCredentials = useCallback(() => {
        const credentialsToSend = selectedCredentials.map((credential) => credential.data);
        console.log('accept: ', credentialsToSend)
        resolve(credentialsToSend);
        navigation.goBack();
    }, [selectedCredentials, resolve]);

    const selectCredential = useCallback((credential, credIndex, index) => {
        console.log('aa: ', credential, index)
        setSelectedIndex((prev) => {
            const newSelected = [...prev]
            newSelected[index] = credIndex
            return newSelected
        })
        setSelectedCredentials((prev) => {
            console.log('bb: ', prev)
            const newSelectedCredentials = [...prev];
            newSelectedCredentials[index] = credential;
            console.log('cc: ', newSelectedCredentials)
            return newSelectedCredentials;
        });
    }, [selectedCredentials])

    useEffect(() => {
        setIsConnected(false);
    }, []);

    const rejectCredentials = useCallback(() => {
        websocketTransport.dispose();
        navigation.goBack();
    }, []);

    useEffect(() => {
        console.log('ya know: ', issuer)
        //console.log('selected: ', selectedCredentials)
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            setVisible(true);
            return true;
        });

        return () => backHandler.remove();
    }, []);

    return (
        <BasicLayout
            title={i18n.t('credentials')}
            contentStyle={{
                paddingBottom: 30,
            }}
            bottomTab={false}
            backText={false}
            onBack={() => {
                setVisible(true);
            }}
        >
            <Popup navigation={navigation} title={i18n.t('acceptCredentialsScreen.reject')} description={i18n.t('acceptCredentialsScreen.rejectDescription')}
                acceptHandler={() => { rejectCredentials() }} declineHandler={() => { setVisible(false) }} visible={visible} warning={true} />
            <Container>
                {credentialsToReceive?.length > 0 && (<ListLayout
                    title={(issuer?.name ? issuer?.name : i18n.t('someone')) + ' ' + i18n.t('presentCredentialsScreen.emit')}
                    showsVerticalScrollIndicator={false}
                    data={credentialsToReceive}
                    EmptyComponent={() => (
                        <></>
                    )}
                    contentContainerStyle={{
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                    }}
                    RenderItemComponent={({ item, index }) => {
                        return (
                            <View key={index}>
                                {!!index && <View style={{ height: 10 }} />}
                                <CredentialItem style={{ backgroundColor: 'white', borderRadius: 15, padding: 20 }}
                                    onPress={() => {
                                        item?.data &&
                                            navigation.navigate('CredentialDetails', {
                                                credential: item,
                                                color: item?.styles?.text?.color,
                                            });
                                    }}
                                >
                                    <Title color={theme.color.font} style={{ marginLeft: 20, marginBottom: 10 }}>{item?.display?.title?.text || item?.display?.title?.fallback || i18n.t('credential')}</Title>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}>
                                        {item?.styles?.thumbnail?.uri && (
                                            <ViewStyled style={{ backgroundColor: item?.styles?.background?.color || theme.color.tertiary, borderRadius: 100, height: 35, width: 35, marginRight: 10, alignItems: 'center', justifyContent: 'center' }}>
                                                <ImageStyled
                                                    source={{ uri: logo.enabled ? item?.styles?.thumbnail?.uri : 'https://i.ibb.co/Krv9jRg/Quark-ID-iso.png' , cache: 'force-cache' }}
                                                    style={{ height: 25, width: 25}}
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
                                        <Title color={theme.color.font}>{item?.data?.issuer?.name || item?.data?.issuer?.id || item?.data?.issuer || i18n.t('credential')}</Title>
                                    </View>
                                </CredentialItem>
                            </View>
                        )
                    }}
                />)}
                {credentialsToReceive?.length > 0 && inputs?.length > 0 && (
                    <View
                        style={{
                            width: '100%',
                            height: 1,
                            marginTop: 20,
                            backgroundColor: transparentize(0.8, 'black'),
                        }}
                    />
                )}
                {inputs?.length > 0 && (<ListLayout
                    title={i18n.t('presentCredentialsScreen.presentTitle')}
                    showsVerticalScrollIndicator={false}
                    data={inputs}
                    EmptyComponent={() => (
                        <></>
                    )}
                    contentContainerStyle={{
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                    }}
                    RenderItemComponent={({ item, index }) => <PresentSection credentials={item.credentials} descriptor={item.descriptor} selectCredential={(credential, credIndex) => { selectCredential(credential, credIndex, index) }} selectedIndex={selectedIndex[index]} />} />)}
                {/*// console.log('index: ', item)
                        // const [sel, setSel] = useState(0)
                        // const [creds, setCreds] = useState((item.credentials || []).map((credential, i) => ({
                        //     credential,
                        //     selected: i === 0,
                        // })));

                        // const setSelected = (ind) => {
                        //     console.log(ind)
                        //     const c = (iten.credentials || []).map((credential, i) => ({
                        //         credential,
                        //         selected: i === ind,
                        //     }));
                        //     console.log('au: ', c)
                        //     setCreds(c);
                        //     console.log('ua: ', creds)
                        //     selectCredential(c[ind].credential, index);
                        // }

                        // useEffect(() => {
                        //     console.log('creds: ', creds)
                        // }, [creds])

                        // useEffect(() => {
                        //     const c = (item.credentials || []).map((credential, index) => ({
                        //         credential,
                        //         selected: index === 0,
                        //     }));
                        //     setCreds(c);
                        //     //  if (c.length) {
                        //     //      selectCredential(creds[0].credential, index);
                        //     //  }
                        // }, [item.credentials]);

                        // return (
                        //     // <PresentSection
                        //     //     selectCredential={(credential) => selectCredential(credential, index)}
                        //     //     key={index}
                        //     //     credentials={item.credentials}
                        //     //     descriptor={item.descriptor}
                        //     // />)
                        //     <>
                        //         <Title color={theme.color.font} style={{ margin: 10 }}>{item?.descriptor?.name}</Title>
                        //         <ListLayout
                        //             extra
                        //             data={creds}
                        //             RenderItemComponent={({ item: input, index }) => {
                        //                 return (<View key={index}>
                        //                     {!!index && <View style={{ height: 10 }} />}
                        //                     <CredentialItem style={{ backgroundColor: 'white', borderRadius: 15, padding: 20 }}
                        //                         onPress={() => {
                        //                             input.credential?.data &&
                        //                                 navigation.navigate('CredentialDetails', {
                        //                                     credential: input.credential,
                        //                                     color: input.credential?.styles?.text?.color,
                        //                                 });
                        //                         }}
                        //                     >
                        //                         <Title color={theme.color.font} style={{ marginLeft: 20 }}>{input.credential?.display?.title?.text || i18n.t('credential')}</Title>
                        //                         <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}>
                        //                             {input.credential?.styles?.thumbnail?.uri && (
                        //                                 <ImageStyled
                        //                                     source={{ uri: logo.enabled ? input.credential?.styles?.thumbnail?.uri : 'https://i.ibb.co/Krv9jRg/Quark-ID-iso.png' }}
                        //                                     style={{ height: 35, width: 35, marginRight: 10, backgroundColor: input.credential?.styles?.background?.color || theme.color.tertiary, borderRadius: 100 }}
                        //                                     resizeMode="contain"
                        //                                     onLoad={(e) => {
                        //                                         // setLogo((logo) => ({
                        //                                         //     ...logo,
                        //                                         //     width: Number(((35 * e.nativeEvent.source.width) / e.nativeEvent.source.height).toFixed(0)),
                        //                                         //     height: 35,
                        //                                         //     opacity: 1,
                        //                                         // }));
                        //                                     }}
                        //                                     onError={(e) => {
                        //                                         setLogo((logo) => ({
                        //                                             ...logo,
                        //                                             enabled: false,
                        //                                         }));
                        //                                     }}
                        //                                 />
                        //                             )}
                        //                             <Title color={theme.color.font}>{input.credential?.data?.issuer?.name || input.credential?.data?.issuer?.id || input.credential?.data?.issuer || i18n.t('credential')}</Title>
                        //                         </View>
                        //                         <TouchableOpacity
                        //                             onPress={() => {
                        //                                 setSelected(index);
                        //                                 setSel(index)
                        //                             }}
                        //                             style={{ position: 'absolute', right: 20, top: 20 }}
                        //                         >
                        //                             <View
                        //                                 style={{
                        //                                     width: 32,
                        //                                     height: 32,
                        //                                     marginRight: 5,
                        //                                     borderRadius: 20,
                        //                                     borderWidth: sel == index ? 2 : 1,
                        //                                     display: 'flex',
                        //                                     justifyContent: 'center',
                        //                                     alignItems: 'center',
                        //                                     borderColor: sel == index ? '#97CC00' : transparentize(0.6, input.credential?.styles?.text?.color || 'black'),
                        //                                 }}
                        //                             >
                        //                                 <View
                        //                                     style={{
                        //                                         width: 23,
                        //                                         height: 23,
                        //                                         borderRadius: 20,
                        //                                         backgroundColor: sel == index ? '#97CC00' : 'transparent',
                        //                                     }}
                        //                                 />
                        //                             </View>
                        //                         </TouchableOpacity>
                        //                     </CredentialItem>
                        //                 </View>
                        //                 )
                        //             }}
                        //         />
                                {/* {creds?.map((input, index) => {
                                    console.log('hola: ', input)
                                    return (<View key={index}>
                                        {!!index && <View style={{ height: 10 }} />}
                                        <CredentialItem style={{ backgroundColor: 'white', borderRadius: 15, padding: 20 }}
                                            onPress={() => {
                                                input.credential?.data &&
                                                    navigation.navigate('CredentialDetails', {
                                                        credential: input.credential,
                                                        color: input.credential?.styles?.text?.color,
                                                    });
                                            }}
                                        >
                                            <Title color={theme.color.font} style={{ marginLeft: 20 }}>{input.credential?.display?.title?.text || i18n.t('credential')}</Title>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}>
                                                {input.credential?.styles?.thumbnail?.uri && (
                                                    <ImageStyled
                                                        source={{ uri: logo.enabled ? input.credential?.styles?.thumbnail?.uri : 'https://i.ibb.co/Krv9jRg/Quark-ID-iso.png' }}
                                                        style={{ height: 35, width: 35, marginRight: 10, backgroundColor: input.credential?.styles?.background?.color || theme.color.tertiary, borderRadius: 100 }}
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
                                                )}
                                                <Title color={theme.color.font}>{input.credential?.data?.issuer?.name || input.credential?.data?.issuer?.id || input.credential?.data?.issuer || i18n.t('credential')}</Title>
                                            </View>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setSelected(index);
                                                    setSel(index)
                                                }}
                                                style={{ position: 'absolute', right: 20, top: 20 }}
                                            >
                                                <View
                                                    style={{
                                                        width: 32,
                                                        height: 32,
                                                        marginRight: 5,
                                                        borderRadius: 20,
                                                        borderWidth: sel == index ? 2 : 1,
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        borderColor: sel == index ? '#97CC00' : transparentize(0.6, input.credential?.styles?.text?.color || 'black'),
                                                    }}
                                                >
                                                    <View
                                                        style={{
                                                            width: 23,
                                                            height: 23,
                                                            borderRadius: 20,
                                                            backgroundColor: sel == index ? '#97CC00' : 'transparent',
                                                        }}
                                                    />
                                                </View>
                                            </TouchableOpacity>
                                        </CredentialItem>
                                    </View>
                                    )
                                })}
                            // </>)
                    // }*/}

                {/* <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{
                        width: '100%',
                    }}
                >
                    {issuer?.styles && <EntityHeader entityStyles={issuer.styles} />}
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
                            {credentialsToReceive?.length > 0 && (
                                <>
                                    <Title>
                                        {issuer?.name || issuer?.id || issuer} {i18n.t('presentCredentialsScreen.emit')}
                                    </Title>
                                    {credentialsToReceive.map((credentialToReceive, index) => {
                                        return (
                                            <View key={index}>
                                                {!!index && <View style={{ height: 10 }} />}
                                                <CredentialAbstract credential={credentialToReceive} />
                                            </View>
                                        );
                                    })}
                                </>
                            )}

                            {credentialsToReceive?.length > 0 && inputs?.length > 0 && (
                                <View
                                    style={{
                                        width: '100%',
                                        height: 1,
                                        marginTop: 20,
                                        backgroundColor: transparentize(0.8, 'black'),
                                    }}
                                />
                            )}

                                {inputs?.length > 0 && (
                    <>
                        {/* <Title
                                        style={{
                                            marginTop: 15,
                                            marginBottom: 10,
                                        }}
                                    >
                                        {i18n.t('presentCredentialsScreen.present')}{' '}
                                    </Title> 

                        {inputs.map((input, index) => {
                            return (
                                <PresentSection
                                    selectCredential={(credential) => selectCredential(credential, index)}
                                    key={index}
                                    credentials={input.credentials}
                                    descriptor={input.descriptor}
                                />
                            );
                        })}
                    </>
                )}
                {/*</View>
                    </View>
                </ScrollView> */}

                {/* <ButtonWrapper>
                    <Button
                        style={{ width: '47%' }}
                        backgroundColor={lighten(0.1, 'red')}
                        onPress={() => {
                            setVisible(true);
                        }}
                    >
                        {i18n.t('cancel')}
                    </Button>
                    <Button
                        style={{ width: '47%' }}
                        backgroundColor={theme.color.secondary}
                        onPress={acceptCredentials}
                        disabled={inputs.length > 0 && selectedCredentials.some((credential) => credential === null)}
                    >
                        {`${i18n.t('accept')}`}
                    </Button>
                </ButtonWrapper> */}
                <ButtonsWrapper>
                    <EmailButton onPress={acceptCredentials}
                        onShowUnderlay={() => isBtnPress1(true)} onHideUnderlay={() => isBtnPress1(false)} theme={theme}>
                        <Texto style={{ color: theme.color.primary }} btnPressed={btnPress1}>{i18n.t('accept')}</Texto>
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

const ImageStyled = styled.Image``;

const Container = styled.View`
    width: ${Dimensions.get('window').width}px;
    height: 100%;
    align-items: center;
`;

const CredentialItem = styled.TouchableOpacity``

// const ButtonWrapper = styled.View`
//     flex-direction: row;
//     margin-top: 25px;
//     width: 90%;
//     position: relative;
//     justify-content: space-between;
// `;

const ButtonsWrapper = styled.View`
align-items: center;
`

const ViewStyled = styled.View``;

const Title = styled.Text`
    font-size: 16px;
    font-weight: 500;
    color: ${props => props.color};
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

export default PresentCredentials;
