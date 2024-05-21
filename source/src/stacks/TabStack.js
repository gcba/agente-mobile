import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { transparentize } from 'polished';
import { Dimensions } from 'react-native';
import React, { useCallback, useEffect, useMemo } from 'react';
import { Platform, TouchableOpacity, View } from 'react-native';
import { CopilotStep, copilot, walkthroughable } from 'react-native-copilot';
import styled, { useTheme } from 'styled-components/native';
import { shallow } from 'zustand/shallow';
import { useApplicationStore } from '../contexts/useApplicationStore';
import i18n from '../locale';
import { StateType } from '../models';
import Credentials from '../screens/main/Credentials';
import Entities from '../screens/main/Entities';
import WalletIcon from '../assets/icons/WalletIcon';
import EntitiesIcon from '../assets/icons/EntitiesIcon';
import NotificationsIcon from '../assets/icons/NotificationsIcon';
import SettingsIcon from '../assets/icons/SettingsIcon';
import ScanIcon from '../assets/icons/ScanIcon';
import Notifications from '../screens/main/Notifications';
import Settings from '../screens/main/Settings';
import ExportKeys from '../screens/main/ExportKeys';
import ShareDID from '../screens/main/ShareDID';
import ResetApp from '../screens/main/Reset';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FAQ from '../screens/main/FAQ';

const TabWrapper = styled.View`
    justify-content: center;
    align-items: center;
    position: relative;
`;

const CopilotWrapper = walkthroughable(TabWrapper);

const Tab = createBottomTabNavigator();
const ButtonScreen = () => null;

const SettingsStack = createNativeStackNavigator();

function SettingsStackNavigator() {
    return (
        <SettingsStack.Navigator screenOptions={{ headerShown: false }}>
            <SettingsStack.Screen name="SettingsMain" component={Settings} options={{ headerShown: false }} />
            <SettingsStack.Screen name="ExportKeys" component={ExportKeys} />
            <SettingsStack.Screen name="ShareDID" component={ShareDID} />
            <SettingsStack.Screen name="ResetApp" component={ResetApp} />
            <SettingsStack.Screen name="FAQ" component={FAQ} />
        </SettingsStack.Navigator>
    );
}

