import React from "react";
import AppRoutes from "./AppRoutes";
import AuthRoutes from "./AuthRoutes";
import { Center } from "@gluestack-ui/themed";
import { ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";

function Routes():JSX.Element{
    const logado = useSelector((state:any) => state.logado.value);
    const loadingUser = useSelector((state:any) => state.loading.value);
    
    if (loadingUser) {
        return(
            <Center bgColor="#ffffff8a" flex={1}>
                <ActivityIndicator color="#000" size="large"/>
            </Center>
        );
    }
    else {
        return(
            logado ? <AppRoutes /> : <AuthRoutes/>
        );
    }
}

export default Routes;