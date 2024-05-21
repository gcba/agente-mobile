// Libs
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { backgrounds, transparentize } from 'polished';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { Alert, BackHandler, Dimensions, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

// Contexts
import BasicLayout from '../../components/BasicLayout';
import ListLayout from '../../components/ListLayout';
// import { useStorageProvider } from '../../contexts/StorageContext';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import app from '../../../app.json';
import Button from '../../components/Button';
import CredentialAbstract from '../../components/CredentialAbstract';
import { useApplicationStore } from '../../contexts/useApplicationStore';
import i18n from '../../locale';
import { TouchableHighlight } from 'react-native-gesture-handler';
import ScanIcon from '../../assets/icons/ScanIcon';
import { LinearGradient } from 'expo-linear-gradient';
import { formatField, isImgUrl } from '../../utils';
import validator from 'validator';

interface CredentialsProps {
    navigation: NavigationProp<any>;
    route: RouteProp<any, any>;
}

const Credentials: FC<CredentialsProps> = ({ navigation, route }) => {
    const theme: any = useTheme();
    const [btnPress, isBtnPress] = useState(false);
    const { credentials } = useApplicationStore((state) => ({
        credentials: state.credentials,
    }));
    const [sortedCreds, setSortedCreds] = useState([])
    const [selected, setSelected] = useState(-1)

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            return false;
        });

        return () => backHandler.remove();
    }, []);

    useEffect(() => {
                if (!!route.params?.credentialId) {
            const credential = credentials.find((credential) => credential.data.id === route.params?.credentialId);
            if (credential) {
                navigation.navigate('CredentialDetails', {
                    credential,
                    remove: true,
                });
            } else {
                Alert.alert(i18n.t('credentialsScreen.deleted'), i18n.t('credentialsScreen.deletedDescription'));
            }
        }
    }, [route.params?.credentialId]);

    useEffect(() => {
        const creds = [...credentials]
        setSortedCreds(creds.sort((a, b) => {
            if (typeof a?.data?.issuer === 'object' && typeof b?.data?.issuer === 'object') {
                return (a?.data?.issuer > b?.data?.issuer) ? 1 : ((b?.data?.issuer > a?.data?.issuer) ? -1 : 0)
            } else if (typeof a?.data?.issuer === 'string' && typeof b?.data?.issuer === 'string') {
                return (a?.data?.issuer > b?.data?.issuer) ? 1 : ((b?.data?.issuer > a?.data?.issuer) ? -1 : 0)
            } else if (typeof a?.data?.issuer === 'object' && typeof b?.data?.issuer === 'string') {
                return -1
            } else {
                return 1
            }
        }))
            }, [credentials])

    return (
        <BasicLayout headerStyle={{ width: '100%' }}>
            {sortedCreds ? <ListLayout
                title={i18n.t('credentialsScreen.title')}
                data={sortedCreds}
                windowSize={50}
                contentContainerStyle={{ paddingTop: 10 }}
                onPressButton={() => navigation.navigate('AddCredential')}
                ItemSeparatorComponent={(e) => {
                    console.log(e.leadingItem)
                    return (<Separator />)//style={{ marginBottom: e.index == selected ? 25 : e.index == selected ? 0 : -35 }}/>)
                }}
                RenderItemComponent={({ item, index, separators }) => {

                    const goToCredential = () => {
                        navigation.navigate('CredentialDetails', {
                            credential: item,
                            remove: true,
                            color: item?.styles?.text?.color,
                        });
                    }

                    const properties = useMemo(() => {
                        return item.display?.properties
                            ?.map((prop) => {
                                const value = formatField(item.data, prop);
                                if (!validator.isDataURI(value) && !isImgUrl(value)) {
                                    return {
                                        label: prop.label,
                                        value,
                                    };
                                }
                            })
                            .filter((prop) => prop);
                    }, [item]);

                    return (<ViewStyled style={{ flexDirection: 'column', position:'relative', bottom: 75*index + ((selected !== -1 && selected !== index && selected < index) ? -90 : 0)}}>
                        <TouchableOpacityStyled style={{ width: '100%', elevation:0 == index ? 0 : 30,borderRadius:10, borderTopWidth:0,shadowColor: "#000",
                        shadowOffset: {width: 0,height: 3,},shadowOpacity: 0.27,shadowRadius: 4.65,}} activeOpacity={0.8} onPress={() => {
                            setSelected(selected === index ? -1 : index)
                            separators.updateProps('trailing', {
                                trailingItem: item, highlighted: false, index: index
                            })
                        }}>
                            <CredentialAbstract disabled credential={item} remove />
                        </TouchableOpacityStyled>
                        {selected === index ? <ViewStyled style={{
                            flexDirection: 'column',
                            width: '95%', backgroundColor: 'white', borderBottomLeftRadius: 10,
                            borderBottomRightRadius: 10, alignItems: 'center'
                        }}>
                            {/* <HeaderText style={{ color: theme.color.secondary, marginTop: 20, marginBottom: 10 }} numberOfLines={1} ellipsizeMode="tail">
                                {formatField(item.data, item.display.title)}
                            </HeaderText> 
                            <Separator style={{ margin: 5, height: 2, backgroundColor: theme.color.primary }} /> */}
                            <ListLayout
                                data={[...properties.slice(0, 3),  { button: true, label: i18n.t('more') }]}
                                //data={[{label:'holaaaaaaaaaaaaaaaaaaa', value:'holaaaaaaaaaaaaaaaaaaa'}, {label:'ho', value:'hol'}, {label:'holaaaaaaaaaaaaaaaaaaa', value:'holaaaaaaaaaaaaaaaaaaa'}, { button: true, label: i18n.t('more') }]}
                                numColumns={2}
                                contentContainerStyle={{marginHorizontal:30, width:'100%'}}
                                ItemSeparatorComponent={() => <Separator style={{ margin: 5, height: 2, backgroundColor: theme.color.primary }} />}
                                columnWrapperStyle={{ marginHorizontal:20, marginVertical: 10, justifyContent: 'space-between' }}
                                RenderItemComponent={({ item }) => {
                                    return (item?.button ? <TouchableOpacityStyled onPress={() => { goToCredential() }} style={{ backgroundColor: '#EFEFEF', borderColor: theme.color.secondary, justifyContent: 'center', borderWidth: 1, marginLeft: 20, borderRadius: 25 }}>
                                        <HeaderText
                                            style={{
                                                fontFamily: 'Manrope-Regular',
                                                fontSize: 15,
                                                color: theme.color.secondary,
                                                paddingHorizontal: 8
                                            }}
                                        >
                                            {item.label}
                                        </HeaderText>
                                    </TouchableOpacityStyled> : <ViewStyled style={{ flexDirection: 'column', alignItems: 'flex-start', width:'47%'}}>
                                        <HeaderText
                                            style={{
                                                fontFamily: 'Manrope-Regular',
                                                fontSize: 13,
                                                color: theme.color.secondary,
                                                width:'100%',
                                            }}
                                            numberOfLines={1} ellipsizeMode="tail"
                                        >
                                            {item.label}
                                        </HeaderText>
                                        <HeaderText style={{ fontSize: 15, color: theme.color.secondary, width:'100%'}} numberOfLines={1} ellipsizeMode="tail">
                                            {item.value}
                                        </HeaderText>
                                    </ViewStyled>)
                                }}
                            />
                        </ViewStyled> : null}
                    </ViewStyled>)
                }}
                EmptyComponent={() => (
                    <>
                        <LinearGradient
                            style={{ height: '60%', width: '90%', borderRadius: 25, justifyContent: 'center', alignItems: 'center', top: 50, position: 'absolute' }}
                            colors={
                                ['rgba(123,209,224,1)', 'rgba(226,188,43,1)']
                            }
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }}>
                            <ViewStyled style={{ height: '99%', width: '99%', backgroundColor: theme.color.primary, borderRadius: 25, flexDirection: 'column'}}>
                                {/* <ViewStyled style={{ borderRadius: 100, justifyContent: 'center', alignItems: 'center', padding: 10, backgroundColor: theme.color.secondary, marginBottom: 10 }}>
                                    <ScanIcon name="scan" size={18} color={theme.color.primary} />
                                </ViewStyled> */}
                                <EmptyText color={theme.color.font}>{i18n.t('credentialsScreen.empty')}</EmptyText>
                            </ViewStyled>
                        </LinearGradient>
                        {/* <IoniconsStyled
                            name="wallet"
                            size={60}
                            color={transparentize(0.6, 'black')}
                            style={{
                                marginBottom: 20,
                            }}
                        />
                        <EmptyText>{i18n.t('credentialsScreen.empty')}</EmptyText> */}
                        <ButtonsWrapper style={{ position: 'absolute', bottom: 10 }}>
                            <SendButton onPress={() => navigation.navigate('AddCredential')}
                                onShowUnderlay={() => isBtnPress(true)} onHideUnderlay={() => isBtnPress(false)} theme={theme}>
                                <ViewStyled >
                                    <ScanIcon name="scan" size={22} color={theme.color.primary} />
                                    <Texto style={{ color: theme.color.primary, marginLeft: 5 }} btnPressed={btnPress}>{i18n.t('credentialsScreen.add')}</Texto>
                                </ViewStyled>
                            </SendButton>
                        </ButtonsWrapper>
                    </>
                )}
            /> : null}
        </BasicLayout>
    );
};

const Separator = styled.View`
    width: 100%;
`;

const TouchableOpacityStyled = styled.TouchableOpacity`
`;

const IoniconsStyled = styled(Ionicons)``;
const ViewStyled = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;
const AntDesignStyled = styled(AntDesign)``;
const TextStyled = styled.Text`
    color: white;
    margin-left: 5px;
`;
const EmptyText = styled.Text`
    color: ${props => props.color};
    text-align: center;
    font-size: 20px;
    width: 65%;    
`;

const ButtonsWrapper = styled.View`
align-items: center;
`

const Texto = styled.Text`
    text-align: center;
    font-family: Manrope-Bold;
    font-size: 16px;
    font-style: normal;
    line-height: 20px;
    letter-spacing: 0.32px;
`

const SendButton = styled(TouchableHighlight)`
display: flex;
height: 52px;
justify-content: center;
align-items: center;
gap: 10px;
width: ${Dimensions.get('window').width - 64}px;
border-radius: 50px;
background: #404267;
`;

const HeaderText = styled.Text`
    font-size: 20px;
    line-height: 25px;
    font-family: Manrope-Bold;
`;

export default Credentials;
