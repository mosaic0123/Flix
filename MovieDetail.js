import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  Image,
} from 'react-native'
import * as api from './api'

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1
  },
  poster: {
    flex: 1
  },
  backdropView: {
    height: 120,
    width: 320,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  headline: {
    fontSize: 45,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white'
  },
})

const MovieDetail = ({ movie }) => (
  <View style={styles.imageContainer}>
    <Image style={styles.poster} source={{uri: api.getPosterUrl(movie.poster_path)}}>
      <View style={styles.backdropView}>
        <Text style={styles.headline}>{movie.title}</Text>
      </View>
    </Image>
  </View>
)

MovieDetail.propTypes = {
  movie: React.PropTypes.object.isRequired,
}

export default MovieDetail
