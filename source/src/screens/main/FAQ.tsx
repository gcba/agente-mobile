// Imports
import React, { FC, useEffect, useState } from 'react';
import i18n from '../../locale';

// Components
import { NavigationProp } from '@react-navigation/native';
import BasicLayout from '../../components/BasicLayout';
import styled, { useTheme } from 'styled-components/native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { FlatList, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import ArrowAccordion from "../../assets/icons/ArrowAccordion"

interface FAQProps {
    navigation: NavigationProp<any>;
}

const FAQ: FC<FAQProps> = ({ navigation }) => {
    const theme = useTheme();
    const [questions, setQuestions] = useState([])
    const [selected, setSelected] = useState(-1)

    useEffect(() => {
        const qs = []
        for (let index = 0; index < 7; index++) {
            qs.push({ "title": i18n.t(`settingsScreen.faq.questions.${index}.title`), "description": i18n.t(`settingsScreen.faq.questions.${index}.description`) })
        }
        setQuestions(qs)
    }, [])

    return (
        <BasicLayout
            contentStyle={{
                paddingTop: 32,
                paddingBottom: 32
            }}
            onlyTitle
            onBack={() => navigation.goBack()}
        >
            <Title>{i18n.t(`settingsScreen.faq.title`)}</Title>
            <FlatListStyled
                data={questions}
                renderItem={({ item, index }) => (
                    <>
                        <Item key={index} onPress={() => { selected == index ? setSelected(-1) : setSelected(index) }}
                            selected={selected == index}>
                            <ItemContentWrapper>
                                <Texto style={{ color: theme.color.secondary, maxWidth: '80%', fontFamily: 'Manrope-Medium' }}>{item.title}</Texto>
                                <IconWrap>
                                <ArrowAccordion color={theme.color.font} style={{ transform: [{ rotate: selected == index ? '180deg' : '0deg' }] }} />
                                </IconWrap>
                            </ItemContentWrapper>
                        </Item>
                        {selected == index && <DescriptionWrapper theme={theme}>
                            <Texto style={{fontFamily: 'Manrope-Regular', color: theme.color.font}} theme={theme}>{item.description}</Texto>
                        </DescriptionWrapper>}
                    </>
                )}
                showsVerticalScrollIndicator={true}
                contentContainerStyle={{
                    paddingBottom: 10,
                    alignItems: "center",
                    width: "100%"
                }}
                scrollEnabled={true}
                style={{
                    width: '100%'
                }}
                numColumns={1}
                keyExtractor={(item, index) => index}
            />
            {/* {questions.map((e, i) => (
                <>
                    <Item key={i} onPress={() => { selected == i ? setSelected(-1) : setSelected(i) }}
                        style={{ backgroundColor: selected == i ? theme.color.secondary : "#E6EBF0", }}
                        underlayColor={theme.color.primary} selected={selected == i}>
                        <ItemContentWrapper>
                            <Texto theme={theme}>{e.title}</Texto>
                            <AntDesignStyled name={selected == i ? "minus" : "plus"} size={20} color={theme.color.font} />
                        </ItemContentWrapper>
                    </Item>
                    {selected == i && <DescriptionWrapper theme={theme}>
                        <Texto theme={theme}>{e.description}</Texto>
                    </DescriptionWrapper>}
                </>
            ))} */}
        </BasicLayout>
    );
};

const FlatListStyled = styled(FlatList)``;
const AntDesignStyled = styled(AntDesign)``;

const Item = styled(TouchableOpacity)`
    border-radius: 12px;
    border-bottom-left-radius: ${props => (props.selected ? 0 : "12px")}
    border-bottom-right-radius: ${props => (props.selected ? 0 : "12px")}
    width: ${Dimensions.get('window').width - 64}px;
    margin-bottom: ${props => (props.selected ? 0 : '8px')};
    padding: 16px;
    background-color: #fff;
`;

const ItemContentWrapper = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const DescriptionWrapper = styled.View`
    flex-direction: row;
    width: ${Dimensions.get('window').width - 64}px;
    padding: 16px;
    padding-top: 8px;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-radius: 12px;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    margin-bottom: 8px;
`;

const Texto = styled.Text`
color: #404267;
font-size: 15px;
font-style: normal;
line-height: 18.75px; 
letter-spacing: 0.15px;
max-width: 100%;
`
const IconWrap = styled.View`
    padding: 8px;
`
const Title = styled.Text`
color: #404267;
text-align: center;
font-family: Manrope-Bold;
font-size: 20px;
font-style: normal;
line-height: 25px;
padding-bottom: 32px;
`
export default FAQ;
