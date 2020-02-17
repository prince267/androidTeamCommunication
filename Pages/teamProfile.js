/*Screen to view all the user*/
import React from 'react';
import { FlatList, Text, View, Image, StyleSheet, Button, TouchableOpacity ,Alert} from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import styles from './teamProfileCSS'
import Notification from '../notification';
import NotifService from '../NotifService';
function openCB() {
  console.log("database open");
}
function errorCB(err) {
  alert("error: " + err);
  return false;
}
var db = openDatabase({ name: 'Team_lead.db', createFromLocation: 1 }, openCB, errorCB);
//Connction to access the pre-populated user_db.db


export default class teamProfile extends React.Component {
  static navigationOptions = {
    title: "Team Profile",
    //Sets Header text of Status Bar
  };
  constructor(props) {
    super(props);
    this.state = {
      FlatListItems: [],
      count: 0,
      teamList: [],
      a:0,
    };
    this.notif = new NotifService(this.onNotif.bind(this));
    // this.notif.localNotif();
    this._isMounted = false;

    db.transaction(tx => {
      tx.executeSql('SELECT * FROM teamMembers', [], (tx, results) => {
        var temp = [];
        // this.setState({count:results.rows.length})
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        // console.log(temp)
        this.setState({
          FlatListItems: temp,
        });
      });
    });
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM team', [], (tx, results) => {
        var temp = [];
        // this.setState({count:results.rows.length})
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        console.log("team Data ", temp)
        this.setState({
          teamList: temp,
        });
      });
    });
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
    let response = await fetch(`https://api.myjson.com/bins/tmg6g`);
    let data = await response.json()
    this.setState({ count: this.state.count + 1 });
    // data[0].team.forEach(function (item) {
      data[0].team.map((item) =>{
      // console.log("*****",item.teamEmailId)
      // console.log("name ",item.teamName)
      // console.log("profile  ",item.teamProfilePhoto,"emaild id   ",item.teamEmailId,"id   ",item.teamId)
      db.transaction((tx)=> {
        console.log("executing *****")
        tx.executeSql(
          'INSERT INTO team (teamId, teamName, teamProfilePhoto,teamEmailId) VALUES (?,?,?,?)',
          [item.teamId, item.teamName, item.teamProfilePhoto, item.teamEmailId],
          (tx, results) => {
            console.log('Results', results);
            if (results.rowsAffected > 0) {
              console.log("newdata added");
              this.notif.localNotif();
              this.setState({a:this.state.a+1});
            } ;
          }
        );
      });
    })
  }

  render() {
    const { navigate } = this.props.navigation;
    console.log("value of a ",this.state.a);
    return (
      <View >
        <Notification count={this.state.count}/>
        <View style={styles.body}>
          {
            this.state.FlatListItems.map((item, index) => (
              <TouchableOpacity
                key={item.memberId}
                //  style = {styles.container}
                onPress={() => navigate('memberdisplay', {
                  memberId: item.memberId
                })}
                >
                <View style={styles.box}>
                  <Image style={styles.image} source={{ uri: item.photoThumb }} />
                  <Text style={styles.username}>
                    {item.memberName}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          }
        </View>
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

