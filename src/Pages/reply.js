/*Screen to Reply Messages*/
import React from 'react'
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  Text,
  ScrollView,
  Alert,
  TouchableOpacity
} from 'react-native'
import { databaseOpen } from '../api/dataBase'
import { imageLibrary, launchCamera } from '../imagePickers'

var db = databaseOpen();
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
      imageId:null,
      pastReportId: this.props.navigation.state.params.pastReportId || ''
    }
  }

  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }
  sendReply = async () => {
    const { navigate } = this.props.navigation
    var currentTime = new Date().getHours().toString() + new Date().getMinutes().toString();
    const { managerId, memberId, reportId, reportText, pastReportId ,imageId} = this.state
    console.log("image Id is ",imageId)
    if (managerId) {
      if (memberId) {
        if (reportId) {
          if (reportText) {
            db.transaction(function (tx) {
              tx.executeSql(
                'INSERT INTO seniorManagerReporting (managerId,memberId,reportId,reportText,refPastReportId,arrivalDateTime,seenDateTime,imageId,seenOrUnseen,isSent) VALUES (?,?,?,?,?,?,?,?,?,?)',
                [managerId, memberId, reportId, reportText, pastReportId, currentTime, null,imageId, 0,1],
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
                },
                (error) =>{
                  console.log("error in insertition is ",error)
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
  getvalue = async () => {
    var imageId= await launchCamera()
    this.setState({imageId:imageId})
    // console.log("get value ",imageId)

  }
  getvalue1 = async () => {
    var imageId=await imageLibrary()
    this.setState({imageId:imageId})
    // console.log("get value 1",c)
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
          <Text style={styles.text_container}>Upload Image</Text>
          <View style={{flex: 1,
    flexDirection: 'row',}}>
          <TouchableOpacity onPress={() => this.getvalue()}>
            <Text style={styles.text_color}>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.getvalue1()}>
            <Text style={styles.text_color}>Gallery</Text>
          </TouchableOpacity>
          </View>
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
  text_color: {

    alignItems: 'center',
    backgroundColor: '#ADD8E6',
    width: 70,
    height: 40,
    marginTop: 20,
    marginBottom: 10,
    marginRight: 15,
    marginLeft: 10,
    padding: 10,
  },
  container: {
    flex: 0,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  }
})