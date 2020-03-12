import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import styles from './messageCSS'
import { databaseOpen } from '../api/dataBase'
import { dirPictures } from '../constant'
var db = databaseOpen();
export default class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: new Date().getHours().toString() + new Date().getMinutes().toString(),
      memberId: this.props.navigation.state.params.memberId,
      managerId: this.props.navigation.state.params.managerId,
      messageId: this.props.navigation.state.params.messageId,
      message: this.props.navigation.state.params.message,
      time: this.props.navigation.state.params.time,
      referenceId: this.props.navigation.state.params.referenceId,
      seenOrUnSeen: this.props.navigation.state.params.seenOrUnSeen,
      imageId: this.props.navigation.state.params.imageId,
      isSent: this.props.navigation.state.params.isSent || 0
    };
    console.log("seen is ", this.state.seenOrUnSeen);
    if (!this.state.seenOrUnSeen) {
      console.log("changing ", this.state.currentTime)
      if (this.state.managerId != "NULL") {
        db.transaction((tx) => {
          tx.executeSql(
            `UPDATE seniorManagerReporting set seenDateTime=${this.state.currentTime},seenOrUnSeen=1 where managerId=${this.state.managerId} And memberId=${this.state.memberId} And reportId=${this.state.messageId}`,
            [],
            (tx, results) => {
              console.log('Results', results.rowsAffected);
              if (results.rowsAffected > 0) {
                this.setState({ time: this.state.currentTime })
              } else {
                alert('Updation Failed');
              }
            }
          );
        });
      }
      if (this.state.managerId === "NULL") {
        db.transaction((tx) => {
          tx.executeSql(
            `UPDATE MemberActivity set seenDateTime=${this.state.currentTime},seenOrUnSeen=1 where memberId=${this.state.memberId} And activitySerialNo=${this.state.messageId}`,
            [],
            (tx, results) => {
              console.log('Results', results.rowsAffected);
              if (results.rowsAffected > 0) {
                this.setState({ time: this.state.currentTime })
              } else {
                alert('Updation Failed');
              }
            }
          );
        });
      }
    }
  }

  imageDisplay() {
    if (this.state.imageId == null || this.state.imageId == '') {
      return null
    }
    else {
      return (
        <View style={{
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          {/* <Image source = {{uri:'https://shorturl.at/hoq28'}}
   style = {{ width: 80, height: 80,marginBottom:16 }}
   /> */}
          <Image source={{ uri: `file://${dirPictures}/${this.state.imageId}` }}
            style={{ width: 80, height: 80, marginBottom: 16 }}
          />

        </View>)
    }
  }

  showReplyButton = () => {
    if (this.state.isSent) {
      return null
    }
    else {
      return <TouchableOpacity
        onPress={() => navigate('Reply', {
          isReply: 1,
          memberId: this.state.memberId,
          managerId: this.state.managerId,
          pastReportId: this.state.memberId
        })}
        style={styles.backButtonContainer}>
        <Text style={styles.backButtonText}>Reply</Text>

      </TouchableOpacity>
    }

  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView>

        <View style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.logo}>Messege</Text>
            <TouchableOpacity style={styles.buttonContainer}>
              {this.imageDisplay()}
              <Text style={styles.buttonText}>Manager Id/Member Id: {this.state.memberId}{"\n"}</Text>
              <Text style={styles.buttonText}>Report Id/Serial No: {this.state.messageId}{"\n"}</Text>
              <Text style={styles.buttonText}>Reference Id: {this.state.referenceId}{"\n"}</Text>
              <Text style={styles.buttonText}>Message Body:{"\n"}{this.state.message}{"\n"}</Text>
              <Text style={styles.buttonText}>Time: {this.state.time}{"\n"}</Text>
              <View style={{
                flex: 1, flexDirection: 'row',
                justifyContent: 'space-between'
              }}>
                <TouchableOpacity
                  onPress={() => navigate('HomeScreen')}
                  style={styles.backButtonContainer}>
                  <Text style={styles.backButtonText}>Home</Text>
                </TouchableOpacity>
              {this.showReplyButton()}
              </View>
            </TouchableOpacity>


          </View>
        </View>
      </ScrollView>
    );
  }


}
