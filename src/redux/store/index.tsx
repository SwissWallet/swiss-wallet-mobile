import { configureStore } from "@reduxjs/toolkit";
import userLoged from "../reducers/userLoged";
import loadingUser from "../reducers/loading";
import userObject  from "../reducers/user";
import points from "../reducers/pointsProduct";


export default configureStore({
    reducer: {
        logado: userLoged,
        loading: loadingUser,
        user: userObject,
        points: points
    }
});