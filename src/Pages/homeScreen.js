/*Screen to view Main HomeScreen*/
import React from 'react';
import { View, Alert, ScrollView ,Text} from 'react-native';
import Mybutton from '../components/Mybutton';
import * as data from '../../teamDisplay.json'
import NotifService from '../NotifService';
import Notification from '../notification'
import { databaseOpen } from '../api/dataBase'

var db = databaseOpen();

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Home Screen",
  };
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
      a: 0,
      teamId: this.props.navigation.state.params.teamId
    }
    this.notif = new NotifService(this.onNotif.bind(this));
    // // this.notif.localNotif();
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    this.timer = setInterval(() => this._isMounted && this.getData(), 5000)
  }
  Alert
  componentWillUnmount() {
    this._isMounted = false;
  }

  async getData() {
    try {
      // let response = await fetch(`https://api.myjson.com/bins/17ndf0`);
      // let data = await response.json()
      console.log("******* DATA FETCHED *********")
      this.setState({ a: 0 })
      data.memberActivity.map((item) => {
        db.transaction((tx) => {
          tx.executeSql(
            'INSERT INTO memberActivity (memberId, activitySerialNo, activityDescription,arrivalDateTime,seenDateTime,activityImage,seenOrUnseen) VALUES (?,?,?,?,?,?,?)',
            [item.memberId, item.activitySerialNo, item.activityDescription, item.arrivalDateTime, item.seenDateTime, item.activityImage, item.seenOrUnseen],
            (tx, results) => {
              console.log('Results', results);
              if (results.rowsAffected > 0) {
                this.setState({ a: this.state.a + 1 })
                console.log("newdata added");
                this.notif.localNotif({ notifMsg: `New Message From Id ${item.memberId}`, message: item.activityDescription });
              };
            }
          );
        });
      })
      console.log("no. of Data Added in memberActivity:", this.state.a);
      this.setState({ a: 0 })
      data.seniorManagerReporting.map((item) => {
        db.transaction((tx) => {
          tx.executeSql(
            'INSERT INTO seniorManagerReporting (managerId,memberId,reportId,reportText,refPastReportId,arrivalDateTime,seenDateTime,seenOrUnseen) VALUES (?,?,?,?,?,?,?,?)',
            [item.managerId, item.memberId, item.reportId, item.reportText, item.refPastReportId, item.arrivalDateTime, item.seenDateTime, item.seenOrUnseen],
            (tx, results) => {
              console.log('Results', results);
              if (results.rowsAffected > 0) {
                this.setState({ a: this.state.a + 1 })
                console.log("newdata added");
                console.log("no. of Data :", this.state.a);
                this.notif.localNotif({ notifMsg: `New Message From Id ${item.managerId}`, message: item.reportText });
              };
            }
          );
        });
        // console.log([item.managerId, item.memberId, item.reportId, item.reportText,item.refPastReportId, item.arrivalDateTime,item.seenDateTime,item.seenOrUnseen])
      })
      console.log("no. of Data Added in Senior Manager Reporting:", this.state.a);
    } catch (error) {
      console.log("failed to fetch data", error);
    }
  }

  display() {
    if (this.state.a > 0) {
      return <Notification />
    }
    else {
      return null
    }
  }
  render() {
    return (
      <ScrollView>
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            flexDirection: 'column',
          }}>

          {this.display()}
          <Mybutton
            title="Team Profile"
            customClick={() => this.props.navigation.navigate('teamProfile', {
              teamId: this.state.teamId
            })}
          />
          <Mybutton
            title="Seen Messages"
            customClick={() => this.props.navigation.navigate('seenMessages', { seenOrUnSeen: 1 })}
          />
          <Mybutton
            title="Unseen Messages"
            customClick={() => this.props.navigation.navigate('seenMessages', { seenOrUnSeen: 0 })}
          />
          <Mybutton
            title="New Messages"
            customClick={() => this.props.navigation.navigate('Reply', { isReply: 0 })}
          />
        </View>
      </ScrollView>
    );
  }
  onNotif(notif) {
    console.log(notif);
    this.props.navigation.navigate('seenMessages', { seenOrUnSeen: 0 })
  }

  handlePerm(perms) {
    Alert.alert("Permissions", JSON.stringify(perms));
  }
}

