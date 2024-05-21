// Imports
import React, { FC, useState } from 'react';
import i18n from '../../locale';
import { Image, Modal } from 'react-native';

// Components
import { NavigationProp } from '@react-navigation/native';
import BasicLayout from '../../components/BasicLayout';
import styled, { useTheme } from 'styled-components/native';
import { useApplicationStore } from '../../contexts/useApplicationStore';
import { shallow } from 'zustand/shallow';
import SingleTitleAndBtn from '../../components/SingleTitleAndBtn';
import Popup from '../../components/Popup';
import ResetAppBigIcon from "../../assets/icons/ResetAppBigIcon"
import { Dimensions, TouchableOpacity } from 'react-native'

interface ResetAppProps {
    navigation: NavigationProp<any>;
}

const ResetApp: FC<ResetAppProps> = ({ navigation }) => {
    const theme = useTheme();

    const [visible, setVisible] = useState(false);
    const [firstPressed, setFirstPressed] = useState(false);

    const { reset } = useApplicationStore((state) => ({ did: state.did, reset: state.reset }), shallow);

    const resetHandler = async () => {
        setFirstPressed(false)
        setVisible(false)
        reset()
    }

    const secondDecline = () => {
        setFirstPressed(false)
        setVisible(false)
    }

    return (
        <BasicLayout
            title={i18n.t('settingsScreen.reset.title')}
            contentStyle={{
                paddingTop: 32,
                paddingBottom: 32,
                justifyContent: "space-between",
            }}
            onlyTitle
            onBack={() => navigation.goBack()}
        >
            <Popup navigation={navigation} title={i18n.t('settingsScreen.reset.popupTitle')} description={firstPressed ? i18n.t('settingsScreen.reset.message2') : i18n.t('settingsScreen.reset.message1')}
                acceptHandler={() => { firstPressed ? resetHandler() : setFirstPressed(true) }} declineHandler={() => { firstPressed ? secondDecline() : setVisible(false) }} visible={visible} warning={true} />
            <TextWrap>
                <Title style={{ color: theme.color.secondary }}>{i18n.t('settingsScreen.reset.title')}</Title>
                <Description theme={theme}>{i18n.t('settingsScreen.reset.description')}</Description>
            </TextWrap>
            <ResetAppBigIcon />
            <ResetButton onPress={() => { setVisible(true) }}
                theme={theme}>
                <Texto style={{color: 'white'}}>{i18n.t('settingsScreen.reset.btn')}</Texto>
            </ResetButton>

        </BasicLayout>
    );
};

const ImageStyled = styled(Image)``;
const TextWrap = styled.View``
const Title = styled.Text`
text-align: center;
font-family: Manrope-Bold;
font-size: 20px;
font-style: normal;
line-height: 25px;
padding-bottom: 16px;
`
const Description = styled.Text`
color: ${props=>{props.theme.color.font}};
text-align: center;
font-family: Manrope-Regular;
font-size: 15px;
font-style: normal;
line-height: 18.75px;
letter-spacing: 0.15px;
`
const ResetButton = styled(TouchableOpacity)`
display: flex;
padding: 16px 40px;
justify-content: center;
align-items: center;
gap: 10px;
width: ${Dimensions.get('window').width - 64}px;
border-radius: 50px;
background: #404267;
`;
const Texto = styled.Text`
color: #5F5F5F;
text-align: center;
font-family: Manrope-Bold;
font-size: 16px;
font-style: normal;
line-height: 20px;
letter-spacing: 0.32px;
`
export default ResetApp;
