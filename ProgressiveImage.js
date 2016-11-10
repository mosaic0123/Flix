import React from 'react'
import {
  Image,
  View,
  Animated,
} from 'react-native'

class ProgressiveImage extends React.Component {
  static propTypes = {
    style: View.propTypes.style,
    sourceLow: React.PropTypes.object,
    sourceHigh: React.PropTypes.object,
  }

  state = {
    opacity: new Animated.Value(0.5),
    isHighLoaded: false,
  }

  onLoadHigh = () => {
    this.setState({ isHighLoaded: true })
    Animated.timing(this.state.opacity, {
      toValue: 0,
      duration: 500,
    }).start()
  }

  onLoadLow = () => {
    if (this.state.isHighLoaded) return
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 500,
    }).start()
  }

  render(){
    const { opacity, width, height } = this.state
    return (
      <View>
        <Animated.Image
          {... this.props}
          source={this.props.sourceHigh}
          style={{
            position: 'absolute',
            width,
            height,
          }}
          onLoad={this.onLoadHigh}
        />
        <Animated.Image
          {... this.props}
          source={this.props.sourceLow}
          style={[this.props.style, {opacity}]}
          onLoad={this.onLoadLow}
          onLayout={({ nativeEvent }) => {
            const { width, height } = nativeEvent.layout
            this.setState({ width, height})
          }}
        />
      </View>
    )
  }
}

export default ProgressiveImage
