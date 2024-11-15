import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import colors from '../utils/colors';
import {icons, images} from '../assets';
import fonts from '../assets/fonts';
import Strings from '../utils/strings';

const NotificationPermission: React.FC = ({navigation}) => {
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {}, []);

  const requestNotificationPermission = async () => {
    if (Platform.OS === 'ios') {
      // Request permission on iOS
      const authStatus = await PushNotificationIOS.requestPermissions({
        alert: true,
        badge: true,
        sound: true,
      });

      if (authStatus.alert || authStatus.badge || authStatus.sound) {
        setPermissionGranted(true);
        navigation.navigate('Dashboard');
      } else {
        setPermissionGranted(false);
      }
    } else if (Platform.OS === 'android') {
      // Request permission on Android
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        {
          title: Strings.permissions.notificationTitle,
          message: Strings.permissions.notificationMessage,
          buttonNeutral: Strings.permissions.notificationButtonNeutral,
          buttonNegative: Strings.permissions.notificationButtonNegative,
          buttonPositive: Strings.permissions.notificationButtonPositive,
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setPermissionGranted(true);
        navigation.navigate('Dashboard');
      } else {
        setPermissionGranted(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image source={images.notification} style={styles.icon} />
      <Text style={styles.title}>{Strings.permissionsScreen.title}</Text>
      <Text style={styles.subtitle}>{Strings.permissionsScreen.subTitle}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={requestNotificationPermission}>
        <Text style={styles.buttonText}>
          {Strings.permissionsScreen.buttonTitle}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.white,
  },
  icon: {
    width: 98,
    height: 98,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.RobotoBold,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  checkmark: {
    fontSize: 20,
    color: 'green',
    marginVertical: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  button: {
    position: 'absolute',
    bottom: 40,
    backgroundColor: colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default NotificationPermission;
