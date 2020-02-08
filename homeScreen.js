/*Home Screen With buttons to navigate to different options*/
import React from 'react';
import { View } from 'react-native';
import Mybutton from './components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';
export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: "Messenger",
        //Sets Header text of Status Bar
      };
  constructor(props) {
    super(props)

  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          flexDirection: 'column',
        }}>
        <Mybutton
          title="Team Profile"
          customClick={() => this.props.navigation.navigate('teamProfile')}
        />
          <Mybutton
          title="Seen Messages"
          customClick={() => this.props.navigation.navigate('seenMessages',{seenOrUnSeen :"IS NOT NULL"})}
        />
        <Mybutton
          title="Unseen Messages"
          customClick={() => this.props.navigation.navigate('seenMessages',{ seenOrUnSeen :"IS NULL"})}
        />
      </View>
      
    );
  }
}
