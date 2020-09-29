import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    image: {
        width: 60,
        height: 60,
    },
    body: {
        padding: 30,
        backgroundColor: "#E6E6FA",
    },
    box: {
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: '#FFFFFF',
        justifyContent:'space-between',
        flexDirection: 'row',
        shadowColor: 'black',
        shadowOpacity: .2,
        shadowOffset: {
            height: 1,
            width: -2
        },
        elevation: 2
    },
    username: {
        color: "#20B2AA",
        fontSize: 22,
        alignSelf: 'center',
        marginLeft: 10
    },
    iconContent: {
        width: 60,
        height: 60,
        backgroundColor: '#40E0D0',
        marginLeft: 'auto',
        alignItems: 'center'
    },
    icon: {
        width: 40,
        height: 40,
    },
    text: {
        color: '#4f603c'
    },
    callContainer:{
        height:60,
        width:40,
        color: "#20B2AA",
        fontSize: 22,
        alignItems:'center',
        justifyContent:'center',

    }
});