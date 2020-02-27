import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Navigator,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import styles from './loginCSS';
import { openDatabase } from 'react-native-sqlite-storage';
function openCB() {
  console.log("database open");
}
function errorCB(err) {
  alert("error: " + err);
  return false;
}
var db = openDatabase({ name: 'Team_lead.db', createFromLocation: 1 }, openCB, errorCB);
//Connction to access the pre-populated user_db.db
export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      username: '', 
      password: '',
      isLogin: false
    };
  }

 login (){
   const {navigate} = this.props.navigation
   
     db.transaction(tx => {
       this.setState({isLogin:false});
      tx.executeSql(`SELECT teamId FROM team WHERE teamId="${this.state.username}" AND teamPassword="${this.state.password}"`, [], (tx, results) => {
        if (results.rows.length){
        this.setState({
          isLogin: true,
        });
      };
      if(this.state.isLogin){
         navigate('HomeScreen') 
      }
      else{ 
        alert("wrong credentials")
      }})
    });
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.logo}>Login</Text>
            <View style={styles.inputContainer}>
              <TextInput
                underlineColorAndroid="transparent"
                style={styles.input}
                onChangeText={username => this.setState({ username })}
                value={this.state.username}
                placeholder="username"
              />

              <TextInput
                secureTextEntry={true}
                underlineColorAndroid="transparent"
                style={styles.input}
                onChangeText={password => this.setState({ password })}
                value={this.state.password}
                placeholder="password"
              />

              <TouchableOpacity
                onPress={() => {
                  // alert(this.state.isLogin)
                  
                  this.login() ;
          
                  // this.state.isLogin ? alert("logi") : alert ("no")
                }}
                style={styles.buttonContainer}>
                <Text style={styles.buttonText}>LOGIN</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </ScrollView>
    );
  }

}