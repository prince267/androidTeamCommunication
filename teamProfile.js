/*Screen to view all the user*/
import React from 'react';
import { FlatList, Text, View ,Image , StyleSheet , Button , TouchableOpacity} from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
function openCB() {
  console.log("database open");
}
function errorCB(err){
  alert("error: " + err);
  return false;
}
var db = openDatabase({ name: 'Team_lead.db', createFromLocation : 1},openCB,errorCB);
//Connction to access the pre-populated user_db.db

 
export default class teamProfile extends React.Component {
  static navigationOptions = {
    title: "Team Profile",
    //Sets Header text of Status Bar
  };
  constructor(props) {
    super(props);
    this.state = {
      FlatListItems: [],
    };
    
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM teamMembers', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        console.log(temp)
        this.setState({
          FlatListItems: temp,
        });
      });
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View >
        <View style={styles.body}>
      {
         this.state.FlatListItems.map((item, index) => (
            <TouchableOpacity
               key = {item.memberId}
              //  style = {styles.container}
               onPress = {() =>navigate('memberdisplay' ,{ 
                memberId:item.memberId 
              })}>
                <View style= {styles.box}>
        <Image style={styles.image} source={{uri: item.photoThumb}}/>
               <Text style = {styles.username}>
                  {item.memberName}
               </Text>
               </View>
            </TouchableOpacity>
         ))
      }
      </View>
   </View>
    );
  }
}

const styles= StyleSheet.create({
  image:{
    width: 60,
    height: 60,
  },
  body: {
    padding:30,
    backgroundColor :"#E6E6FA",
  },
  box: {
    marginTop:5,
    marginBottom:5,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOpacity: .2,
    shadowOffset: {
      height:1,
      width:-2
    },
    elevation:2
  },
  username:{
    color: "#20B2AA",
    fontSize:22,
    alignSelf:'center',
    marginLeft:10
  },
  iconContent:{
    width: 60,
    height: 60,
    backgroundColor: '#40E0D0',
    marginLeft: 'auto',
    alignItems: 'center'
  },
  icon:{
    width: 40,
    height: 40,
  },
  container: {
    padding: 10,
    marginTop: 3,
    height:50,
    backgroundColor: '#d9f9b1',
    alignItems: 'center',
 },
 text: {
    color: '#4f603c'
 }
});