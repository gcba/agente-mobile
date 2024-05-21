// Imports
import React, { FC, useState } from 'react';

// Components
import { Modal, Platform, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import i18n from '../locale';
import { NavigationProp } from '@react-navigation/native';
import CloseIcon from "../assets/icons/CloseIcon";
interface PopupProps {
    navigation?: NavigationProp<any>;
    title: string;
    description: string | string[];
    acceptHandler?: () => void;
    declineHandler?: () => void;
    visible: boolean;
    warning?: boolean;
}

const Popup: FC<PopupProps> = ({
    title,
    description,
    acceptHandler,
    declineHandler,
    visible,
    warning    
}) => {
    const theme = useTheme();
    const [btn1Press, isBtn1Press] = useState(false);
    const [btn2Press, isBtn2Press] = useState(false);

    return (
        <ModalStyled visible={visible} transparent={true}>
            <ViewStyled style={{ backgroundColor: '#00000077', flex: 1, justifyContent: 'center' }}>
                <ViewStyled style={{ position: 'relative', backgroundColor: '#ffffff', margin: 32, paddingTop: 40, paddingBottom: 32, paddingLeft: 18, paddingRight: 18, borderRadius: 12 }}>
                    {/* <CloseWrap onPress={() => declineHandler()}>
                        <CloseIcon />
                    </CloseWrap> */}
                    <ViewStyled style={{ width: '100%', alignItems: 'center' }}>
                        <TextStyled style={{ paddingBottom: 24, fontFamily: "Manrope-Bold", fontSize: 18 }} theme={theme}>{title}</TextStyled>
                    </ViewStyled>
                    {Array.isArray(description) ?
                        description.map((desc, index) => (
                            <TextStyled key={index} style={{ color: theme.color.font, fontSize: 15, fontFamily: 'Manrope', lineHeight: 18.75, letterSpacing: 0.15, textAlign: 'center', marginBottom: index !== description.length - 1 ? 18 : 0, paddingLeft: 6, paddingRight: 6 }} theme={theme}>
                                {desc}
                            </TextStyled>
                        )) :
                        <TextStyled style={{ color: theme.color.font, fontSize: 15, fontFamily: 'Manrope', lineHeight: 18.75, letterSpacing: 0.15, textAlign: 'center', paddingLeft: 6, paddingRight: 6 }} theme={theme}>
                            {description}
                        </TextStyled>
                    }

                    <ItemWrapper style={{justifyContent: (acceptHandler == null || declineHandler == null) ? 'center' : 'space-between'}}>
                        { acceptHandler && <Item onPress={() => { isBtn1Press(false); acceptHandler() }} underlayColor={warning ? "#5F5F5F" : "5F5F5F"} warning={warning}
                            onShowUnderlay={() => isBtn1Press(true)} onHideUnderlay={() => isBtn1Press(false)} theme={theme}>
                            <ItemContentWrapper>
                                <ButtonText style={{ color: btn1Press ? (warning ? "#404267" : theme.color.secondary) : (warning ? theme.color.white : "white") }} theme={theme} btnPressed={btn1Press}>{i18n.t('continue')}</ButtonText>
                            </ItemContentWrapper>
                        </Item>}
                        {declineHandler && <Item onPress={() => { isBtn2Press(false); declineHandler() }} underlayColor={warning ? "#5F5F5F" : "#5F5F5F"} warning={!warning}
                            onShowUnderlay={() => isBtn2Press(true)} onHideUnderlay={() => isBtn2Press(false)} theme={theme}>
                            <ItemContentWrapper>
                                <ButtonText style={{ color: btn2Press ? (warning ? theme.color.secondary : 'white') : (warning ? "white" : "#5F5F5F") }} theme={theme} btnPressed={btn2Press}>{i18n.t('cancel')}</ButtonText>
                            </ItemContentWrapper>
                        </Item>}
                    </ItemWrapper>
                </ViewStyled>
            </ViewStyled>
        </ModalStyled>
    )
}

const ModalStyled = styled(Modal)``;
const ViewStyled = styled.View``;
const TextStyled = styled.Text`
    font-family: Manrope-Regular;
    font-size:15px
    color: ${props => props.theme.color.font}
`;
const ButtonText = styled.Text`
text-align: center;
font-family: Manrope-Bold;
font-size: 15px;
font-style: normal;
line-height: 18.75px;
letter-spacing: 0.3px;
`

const ItemContentWrapper = styled.View`
    flex-direction: row;
    justify-content: center;
    padding: 5px ;
    align-items: center;
`;

const ItemWrapper = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top:24px;
`;

const Item = styled(TouchableHighlight)`
    align-items: center;
    border-radius: 50px;
    padding: 0px 15px;
    height: 52px;
    justify-content: center;
    margin-left: 5px;
    background-color: ${(props) => props.warning ? "#B94452" : props.theme.color.secondary};
`;
const CloseWrap = styled(TouchableOpacity)`
    position: absolute;
    right: -16px;
    top: -12px;
`

export default Popup;