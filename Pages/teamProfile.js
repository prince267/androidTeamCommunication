/*Screen to view all the user*/
import React from 'react';
import { FlatList, Text, View, Image, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import styles from './teamProfileCSS'
import Notification from '../notification';
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
    console.log("team profie constrict")
    super(props);
    this.state = {
      FlatListItems: [],
      count: 0,
      teamList: [],
    };

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

  componentWillUnmount() {
    this._isMounted = false;
  }

  async getData() {

    let response = await fetch(`https://api.myjson.com/bins/tmg6g`);
    let data = await response.json()
    this.setState({ count: this.state.count + 1 });
    this._isMounted && data[0].team.forEach(function (item) {
      // console.log("*****",item.teamEmailId)
      // console.log("name ",item.teamName)
      // console.log("profile  ",item.teamProfilePhoto,"emaild id   ",item.teamEmailId,"id   ",item.teamId)
      db.transaction(function (tx) {
        console.log("executing *****")
        tx.executeSql(
          'INSERT INTO team (teamId, teamName, teamProfilePhoto,teamEmailId) VALUES (?,?,?,?)',
          [item.teamId, item.teamName, item.teamProfilePhoto, item.teamEmailId],
          (tx, results) => {
            console.log('Results', results);
            if (results.rowsAffected > 0) {
              alert(
                "New Data Added"
              );
            } 
          }
        );
      });
    })
  }

  render() {
    const { navigate } = this.props.navigation;

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
                })}>
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
}

