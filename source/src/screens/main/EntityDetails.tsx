import * as WebBrowser from 'expo-web-browser';
import { transparentize } from 'polished';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import styled, { useTheme } from 'styled-components/native';
import BasicLayout from '../../components/BasicLayout';
import Button from '../../components/Button';
import i18n from '../../locale';

import { NavigationProp, RouteProp } from '@react-navigation/native';
import EntityHeader from '../../components/EntityHeader';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native';

interface EntityDetailsProps {
    navigation: NavigationProp<any>;
    route: RouteProp<any, any>;
}

const EntityDetails: FC<EntityDetailsProps> = ({ navigation, route }) => {
    const theme = useTheme();
    const entity = useMemo(() => route.params?.entity, []);
    const [btnPress, isBtnPress] = useState(false);

    const redirect = useCallback(async () => {
        WebBrowser.openBrowserAsync(entity.link, {
            toolbarColor: entity.style?.background?.color,
        });
    }, []);

    useEffect(()=>{
        console.log('ent: ', entity)
    },[])

    return (
        <BasicLayout title={i18n.t('entityDetailsScreen.title')} backText={false} onBack={() => navigation.goBack()}>
            <DataWrapper>
                <EntityHeader entityStyles={entity.style} />

                <Content>
                    <Wrapper>
                        <Title color={theme.color.secondary}>{entity.title}</Title>
                        {entity.subtitle && <Subtitle color={theme.color.secondary}>{entity.subtitle}</Subtitle>}
                        <Value color={theme.color.font}>{entity.description}</Value>
                        <Key color={theme.color.secondary}>{i18n.t('entityDetailsScreen.website')}</Key>
                        <Value color={theme.color.font}>{entity.link}</Value>
                        <Key color={theme.color.secondary}>{i18n.t('entityDetailsScreen.contact')}</Key>
                        <Value color={theme.color.font}>{entity.contact}</Value>
                    </Wrapper>
                    {/* <Wrapper
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingBottom: 10,
                        }}
                    > */}
                        <ButtonsWrapper>
                            <SendButton onPress={redirect}
                                onShowUnderlay={() => isBtnPress(true)} onHideUnderlay={() => isBtnPress(false)} theme={theme}>
                                <Texto style={{ color: '#FFF' }} btnPressed={btnPress}>{i18n.t('entityDetailsScreen.button')}</Texto>
                            </SendButton>
                        </ButtonsWrapper>
                        {/* <Button
                            backgroundColor={theme.color.secondary}
                            onPress={redirect}
                            style={{
                                width: '80%',
                            }}
                        >
                            {i18n.t('entityDetailsScreen.button')}
                        </Button> */}
                    {/* </Wrapper> */}
                </Content>
            </DataWrapper>
        </BasicLayout>
    );
};

const Wrapper = styled.View`
    width: 100%;
    position: relative;
    justify-content: center;
    align-items: center;
    text-align:center;
`;

const ButtonsWrapper = styled.View`
align-self: center;
position:absolute;
bottom: 20px;
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

const Content = styled.View`
    width: 100%;
    padding: 20px;
    height: 100%;
    flex: 1;
`;

const Key = styled.Text`
font-size: 24px;
line-height: 25px;
padding: 10px 0;
font-family: Manrope-Bold;
    font-weight: bold;
    text-align:center;
    color: ${props => props.color};
`;

const Value = styled.Text`
font-size: 16px;
line-height: 25px;
font-family: Manrope-Regular;
    margin-bottom: 10px;
    text-align:center;
    color: ${props => props.color};
`;

const Title = styled.Text`
font-size: 24px;
line-height: 25px;
padding: 15px 0;
font-family: Manrope-Bold;
    margin-bottom: 10px;
    text-align:center;
    color: ${props => props.color};
`;

const Subtitle = styled.Text`
font-size: 20px;
line-height: 25px;
padding: 15px 0;
font-family: Manrope-Bold;
    margin-bottom: 10px;
    text-align:center;
    color: ${props => props.color};
`;

const DataWrapper = styled.View`
    align-items: center;
    width: 100%;
    flex: 1;
    position: relative;
`;

export default EntityDetails;
