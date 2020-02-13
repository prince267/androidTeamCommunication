import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Image
} from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
function openCB() {
  console.log("database open");
}
function errorCB(err){
  alert("error: " + err);
  return false;
}
var db = openDatabase({ name: 'Team_lead.db', createFromLocation : 1},openCB,errorCB);
export default class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: new Date().getHours().toString()+new Date().getMinutes().toString(),
      memberId: this.props.navigation.state.params.memberId,
      managerId : this.props.navigation.state.params.managerId,
      messageId: this.props.navigation.state.params.messageId,
      message: this.props.navigation.state.params.message,
      time: this.props.navigation.state.params.time,
      referenceId: "NULL",
      seenOrUnSeen:this.props.navigation.state.params.seenOrUnSeen,
    };
    console.log("seen is ",this.state.seenOrUnSeen);
    if(!this.state.seenOrUnSeen){
      console.log("changing ",this.state.currentTime)
      if(this.state.managerId != "NULL"){
      db.transaction((tx)=> {
      tx.executeSql(
        `UPDATE seniorManagerReporting set seenDateTime=${this.state.currentTime},seenOrUnSeen=1 where managerId=${this.state.managerId} And memberId=${this.state.memberId} And reportId=${this.state.messageId}`,
        [],
        (tx, results) => {
          console.log('Results',results.rowsAffected);
          if(results.rowsAffected>0){
            this.setState({time : this.state.currentTime})
          }else{
            alert('Updation Failed');
          }
        }
      );
    });  
  }
  if(this.state.managerId === "NULL"){
    db.transaction((tx)=> {
    tx.executeSql(
      `UPDATE MemberActivity set seenDateTime=${this.state.currentTime},seenOrUnSeen=1 where memberId=${this.state.memberId} And activitySerialNo=${this.state.messageId}`,
      [],
      (tx, results) => {
        console.log('Results',results.rowsAffected);
        if(results.rowsAffected>0){
          this.setState({time : this.state.currentTime})
        }else{
          alert('Updation Failed');
        }
      }
    );
  });  
} 
    }
  }


  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.logo}>Messege</Text>

          <TouchableOpacity style={styles.buttonContainer}>
            <Image style={styles.image} source={{}} />
            <Text style={styles.buttonText}>Manager Id/Member Id: {this.state.memberId}{"\n"}</Text>
            <Text style={styles.buttonText}>Report Id/Serial No: {this.state.messageId}{"\n"}</Text>
            <Text style={styles.buttonText}>Reference Id: {this.state.referenceId}{"\n"}</Text>
            <Text style={styles.buttonText}>Message Body:{"\n"}{this.state.message}{"\n"}</Text>
            <Text style={styles.buttonText}>Time: {this.state.time}{"\n"}</Text>
            <TouchableOpacity
              onPress={() => navigate('HomeScreen')}
              style={styles.backButtonContainer}>
              <Text style={styles.backButtonText}>Home</Text>
            </TouchableOpacity>
          </TouchableOpacity>

        </View>
      </View>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    alignItems: 'center',
  },
  logo: {
    color: 'black',
    fontSize: 40,
    fontWeight: 'bold',
    textShadowColor: 'grey',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 15,
    marginBottom: 20,
  },
  buttonContainer: {
    alignSelf: 'stretch',
    margin: 5,
    padding: 20,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  backButtonContainer: {
    height: 40,
    width: 58,
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  backButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'left',
  },
});
