/*This is an example of Image Picker in React Native*/
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { moveAttachment } from './api/moveAttachment'
import { dirPictures } from './constant'
import ImagePicker from 'react-native-image-picker';
import { databaseOpen } from './api/dataBase'

const db = databaseOpen();
export default class Imagepickers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filePath: {},
      dirPictures: dirPictures
    };
  }

  insertImageTable = (imageId, srcPath, destPath, localCopyFlag) => {

    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO imageTable (imageId, srcPath, destPath,localCopyFlag,remoteCopyFlag) VALUES (?,?,?,?,?)',
        [imageId, srcPath, destPath, localCopyFlag, 0],
        (tx, results) => {
          console.log('Results', results);
          if (results.rowsAffected > 0) {
            console.log("newdata added");
          };
        }
      );
    });
  }

  launchCamera = () => {
    var options = {
      title: 'Select Image',
      storageOptions: {
        privateDirectory: true,
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, response => {
      console.log(response)
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        let source = response;
        console.log("response .uri ", response.uri)
        this.insertImageTable(response.fileName, '', response.path, 1)
        alert("File Uploaded");
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          filePath: source,
        });

      }
    });
  };

  moveImage = async (filePath, dirPictures) => {

    const uuid = uuidv4();
    const imageName = `${uuid}.jpeg`
    const newFilepath = `${dirPictures}/${imageName}`;
    var isMoveSuccessfull = await moveAttachment(filePath, newFilepath, dirPictures);
    if (isMoveSuccessfull) {
      this.insertImageTable(imageName, filePath, newFilepath, 1);
    }

  }
  imageLibrary = () => {
    var options = {
      title: 'Select Image',
      // customButtons: [
      //   { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
      // ],
      storageOptions: {
        privateDirectory: true,
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, response => {
      // console.log('Response = ',response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        let source = response;
        console.log("response .uri ", response.uri)
        this.setState({
          filePath: source,
        });
        this.moveImage(this.state.filePath.path, this.state.dirPictures)

      };
    });
  };
  render() {
    return (
      <View style={styles.container}>
        {/* 
          <Image
            source={{ uri: this.state.filePath.uri }}
            style={{ width: 250, height: 250 }}
          />
           */}
        <TouchableOpacity onPress={this.launchCamera.bind(this)} >
          <Text style={styles.text_color}>Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.imageLibrary.bind(this)} >
          <Text style={styles.text_color}>Gallery</Text>
        </TouchableOpacity>
      </View>
    );
  } oh
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  text_color: {

    alignItems: 'center',
    backgroundColor: '#ADD8E6',
    width: 70,
    height: 40,
    marginTop: 20,
    marginBottom: 10,
    marginRight: 15,
    marginLeft: 10,
    padding: 10,
  }
});