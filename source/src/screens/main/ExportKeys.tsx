// Imports
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import React, { FC, useState } from 'react';
import { Image } from 'react-native';
import i18n from '../../locale';
import { Dimensions, TouchableHighlight } from 'react-native';

// Components
import { NavigationProp } from '@react-navigation/native';
import BasicLayout from '../../components/BasicLayout';
import styled, { useTheme } from 'styled-components/native';
import { useApplicationStore } from '../../contexts/useApplicationStore';
import { shallow } from 'zustand/shallow';
// import { FontAwesome } from '@expo/vector-icons';
import SingleTitleAndBtn from '../../components/SingleTitleAndBtn';
import ExportDataIcon from "../../assets/icons/ExportDataIcon"

interface ExportKeysProps {
    navigation: NavigationProp<any>;
}

const ExportKeys: FC<ExportKeysProps> = ({ navigation }) => {
    const theme = useTheme();
    const [btnPress1, isBtnPress1] = useState(false);
    const [btnPress2, isBtnPress2] = useState(false);

    const { did } = useApplicationStore((state) => ({ did: state.did, reset: state.reset }), shallow);

    const exportHandler = async () => {
        try {
            const exportedKeys = await did.export();
            const fileUri = FileSystem.documentDirectory + `keys-backup`;
            await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(exportedKeys));
            await Sharing.shareAsync(fileUri);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <BasicLayout
                contentStyle={{
                    paddingTop: 32,
                    paddingBottom: 32,
                    justifyContent: "space-between",
                }}
                onlyTitle
                onBack={() => navigation.goBack()}
            >
                <TextWrapper>
                    <Title style={{ color: theme.color.secondary }}>{i18n.t('settingsScreen.export.title')}</Title>
                    <SubTitle style={{ color: theme.color.secondary }}>{i18n.t('settingsScreen.export.description')}</SubTitle>
                </TextWrapper>
                <ExportDataIcon />
                <ButtonsWrapper>
                    <SendButton onPress={exportHandler}
                        onShowUnderlay={() => isBtnPress2(true)} onHideUnderlay={() => isBtnPress2(false)} theme={theme}>
                        <Texto style={{ color: '#FFF' }} btnPressed={btnPress2}>{i18n.t('settingsScreen.export.btn2')}</Texto>
                    </SendButton>
                    <TextWrapper style={{ marginTop: 20 }}>
                        <Info style={{ color: theme.color.secondary }}>{i18n.t('settingsScreen.faq.moreInfo')}</Info>
                        <RedirectInfo onPress={() => {
                            navigation.navigate('FAQ');
                        }} style={{ color: "#4682B4" }}>{i18n.t('settingsScreen.faq.title')}</RedirectInfo>
                    </TextWrapper>
                </ButtonsWrapper>
            </BasicLayout>
        </>
    );
};

const ImageStyled = styled(Image)``;

const TextWrapper = styled.View`
    align-items: center;
`;

const ButtonsWrapper = styled.View`
align-items: center;
`

const Title = styled.Text`
text-align: center;
font-family: Manrope-Bold;
font-size: 20px;
font-style: normal;
line-height: 25px;
margin-bottom:20px;
`

const SubTitle = styled.Text`
text-align: center;
font-family: Manrope-Medium;
font-size: 15px;
font-style: normal;
line-height: 25px;
`

const Info = styled.Text`
text-align: center;
font-family: Manrope-Regular;
font-size: 14px;
line-height: 25px;
`

const RedirectInfo = styled.Text`
text-align: center;
font-family: Manrope-Regular;
font-size: 14px;
line-height: 25px;
`

const Texto = styled.Text`
    text-align: center;
    font-family: Manrope-Bold;
    font-size: 16px;
    font-style: normal;
    line-height: 20px;
    letter-spacing: 0.32px;
`

const Circle = styled.View`
    width: 150px;
    height: 150px
    background-color: ${props => props.warning ? "#C93B3B" : "white"};
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const SpaceWrapper = styled.View`
    width: 150px;
    height: 100px
`;

const EmailButton = styled(TouchableHighlight)`
display: flex;
height: 52px;
justify-content: center;
align-items: center;
gap: 10px;
width: ${Dimensions.get('window').width - 64}px;
border-radius: 50px;
background: #fff;
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
background: #404267;
`;

export default ExportKeys;
