import 'react-native-gesture-handler'; // Must be at the top
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './navigation';
import { enableScreens } from 'react-native-screens';

enableScreens();

const App: React.FC = () => {
    return (
        <SafeAreaProvider>
            <AppNavigator />
        </SafeAreaProvider>
    );
};

export default App;
