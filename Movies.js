import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  ListView,
  TouchableOpacity,
} from 'react-native'
import MovieCell from './MovieCell'
import * as api from './api'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centering: {
    justifyContent: 'center',
    alignItems: 'center'
  },
})

let likes = 0

class Movies extends React.Component {
  // static propTypes = {
  //   onSelectMovie: React.PropTypes.func.isRequired,
  //   MoviesNowPlaying: React.PropTypes.bool,
  // }

  state = {
    isLoading: true,
    isEmpty: false,
    dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
  }

  componentDidMount() {
    this.fetchMovies()
  }

  componentDidUpdate(){
    console.log("componentDidUpdate")
    console.log(this.props.MoviesNowPlaying)
  }

  // componentDidUpdate() {
  //   if(this.MoviesNowPlaying==true){
  //     this.fetchMovies()
  //   }
  //   else{
  //     this.fetchTopRated()
  //   }
  // }

  fetchMovies() {
    this.setState({ isLoading: true })
    api.fetchMovies().then(results => this.updateRows(results))
      .catch(error => {
        this.setState({ isLoading: false })
        console.error(error)
      })
  }

  fetchTopRated() {
    this.setState({ isLoading: true })
    api.fetchTopRated().then(results => this.updateRows(results))
      .catch(error => {
        this.setState({ isLoading: false })
        console.error(error)
      })
  }

  updateRows(rows){
    this.setState({
      isLoading: false,
      isEmpty: rows.length == 0,
      dataSource: this.state.dataSource.cloneWithRows(rows),
    })
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={[styles.container, styles.centering]}>
          <ActivityIndicator />
        </View>
      )
    } else if (this.state.isEmpty) {
      return (
        <View style={[styles.container, styles.centering]}>
          <Text>No results found.</Text>
        </View>
      )
    }
    console.log('isLoading', this.state.isLoading)
    return (
      <ListView
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={row => (
          <TouchableOpacity onPress={() => this.props.onSelectMovie(row)}>
            <MovieCell movie={row} />
          </TouchableOpacity>
        )}
      />
    )
  }
}

Movies.propTypes = {
    onSelectMovie: React.PropTypes.func.isRequired,
    MoviesNowPlaying: React.PropTypes.bool,
}

export default Movies;
