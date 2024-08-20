import { configureStore } from "@reduxjs/toolkit";
import userLoged from "../reducres/userLoged";
import loadingUser from "../reducres/loading";


export default configureStore({
    reducer: {
        logado: userLoged,
        loading: loadingUser,
    }
});