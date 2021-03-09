import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Icon from '@expo/vector-icons/Ionicons';

import * as firebase from 'firebase';

// Home Stack
import HomeScreen from './screens/home_stack/HomeScreen';
import JoinBlockScreen from './screens/home_stack/JoinBlockScreen';
import InvitationCodeScreen from './screens/home_stack/InvitationCodeScreen';
import SearchBlocksScreen from './screens/home_stack/SearchBlocksScreen';

// Create Stack
import CreateScreen from './screens/create_stack/CreateScreen';

// View Memories Stack
import ViewScreen from './screens/view_stack/ViewScreen';
import MemoryScreen from './screens/view_stack/MemoryScreen';

// Search Memories Stack
import SearchScreen from './screens/search_stack/SearchScreen';
import SearchResultsScreen from "./screens/search_stack/SearchResultsScreen";

// Profile Stack
import ProfileScreen from './screens/profile_stack/ProfileScreen';
import ProfileEditScreen from './screens/profile_stack/ProfileEditScreen';

// Login Stack
import LoginScreen from './screens/login_stack/LoginScreen';

import RegisterScreen from './screens/login_stack/RegisterScreen';
import FlatListSlider from "./screens/tools/flat_list_slider/FlatListSlider";
import MemoryTag from "./screens/tools/tag_list/MemoryTag"

const firebaseConfig = {
  apiKey: "***REMOVED***",
  authDomain: "memory-vault-811b7.firebaseapp.com",
  databaseURL: "https://memory-vault-811b7.firebaseio.com",
  projectId: "memory-vault-811b7",
  storageBucket: "memory-vault-811b7.appspot.com",
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  return (
    <AppContainer />
  );
};

const HomeStack = createStackNavigator({
  Home: { screen: HomeScreen },
  HomeMemory: { screen: MemoryScreen, navigationOptions: {title: ""} },

});

const CreateStack = createStackNavigator({
  Create: { screen: CreateScreen, navigationOptions: {title: "Save New Memory"} },
});

const ViewStack = createStackNavigator({
  View: { screen: ViewScreen, navigationOptions: {title: "Saved Memories"} },
  Memory: { screen: MemoryScreen, navigationOptions: {title: ""} },
  ViewTag: { screen: SearchResultsScreen, navigationOptions: {title: "View Tag"}},
});

const SearchStack = createStackNavigator({
  Search: { screen: SearchScreen, navigationOptions: {title: "Search Memories"} },
  SearchResults: { screen: SearchResultsScreen, navigationOptions: {title: "Results"} },
  SearchMemory: { screen: MemoryScreen, navigationOptions: {title: ""}},
});

const ProfileStack = createStackNavigator({
  Profile: { screen: ProfileScreen },
  Edit: { screen: ProfileEditScreen },
});

// TODO: Custom header names
const AppTabNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeStack,
    navigationOptions: {
      tabBarIcon: ({ focused }) => <Icon focused={focused} size={25} name="md-home" />,
    }
  },
  Create: {
    screen: CreateStack,
    navigationOptions: {
      tabBarIcon: ({ focused }) => <Icon focused={focused} size={25} name="md-add"/>,
    }
  },
  View: {
    screen: ViewStack,
    navigationOptions: {
      tabBarIcon: ({ focused }) => <Icon focused={focused} size={25} name="md-grid" />,
    }
  },
  Search: {
    screen: SearchStack,
    navigationOptions: {
      tabBarIcon: ({ focused }) => <Icon focused={focused} size={25} name="md-search" />,
    }
  },
  Profile: {
    screen: ProfileStack,
    navigationOptions: {
      tabBarIcon: ({ focused }) => <Icon focused={focused} size={25} name="md-person" />,
    }
  }
}, {
  navigationOptions: ({ navigation }) => {
    const { routeName } = navigation.state.routes[navigation.state.index];
    return {
      headerTitle: routeName
    };
  }
});

const LoginStack = createStackNavigator({
  Login: { screen: LoginScreen },
  Registration: { screen: RegisterScreen }
});

const AppSwitchNavigator = createSwitchNavigator({
  Welcome: { screen: LoginStack },
  Dashboard: { screen: AppTabNavigator }
});

const AppContainer = createAppContainer(AppSwitchNavigator);