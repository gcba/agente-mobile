// Imports
import React, { FC, useState } from 'react';

// Components
import { Platform, TouchableHighlight, View } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import i18n from '../locale';
import { NavigationProp } from '@react-navigation/native';

interface SingleTitleAndBtnProps {
    navigation: NavigationProp<any>;
    title: string;
    description: string;
    circleContent: any;
    handler: () => void;
    btnText: string;
    warning?: boolean;
}

const SingleTitleAndBtn: FC<SingleTitleAndBtnProps> = ({
    navigation,
    title,
    description,
    circleContent,
    handler,
    btnText,
    warning,
}) => {
    const theme = useTheme();

    const [btnPress, isBtnPress] = useState(false);
    return (
        <>
            <Texto style={{ fontSize: 30, fontFamily: "Manrope-Bold", color: warning ? "#C93B3B" : theme.color.secondary }} theme={theme}>{title}</Texto>
            <Texto theme={theme} style={{ fontSize: 19 }}>{description}</Texto>
            <Circle warning={warning} style={Platform.OS === 'android' ? { elevation: 4, shadowColor: "rgba(0,0,0,0.6)" } : { boxShadow: '0px 4px 5px rgba(0,0,0,0.15)' }}>
                {circleContent}
            </Circle>
            <Item onPress={handler} underlayColor={warning ? "#C93B3B" : theme.color.tertiary} warning={warning}
                onShowUnderlay={() => isBtnPress(true)} onHideUnderlay={() => isBtnPress(false)} theme={theme}>
                <ItemContentWrapper>
                    {warning && <IoniconsStyled name="trash-outline" size={20} color={btnPress ? "white" : "#C93B3B"} />}
                    <Texto style={{ color: btnPress ? (warning ? "white" : theme.color.secondary) : (warning ? "#C93B3B" : "white") }} theme={theme} btnPressed={btnPress}>{btnText}</Texto>
                </ItemContentWrapper>
            </Item>
            <TextWrapper>
                <Texto style={{ fontFamily: "Manrope-Regular" }} theme={theme}>{i18n.t('settingsScreen.faq.moreInfo')}</Texto>
                <Texto onPress={async () => { navigation.navigate('FAQ'); }} style={{ color: "#246BFC", fontFamily: "Manrope-Regular" }} theme={theme}>{i18n.t('settingsScreen.faq.title')}</Texto>
            </TextWrapper>
            <SpaceWrapper/>
        </>
    )
}

const IoniconsStyled = styled(Ionicons)``;

const ItemContentWrapper = styled.View`
    flex-direction: row;
    justify-content: center;
    width: 45%;
    padding: 10px 45px 10px 45px;
    align-items: center;
`;

const TextWrapper = styled.View`
    align-items: center;
`;

const Texto = styled.Text`
    font-size: 14px;
    width: 95%;
    text-align: center;
    font-family: Manrope-SemiBold;
    color: ${props => props.theme.color.font}
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

const Item = styled(TouchableHighlight)`
    align-items: center;
    border-radius: 50px;
    border: 2px solid ${(props) => (props.warning ? "#C93B3B" : props.theme.color.secondary)};
    background-color: ${(props) => props.warning ? "white" : props.theme.color.secondary};
`;


export default SingleTitleAndBtn;