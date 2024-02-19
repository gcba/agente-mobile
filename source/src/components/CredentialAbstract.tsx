import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Localization from 'expo-localization';
import { transparentize } from 'polished';
import React, { FC, useMemo, useState } from 'react';
import { Dimensions } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import i18n from '../locale';
import { CredentialManifestStyles } from '../models';
import { formatField, validateDate } from '../utils';

interface CredentialAbstractProps {
    credential: any;
    minimal?: boolean;
    remove?: boolean;
    disabled?: boolean;
    style?: CredentialManifestStyles;
    children?: any;
    onLayout?: (event: any) => void;
}

const CredentialAbstract: FC<CredentialAbstractProps> = ({ remove, children, credential, style, disabled, minimal, ...props }) => {
    const navigation = useNavigation<
        NativeStackNavigationProp<{
            CredentialDetails: any;
        }>
    >();
    const theme = useTheme();
    const data = useMemo(() => credential?.data, [credential]);
    const credentialStyles = useMemo(() => credential?.styles, [credential]);
    const display = useMemo(() => credential?.display, [credential]);
    const defaultChildren = useMemo(
        () => <EntypoStyled name="chevron-thin-right" size={22} color={transparentize(0.5, credentialStyles?.text?.color || 'black')} />,
        []
    );

    const [logo, setLogo] = useState<any>({
        width: '50%',
        height: 35,
        opacity: 0,
        enabled: true,
    });

    return (
        <Container
            activeOpacity={0.5}
            disabled={disabled || !data}
            onPress={() => {
                data &&
                    navigation.navigate('CredentialDetails', {
                        credential,
                        remove,
                        color: credentialStyles?.text?.color,
                    });
            }}
            expired={validateDate(data?.expirationDate)}
            style={{
                ...style,
                borderWidth: !credentialStyles?.background?.color && !credentialStyles?.hero?.uri ? 1 : 0,
                borderColor: validateDate(data?.expirationDate)
                    ? 'red'
                    : !credentialStyles?.background?.color
                    ? transparentize(0.2, theme.color.tertiary)
                    : 'transparent',
                height: data ? (minimal ? 'auto' : Dimensions.get('window').width * 0.4) : 'auto',
            }}
            color={transparentize(0.8, theme.color.tertiary)}
            {...props}
        >
            {credentialStyles?.hero?.uri && (
                <ImageStyled
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: 5,
                        zIndex: 2,
                    }}
                    source={{
                        uri: credentialStyles.hero.uri,
                    }}
                />
            )}
            {minimal ? (
                <Wrapper
                    style={{
                        opacity: data ? 1 : 0.5,
                        zIndex: 3,
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        flexDirection: 'row',
                    }}
                >
                    {credentialStyles?.thumbnail?.uri && (
                        <ImageStyled
                            source={{ uri: logo.enabled ? credentialStyles?.thumbnail?.uri : 'https://i.ibb.co/Krv9jRg/Quark-ID-iso.png' }}
                            style={{ height: 35, width: 35, marginRight: 10 }}
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
                    <Some>
                        <Row>
                            <Title
                                style={{
                                    ...theme?.font.subtitle,
                                    color: credentialStyles?.text?.color || 'black',
                                }}
                                ellipsizeMode={'tail'}
                                numberOfLines={1}
                            >
                                {data ? formatField(data, display?.title) || '' : i18n.t('presentCredentialsScreen.empty')}
                            </Title>
                            {data?.expirationDate && (
                                <Expiration
                                    style={{
                                        ...theme?.font.text,
                                        color: credentialStyles?.text?.color || 'black',
                                    }}
                                    ellipsizeMode={'tail'}
                                    numberOfLines={1}
                                >
                                    {data
                                        ? i18n.t('acceptCredentialsScreen.expiration') +
                                          ': ' +
                                          new Date(data?.expirationDate).toLocaleDateString(Localization.locale.slice(0, 2))
                                        : i18n.t('presentCredentialsScreen.message')}
                                </Expiration>
                            )}
                            {validateDate(data?.expirationDate) && <Expired>{i18n.t('expired')}</Expired>}
                        </Row>
                    </Some>
                </Wrapper>
            ) : (
                <Wrapper
                    style={{
                        opacity: data ? 1 : 0.5,
                        zIndex: 3,
                    }}
                >
                    {data && (
                        <Row>
                            <ViewStyled style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                                <ImageStyled
                                    source={{ uri: logo.enabled ? credentialStyles?.thumbnail?.uri : 'https://i.ibb.co/Krv9jRg/Quark-ID-iso.png' }}
                                    style={{ height: 35, width: 35, marginRight: 10 }}
                                    resizeMode="contain"
                                    onError={(e) => {
                                        setLogo((logo) => ({
                                            ...logo,
                                            enabled: false,
                                        }));
                                    }}
                                />

                                <Title
                                    style={{
                                        ...theme?.font.subtitle,
                                        color: credentialStyles?.text?.color || 'black',
                                        flex: 0.75,
                                        textAlign: 'right',
                                    }}
                                    ellipsizeMode={'tail'}
                                    numberOfLines={1}
                                >
                                    {data?.issuer?.name || data?.issuer?.id || data?.issuer}
                                </Title>
                            </ViewStyled>
                        </Row>
                    )}

                    <Row>
                        <Title
                            style={{
                                ...theme?.font.subtitle,
                                color: credentialStyles?.text?.color || 'black',
                            }}
                            ellipsizeMode={'tail'}
                            numberOfLines={1}
                        >
                            {data ? formatField(data, display?.title) || '' : i18n.t('presentCredentialsScreen.empty')}
                        </Title>

                        {data?.expirationDate && (
                            <Expiration
                                style={{
                                    ...theme?.font.text,
                                    color: credentialStyles?.text?.color || 'black',
                                }}
                                ellipsizeMode={'tail'}
                                numberOfLines={1}
                            >
                                {data
                                    ? i18n.t('acceptCredentialsScreen.expiration') +
                                      ': ' +
                                      new Date(data?.expirationDate).toLocaleDateString(Localization.locale.slice(0, 2))
                                    : i18n.t('presentCredentialsScreen.message')}
                            </Expiration>
                        )}

                        {validateDate(data?.expirationDate) && <Expired>{i18n.t('expired')}</Expired>}
                    </Row>
                </Wrapper>
            )}
            <Children
                style={{
                    zIndex: 3,
                    bottom: minimal ? 'auto' : 15,
                }}
            >
                {children || defaultChildren}
            </Children>
        </Container>
    );
};

const Some = styled.View``;

const ImageStyled = styled.Image``;

const EntypoStyled = styled(Entypo)``;

const ViewStyled = styled.View``;

const Wrapper = styled.View`
    width: 100%;
    height: 100%;
    position: relative;
    flex: 1;
    justify-content: space-between;
`;
const Children = styled.View`
    position: absolute;
    right: 10px;
`;

const Row = styled.View`
    justify-content: space-between;
    width: 100%;
    position: relative;
`;

const Title = styled.Text`
    font-weight: bold;
`;

const Expired = styled.Text`
    color: red;
    font-weight: bold;
`;

const Expiration = styled.Text`
    font-size: 12px;
`;

const Container = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    position: relative;
    padding: 15px 15px;
    border-radius: 5px;
    width: 100%;
    opacity: ${(props) => (props.expired ? 0.8 : 1)};
    position: relative;
    box-shadow: 0 0 5px ${transparentize(0.8, 'black')};
    elevation: 1;
    background-color: white;
`;

export default CredentialAbstract;
