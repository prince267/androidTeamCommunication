//This is an example code for Navigator// 
import React, { Component } from 'react';
//import react in our code. 
 
//For react-navigation 3.0+
//import { createAppContainer, createStackNavigator } from 'react-navigation';
//For react-navigation 4.0+
import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';

import HomeScreen from './Pages/homeScreen'
import teamProfile from './Pages/teamProfile';
import memberdisplay from './Pages/memberdisplay';
import Message from './Pages/message'
import Login from './Pages/login'
import seenMessages from './Pages/seenMessages'
//import all the screens we are going to switch 
const App = createStackNavigator({
    HomeScreen : {screen :HomeScreen},
    Message : {screen : Message},
    Login : {screen :Login},
    seenMessages : {screen :seenMessages},
  //Constant which holds all the screens like index of any book 
    teamProfile: { screen: teamProfile }, 
    //First entry by default be our first screen if we do not define initialRouteName
    memberdisplay: { screen: memberdisplay }, 
  },
  {
    initialRouteName: 'Login',
  }
);
export default createAppContainer(App);