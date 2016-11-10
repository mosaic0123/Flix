import React from 'react'
import {
  Navigator,
  Text,
  View,
  TouchableOpacity,
  BackAndroid,
  Platform,
  StyleSheet,
//   ActivityIndicator,
//   ListView
} from 'react-native'
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view'
import NavMovies from './NavMovies'

class TabApp extends React.Component {
  componentDidMount() {
    if(Platform.OS == 'android') {
      BackAndroid.addEventListener('hardwareBackPress', this.onHardwareBackPress)
    }
  }

  componentWillUnmount(){
    if(Platform.OS == 'android') {
      BackAndroid.removeEventListener('hardwareBackPress', this.onHardwareBackPress)
    }
  }

  onHardwareBackPress = () => {
    if (this.currentTab == 0 && this.navRef && this.navRef.getCurrentRoutes().length > 1) {
      this.navRef.pop()
      return true
    }
    return false
  }

  navRef = null
  currentTab = 0
  render(){
    return (
      <ScrollableTabView
        style={{marginTop:20}}
        locked
        onChangeTab={({ i }) => (this.currentTab = i)}
        renderTabBar={ () => <DefaultTabBar />}
      >
        <NavMovies tabLabel='Now Playing' nowPlaying={true} onNavChange={nav => (this.navRef=nav)} />
        <NavMovies tabLabel='Top Rated' nowPlaying={false} onNavChange={nav => (this.navRef=nav)} />
      </ScrollableTabView>
    )
  }
}

export default TabApp