const TabStack = ({ start, copilotEvents, route }) => {
    const { state, tutorial, notifications } = useApplicationStore((state) => ({ state: state.state, tutorial: state.tutorial, notifications: state.notifications }), shallow);
    const theme = useTheme();

    const notificationsCount = useMemo(() => notifications.filter((notification) => !notification.read).length, [notifications]);

    useEffect(() => {        
        async function startTutorial() {
            if (state !== StateType.UNAUTHENTICATED && await tutorial.get()) {
                setTimeout(() => {
                    start();
                }, 500);
            }
        }
        startTutorial()
    }, [state]);

    const finishTutorial = useCallback(async () => {
        tutorial.skip();
    }, []);

    useEffect(() => {
        copilotEvents.on('stop', finishTutorial);
        return () => {
            copilotEvents.off('stop', finishTutorial);
        };
    }, []);

    return (
        <Tab.Navigator
            initialRouteName="Credentials"
            backBehavior='initialRoute'
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: true,
                tabBarInactiveTintColor: theme.color.secondary,
                tabBarActiveTintColor: '#FFF',
                tabBarStyle: {
                    paddingBottom: Platform.OS === 'android' ? 10 : 15,
                    paddingTop: Platform.OS === 'android' ? 8 : 15,
                    height: Platform.OS === 'android' ? 65 : 80,
                    bottom: Platform.OS === 'android' ? 0 : 25,
                    backgroundColor: theme.color.primary,
                    shadowOpacity: 0, // iOS Shadow
                    shadowRadius: 0, // iOS Shadow
                    shadowOffset: { height: 0, width: 0 }, // iOS Shadow
                    elevation: 0, // Android Shadow
                    borderTopWidth: 0, // Potential line at the top of the tabBar
                    position: 'relative',
                    paddingHorizontal: 0,
                    width: '100%',
                },
            }}
        >
            <Tab.Screen
                name="ScanButton"
                component={ButtonScreen}
                options={({ navigation }) => ({
                    tabBarLabel: () => null,
                    tabBarIcon: ({ color, size }) => (
                        <CopilotStep order={3} text={i18n.t('tabStack.scanMessage')} name={i18n.t('scanScreen.title')}>
                            <CopilotWrapper>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('Scan')}
                                    activeOpacity={0.5}
                                    >
                                    <TabWrap style={{ backgroundColor: color === '#FFF' ? theme.color.secondary : theme.color.primary }}>
                                        <ScanIcon
                                            name="scan"
                                            size={size}
                                            color={color}
                                            />
                                    </TabWrap>
                                </TouchableOpacity>
                            </CopilotWrapper>
                        </CopilotStep>
                    ),
                })}
            />
            <Tab.Screen
                name="Entities"
                component={Entities}
                options={{
                    tabBarLabel: () => null,
                    tabBarIcon: ({ color, size }) => (
                        <CopilotStep order={2} text={i18n.t('tabStack.entitiesMessage')} name={i18n.t('entitiesScreen.title')}>
                            <CopilotWrapper>
                                <TabWrap style={{ backgroundColor: color === '#FFF' ? theme.color.secondary : theme.color.primary }}>
                                    <EntitiesIcon
                                        name="entities"
                                        size={size}
                                        color={color}
                                    />
                                </TabWrap>
                            </CopilotWrapper>
                        </CopilotStep>
                    ),
                }}
            />
            <Tab.Screen
                name="Credentials"
                component={Credentials}
                options={{
                    tabBarLabel: () => null,
                    tabBarIcon: ({ color, size }) => (
                        <CopilotStep text={i18n.t('tabStack.credentialsMessage')} order={1} name={i18n.t('credentialsScreen.title')} active={true}>
                            <CopilotWrapper>
                                <TabWrap style={{ backgroundColor: color === '#FFF' ? theme.color.secondary : theme.color.primary }}>
                                    <WalletIcon
                                        name="credentials"
                                        size={size}
                                        color={color}
                                    />
                                </TabWrap>
                            </CopilotWrapper>
                        </CopilotStep>
                    ),
                }}
            />
            <Tab.Screen
                name="Notificaitons"
                component={Notifications}
                options={{
                    tabBarLabel: () => null,
                    tabBarIcon: ({ color, size }) => (
                        <CopilotStep text={i18n.t('tabStack.notificationsMessage')} order={4} name={i18n.t('notificationsScreen.title')} active={true}>
                            <CopilotWrapper>
                                <TabWrap style={{ backgroundColor: color === '#FFF' ? theme.color.secondary : theme.color.primary }}>
                                    <NotificationsIcon
                                        name="notifications"
                                        size={size}
                                        color={color}
                                    />
                                    {notificationsCount > 0 && (
                                        <NotificationCircle
                                            style={{
                                                position: 'absolute',
                                                top: 4,
                                                right: 8,
                                                backgroundColor: color === '#FFF' ? theme.color.primary : theme.color.secondary,
                                                borderRadius: 10,
                                                width: 10,
                                                height: 10,
                                                justifyContent: 'center',
                                                alignItem: 'center',
                                            }} />
                                    )}
                                </TabWrap>
                            </CopilotWrapper>
                        </CopilotStep>
                    ),
                }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsStackNavigator}
                options={{
                    tabBarLabel: () => null,
                    tabBarIcon: ({ color, size }) => (
                        <CopilotStep text={i18n.t('tabStack.settingsMessage')} order={5} name={i18n.t('settingsScreen.title')} active={true}>
                            <CopilotWrapper>
                                <TabWrap style={{ backgroundColor: color === '#FFF' ? theme.color.secondary : theme.color.primary, borderRadius: 12 }}>
                                    <SettingsIcon
                                        name="settings"
                                        size={size}
                                        color={color}
                                    />
                                </TabWrap>
                            </CopilotWrapper>
                        </CopilotStep>
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

const NotificationCircle = styled.View``;
const TouchableOpacityStyled = styled.TouchableOpacity`
`;

const TabText = styled.Text`
    font-size: 12px;
    color: ${(props) => props.color};
`;
const TabWrap = styled.View`
    width: 60px;
    height: 60px;
    align-items: center;
    justify-content: center;
    border-radius: 16px;
`
const ToolTipText = styled.Text`
    font-size: 14px;
    font-family: Manrope-Bold;
    color: ${(props) => props.color};
`;
const ToolTipButtons = styled.View`
display: flex;
flex-direction: row;
justify-content: space-between;
`;

const ToolTip = (props) => {
    const theme = useTheme()
    return (
        <NotificationCircle style={{ justifyContent: 'center', alignItems: 'center' }}>
            <TabText style={{ fontSize: 25, textAlign: 'center', margin: 10 }} color={theme.color.secondary}>{props.currentStep.name}</TabText>
            <TabText style={{ fontSize: 15, textAlign: 'center', width: 150, marginHorizontal: 20 }} color={theme.color.font}>{props.currentStep.text}</TabText>
            <ToolTipButtons style={{ margin: 20 }}>
                {!props.isLastStep && <TouchableOpacityStyled onPress={props.handleStop} style={{ paddingHorizontal: 15, padding: 10, marginHorizontal: 10, borderRadius: 25, alignItems: 'center' }}>
                    <ToolTipText color={theme.color.font}>{props.labels.skip}</ToolTipText>
                </TouchableOpacityStyled>}                
                {!props.isLastStep ? <TouchableOpacityStyled onPress={props.handleNext} style={{ paddingHorizontal: 15, padding: 10, marginHorizontal: 10 ,backgroundColor: theme.color.secondary, borderRadius: 25, alignItems: 'center' }}>
                    <ToolTipText color={theme.color.primary}>{props.labels.next}</ToolTipText>
                </TouchableOpacityStyled> : <TouchableOpacityStyled onPress={props.handleStop} style={{ paddingHorizontal: 40, padding: 10, marginHorizontal: 10 ,backgroundColor: theme.color.secondary, borderRadius: 25, alignItems: 'center' }}>
                    <ToolTipText color={theme.color.primary}>{props.labels.finish}</ToolTipText>
                </TouchableOpacityStyled>}
            </ToolTipButtons>
        </NotificationCircle>
    )
}

export default copilot({
    tooltipStyle: {
        borderRadius: 15,        
    },
    tooltipComponent: ToolTip,
    labels: {
        previous: i18n.t('previous'),
        next: i18n.t('next'),
        skip: i18n.t('skip'),
        finish: i18n.t('done'),
    },
    verticalOffset: Platform.OS === 'android' ? 30 : 10,
    stepNumberComponent: () => null,
})(TabStack);
