/*Home Screen With buttons to navigate to different options*/
import React from 'react';
import { View,Alert } from 'react-native';
import Mybutton from '../components/Mybutton';
import NotifService from '../NotifService';
import { openDatabase } from 'react-native-sqlite-storage';
function openCB() {
  console.log("database open");
}
function errorCB(err) {
  alert("error: " + err);
  return false;
}
var db = openDatabase({ name: 'Team_lead.db', createFromLocation: 1 }, openCB, errorCB);
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Messenger",
    //Sets Header text of Status Bar
  };
  constructor(props) {
    super(props)
    this.state={
      count: 0,
      a:0
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
    // this.setState({a:0})
    console.log("################################################")
    let response = await fetch(`https://api.myjson.com/bins/1894wk`);
    let data = await response.json()
    this.setState({ count: this.state.count + 1 });
    // data[0].team.forEach(function (item) {
      data.MemberActivity.map((item) =>{
      console.log("Member Id",item.memberId)
      // console.log("Activity Descripotion",item.activityDescription)
      // console.log("arrivalTime",item.arrivalTime)
      // console.log("seenDateTime   ",item.seenDateTime)
      console.log("***********************************")
      db.transaction((tx)=> {
        console.log("executing *****")
        tx.executeSql(
          'INSERT INTO MemberActivity (memberId, activitySerialNo, activityDescription,arrivalTime,seenDateTime,activityImage,seenOrUnseen) VALUES (?,?,?,?,?,?,?)',
          [item.memberId, item.activitySerialNo, item.activityDescription, item.arrivalTime,item.seenDateTime,item.activityImage,item.seenOrUnseen],
          (tx, results) => {
            console.log('Results', results);
            if (results.rowsAffected > 0) {
              this.setState({a:this.state.a+1})
              console.log("newdata added");
              console.log("no. of Data :", this.state.a );
              this.notif.localNotif({notifMsg:`New Message From Id ${item.memberId}`,message:item.activityDescription});
              // this.setState({a:this.state.a+1});
            } ;
          }
        );
      });
    })
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
          customClick={() => this.props.navigation.navigate('seenMessages', { seenOrUnSeen: 1 })}
        />
        <Mybutton
          title="Unseen Messages"
          customClick={() => this.props.navigation.navigate('seenMessages', { seenOrUnSeen: 0 })}
        />
      </View>

    );
  }
  onNotif(notif) {
    console.log(notif);
    Alert.alert(notif.title, notif.message);
  }

  handlePerm(perms) {
    Alert.alert("Permissions", JSON.stringify(perms));
  }
}

