import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {News} from '../api/newsApi';
import colors from '../utils/colors';

interface Props {
  news: News;
}

const NewsItem: React.FC<Props> = ({news}) => {
  const formattedDate = new Date(news.datetime).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <View style={styles.container}>
      <Image source={{uri: news.image}} style={styles.image} />
      <View style={styles.textContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.source}>{news.source.toUpperCase()}</Text>
          <Text style={styles.date}>
            {formattedDate}
          </Text>
        </View>
        <Text style={styles.headline} numberOfLines={2}>
          {news.headline}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 16,
    paddingBottom: 16,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Aligns source on the left and date on the right
    alignItems: 'center',
    marginBottom: 4,
  },
  source: {
    fontSize: 12,
    color: colors.textSecondary,
    flex: 1, // Allows source to take up space on the left
  },
  date: {
    fontSize: 10,
    color: colors.textSecondary,
    textAlign: 'right', // Align text within its own container
  },
  headline: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
    marginTop: 4,
  },
});

export default NewsItem;
