// Imports
import React, { FC, useState } from 'react';
import i18n from '../../locale';
import { Image, Modal } from 'react-native';

// Components
import { NavigationProp } from '@react-navigation/native';
import BasicLayout from '../../components/BasicLayout';
import styled, { useTheme } from 'styled-components/native';
import ErrorIcon from "../../assets/icons/ErrorIcon"
import { Dimensions, TouchableOpacity } from 'react-native'

interface ErrorProps {
    navigation: NavigationProp<any>;
}

const Error: FC<ErrorProps> = ({ navigation }) => {
    const theme = useTheme();

    return (
        <BasicLayout
            contentStyle={{
                paddingTop: 32,
                paddingBottom: 32,
                justifyContent: "space-between",
            }}
            onBack={() => navigation.goBack()}
        >
            <TextWrap>
                <Title style={{ color: theme.color.secondary }}>{i18n.t('errorScreen.title')}</Title>
                <Description theme={theme}>{i18n.t('errorScreen.description')}</Description>
            </TextWrap>
            <ErrorIcon />
            <ButtonsWrapper>
                <Button1 onPress={() => navigation.navigate('Credentials')}>
                    <Texto style={{ color: theme.color.secondary }} >{i18n.t('errorScreen.btn1')}</Texto>
                </Button1>
                <Button2 onPress={() => navigation.navigate('Credentials')} theme={theme}>
                    <Texto style={{ color: '#FFF' }} >{i18n.t('errorScreen.btn2')}</Texto>
                </Button2>
            </ButtonsWrapper>

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
const Button1 = styled(TouchableOpacity)`
display: flex;
padding: 16px 40px;
justify-content: center;
align-items: center;
gap: 10px;
width: ${Dimensions.get('window').width - 64}px;
border-radius: 50px;
background: #DEE6EF;
margin-bottom: 16px;
`;

const Button2 = styled(TouchableOpacity)`
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
const ButtonsWrapper = styled.View`
align-items: center;
`
export default Error;
