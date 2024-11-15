import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { images } from '../assets'; // Import the logo

const Splash: React.FC = ({ navigation }) => {
    useEffect(() => {
        // Simulate loading or initialization, such as fetching data or user settings
        const timer = setTimeout(() => {
            navigation.replace("LegalName"); // Navigate to the next screen
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Image source={images.logo} style={styles.logo} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000', // Set background color to black
    },
    logo: {
        width: 188, // Adjust width to match the design
        height: 188, // Adjust height to match the design
        resizeMode: 'contain', // Make sure the image scales correctly
    },
});

export default Splash;
