import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import styles from './loginCSS';
export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
  }

  login = (navigate) => {
    if (this.state.username === "prince" && this.state.password === "test123") {
      navigate('teamProfile')

    }

    // fetch('url', {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     username: this.state.username,
    //     password: this.state.password,
    //   }),
    // })
    //   .then(response => response.json())
    //   .then(res => {
    //     if (res.success === 'true') {
    //       var username = res.message;

    //       AsyncStorage.setItem('username', username);
    //     } else {
    //       alert(res.message);
    //     }
    //   });

    // this.props.navigator.push({
    //   id: 'MemberProfile',
    // });
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
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
              onPress={() => (this.state.username == "P" && this.state.password == "0") ?
                navigate('HomeScreen') : alert("wrong credentials")}
              style={styles.buttonContainer}>
              <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    );
  }

}