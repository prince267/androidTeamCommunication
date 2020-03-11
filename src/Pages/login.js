/*Screen to view Login*/
import React, {Component} from 'react';
import {Text, View, TextInput, TouchableOpacity, Image} from 'react-native';
import styles from './loginCSS';
import {databaseOpen} from '../api/dataBase'
var db = databaseOpen();
export default class Login extends Component {

    constructor(props) {
        super(props);
        state = {
            username: '',
            password: '',
            isLogin: false
        }
    }

    login() {
        const {navigate} = this.props.navigation

        db.transaction(tx => {
            this.setState({isLogin: false});
            tx.executeSql(`SELECT teamId,teamName,teamProfilePhoto FROM team WHERE teamId="${this.state.username}" AND teamPassword="${this.state.password}"`, [], (tx, results) => {
                if (results.rows.length) {
                    this.setState({isLogin: true});
                };
                let user = results
                    .rows
                    .item(0)
                if (this.state.isLogin) {
                    navigate('HomeScreen', {
                        teamId: this.state.username,
                        teamName: user.teamName,
                        teamProfilePhoto: user.teamProfilePhoto
                    })
                } else {
                    alert("wrong credentials")
                }
            })
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.inputs}
                        placeholder="Username"
                        underlineColorAndroid='transparent'
                        onChangeText={(username) => this.setState({username})}/>
                    <Image
                        style={styles.inputIcon}
                        source={{
                        uri: 'asset:/images/email.png'
                    }}/>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.inputs}
                        placeholder="Password"
                        secureTextEntry={true}
                        underlineColorAndroid='transparent'
                        onChangeText={(password) => this.setState({password})}/>
                    <Image
                        style={styles.inputIcon}
                        source={{
                        uri: 'asset:/images/key.png'
                    }}/>
                </View>

                <TouchableOpacity
                    style={[styles.buttonContainer, styles.loginButton]}
                    onPress={() => this.login()}>
                    <Text style={styles.loginText}>Login</Text>
                </TouchableOpacity>

            </View>
        );
    }
}