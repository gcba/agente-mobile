import { transparentize } from 'polished';
import React, { useState } from 'react';
import { ActivityIndicator, Dimensions, Image } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { Video, ResizeMode } from 'expo-av';
import ZkSyncIcon from '../assets/icons/ZkSyncIcon';
import { AntDesign } from '@expo/vector-icons';
import Popup from './Popup';
import i18n from '../locale';

const Loading = ({closeConnection}) => {
    const theme = useTheme();
    const [PopupVisible, setPopupVisible] = useState(false);

    return (
        <ItemContainer style={{ backgroundColor: theme.color.primary }}>
            <Popup title={i18n.t('closeConnection')} description={i18n.t('closeConnectionMessage')}
                acceptHandler={() => closeConnection() } declineHandler={()=>{setPopupVisible(false)}} visible={PopupVisible} warning={true} />
            
            <ItemWrapper>
                <ImageContainer image={theme.images.logo} />
                <TextWrapper>
                    <Title style={{ color: theme.color.secondary }}>{i18n.t("loading.processing")}</Title>
                    <Description theme={theme}>{i18n.t("loading.message")}</Description>
                </TextWrapper>
                <Video
                    source={require('../assets/animations/loading.mp4')}
                    resizeMode={ResizeMode.CONTAIN}
                    isLooping
                    shouldPlay
                    style={{ width: Dimensions.get('window').width, height: 200, maxWidth: 200 }}
                />
                <TextWrapper>
                    {closeConnection && <CloseIconWrapper 
                        onPress={() =>setPopupVisible(true)}
                    >
                        <AntDesignStyled name="close" size={24} color="black" />
                    </CloseIconWrapper>}
                    <PoweredBy>powered by</PoweredBy>
                    <ZkSyncIcon />
                </TextWrapper>
            </ItemWrapper>

        </ItemContainer>
    );
};

const ItemContainer = styled.View`
    width: ${Dimensions.get('window').width}px;
    height: ${Dimensions.get('screen').height.toFixed(0)}px;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    
`;

const ItemWrapper = styled.View`
  flex: 1;
  padding-top: 16px;
  padding-bottom: 86px;
  justify-content: space-between;
  align-items: center;
`;

const CloseIconWrapper = styled.TouchableOpacity`
    margin-bottom: 40px;
    border: solid black 1px;
    padding: 10px;
    border-radius: 50px;
`;

const AntDesignStyled = styled(AntDesign)``;

const TextWrapper = styled.View`
  align-items: center;
`;

const ImageContainer = styled.Image.attrs((props) => ({
    resizeMode: "contain",
    source: props.image,
}))`
  width: 120px;
  height: 24px;
`;

const Title = styled.Text`
text-align: center;
font-size: 20px;
font-style: normal;
font-family: Manrope-Bold;
line-height: 25px; 
padding-bottom: 16px;
`;

const Description = styled.Text`
color: ${props => { props.theme.color.font }};
text-align: center;
font-size: 14px;
font-style: normal;
font-family: Manrope-Regular;
line-height: 17.5px;
letter-spacing: 0.14px;
`;

const PoweredBy = styled.Text`
color: #B4B7C6;
text-align: center;
font-size: 14px;
font-style: normal;
font-family: Manrope-Regular;
line-height: 17.5px;
letter-spacing: 0.14px;
padding-bottom: 16px;
`;


export default Loading;
