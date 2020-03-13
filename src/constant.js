const RNFS= require('react-native-fs')
import { name as appName } from '../app.json';

export const DATA_BASE='Team_lead.db'
export const dirPictures=`${RNFS.ExternalStorageDirectoryPath}/Android/data/com.${appName}/files/Pictures/images`
export const dirProfilePictures=`${RNFS.ExternalStorageDirectoryPath}/Android/data/com.${appName}/files/Pictures/teamImages`
