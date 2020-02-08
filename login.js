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

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = { username: '', password: '' };
      }
  
      login = (navigate) => {
        if(this.state.username === "prince" && this.state.password === "test123"){
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
              onPress= {() =>(this.state.username == "P" && this.state.password == "0") ?
                            navigate('HomeScreen'): alert("wrong credentials")}
              style={styles.buttonContainer}>
              <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>
          </View>
    
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
    color: 'blue',
    fontSize: 40,
    fontWeight: 'bold',
    textShadowColor: 'grey',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 15,
    marginBottom: 20,
  },
  inputContainer: {
    margin: 20,
    marginBottom: 0,
    padding: 20,
    paddingBottom: 10,
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  input: {
    fontSize: 16,
    height: 40,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'rgba(255,255,255,1)',
  },
  buttonContainer: {
    alignSelf: 'stretch',
    margin: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});