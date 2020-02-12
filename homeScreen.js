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

  componentDidMount() {

    fetch("https://api.myjson.com/bins/9qm1g")
    .then(response => response.json())
    .then((responseJson) => {
      this.setState({
        datasource: responseJson
      })
    })
    .catch(error => alert(error))
  }

  constructor(props) {
    super(props)

    this.state = {
      datasource: ""
    }
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
          customClick={() => this.props.navigation.navigate('seenMessages',{seenOrUnSeen : 1})}
        />
        <Mybutton
          title="Unseen Messages"
          customClick={() => this.props.navigation.navigate('seenMessages',{ seenOrUnSeen : 0})}
        />
      </View>
      
    );
  }
}
