/*Screen to view all the Seen or unseen Messages*/
import React from 'react';
import { Text, View, TouchableOpacity, ScrollView, Image ,ActivityIndicator } from 'react-native';
import { databaseOpen } from '../api/dataBase'
import {dirPictures} from '../constant'
import styles from './seenMessagesCSS'

var db = databaseOpen();
export default class seenMessages extends React.Component {
  static navigationOptions = {
    title: "Messages ",
    //Sets Header text of Status Bar
  };
  constructor(props) {
    // this.updateUser.bind(this)
    super(props);
    this.state = {
      loading: true,
      seenOrUnSeen: this.props.navigation.state.params.seenOrUnSeen,
      memberMessages: [],
      seniorManagerMessages: []
    };
  }
  componentDidMount() {
    this.setState({loading:true})
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
            loading:false
          });
        });
      });
      db.transaction(tx => {
        tx.executeSql(`select * from seniorManagerReporting where seenOrUnseen=${this.state.seenOrUnSeen} and isSent=0;`, [], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
          }
          console.log("Message Displayed")
          this.setState({
            seniorManagerMessages: temp,
            loading:false
          });
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
    const {loading} =this.state;
    if(loading){
      return (
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <ActivityIndicator size="large" color="#0000ff" animating={loading} />
        </View>
      )
    }
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
                      imageId: item.imageId
                    });
                  }}
                >
                  <View style={styles.box}>
                    {/* <Image source={{ uri: item.imageId }}
                      style={{ width: 27, height: 27 }}
                    /> */}
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
                    imageId: item.imageId
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
          </ScrollView>
        </View>
      </ScrollView>
    );
  }
}

