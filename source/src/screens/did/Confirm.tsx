import { lighten } from 'polished';
import React, { FC, useCallback, useState } from 'react';
import { Dimensions, Platform } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { shallow } from 'zustand/shallow';
import Button from '../../components/Button';
import config from '../../config/styles';
import { useApplicationStore } from '../../contexts/useApplicationStore';
import i18n from '../../locale';
import { Layout } from '../../styled-components/Layouts';

interface ConfirmDidProps {}

const ConfirmDid: FC<ConfirmDidProps> = () => {
    const theme = useTheme();
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);
    const { did } = useApplicationStore((state) => ({ did: state.did }), shallow);

    const confirm = useCallback(async () => {
        did.confirm();
    }, []);

    return (
        <Layout
            style={{
                paddingTop: Platform.OS === 'ios' ? 0 : 10,
            }}
        >
            <ItemContainer>
                <ItemWrapper>
                    <ImageContainer backgroundColor={theme.color.primary}>
                        <StepWrapper
                            backgroundColor={theme.color.secondary}
                            style={{
                                transform: [{ translateX: width * -0.5 }, { translateY: height * 0.5 }],
                            }}
                            onLayout={(event) => {
                                const { height, width } = event.nativeEvent.layout;
                                setHeight(height);
                                setWidth(width);
                            }}
                        >
                            <Step>{i18n.t('step').toUpperCase()} 2</Step>
                        </StepWrapper>
                        <ImageWrapper>
                            <ImageStyled
                                style={{
                                    width: '100%',
                                    height: '100%',
                                }}
                                source={config.steps[2]}
                            />
                        </ImageWrapper>
                    </ImageContainer>
                    <TextWrapper>
                        <Title style={{ ...theme.font.title }}>{i18n.t('didStack.success')}</Title>
                        <Description style={{ ...theme.font.subtitle }}>{i18n.t('didStack.createdDid')}</Description>
                    </TextWrapper>
                </ItemWrapper>

                <ButtonWrapper>
                    <Button style={{ width: '100%' }} backgroundColor={theme.color.secondary} color={theme.color.white} onPress={confirm}>
                        {i18n.t('continue')}
                    </Button>
                </ButtonWrapper>
            </ItemContainer>
        </Layout>
    );
};

const StepWrapper = styled.View`
    background-color: ${(props) => props.backgroundColor};
    padding: 10px;
    position: absolute;
    bottom: 0;
    left: 50%;
    border-radius: 10px;
`;
const ImageStyled = styled.Image``;

const ImageWrapper = styled.View`
    width: 70%;
    height: 70%;
    justify-content: center;
    align-items: center;
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
    padding-bottom: 20px;
`;

const ImageContainer = styled.View`
    width: 100%;
    height: ${Dimensions.get('window').height * 0.5}px;
    background-color: ${(props) => props.backgroundColor};
    justify-content: center;
    align-items: center;
    position: relative;
`;

const ItemWrapper = styled.View`
    width: 100%;
`;

const TextWrapper = styled.View`
    padding: 35px 20px;
    align-items: center;
`;

const Title = styled.Text`
    font-size: 20px;
    font-weight: bold;
    padding-bottom: 10px;
    text-align: center;
`;
const Description = styled.Text`
    color: ${lighten(0.4, 'black')};
    text-align: center;
`;

const ButtonWrapper = styled.View`
    width: 80%;
`;

export default ConfirmDid;
