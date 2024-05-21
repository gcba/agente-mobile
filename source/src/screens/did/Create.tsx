import { Entypo } from '@expo/vector-icons';
import axios from 'axios';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { lighten, transparentize } from 'polished';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, Dimensions, Platform } from 'react-native';
import Picker from 'react-native-picker-select';
import { useWebViewMessage } from 'react-native-react-bridge';
import WebView from 'react-native-webview';
import styled, { useTheme } from 'styled-components/native';
import { shallow } from 'zustand/shallow';
import Button from '../../components/Button';
import WebModule from '../../components/WebModule';
import agentConfig from '../../config/agent';
import stylesConfig from '../../config/styles';
import { useApplicationStore } from '../../contexts/useApplicationStore';
import i18n from '../../locale';
import { Layout } from '../../styled-components/Layouts';
import CreateAccountIcon from "../../assets/icons/CreateAccountIcon"
import Popup from '../../components/Popup';
interface CreateDidProps { }

const CreateDid: FC<CreateDidProps> = () => {
    const theme = useTheme();
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [isBbsBlsCreated, setIsBbsBlsCreated] = useState(true);
    const { did } = useApplicationStore((state) => ({ did: state.did }), shallow);
    const [didMethods, setDidMethods] = useState<string[]>([agentConfig.didMethod]);
    const multiMethod = useMemo(() => stylesConfig.features.find((e) => e.name === 'multi-method'), []);
    const [didMethodSelected, setDidMethodSelected] = useState(() => (!multiMethod ? agentConfig.didMethod : ''));
    const [PopupVisible, setPopupVisible] = useState(false);
    const [PopupTitle, setPopupTitle] = useState('Error');
    const [PopupDescription, setPopupDescription] = useState(i18n.t('errorDescription'));


    const { setIsLoading } = useApplicationStore((state) => ({ setIsLoading: state.setIsLoading }), shallow);

    const { ref, onMessage, emit } = useWebViewMessage(async (message: { type: string; data: any }) => {
        switch (message.type) {
            case 'sendBbsBlsSecrets':
                setIsBbsBlsCreated(true);
                setLoading(true);
                try {
                    await did.create(didMethodSelected || agentConfig.didMethod, [message.data]);
                } catch (error) {
                    setIsBbsBlsCreated(false);
                    setPopupTitle(i18n.t('Error'))
                    setPopupDescription(i18n.t('didStack.errorMessage'))
                    setPopupVisible(true)
                    //Alert.alert('Error', i18n.t('didStack.errorMessage'));
                } finally {
                    setLoading(false);
                }
                break;
            default:
                break;
        }
    });

    const getMethods = useCallback(async () => {
        setFetching(true);
        try {
            const { data } = await axios.get(agentConfig.universalResolverUrl + '/mappings');
            const sorted = data.list.sort((a: any) => (a.pattern === agentConfig.didMethod ? -1 : 1)).map((e) => e.pattern);
            setDidMethods(sorted);
        } catch (error) {
            console.log(error);
        }
        setFetching(false);
    }, []);

    useEffect(() => {
        if (multiMethod) {
            getMethods();
        }

        if (Platform.OS === 'ios') {
            setIsBbsBlsCreated(false);
        } else {
            setIsLoading(true);
            setTimeout(() => {
                setIsBbsBlsCreated(false);
                setIsLoading(false);
            }, 2000);
        }
    }, []);

    const onCreate = useCallback(async () => {
        setLoading(true);
        try {
            emit({ type: 'getBbsBlsSecrets' } as any);
        } catch (error) {
            setPopupTitle(i18n.t('Error'))
            setPopupDescription(i18n.t('didStack.errorMessage'))
            setPopupVisible(true)
            //Alert.alert('Error', i18n.t('didStack.errorMessage'));
            setLoading(false);
        }
    }, [didMethodSelected, did]);

    const onImport = useCallback(async () => {
        setLoading(true);
        try {
            const document = await DocumentPicker.getDocumentAsync();
            if (document.type === 'success') {
                const file = JSON.parse(await FileSystem.readAsStringAsync(document.uri));
                did.import(file);
            }
        } catch (error) {
            setPopupTitle(i18n.t('Error'))
            setPopupDescription(i18n.t('errorDescription'))
            setPopupVisible(true)
            //Alert.alert('Error', i18n.t('errorDescription'));
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <Layout
            backgroundColor={theme.color.primary}
            style={{
                paddingTop: Platform.OS === 'ios' ? 0 : 10,
            }}
        >
            <Popup title={PopupTitle} description={PopupDescription}
                acceptHandler={() => { setPopupVisible(false) }} visible={PopupVisible} warning={true} />
            <ItemContainer>
                <ItemWrapper>
                    <ImageWrapper>
                        <CreateAccountIcon />
                    </ImageWrapper>
                    <TextWrapper>
                        <Title style={{ color: theme.color.secondary }}>{i18n.t('didStack.createDid')}</Title>
                        <Description theme={theme} style={{ ...theme.font.subtitle }}>{i18n.t('didStack.haveDid')}</Description>
                    </TextWrapper>
                </ItemWrapper>
                {multiMethod && (
                    <PickerWrapper>
                        <PickerLabel>{i18n.t('didStack.methodPlaceholder')}:</PickerLabel>
                        <PickerStyled
                            onValueChange={(value) => setDidMethodSelected(value)}
                            items={didMethods.map((method) => ({
                                label: method,
                                value: method,
                            }))}
                            placeholder={{ label: i18n.t('didStack.method'), value: null }}
                            disabled={loading || fetching}
                            useNativeAndroidPickerStyle={false}
                            fixAndroidTouchableBug
                        />
                    </PickerWrapper>
                )}
                {!isBbsBlsCreated && <WebViewStyled ref={ref} source={{ html: WebModule }} onMessage={onMessage} />}

                <ButtonWrapper>
                    <TouchableOpacityStyled
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row',
                            marginBottom: 24,
                        }}
                        disabled={loading || fetching}
                        onPress={onImport}
                    >
                        <TextStyled style={{color: theme.color.secondary}}>{i18n.t('didStack.import')}</TextStyled>
                    </TouchableOpacityStyled>
                    <Button
                        backgroundColor={"#404267"}
                        color={theme.color.white}
                        style={{
                            paddingTop: 16,
                            paddingBottom: 16,
                            width: (Dimensions.get('window').width - 64),
                            borderRadius: 50
                        }}
                        textStyle={{
                            fontFamily: 'Manrope-Bold',
                            fontSize: 16,
                            letterSpacing: 0.32,
                            lineHeight: 20
                        }}
                        loading={loading || fetching}
                        onPress={onCreate}
                        disabled={!didMethodSelected}
                    >
                        {i18n.t('didStack.create')}
                    </Button>

                </ButtonWrapper>
            </ItemContainer>
        </Layout>
    );
};

