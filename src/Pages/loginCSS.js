import { StyleSheet } from 'react-native'
export default StyleSheet.create({
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