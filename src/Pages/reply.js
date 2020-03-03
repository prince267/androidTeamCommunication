// SignUp.js
import React from 'react'
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  Text,
  ScrollView,
  Alert
} from 'react-native'
import {DATA_BASE} from '../constant'
import { openDatabase } from 'react-native-sqlite-storage';
//Connction to access the pre-populated user_db.db
function openCB() {
  console.log("database open");
}
function errorCB(err) {
  alert("error: " + err);
  return false;
}
var db = openDatabase({ name: DATA_BASE, createFromLocation: 1 }, openCB, errorCB);

export default class Reply extends React.Component {
  static navigationOptions = {
    title: "New",
    //Sets Header text of Status Bar
  };
  constructor(props) {
    super(props);
    this.state = {
      isReply: this.props.navigation.state.params.isReply || 0,
      managerId: this.props.navigation.state.params.managerId || '',
      memberId: this.props.navigation.state.params.memberId || '',
      reportId: '',
      reportText: '',
      pastReportId: this.props.navigation.state.params.pastReportId || ''
    }
  }

  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }
  sendReply = async () => {
    const { navigate } = this.props.navigation
    var currentTime = new Date().getHours().toString() + new Date().getMinutes().toString();
    const { managerId, memberId, reportId, reportText, pastReportId } = this.state
    if (managerId) {
      if (memberId) {
        if (reportId) {
          if (reportText) {
            db.transaction(function (tx) {
              tx.executeSql(
                'INSERT INTO seniorManagerReporting (managerId,memberId,reportId,reportText,refPastReportId,arrivalDateTime,seenDateTime,seenOrUnseen) VALUES (?,?,?,?,?,?,?,?)',
                [managerId, memberId, reportId, reportText, pastReportId, currentTime, null, 0],
                (tx, results) => {
                  console.log('Results', results.rowsAffected);
                  if (results.rowsAffected > 0) {
                    Alert.alert(
                      'Success',
                      'Message Sent Successfully',
                      [
                        {
                          text: 'Ok',
                          onPress: () =>
                            navigate('HomeScreen'),
                        },
                      ],
                      { cancelable: false }
                    );
                  } else {
                    alert('Failed to Send');
                  }
                }
              );
            });
          } else {
            alert('Please fill Report Text');
          }
        } else {
          alert('Please fill Report Id');
        }
      } else {
        alert('Please fill Member Id');
      }
    }
    else {
      alert('Please fill Manager Id')
    }

  }
  display() {
    if (!this.state.isReply) {
      return (
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.text_container}>Manager Id</Text>
            <TextInput
              style={styles.input}
              value={this.state.managerId}
              placeholderTextColor='grey'
              onChangeText={val => this.onChangeText('managerId', val)}
            />
            <Text style={styles.text_container}>Member Id</Text>
            <TextInput
              style={styles.input}
              value={this.state.memberId}
              placeholderTextColor='grey'
              onChangeText={val => this.onChangeText('memberId', val)}
            />
          </View>
        </ScrollView>
      )
    }
    else {
      return null
    }
  }
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          {this.display()}
          <Text style={styles.text_container}>Report Id</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor='grey'
            value={this.state.reportId}
            onChangeText={val => this.onChangeText('reportId', val)}
          />
          <Text style={styles.text_container}>Report Text</Text>
          <TextInput
            style={styles.report_text}
            value={this.state.reportText}
            multiline={true}
            placeholderTextColor='grey'
            onChangeText={val => this.onChangeText('reportText', val)}
          />
          <Text style={styles.text_container}>Past Report Id</Text>
          <TextInput
            style={styles.input}
            value={this.state.pastReportId}
            placeholderTextColor='grey'
            onChangeText={val => this.onChangeText('pastReportId', val)}
          />

          <Button
            style={{
              alignItems: 'center'
            }}
            title='Send'
            onPress={this.sendReply}
          />
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 40,
    backgroundColor: 'white',
    margin: 10,
    padding: 6,
    borderRadius: 14,
    fontSize: 14,
    fontWeight: '500',
  },
  report_text: {
    width: 350,
    height: 100,
    backgroundColor: 'white',
    margin: 10,
    padding: 6,
    borderRadius: 14,
    fontSize: 14,
    fontWeight: '500',
  },
  text_container: {
    marginTop: 10,
    marginLeft: 12,
    fontSize: 15,
    fontWeight: 'bold'
  },
  container: {
    flex: 0,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  }
})