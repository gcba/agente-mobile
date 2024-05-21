import { AntDesign, Entypo, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import * as Font from 'expo-font';
import * as Notifications from 'expo-notifications';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { Dimensions, StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import PolyfillCrypto from 'react-native-webview-crypto';
import { ThemeProvider } from 'styled-components/native';
import BottomLine from './src/components/BottomLine';
import stylesConfig from './src/config/styles';
import { AppProvider } from './src/contexts/AppContext';
import './src/locale';
import RootStack from './src/stacks/RootStack';
import { theme as styles } from './src/theme';
import LoadingScreen from './src/screens/LoadingScreen';
const cacheFonts = (fonts) => {
    return fonts.map((font) => Font.loadAsync(font));
};

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

const getNotificationPermissions = async () => {
    await Notifications.requestPermissionsAsync({
        ios: {
            allowAlert: true,
            allowBadge: true,
            allowSound: true,
            allowAnnouncements: true,
        },
    });
};

const Providers = ({ children }) => {
    const colorScheme = useColorScheme();
    const [theme, setTheme] = useState(colorScheme === 'light' ? styles.light : styles.dark);

    useEffect(() => {
        setTheme(colorScheme === 'light' ? styles.light : styles.dark);
    }, [colorScheme]);

    return (
        <GestureHandlerRootView style={{ ...containerStyles, backgroundColor: theme.color.primary }}>
            <SafeAreaProvider initialWindowMetrics={initialWindowMetrics}>
                <ThemeProvider theme={theme}>
                    <NavigationContainer>
                        <AppProvider>
                            <PolyfillCrypto />
                            {children}
                        </AppProvider>
                    </NavigationContainer>
                </ThemeProvider>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
};

const App = () => {
    const [appIsReady, setAppIsReady] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Manage loading state

    useEffect(() => {
        async function loadResourcesAndDataAsync() {
            try {
                SplashScreen.preventAutoHideAsync();
                const fontAssets = cacheFonts([
                    FontAwesome.font,
                    Entypo.font,
                    AntDesign.font,
                    MaterialIcons.font,
                    Ionicons.font,
                    { 'Manrope-Bold': require('./src/assets/fonts/Manrope-Bold.ttf') },
                    { 'Manrope-SemiBold': require('./src/assets/fonts/Manrope-SemiBold.ttf')},
                    {'Manrope-Regular': require('./src/assets/fonts/Manrope-Regular.ttf')},
                    {'Manrope-Medium': require('./src/assets/fonts/Manrope-Medium.ttf')},
                    {'RobotoMono-Regular': require('./src/assets/fonts/RobotoMono-Regular.ttf')}

                ]);
                await Promise.all([...fontAssets]);
            } catch (e) {
                console.warn(e);
            } finally {
                setAppIsReady(true);
                SplashScreen.hideAsync();
                // Don't automatically set isLoading to false here if you want to show the video first
            }
        }

        loadResourcesAndDataAsync();
        getNotificationPermissions();
    }, []);

    if (!appIsReady) {
        return null;
    }

    return (
        <Providers>
            <StatusBar backgroundColor={stylesConfig.style.primaryColor} barStyle={stylesConfig.style.statusBar} />
            {/* {isLoading ? (
                // Render the VideoScreen and pass a method to hide loading once video is done
                <LoadingScreen onVideoEnd={() => setIsLoading(false)} />
            ) : (
                // Once loading is complete, proceed with the rest of your app
                <> */}
                    <RootStack />
                    <BottomLine />
                {/* </> */}
            {/* )} */}
        </Providers>
    );
};

const containerStyles = StyleSheet.create({
    flex: 1,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    position: 'relative',
});

export default App;
