import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './src/Pages/homeScreen'
import teamProfile from './src/Pages/teamProfile';
import memberdisplay from './src/Pages/memberdisplay';
import Message from './src/Pages/message'
import Login from './src/Pages/login'
import Reply from './src/Pages/reply'
import sentMessages from './src/Pages/sentMessages'
import seenMessages from './src/Pages/seenMessages'

const App = createStackNavigator({
  HomeScreen: { screen: HomeScreen },
  Message: { screen: Message },
  Login: { screen: Login },
  Reply: { screen: Reply },
  seenMessages: { screen: seenMessages },
  teamProfile: { screen: teamProfile },
  sentMessages: { screen: sentMessages },
  memberdisplay: { screen: memberdisplay },
},
  {
    initialRouteName: 'Login',
  }
);
export default createAppContainer(App);