import React, { Component, PropTypes } from 'react';
import {
  Text,
  View,
  Image,
  Navigator,
  StyleSheet,
  BackAndroid,
  TouchableHighlight
} from 'react-native';

import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';

//To Show / Hide NavigationBar
class NavigationBar extends Navigator.NavigationBar {
  render() {
    let routes = this.props.navState.routeStack;

    if (routes.length) {
      let route = routes[routes.length - 1];

      if (route.display === false) {
        return null;
      }
    }
    return super.render();
  }
}

export default class TopMovies extends Component {
  componentDidMount = () => {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton);
  };

  componentWillUnmount = () => {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton);
  };

  renderScene = (route, navigator) => {
    switch (route.id) {
      case 0:
        return <MovieList navigator={navigator} />;
        break;
      case 1:
        return <MovieDetails navigator={navigator} passProps={route.passProps} />;
        break;
    }
  };

  leftButton = (route, navigator, index, navState) => {
    if(route.id===0){
      return null;
    } else {
        return (<TouchableHighlight underlayColor="transparent" onPress={()=> navigator.pop()}><Image style={styles.NavBarLeftStyle} source={require('./images/backicon.png')}/></TouchableHighlight>);
    }
  };

  rightButton = (route, navigator, index, navState) => {
    return null;
  };

  title = (route, navigator, index, navState) => {
    return (
      <Text style={styles.NavBarTitleStyle}>{route.title}</Text>
    );
  };

  handleBackButton = () => {
    if (this._navigator && this._navigator.getCurrentRoutes().length > 1) {
      this._navigator.pop();
      return true;
    }
    return false;
  };

  render() {
    return (
      <Navigator
        ref={(ref) => this._navigator = ref}
        configureScene={(route, routeStack) => Navigator.SceneConfigs.PushFromRight}
        initialRoute={{
          title: 'Top Movies',
          id: 0,
          display: true
        }}
        renderScene={this.renderScene}
        navigationBar={
          <NavigationBar
            routeMapper={{
              LeftButton: this.leftButton,
              RightButton: this.rightButton,
              Title: this.title
            }}
            style={{backgroundColor: '#0781d4'}}
            navigationStyles={Navigator.NavigationBar.StylesIOS}
          />
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  NavBarLeftStyle: {
    width: 28,
    height: 20,
    marginLeft: 20,
    marginTop: 12
  },
  NavBarRightStyle: {
    width: 22,
    height: 20,
    marginTop: 10,
    marginRight: 20
  },
  NavBarTitleStyle:{
    top: 4,
    fontSize: 18,
    color: "#ffffff"
  }
});
