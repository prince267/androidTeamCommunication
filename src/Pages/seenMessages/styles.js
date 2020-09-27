import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    image: {
        width: 60,
        height: 60,
    },
    body: {
        padding: 30,
        backgroundColor: "#E6E6FA",
        height:250
    },
    box: {
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: '#FFFFFF',
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
    container: {
        padding: 10,
        marginTop: 3,
        height: 50,
        backgroundColor: '#d9f9b1',
        alignItems: 'center',
    },
    text: {
        color: '#4f603c'
    }
});