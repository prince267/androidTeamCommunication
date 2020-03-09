const RNFS = require('react-native-fs')

export const moveAttachment = async (filePath, newFilepath,dirPicutures) => {
  console.log("move attachment called")
    return new Promise((resolve, reject) => {
      RNFS.mkdir(dirPicutures)
        .then(() => {
          RNFS.copyFile(filePath, newFilepath)
            .then(() => {
              console.log('FILE MOVED', filePath, newFilepath);
              resolve(true);
            })
            .catch(error => {
              console.log('moveFile error', error);
              reject(error);
            });
        }) 
        .catch(err => {
          console.log('mkdir error', err);
          reject(err);
        });
    });
  };