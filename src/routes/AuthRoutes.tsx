import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import ForgotPassword from "../pages/ForgotPassword";
import AccountSettings from "../pages/AccountSettings";

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
            {/* { <Stack.Screen name="SignIn" component={SignIn}/> } */}
            {/* { <Stack.Screen name="SignUp" component={SignUp}/> } */}
            {/* <Stack.Screen name="ForgotPassword" component={ForgotPassword}/> */}
            <Stack.Screen name="AccountSetting" component={AccountSettings}/>
        </Stack.Navigator>
    );
}

export default AuthRoutes;