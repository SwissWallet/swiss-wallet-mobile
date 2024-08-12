import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import SignIn from "../pages/SignIn";

function AuthRoutes():JSX.Element{
    
    const Stack = createNativeStackNavigator();
    
    return(
        <Stack.Navigator
            screenOptions={
                {
                    headerShown: false
                }
            }
        >
            <Stack.Screen name="SignIn" component={SignIn}/>
        </Stack.Navigator>
    );
}

export default AuthRoutes;