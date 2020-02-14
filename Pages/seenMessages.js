/*Screen to view all the user*/
import React from 'react';
import { FlatList, Text, View ,Image , StyleSheet , Button , TouchableOpacity} from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
//Connction to access the pre-populated user_db.db
import styles from './seenMessagesCSS'
function openCB() {
  console.log("database open");
}
function errorCB(err){
  alert("error: " + err);
  return false;
}
var db = openDatabase({ name: 'Team_lead.db', createFromLocation : 1},openCB,errorCB);
 
export default class seenMessages extends React.Component {
  static navigationOptions = {
    title: "Mesaages ",
    //Sets Header text of Status Bar
  };
  constructor(props) {
    // this.updateUser.bind(this)
    super(props);
    this.state = {
        navigate:"",
      seenOrUnSeen: this.props.navigation.state.params.seenOrUnSeen,
      memberMessages: [],
      seniorManagerMessages:[]
    };
    db.transaction(tx => {
      tx.executeSql(`select * from MemberActivity where seenOrUnseen=${this.state.seenOrUnSeen};`, [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        console.log(temp)
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
         console.log(temp)
          this.setState({
            seniorManagerMessages: temp,
          });
        });
      });
  };


  render() {
    const {navigate} = this.props.navigation;
    return (
      <View >
        <View style={styles.body}>
            <View>
                <Text>MemberActivity</Text>
      {
         this.state.memberMessages.map((item, index) => (
            <TouchableOpacity
                 key = {index}
            //   style = {styles.container}
               onPress = {() =>{
                navigate('Message',{
                    memberId : item.memberId,
                    managerId :"NULL",
                    messageId: item.activitySerialNo,
                    message: item.activityDescription,
                    time: item.seenDateTime,
                    referenceId: "NULL",
                    seenOrUnSeen:item.seenOrUnseen,
                } );
            }}
              >
                <View style= {styles.box}>
               <Text style = {styles.username}>
                  {item.activityDescription}
               </Text>
               </View>
            </TouchableOpacity>
         ))
      }
      </View>
      </View>
      <View style={styles.body}>
          <View>
              <Text>Senior Manager Reporting</Text>
      {
         this.state.seniorManagerMessages.map((item, index) => (
            <TouchableOpacity
               key = {index}
              //  style = {styles.container}
             onPress = {() =>navigate('Message',{
                memberId : item.memberId,
                managerId :item.managerId,
                messageId: item.reportId,
                message: item.reportText,
                time: item.seenDateTime,
                referenceId: item.refPastReportId,
                seenOrUnSeen:item.seenOrUnseen,
            } )}
              >
                <View style= {styles.box}>
               <Text style = {styles.username}>
                  {item.reportText}
               </Text>
               </View>
            </TouchableOpacity>
         ))
      }
      </View>
      </View>
   </View>
    );
  }
}

