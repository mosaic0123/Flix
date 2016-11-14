import React from 'react'
import {
  Navigator,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native'
import MovieCell from './MovieCell'
import MovieDetail from './MovieDetail'
import Movies from './Movies'
import * as api from './api'

const navBarHeight = 60
const navBarStyle = {
  height: navBarHeight,
  backgroundColor: 'rgb(98, 200, 247)',
}

const NavMovies = ({ onNavChange, nowPlaying }) => (
  <Navigator
    style = {{paddingTop: navBarHeight}}
    initialRoute={{ key: 'movies' }}
    renderScene={(route, navigator) => {
      onNavChange(navigator)
      if(route.key == 'movies') {
        return <Movies moviesNowPlaying={nowPlaying} onSelectMovie={movie => navigator.push({key: 'details', movie})} />
      }
      return (
        <MovieDetail movie={route.movie}>
        </MovieDetail>
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
              if(nowPlaying){
                return <Text>Now Playing</Text>
              }
              else{
                return <Text>Top Rated</Text>
              }
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
  nowPlaying: React.PropTypes.bool.isRequired,
}

export default NavMovies;
