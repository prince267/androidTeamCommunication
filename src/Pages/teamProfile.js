/*Screen to view all the user*/
import React from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { databaseOpen } from '../api/dataBase';
import { dirProfilePictures } from '../constant';
import styles from './teamProfileCSS';

var db = databaseOpen();

export default class teamProfile extends React.Component {
  static navigationOptions = {
    title: "Team Profile",
    //Sets Header text of Status Bar
  };
  constructor(props) {
    super(props);
    this.state = {
      FlatListItems: [],
      teamId: this.props.navigation.state.params.teamId
    };

    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM teamMembers where teamId="${this.state.teamId}"`, [], (tx, results) => {
        var temp = [];
        // this.setState({count:results.rows.length})
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        // console.log(temp)
        this.setState({
          FlatListItems: temp,
        });
      });
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView>
        <View >
          <View style={styles.body}>
            {
              this.state.FlatListItems.map((item, index) => (
                <TouchableOpacity
                  key={item.memberId}
                  //  style = {styles.container}
                  onPress={() => navigate('memberdisplay', {
                    memberId: item.memberId
                  })}
                >
                  <View style={styles.box}>
                    <Image style={styles.image} source={{ uri: `file://${dirProfilePictures}/${item.photoThumb}` }} />
                    <Text style={styles.username}>
                      {item.memberName}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            }
          </View>
        </View>
      </ScrollView>
    );
  }
}