const WebViewStyled = styled(WebView)``;

const PickerStyled = styled(Picker)``;

const PickerWrapper = styled.View`
    flex-direction: row;
    align-items: center;
`;

const PickerLabel = styled.Text`
    color: ${lighten(0.4, 'black')};
    margin-right: 5px;
`;

const TouchableOpacityStyled = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    flex-direction: row;
    margin-top: 10px;
`;

const TextStyled = styled.Text`
    text-align: center;
    font-size: 16px;
    font-family: Manrope-Medium;
    line-height: 20px;
    letter-spacing: 0.32px;
    text-decoration-line: underline;
`;

const EntypoStyled = styled(Entypo)``;

const ImageWrapper = styled.View`
    width: 100%;
    max-width: 192px;
    justify-content: center;
    align-items: center;
    display: flex;
    margin-left: auto;
    margin-right: auto;
    padding-top: 84px;
    padding-bottom: 90px;

`;

const ImageStyled = styled.Image``;

const StepWrapper = styled.View`
    background-color: ${(props) => props.backgroundColor};
    padding: 10px;
    position: absolute;
    bottom: 0;
    left: 50%;
    border-radius: 10px;
`;

const Step = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: #fff;
`;

const ItemContainer = styled.View`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    position: relative;
    padding-bottom: 32px;
`;


const ItemWrapper = styled.View`
    width: 100%;
`;

const TextWrapper = styled.View`
    padding: 0px 20px;
    align-items: center;
`;

const Title = styled.Text`
    font-size: 24px;
    font-family: Manrope-Bold;
    padding-bottom: 18px;
    text-align: center;
    line-height: 30px;
`;
const Description = styled.Text`
    color: ${props=>{props.theme.color.secondary}};
    text-align: center;
    font-size: 14px;
    line-height: 17.5px;
    font-family: Manrope-Regular;
`;

const ButtonWrapper = styled.View`
`;

export default CreateDid;
