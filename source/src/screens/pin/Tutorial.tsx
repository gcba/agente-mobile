import React, { FC, useState, useRef, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import styled, { useTheme } from 'styled-components/native';
import Button from '../../components/Button';
import i18n from '../../locale';
import { Layout } from '../../styled-components/Layouts';
import app from '../../../app.json';
import { lighten, transparentize } from 'polished';
import { Video, ResizeMode } from 'expo-av';

interface TutorialPinProps {
    navigation: NavigationProp<any>;
}

const TutorialPin: FC<TutorialPinProps> = ({ navigation }) => {
    const theme = useTheme();
    const [currentIndex, setCurrentIndex] = useState(0);
    const onViewableItemsChangedRef = useRef(({ viewableItems }) => {
        setCurrentIndex(viewableItems[0]?.index || 0);
    }).current;

    const viewabilityConfigRef = useRef({ itemVisiblePercentThreshold: 50 }).current;

    const slides = [
        {
            key: 'intro',
            content: () => (
                <ItemWrapper>
                    <ImageContainer image={theme.images.logo} />
                    <ItemInnerWrapper>
                        <Video
                            source={require('../../assets/animations/tutorial1.mp4')}
                            resizeMode={ResizeMode.CONTAIN}
                            isLooping
                            shouldPlay
                            style={{ width: Dimensions.get('window').width, height: 292, maxWidth: 292 }}
                        />
                        <TextWrapper>
                            <Title style={{ color: theme.color.secondary }}>{i18n.t('tutorial.introTitle')}</Title>
                        </TextWrapper>
                    </ItemInnerWrapper>
                </ItemWrapper>
            ),
        },
        {
            key: 'createPin',
            content: () => (
                <ItemWrapper2>
                    <ImageContainer image={theme.images.logo} />
                    <Video
                        source={require('../../assets/animations/tutorial2.mp4')}
                        resizeMode={ResizeMode.CONTAIN}
                        isLooping
                        shouldPlay
                        style={{ width: Dimensions.get('window').width, height: 292, maxWidth: 292 }}
                    />
                    <TextWrapper>
                        <Title style={{ color: theme.color.secondary }}>{i18n.t('pinStack.welcome')}</Title>
                    </TextWrapper>
                    <ButtonWrapper>
                        <Button
                            backgroundColor={'#404267'}
                            color={theme.color.white}
                            style={{
                                paddingTop: 16,
                                paddingBottom: 16,
                                width: Dimensions.get('window').width - 64,
                                borderRadius: 50,
                            }}
                            textStyle={{
                                fontFamily: 'Manrope-Bold',
                                fontSize: 15,
                                letterSpacing: 0.3,
                                lineHeight: 18.75,
                            }}
                            onPress={() => navigation.navigate('CreatePin')}
                        >
                            {i18n.t('introductionStack.start')}
                        </Button>
                    </ButtonWrapper>
                </ItemWrapper2>
            ),
        },
    ];

    const renderItem = ({ item }) => <ItemContainer>{item.content()}</ItemContainer>;

    const bkcolor = app.expo.name == 'RockID' ? { backgroundColor: theme.color.primary } : null;

    return (
        <Layout backgroundColor={'#F3F6F9'} {...bkcolor}>
            <FlatListStyled
                data={slides}
                renderItem={renderItem}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.key}
                onViewableItemsChanged={onViewableItemsChangedRef}
                viewabilityConfig={viewabilityConfigRef}
            />
            {currentIndex !== slides.length - 1 && (
                <BubblesWrapper>
                    {slides.map((_, index) => (
                        <Bubble key={index} active={currentIndex === index} color={theme.color.secondary} />
                    ))}
                </BubblesWrapper>
            )}
        </Layout>
    );
};

// Styled Components
const FlatListStyled = styled.FlatList`
    flex: 1;
`;

const ItemContainer = styled.View`
    width: ${Dimensions.get('window').width}px;
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const ItemWrapper = styled.View`
    flex: 1;
    justify-content: space-between;
    padding-top: 56px;
    padding-bottom: 32px;
    align-items: center;
`;
const ItemInnerWrapper = styled.View`
    flex: 1;
    justify-content: space-evenly;
    align-items: center;
`;

const ItemWrapper2 = styled.View`
    flex: 1;
    justify-content: space-between;
    padding-top: 56px;
    padding-bottom: 32px;
    align-items: center;
`;

const TextWrapper = styled.View`
    align-items: center;
    `;

const ImageContainer = styled.Image.attrs((props) => ({
    resizeMode: 'contain',
    source: props.image,
}))`
    width: 120px;
    height: 40px;
`;

const Title = styled.Text`
    text-align: center;
    font-size: 30px;
    max-width: 270px;
    font-style: normal;
    font-family: Manrope-Bold;
    line-height: 30px;
    padding: 1px;
`;

const Description = styled.Text`
    font-size: 16px;
    color: ${(props) => props.theme.color.font};
    text-align: center;
`;

const ButtonWrapper = styled.View``;

const BubblesWrapper = styled.View`
    position: relative;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    position: absolute;
    bottom: 50px;
`;

const Bubble = styled.View`
    border-radius: 8px;
    border: rgba(43, 2, 94, 0.5);
    height: 8px;
    width: 8px;
    margin: 0 5px;
    background-color: ${(props) => (props.active ? props.color : transparentize(0.9, props.color))};
`;

export default TutorialPin;
