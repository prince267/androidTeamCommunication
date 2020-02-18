import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class Notification extends React.Component {

    constructor(props) {
        
        super(props);
        this.state = {
            top: 16,
        };
    }


    UNSAFE_componentWillReceiveProps() {
        this.setState({ top: 16 }, () => {
            setTimeout(() => { this.setState({top: -200}) },
                2000)
        });
    }


    render() {
        return (
            <View>
                <Text style={[styles.noti, { top: this.state.top }]}>New Msg</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    noti: {
        backgroundColor: 'grey',
        color: 'white',
        padding: 16,
        position: "absolute",
        right: 16,
        zIndex: 999,
    }
})