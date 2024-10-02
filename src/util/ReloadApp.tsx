import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../service/api";
import { user } from "../redux/reducers/user";
import { Dispatch } from "@reduxjs/toolkit";
import { reload } from "../redux/reducers/reload";

async function reloadApp(dispatch: Dispatch) {
    dispatch(reload(true));
    const response = await api.get('users/current')
        .then(async(json) => {
            dispatch(user(json.data));
            dispatch(reload(false));
        })
        .catch(async (er) => {
            console.log(er);
            await AsyncStorage.clear();
        });   
}

export default reloadApp;