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

const insertImageTable = (imageId, srcPath, destPath, localCopyFlag) => {

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

const launchCamera = () => {
  var options = {
    title: 'Select Image',
    storageOptions: {
      privateDirectory: true,
      skipBackup: true,
      path: 'images',
    },
  };
  ImagePicker.launchCamera(options, response => {
    // console.log(response)
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
      insertImageTable(response.fileName, '', response.path, 1)

      console.log("File Uploaded");
      // You can also display the image using data:
      // let source = { uri: 'data:image/jpeg;base64,' + response.data };
      // this.setState({
      //   filePath: source,
      // });

    }
  });
};

const moveImage = (filePath, dirPictures) => {

  const uuid = uuidv4();
  const imageName = `${uuid}.jpeg`
  const newFilepath = `${dirPictures}/${imageName}`;
  var isMoveSuccessfull = moveAttachment(filePath, newFilepath, dirPictures);
  if (isMoveSuccessfull) {
    insertImageTable(imageName, filePath, newFilepath, 1);
    console.log("move image called")
  }

}
const imageLibrary = () => {
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
      // this.setState({
      //   filePath: source,
      // });
      let filePath = source
      moveImage(filePath.path, dirPictures)
      console.log("launch library called")

    };
  });
};
export { launchCamera, imageLibrary }