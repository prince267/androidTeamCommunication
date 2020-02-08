//This is an example code for Navigator// 
import React, { Component } from 'react';
//import react in our code. 
 
//For react-navigation 3.0+
//import { createAppContainer, createStackNavigator } from 'react-navigation';
//For react-navigation 4.0+
import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';

import HomeScreen from './homeScreen'
import teamProfile from './teamProfile';
import memberdisplay from './memberdisplay';
import Message from './message'
import Login from './login'
import seenMessages from './seenMessages'
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