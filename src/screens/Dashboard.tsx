import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {fetchNews, News} from '../api/newsApi';
import NewsItem from '../components/NewsItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../utils/colors';
import fonts from '../assets/fonts';
import Strings from '../utils/strings';

const Dashboard: React.FC = () => {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string | null>(null);

  useEffect(() => {
    loadData();
    loadUserName();
  }, []);

  const loadData = async () => {
    try {
      const data = await fetchNews();
      console.log('data: ', data);
      setNews(data);
      // setError('Something went wrong. Please try again later.');
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const loadUserName = async () => {
    const storedFirstName = await AsyncStorage.getItem('userFirstName');
    if (storedFirstName) {
      setFirstName(storedFirstName);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.greeting}>
          {Strings.greeting(firstName || 'User')}
        </Text>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.greeting}>
          {Strings.greeting(firstName || 'User')}
        </Text>
        <FlatList
          data={news}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
              <NewsItem news={item} />
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor, // Dark background
    paddingHorizontal: 16,
  },
  greeting: {
    fontSize: 32,
    fontFamily: fonts.RobotoBold,
    color: colors.white,
    marginBottom: 20,
  },
  error: {
    fontSize: 16,
    fontFamily: fonts.RobotoRegular,
    color: colors.white,
    marginBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.bgColor,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: colors.error,
  },
});

export default Dashboard;
