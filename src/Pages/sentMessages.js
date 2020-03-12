/*Screen to view all the Seen or unseen Messages*/
import React from 'react';
import { Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { databaseOpen } from '../api/dataBase'
import {dirPictures} from '../constant'
import styles from './sentMessagesCSS'

var db = databaseOpen();
export default class sentMessages extends React.Component {
  static navigationOptions = {
    title: "Messages ",
    //Sets Header text of Status Bar
  };
  constructor(props) {
    // this.updateUser.bind(this)
    super(props);
    this.state = {
      seniorManagerSentMessages: []
    };
  }
  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      db.transaction(tx => {
        tx.executeSql(`select * from seniorManagerReporting where isSent=1;`, [], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
          }
          console.log("Sent Message Displayed")
          this.setState({
            seniorManagerSentMessages: temp,
          });
        },
        (error)=>{
            console.log("error is ",error)
        });
      });
    });
  };
  componentWillUnmount() {
    // Remove the event listener before removing the screen from the stack
    this.focusListener.remove();
  }

  displayImage(imageId) {
    if (imageId == null || imageId == ''){
      return null
    }
    else{
      return <Image source={{ uri: `file://${dirPictures}/${imageId}` }}
                      style={{ width: 27, height: 27 }}
                    /> 
    }
      
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.body}>
          <Text>Senior Manager Reporting</Text>
            {
              this.state.seniorManagerSentMessages.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  //  style = {styles.container}
                  onPress={() => navigate('Message', {
                    memberId: item.memberId,
                    managerId: item.managerId,
                    messageId: item.reportId,
                    message: item.reportText,
                    time: item.seenDateTime,
                    referenceId: item.refPastReportId,
                    seenOrUnSeen: item.seenOrUnseen,
                    imageId: item.imageId,
                    isSent:item.isSent
                  })}
                >
                  <View style={styles.box}>
                    {this.displayImage(item.imageId)}
                    {/* <Image source={{ uri: item.imageId }}
                      style={{ width: 27, height: 27 }}
                    /> */}
                    <Text style={styles.username}>
                      {item.reportText}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            }
        </View>
      </ScrollView>
    );
  }
}

