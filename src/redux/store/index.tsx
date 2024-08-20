import { configureStore } from "@reduxjs/toolkit";
import userLoged from "../reducers/userLoged";
import loadingUser from "../reducers/loading";
import userObject  from "../reducers/user";


export default configureStore({
    reducer: {
        logado: userLoged,
        loading: loadingUser,
        user: userObject
    }
});