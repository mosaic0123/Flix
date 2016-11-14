import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  ListView,
  TouchableOpacity,
  RefreshControl,
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
  state = {
    isLoading: false,
    isEmpty: false,
    refreshing: false,
    dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
  }

  componentDidMount() {
    this.fetchMovies()
  }

  componentDidUpdate(){
    this.reloadData()
  }

  reloadData() {
    if(this.props.moviesNowPlaying){
      this.fetchMovies()
    }
    else {
      this.fetchTopRated()
    }
  }

  _onRefresh() {
    this.setState({refreshing: true})
    this.reloadData()
    this.setState({refreshing: false})
  }

  fetchMovies() {
    // this.setState({ isLoading: true })
    api.fetchMovies().then(results => this.updateRows(results))
      .catch(error => {
        this.setState({ isLoading: false })
        console.error(error)
      })
  }

  fetchTopRated() {
    // this.setState({ isLoading: true })
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
    return (
      <ListView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }
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
    moviesNowPlaying: React.PropTypes.bool.isRequired,
}

export default Movies;
