import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Localization from 'expo-localization';
import { transparentize } from 'polished';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components/native';
import { shallow } from 'zustand/shallow';
import BasicLayout from '../../components/BasicLayout';
import ListLayout from '../../components/ListLayout';

import { useApplicationStore } from '../../contexts/useApplicationStore';
import i18n from '../../locale';
import { useTheme } from 'styled-components/native';
const NotificationItem = ({ item }) => {
    const theme = useTheme();
    const [widthBadge, setWidthBadge] = useState(0);
    const [heightBadge, setHeightBadge] = useState(0);
    const navigation = useNavigation<
        NativeStackNavigationProp<{
            Credentials: { credentialId: string };
        }>
    >();
    const { notification, processMessage } = useApplicationStore((state) => ({
        notification: state.notification,
        processMessage: state.processMessage,
    }));

    const issuer = useMemo(() => item?.extra?.issuer, [item?.data?.issuer]);
    const credential = useMemo(
        () => ({
            id: item?.data?.credentialId,
            title: item?.data?.credentialTitle,
        }),
        [item?.data]
    );

    const onPress = useCallback(() => {
        try {
            notification.read(item.id);
            if (item?.extra?.message) {
                processMessage({ message: item.extra.message });
            }
        } catch (error) {
            console.log(error);
        }
    }, [item]);

    const removeItem = () => {
        try {
            notification.remove(item.id)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <ItemContainer>
            <Item read={item.read} disabled={item.read} activeOpacity={0.5} onPress={onPress}>
                {!item.read && (
                    <Badge>
                        <NewDot />
                        <NewText>{i18n.t('new')}</NewText>
                    </Badge>
                )}
                <TitleNotification read={item.read} numberOfLines={1}>
                    {i18n.t(item.title)}
                    {credential?.title && ' - ' + credential.title}
                </TitleNotification>
                <Body numberOfLines={2}>
                    {i18n.t(item.body)}
                    {item.date && new Date(item.date).toLocaleDateString(Localization.locale.slice(0, 2)) + ' - '}
                    {issuer && ' - ' + (issuer?.name || issuer?.id || issuer)}
                </Body>
            </Item>
            {item.read && (
                <CloseX style={{backgroundColor: theme.color.secondary}} onPress={removeItem}>
                    <TextX>{'x'}</TextX>
                </CloseX>
                // <CloseX onPress={removeItem}
                // onLayout={(event) => {
                //     const { width, height } = event.nativeEvent.layout;
                //     setWidthBadge(width);
                //     setHeightBadge(height);
                // }}
                // height={heightBadge}
                // width={widthBadge}>
                //     <TextStyled>{'x'}</TextStyled>
                //     </CloseX>
            )}
        </ItemContainer>
    );
};

const ItemContainer = styled.View`
    position: relative;
`;

const TextStyled = styled.Text``;

const Notifications = ({ navigation }) => {
    const { notifications } = useApplicationStore(
        (state) => ({
            notifications: state.notifications,
        }),
        shallow
    );
    const theme = useTheme();
    const [today, setToday] = useState([])
    const [lastWeek, setLastWeek] = useState([])
    const [before, setBefore] = useState([])

    useEffect(()=>{
        notifications.map((not) => {
            if (new Date(parseInt(not.id)).toDateString == new Date().toDateString) {
                if(!today.includes(not)){
                    setToday([...today, not])
                }
            } else if ((new Date(parseInt(not.id)).toDateString > new Date(Date.now() - (1*24*60*60*1000)).toDateString) && (new Date(parseInt(not.id)).toDateString < new Date(Date.now() - (7*24*60*60*1000)).toDateString)) {
                if(!lastWeek.includes(not)){
                    setLastWeek([...lastWeek, not])
                }
            } else {
                if(!before.includes(not)){
                    setBefore([...before, not])
                }
            }
        })
    },[])
    return (
        <BasicLayout headerStyle={{ width: '100%' }} backText={false} onBack={() => navigation.goBack()}>
            <Title style={{ color: theme.color.secondary }}>{i18n.t('notificationsScreen.title')}</Title>
            {/* {notifications.length > 0 && <DateWrap>
                <DateTitle theme={theme}>
                    Today / Last 7 days
                </DateTitle>
            </DateWrap>} */}
            {today.length > 0 && <ListLayout
                data={today}
                RenderItemComponent={NotificationItem}
                ListHeaderComponent={()=>{return (<DateTitle theme={theme}>{i18n.t('today')}</DateTitle>)
                }}
                contentContainerStyle={{ paddingBottom: 30, paddingTop: 8 }}
                EmptyComponent={() => (
                    <>
                        <TextStyled style={{ color: theme.color.secondary }}>{i18n.t('notificationsScreen.empty')}</TextStyled>
                    </>
                )}
            />
            }
            {lastWeek.length > 0 && <ListLayout
                data={lastWeek}
                RenderItemComponent={NotificationItem}
                ListHeaderComponent={()=>{return (<DateTitle theme={theme}>{i18n.t('lastWeek')}</DateTitle>)
                }}
                contentContainerStyle={{ paddingBottom: 30, paddingTop: 8 }}
                EmptyComponent={() => (
                    <>
                        <TextStyled style={{ color: theme.color.secondary }}>{i18n.t('notificationsScreen.empty')}</TextStyled>
                    </>
                )}
            />
            }
            {before.length > 0 && <ListLayout
                data={before}
                RenderItemComponent={NotificationItem}
                ListHeaderComponent={()=>{return (<DateTitle theme={theme}>{i18n.t('before')}</DateTitle>)
                }}
                contentContainerStyle={{ paddingBottom: 30, paddingTop: 8 }}
                EmptyComponent={() => (
                    <>
                        <TextStyled style={{ color: theme.color.secondary }}>{i18n.t('notificationsScreen.empty')}</TextStyled>
                    </>
                )}
            />
            }
        </BasicLayout>
    );
};

const IoniconsStyled = styled(Ionicons)``;

const Badge = styled.View`
flex-direction: row;
justify-content: flex-start;
align-items: center;
`;

const Item = styled.TouchableOpacity`
    width: 100%;
    position: relative;
    padding: 16px 24px;
    border-radius: 12px;
    background: white;
    border: 1px ${(props) => (!props.read ? 'rgba(0, 138, 161, 0.30)' : 'transparent')};
`;

const Title = styled.Text`
text-align: center;
font-size: 20px;
line-height: 25px;
padding-top: 17px;
padding-bottom: 32px;
font-family: Manrope-Bold;
`;

const TitleNotification = styled.Text`
color: #404267;
font-size: 14px;
font-style: normal;
font-family: Manrope-Medium;
line-height: 16.1px;
padding-top: ${(props) => (!props.read ? '8px' : '0px')};
`

const Body = styled.Text`
color: #404267;
font-size: 14px;
font-style: normal;
font-family: Manrope-Regular;
line-height: 16.1px;
padding-top: 4px;
`;

const NewText = styled.Text`
color: #008AA1;
font-size: 13px;
font-style: normal;
font-family: Manrope-Regular
line-height: 16.25px;
letter-spacing: 0.39px;
margin-left: 4px;
`
const NewDot = styled.View`
width: 9px;
height: 9px;
background-color: #008AA1;
border-radius: 9px;
`

const CloseX = styled.TouchableOpacity`
position: absolute;
top: -6px;
right: -2px;
background: #000;
padding: 4px 6px;
border-radius: 5px;
`;

const TextX = styled.Text`
color: white;
font-size: 12px;
line-height: 12px;
`
const DateTitle = styled.Text`
color: ${props=>{props.theme.color.font}};
font-size: 14px;
font-style: normal;
font-family: Manrope-Regular;
line-height: 14px;
letter-spacing: 0.14px;
wdith: 100%;
margin-bottom: 10px;
`
const DateWrap = styled.Text`
justify-content: flex-start;
align-items: flex-start;
width: 100%;
padding: 0 32px;
`

export default Notifications;
