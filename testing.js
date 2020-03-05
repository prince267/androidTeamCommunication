import React from 'react';
import * as data from './teamDisplay.json'
import { View ,Text} from 'react-native';
export default class test extends React.Component{

    render(){
        return(
            <View>
                <Text>{data}</Text>
            </View>
        )
    }
}