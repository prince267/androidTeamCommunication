import { openDatabase } from 'react-native-sqlite-storage';
import { DATA_BASE } from '../constant'

function openCB() {
    console.log("database open");
}
function errorCB(err) {
    alert("error: " + err);
    return false;
}

const databaseOpen = () => {
    var db = openDatabase({ name: DATA_BASE, createFromLocation: 1 }, openCB, errorCB);
    return db;
}

export { databaseOpen };