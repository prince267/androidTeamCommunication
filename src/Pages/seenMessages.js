/*Screen to view all the user*/
import React from 'react';
import { Text, View, TouchableOpacity, ScrollView ,Image} from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import {DATA_BASE} from '../constant'
//Connction to access the pre-populated user_db.db
import styles from './seenMessagesCSS'
function openCB() {
  console.log("database open");
}
function errorCB(err) {
  alert("error: " + err);
  return false;
}
var db = openDatabase({ name: DATA_BASE, createFromLocation: 1 }, openCB, errorCB);

export default class seenMessages extends React.Component {
  static navigationOptions = {
    title: "Messages ",
    //Sets Header text of Status Bar
  };
  constructor(props) {
    // this.updateUser.bind(this)
    super(props);
    this.state = {
      navigate: "",
      seenOrUnSeen: this.props.navigation.state.params.seenOrUnSeen,
      memberMessages: [],
      seniorManagerMessages: []
    };
  }
  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      db.transaction(tx => {
        tx.executeSql(`select * from MemberActivity where seenOrUnseen=${this.state.seenOrUnSeen};`, [], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
          }
          console.log("Message Displayed")
          this.setState({
            memberMessages: temp,
          });
        });
      });
      db.transaction(tx => {
        tx.executeSql(`select * from seniorManagerReporting where seenOrUnseen=${this.state.seenOrUnSeen};`, [], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
          }
          console.log("Message Displayed")
          this.setState({
            seniorManagerMessages: temp,
          });
        });
      });
    });
  };
  componentWillUnmount() {
    // Remove the event listener before removing the screen from the stack
    this.focusListener.remove();
  }


  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.body}>
          <Text>MemberActivity</Text>
          <ScrollView>

            {
              this.state.memberMessages.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  //   style = {styles.container}
                  onPress={() => {
                    navigate('Message', {
                      memberId: item.memberId,
                      managerId: "NULL",
                      messageId: item.activitySerialNo,
                      message: item.activityDescription,
                      time: item.seenDateTime,
                      referenceId: "NULL",
                      seenOrUnSeen: item.seenOrUnseen,
                      activityImage: item.activityImage
                    });
                  }}
                >
                  <View style={styles.box}>
                  <Image source = {{uri:item.activityImage}}
   style = {{ width: 27, height: 27}}
   /> 
                    <Text style={styles.username}>
                      {item.activityDescription}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            }
          </ScrollView>
        </View>
        <View style={styles.body}>
          <Text>Senior Manager Reporting</Text>
          <ScrollView>
            {
              this.state.seniorManagerMessages.map((item, index) => (
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
                    activityImage: 'null'
                  })}
                >
                  <View style={styles.box}>
                    <Text style={styles.username}>
                      {item.reportText}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            }
          </ScrollView>
        </View>
      </ScrollView>
    );
  }
}

