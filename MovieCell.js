import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  Image,
} from 'react-native'
import * as api from './api'
import ProgressiveImage from './ProgressiveImage'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    borderWidth: 1,
    borderColor: 'rgb(225, 229, 232)',
  },
  textContainer: {
    flex: 1,
    borderWidth: 0,
    borderColor: 'rgb(214, 230, 55)',
    justifyContent: 'space-around',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  overview: {
    fontSize: 12,
    color: 'rgb(152, 152, 152)'
  },
  poster: {
    // borderWidth: 1,
    // borderColor: 'rgb(119, 78, 184)',
    marginRight: 10,
    width: 100,
    height: 100,
  },
})

const MovieCell = ({ movie }) => (
  <View style={styles.container}>
    <ProgressiveImage
      style={styles.poster}
      resizeMode="contain"
      resizeMethod="resize"
      sourceHigh={{ uri: api.getPosterUrl(movie.poster_path) }}
      sourceLow={{ uri: api.getPosterUrlLow(movie.poster_path) }}
    />
    <View style={styles.textContainer}>
      <Text style={styles.title} numberOfLines={1}>{movie.title}</Text>
      <Text style={styles.overview} >{movie.overview }</Text>
    </View>
  </View>
)

MovieCell.propTypes = {
  movie: React.PropTypes.object.isRequired,
}

export default MovieCell
