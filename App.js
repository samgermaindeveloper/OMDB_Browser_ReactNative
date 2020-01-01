import React from 'react';

import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import SearchScreen from './Screens/SearchScreen.js'
import MovieListScreen from './Screens/MovieListScreen.js'
import MovieInfoScreen from './Screens/MovieInfoScreen.js'
import ErrorScreen from './Screens/ErrorScreen.js'

const SwitchNavigator = createSwitchNavigator({
  MovieListScreen: MovieListScreen
},{
  initialRouteName: 'MovieListScreen'
})

const AppNavigator = createStackNavigator({
  SearchScreen: SearchScreen,
  MovieListScreen: SwitchNavigator,
  MovieInfoScreen: MovieInfoScreen,
  ErrorScreen:ErrorScreen
},{
  initialRouteName: 'SearchScreen'
})

const AppContainer = createAppContainer(AppNavigator)

export default class App extends React.Component {
  render() {
    return (
      <AppContainer />
    );
  }
}
