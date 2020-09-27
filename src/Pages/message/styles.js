import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        alignItems: 'center',
    },
    logo: {
        color: 'black',
        fontSize: 40,
        fontWeight: 'bold',
        textShadowColor: 'grey',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 15,
        marginBottom: 20,
    },
    buttonContainer: {
        alignSelf: 'stretch',
        margin: 5,
        padding: 20,
        borderWidth: 2,
        borderColor: 'black',
        backgroundColor: 'rgba(255,255,255,0.6)',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    backButtonContainer: {
        height: 40,
        width: 58,
        marginTop: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'rgba(255,255,255,0.6)',
    },
    backButtonText: {
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'left',
    },
});
