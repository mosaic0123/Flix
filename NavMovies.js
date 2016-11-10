import React from 'react'
import {
  Navigator,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native'
import MovieCell from './MovieCell'
import Movies from './Movies'
import * as api from './api'

const navBarHeight = 60
const navBarStyle = {
  height: navBarHeight,
  backgroundColor: 'rgb(250, 117, 96)',
}

const NavMovies = ({ onNavChange }) => (
  <Navigator
    style = {{paddingTop: navBarHeight}}
    initialRoute={{ key: 'movies' }}
    renderScene={(route, navigator) => {
      console.log("In NavMovies")
      console.log(this.nowPlaying)
      onNavChange(navigator)
      if(route.key == 'movies') {
        return <Movies MoviesNowPlaying={this.nowPlaying} onSelectMovie={movie => navigator.push({key: 'details', movie})} />
      }
      return (
        <View style = {{ flex:1, backgroundColor: 'rgb(230, 230, 232)'}}>
          <Text> Detail View </Text>
          <Text>{route.movie.title}</Text>
        </View>
      )
    }}
    configureScene={() => Navigator.SceneConfigs.HorizontalSwipeJump}
    navigationBar={
      <Navigator.NavigationBar
        style={navBarStyle}
        routeMapper ={{
          LeftButton: (route, navigator) => {
            if (route.key == 'movies') return null
            return (
              <TouchableOpacity onPress={() => navigator.pop()}>
                <Text>Back</Text>
              </TouchableOpacity>
            )
          },
          RightButton: () => {},
          Title: (route) => {
            if (route.key == 'movies') {
              return <Text>Now Playing</Text>
            }
            return null
          },
        }}
      />
    }
  />
)

NavMovies.propTypes = {
  onNavChange: React.PropTypes.func,
  nowPlaying: React.PropTypes.bool,
}

export default NavMovies;

