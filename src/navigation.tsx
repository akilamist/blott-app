import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Dashboard from './screens/Dashboard';
import NotificationPermission from './screens/NotificationPermission';
import LegalName from './screens/LegalName';
import Splash from './screens/Splash';

const Stack = createStackNavigator();

const AppNavigator: React.FC = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="NotificationPermission" component={NotificationPermission} />
            <Stack.Screen name="LegalName" component={LegalName} />
        </Stack.Navigator>
    </NavigationContainer>
);

export default AppNavigator;
