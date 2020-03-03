/*Screen to view Login*/
import React, { Component } from 'react';
import {
  Text,
  ScrollView,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import styles from './loginCSS';
import { databaseOpen } from '../api/dataBase'
var db = databaseOpen();
export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isLogin: false
    };
  }

  login() {
    const { navigate } = this.props.navigation

    db.transaction(tx => {
      this.setState({ isLogin: false });
      tx.executeSql(`SELECT teamId FROM team WHERE teamId="${this.state.username}" AND teamPassword="${this.state.password}"`, [], (tx, results) => {
        if (results.rows.length) {
          this.setState({
            isLogin: true,
          });
        };
        if (this.state.isLogin) {
          navigate('HomeScreen', {
            teamId: this.state.username
          })
        }
        else {
          alert("wrong credentials")
        }
      })
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
                  this.login();
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