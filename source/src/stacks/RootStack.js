import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Introduction from '../screens/Introduction';
import ConfirmDid from '../screens/did/Confirm';
import CreateDid from '../screens/did/Create';
import AcceptCredentials from '../screens/main/AcceptCredentials';
import AddCredential from '../screens/main/AddCredential';
import AddEntity from '../screens/main/AddEntity';
import Configuration from '../screens/main/Configuration';
import CredentialDetails from '../screens/main/CredentialDetails';
import EntityDetails from '../screens/main/EntityDetails';
import Notifications from '../screens/main/Notifications';
import PresentCredentials from '../screens/main/PresentCredentials';
import Scan from '../screens/main/Scan';
import Settings from '../screens/main/Settings';
import VerificationResult from '../screens/main/VerificationResult';
import ConfirmPin from '../screens/pin/Confirm';
import CreatePin from '../screens/pin/Create';
import TutorialPin from '../screens/pin/Tutorial';
import TabStack from './TabStack';
import ExportKeys from '../screens/main/ExportKeys';
import ShareDID from '../screens/main/ShareDID';
import ResetApp from '../screens/main/Reset';
import FAQ from '../screens/main/FAQ';
import ImageDetails from '../screens/main/ImageDetails';
import PDFDetails from '../screens/main/PDFDetails'
import { useNavigationContainerRef } from '@react-navigation/native';
import Authenticate from '../components/Authenticate';
import { useApplicationStore } from '../contexts/useApplicationStore';
import { shallow } from 'zustand/shallow';
import LoadingScreen from '../screens/LoadingScreen';

const PinStack = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={'TutorialPin'} component={TutorialPin} />
            <Stack.Screen name={'CreatePin'} component={CreatePin} />
            <Stack.Screen name={'ConfirmPin'} component={ConfirmPin} />
        </Stack.Navigator>
    );
};

const DidStack = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen options={{animation: 'none'}} name={'CreateDid'} component={CreateDid} />
            <Stack.Screen options={{animation: 'none'}} name={'ConfirmDid'} component={ConfirmDid} />
        </Stack.Navigator>
    );
};

const MainStack = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={'TabStack'} component={TabStack} />
            <Stack.Screen name={'Scan'} component={Scan} />
            <Stack.Screen name={'Configuration'} component={Configuration} />
            <Stack.Screen name={'AddEntity'} component={AddEntity} />
            <Stack.Screen name={'CredentialDetails'} component={CredentialDetails} />
            <Stack.Screen name={'AddCredential'} component={AddCredential} />
            <Stack.Screen name={'EntityDetails'} component={EntityDetails} />
            <Stack.Screen name={'AcceptCredentials'} component={AcceptCredentials} options={{ gestureEnabled: false }} />
            <Stack.Screen name={'PresentCredentials'} component={PresentCredentials} options={{ gestureEnabled: false }} />
            <Stack.Screen name={'VerificationResult'} component={VerificationResult} />
            <Stack.Screen name={'Settings'} component={Settings} />
            <Stack.Screen name={'Notifications'} component={Notifications} />
            <Stack.Screen name={'ExportKeys'} component={ExportKeys} />
            <Stack.Screen name={'ShareDID'} component={ShareDID} />
            <Stack.Screen name={'ResetApp'} component={ResetApp} />
            <Stack.Screen name={'FAQ'} component={FAQ} />
            <Stack.Screen name={'ImageDetails'} component={ImageDetails} />
            <Stack.Screen name={'PDFDetails'} component={PDFDetails} />
        </Stack.Navigator>
    );
};

const RootStack = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name={'Loading'} component={LoadingScreen} />
            <Stack.Screen name={'PinStack'} component={PinStack} />
            <Stack.Screen name={'Authenticate'} component={Authenticate} />
            <Stack.Screen name={'DidStack'} component={DidStack} />
            <Stack.Screen name={'MainStack'} component={MainStack} />
        </Stack.Navigator>
    );
};

export default RootStack;
