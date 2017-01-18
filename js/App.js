import React, { Component } from 'react';
import {
  Navigator,
  BackAndroid,
  View,
  StatusBar,
  StyleSheet,
} from 'react-native';

import { theme } from '../config';

import List from './scenes/List';
import Item from './scenes/Item';
import Map from './scenes/Map';
import Profile from './scenes/Profile';
import Settings from './scenes/Settings';
import Debug from './scenes/Debug';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.routes = {
      list: { component: List },
      item: { component: Item },
      map: { component: Map },
      profile: { component: Profile },
      settings: { component: Settings },
    };

    if (__DEV__) {
      this.routes['debug'] = { component: Debug };
    }

    this.renderScene = this.renderScene.bind(this);
    this.onAndroidBack = this.onAndroidBack.bind(this);
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.onAndroidBack);
    //Linking.addEventListener('url', this.onDeepLink);
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.onAndroidBack);
    //Linking.getInitialURL().then((url) => this.onDeepLink({ url }));
    //Linking.removeEventListener('url', this.onDeepLink);
  }

  /**
   * Responds to Android hardware back button.
   *
   * Returning `false` indicates the app
   * isn't handling the event and allows
   * the system to respond.
   *
   * @return {Boolean}
   */
  onAndroidBack() {
    const { navigator } = this.refs;

    if (!navigator) {
      return false;
    }

    const stack = navigator.getCurrentRoutes();

    if (stack.length > 1) {
      navigator.pop();
      return true;
    }

    // let system handle event
    // (minimises android app)
    return false;
  }

  onDeepLink({ url }) {
    if (!url) {
      return;
    }

    console.log('App#onDeepLink()', url);
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          translucent={true}
          backgroundColor="rgba(0, 0, 0, 0.2)"
          barStyle="light-content"
        />
        <Navigator
          ref="navigator"
          initialRoute={{ id: 'list' }}
          renderScene={this.renderScene}/>
      </View>
    );
  }

  renderScene(route, navigator) {
    const Component = this.routes[route.id].component;
    return (
      <Component
        navigator={navigator}/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorBackground,
  },
});
