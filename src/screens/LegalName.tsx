import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../utils/colors';
import {icons} from '../assets';
import {scaledSize} from '../utils/scale';
import fonts from '../assets/fonts';
import Strings from '../utils/strings';

const LegalName: React.FC = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');

  const validateName = (name: string): boolean => /^[A-Za-z]{2,}$/.test(name);

  const handleSubmit = async () => {
    let isValid = true;

    if (!validateName(firstName.trim())) {
      setFirstNameError(
        'First name must contain only letters and be at least 2 characters long.',
      );
      isValid = false;
    } else {
      setFirstNameError('');
    }

    if (!validateName(lastName.trim())) {
      setLastNameError(
        'Last name must contain only letters and be at least 2 characters long.',
      );
      isValid = false;
    } else {
      setLastNameError('');
    }

    if (isValid) {
      try {
        await AsyncStorage.setItem('userFirstName', firstName);
        await AsyncStorage.setItem('userLastName', lastName);
        navigation.navigate('NotificationPermission');
      } catch (error) {
        console.error('Failed to save your name', error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          <Text style={styles.title}>{Strings.legalNameScreen.title}</Text>
          <Text style={styles.subtitle}>
            {Strings.legalNameScreen.subTitle}
          </Text>

          <TextInput
            style={[styles.input, firstNameError ? styles.inputError : null]}
            placeholder="First name"
            value={firstName}
            onChangeText={setFirstName}
            placeholderTextColor={colors.textSecondary}
          />
          {firstNameError ? (
            <Text style={styles.errorText}>{firstNameError}</Text>
          ) : null}

          <TextInput
            style={[styles.input, lastNameError ? styles.inputError : null]}
            placeholder="Last name"
            value={lastName}
            onChangeText={setLastName}
            placeholderTextColor={colors.textSecondary}
          />
          {lastNameError ? (
            <Text style={styles.errorText}>{lastNameError}</Text>
          ) : null}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Image source={icons.arrowRight} style={styles.buttonIcon} />
        </TouchableOpacity>
      </ScrollView>
      
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between', // Ensures button is at the bottom
  },
  content: {
    padding: 16,
    // marginTop: scaledSize(10),
  },
  title: {
    fontSize: 30,
    fontFamily: fonts.RobotoBold,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 24,
    marginTop: scaledSize(20),
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.border,
    paddingVertical: 20,
    fontSize: 20,
    marginBottom: 10,
    color: colors.textPrimary,
  },
  inputError: {
    borderColor: colors.error,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: colors.primary,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: 16,
    marginBottom: 16,
  },
  buttonIcon: {
    width: 20,
    height: 20,
    tintColor: colors.white,
  },
});

export default LegalName;
