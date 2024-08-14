// @ts-nocheck
import { Button, ButtonText, InputField, InputIcon, InputSlot, Text, View } from "@gluestack-ui/themed";
import { Box } from '@gluestack-ui/themed';
import { Input } from '@gluestack-ui/themed';
import { Lock, User } from "lucide-react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import DropShadow from "react-native-drop-shadow";
import LinearGradient from "react-native-linear-gradient";

function SignIn():JSX.Element {
    return(
        <LinearGradient colors={["#e30613", "#9a1915", "#681413"]} style={{flex:1}}>

            <Box width={304} height={285}> 

                        <Box marginLeft={28} marginTop={229}>
                            <Text size="4xl" fontWeight="$bold" color="$white">Login</Text>
                        </Box>

                        <Box marginLeft={28} marginTop={50}  marginBottom={30} width={304} height={113}>
                            
                                <Input variant="underlined" size="xl"  borderColor="$white" width={356} marginBottom={30} >
                                    <InputSlot pl="$3">
                                        <InputIcon as={Lock} />
                                    </InputSlot>
                                    <InputField placeholder='Digite seu email'/>
                                </Input>

                                <Input variant="underlined" size="xl"  borderColor="$white" width={356}>
                                    <InputSlot pl="$3">
                                        <InputIcon as={User} />
                                    </InputSlot>
                                    <InputField placeholder='Digite sua senha'/>
                                </Input>
      
                        </Box>

                        <Box alignItems="flex-end">
                            <Text underline={true} color="$white" marginBottom={20}>Esqueci minha senha</Text>
                        </Box>

                        <Box marginTop={20}>

                                <TouchableOpacity >
                                 <DropShadow style={{ shadowColor: "#000", shadowOffset: {width: 0, height: 0}, shadowOpacity: 1, shadowRadius: 5,}}>
                                       <Box ml={22} width="90%" height={45} bgColor="#9A1915" alignItems="center" justifyContent="center" borderRadius={10} >
                                            <Text color="$white">
                                                Login
                                            </Text>
                                        </Box>
                                    </DropShadow>
                                </TouchableOpacity>
                                
                            
                        </Box>
                        
            </Box>

            <Text color="$white" justifyContent="center" marginLeft={90} marginTop={350}>Não possui conta? cadastre-se</Text>

        </LinearGradient>
    );
}

export default SignIn;