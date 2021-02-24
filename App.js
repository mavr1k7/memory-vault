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

// Friends Stack
import FriendsScreen from './screens/friends_stack/FriendsScreen';

// Parties Stack
import PartiesScreen from './screens/parties_stack/PartiesScreen';

// Blocks Stack
import BlocksScreen from './screens/blocks_stack/BlocksScreen';

// Profile Stack
import ProfileScreen from './screens/profile_stack/ProfileScreen';
import ProfileEditScreen from './screens/profile_stack/ProfileEditScreen';

// Login Stack
import LoginScreen from './screens/login_stack/LoginScreen';
import RegisterScreen from './screens/login_stack/RegisterScreen';

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
  JoinBlock: {
    screen: JoinBlockScreen,
    navigationOptions: {
      title: 'Join a Block'
    }
  },
  InvitationCode: {
    screen: InvitationCodeScreen,
    navigationOptions: {
      title: 'Join a Block'
    }
  },
  SearchBlocks: {
    screen: SearchBlocksScreen,
    navigationOptions: {
      title: 'Join a Block'
    }
  }

});

const FriendsStack = createStackNavigator({
  Friends: { screen: FriendsScreen },
});

const PartiesStack = createStackNavigator({
  Parties: { screen: PartiesScreen },
});

const BlocksStack = createStackNavigator({
  Blocks: { screen: BlocksScreen },
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
      tabBarIcon: ({ focused }) => <Icon focused={focused} name="md-home" />,
    }
  },
  Friends: {
    screen: FriendsStack,
    navigationOptions: {
      tabBarIcon: ({ focused }) => <Icon focused={focused} name="md-people" />,
    }
  },
  Parties: {
    screen: PartiesStack,
    navigationOptions: {
      tabBarIcon: ({ focused }) => <Icon focused={focused} name="md-american-football" />,
    }
  },
  Blocks: {
    screen: BlocksStack,
    navigationOptions: {
      tabBarIcon: ({ focused }) => <Icon focused={focused} name="md-square-outline" />,
    }
  },
  Profile: {
    screen: ProfileStack,
    navigationOptions: {
      tabBarIcon: ({ focused }) => <Icon focused={focused} name="md-person" />,
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