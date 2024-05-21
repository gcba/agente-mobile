import React, { useState } from 'react';

import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { transparentize } from 'polished';
import { Dimensions, Text, View } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import BasicLayout from '../../components/BasicLayout';
import List from '../../components/List';
import i18n from '../../locale';

import { shallow } from 'zustand/shallow';
import Button from '../../components/Button';
import EntityItem from '../../components/EntityItem';
import { useApplicationStore } from '../../contexts/useApplicationStore';
import ListLayout from '../../components/ListLayout';
import ScanIcon from '../../assets/icons/ScanIcon';
import { TouchableHighlight } from 'react-native-gesture-handler';

const AddCredential = ({ navigation }) => {
    const theme = useTheme();
    const [btnPress, isBtnPress] = useState(false);
    const { entities } = useApplicationStore(
        (state) => ({
            entities: state.entities,
        }),
        shallow
    );

    return (
        <BasicLayout
            title={i18n.t('addCredentialScreen.title')}
            contentStyle={{
                paddingBottom: 30,
                paddingTop: 10,
                alignItems: 'center'
            }}
            backText={false}
            onBack={() => navigation.goBack()}
        >
            {/* <Text
                    style={{
                        textAlign: 'center',
                        marginTop: 10,
                        color: transparentize(0.4, 'black'),
                    }}
                >
                    {i18n.t('addCredentialScreen.entityTitle')}
                </Text> */}

            <ListLayout
                title={i18n.t('addCredentialScreen.entityTitle')}
                showsVerticalScrollIndicator={true}
                data={entities}
                numColumns={2}
                columnWrapperStyle={{
                    justifyContent: 'space-between',
                    width: '100%',
                    height: '100%',
                }}
                EmptyComponent={() => (
                    <>
                        <FontAwesome name="building" size={50} color={transparentize(0.5, 'black')} />
                        <Text style={{ color: transparentize(0.5, 'black') }}>{i18n.t('entitiesScreen.empty')}</Text>
                    </>
                )}
                contentContainerStyle={{
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    paddingTop: 15,
                    width: '100%',
                }}
                RenderItemComponent={({ item }) => <EntityItem data={item} navigation={navigation} />}
            />


            <ButtonsWrapper style={{ position: 'absolute', bottom: 50 }}>
                <Texto
                    style={{
                        textAlign: 'center',
                        marginBottom: 10,
                        marginTop: 20,
                        color: transparentize(0.4, 'black'),
                    }}
                >
                    {i18n.t('addCredentialScreen.scanTitle')}
                </Texto>
                <SendButton onPress={() => navigation.navigate('Scan')}
                    onShowUnderlay={() => isBtnPress(true)} onHideUnderlay={() => isBtnPress(false)} theme={theme}>
                    <ViewStyled >
                        <ScanIcon name="scan" size={22} color={theme.color.primary} />
                        <Texto style={{ color: theme.color.primary, marginLeft: 5 }} btnPressed={btnPress}>{i18n.t('credentialsScreen.add')}</Texto>
                    </ViewStyled>
                </SendButton>
            </ButtonsWrapper>

            {/* <ButtonWrapper>
                    <Button
                        backgroundColor={theme.color.secondary}
                        onPress={() => navigation.navigate('Scan')}
                        style={{
                            width: '100%',
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <MaterialIcons name="qr-code-scanner" size={20} color={'white'} style={{ marginRight: 5 }} />
                            <Text
                                style={{
                                    color: 'white',
                                }}
                            >
                                {i18n.t('addCredentialScreen.button')}
                            </Text>
                        </View>
                    </Button>
                </ButtonWrapper> */}
        </BasicLayout>
    );
};

const Container = styled.View`
    align-items: center;
    width: 100%;
    justify-content: space-between;
`;

const ViewStyled = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
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

const ButtonWrapper = styled.View`
    width: ${Dimensions.get('window').width * 0.8}px;
`;

export default AddCredential;
