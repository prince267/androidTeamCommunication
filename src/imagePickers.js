import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { moveAttachment } from './api/moveAttachment'
import { dirPictures } from './constant'
import ImagePicker from 'react-native-image-picker';
import { databaseOpen } from './api/dataBase'
const RNFS=require('react-native-fs')

const db = databaseOpen();


const checkDuplicateImage = async (sha256) =>{

  return new Promise ((resolve,reject)=>{
    db.transaction((tx)=>{
      tx.executeSql(
        `SELECT imageId from imageTable where sha256="${sha256}"`,
        [],
        (tx,results) =>{
          console.log("result after checkup ",results.rows.item(0))
          if(results.rows.length){

            resolve({
              imageId:results.rows.item(0).imageId,
              status:true
            })
          }
          else{
            resolve({
              status:false})
          }
        }
      )
    })
  })

}
const insertImageTable = async (imageId, srcPath, destPath, localCopyFlag,sha256) => {
  console.log("sha256 is ",sha256)
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO imageTable (imageId, srcPath, destPath,localCopyFlag,remoteCopyFlag,sha256) VALUES (?,?,?,?,?,?)',
        [imageId, srcPath, destPath, localCopyFlag, 0,sha256],
        (tx, results) => {
          console.log('Results', results);
          if (results.rowsAffected > 0) {
            console.log("newdata added");
            resolve(true);
          };
        },
        (error) => {
          console.log("error is ", error)
          reject(error);
        }

      );
    });
  })
}

const updateImageTable = async (imageId) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE imageTable set localCopyFlag = 1 where imageId="${imageId}"`,
        [],
        (tx, results) => {
          console.log('Results', results);
          if (results.rowsAffected > 0) {
            console.log("data updated");
            resolve(true);
          };
        },
        (error) => {
          console.log("error is ", error)
          reject(error);
        }

      );
    });
  })
}

const launchCamera = async () => {
  var source;
  var options = {
    title: 'Select Image',
    storageOptions: {
      privateDirectory: true,
      skipBackup: true,
      path: 'images',
    },
  };
  var a = await new Promise((resolve) => {
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
        source = response;
        // console.log("response .uri ", response.uri)
        resolve(true)
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        // this.setState({
        //   filePath: source,
        // });

      }
    });
  })
  var sha256=await RNFS.hash(source.path,"sha256")
  var b = await insertImageTable(source.fileName, '', source.path, 1,sha256)
  console.log("sha256 code ",sha256)
  console.log("insert table ***", b)
  console.log("value of a is ", a)
  return source.fileName;
};

const moveImage = async (filePath, dirPictures,sha256) => {

  const uuid = uuidv4();
  const imageName = `${uuid}.jpeg`
  const newFilepath = `${dirPictures}/${imageName}`;
  await insertImageTable(imageName, filePath, newFilepath, 0,sha256);
  
  var isMoveSuccessfull = await moveAttachment(filePath, newFilepath, dirPictures);
  if (isMoveSuccessfull) {
    var d=await updateImageTable(imageName);
    // var d = await insertImageTable(imageName, filePath, newFilepath, 1);
    console.log("after insert success ", d)
    return {
      result: true,
      imageName: imageName
    };
  }

}
const imageLibrary = async () => {
  var source;
  var options = {
    title: 'Select Image',
    // customButtons: [
    //   { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
    // ],
    storageOptions: {
      privateDirectory: true, flex: 1,
      flexDirection: 'row',
      skipBackup: true,
      path: 'images',
    },
  };
  var a = await new Promise((resolve, reject) => {
    ImagePicker.launchImageLibrary(options, response => {
      // console.log('Response = ',response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
        reject(response.didCancel)
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        reject(response.error)
      } else {
        console.log("launch library executes")
        source = response;
        resolve(true)
        // console.log("response .uri ", response.uri)
        // this.setState({
        //   filePath: source,
        // });
        // let filePath = source
        // // moveImage(filePath.path, dirPictures)
        // console.log("launch library called")

      };
    });
  })
  // console.log("laun library success ***", a)

  var sha256=await RNFS.hash(source.path,"sha256")
  var ret= await checkDuplicateImage(sha256);
  console.log("result are check  ***********",ret)
  console.log("hash code is ",sha256)
  if(!ret.status){
    console.log("new data going to be inserted")
    var b = await moveImage(source.path, dirPictures,sha256);
    // console.log("Move image Psuccess***", b)
    return b.imageName
  }
  else{
    console.log("send previous d")
    return ret.imageId
  }
  
};
export { launchCamera, imageLibrary }