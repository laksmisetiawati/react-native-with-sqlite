import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  Platform,
  Dimensions,
  AsyncStorage,
  Alert
} from 'react-native';

// import {
//   connect
// } from "react-redux";

import {
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator,
  createMaterialTopTabNavigator
} from 'react-navigation';

// import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import SimulateScreen from '../screens/SimulateScreen';
import DataEntryScreen from '../screens/DataEntryScreen';
import DataEntryNextScreen from '../screens/DataEntryNextScreen';
import ECertificateScreen from '../screens/ECertificateScreen';
import ProcessDraftScreen from '../screens/ProcessDraftScreen';

const Routes = createStackNavigator({
  // Login: { screen: LoginScreen },
  Dashboard: { screen: DashboardScreen },
  Simulate: { screen: SimulateScreen },
  DataEntry: { screen: DataEntryScreen },
  DataEntryNext: { screen: DataEntryNextScreen },
  ECertificate: { screen: ECertificateScreen },
  ProcessDraft: { screen: ProcessDraftScreen }
});

const RouteStack = createSwitchNavigator({
  MainRoute: Routes
});

export default Routes;