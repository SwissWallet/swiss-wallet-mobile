import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import ForgotPassword from "../pages/ForgotPassword";


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
            { <Stack.Screen name="SignIn" component={SignIn}/> }
            { <Stack.Screen name="SignUp" component={SignUp}/> }
            <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>
            
        </Stack.Navigator>
    );
}

export default AuthRoutes;