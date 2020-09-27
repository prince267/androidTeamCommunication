import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        marginTop: 40,
        marginHorizontal: 10,
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#e5e5e5"
    },
    headerText: {
        fontSize: 20,
        textAlign: "center",
        margin: 10,
        fontWeight: "bold"
    },
    ImageView: {
        height: 100,
        width: 100,
    },
    GridViewContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 200,
        margin: 5,
        backgroundColor: '#009688'
    },
    GridViewTextLayout: {

        fontSize: 15,
        fontWeight: 'bold',
        justifyContent: 'flex-end',
        color: '#fff',
        padding: 0,
    }
});