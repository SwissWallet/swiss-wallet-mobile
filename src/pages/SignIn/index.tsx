// @ts-nocheck
import { Button, ButtonText, InputField, Text, View } from "@gluestack-ui/themed";
import { Box } from '@gluestack-ui/themed';
import { Input } from '@gluestack-ui/themed';
import React from "react";
import LinearGradient from "react-native-linear-gradient";

function SignIn():JSX.Element {
    return(
        <LinearGradient colors={["#e30613", "#9a1915", "#681413"]} style={{flex:1}}>

            <Box> 
                        <Box>
                            <Text size="4xl" fontWeight="$bold">Login</Text>
                        </Box>

                        <Box>
                            
                            <Input variant="underlined" size="md" isDisabled={false} isInvalid={false} isReadOnly={false} >
                            <InputField placeholder='Digite seu email'/>
                            </Input>

                            <Input variant="underlined" size="md" isDisabled={false} isInvalid={false} isReadOnly={false} >
                            <InputField placeholder='Digite sua senha'/>
                            </Input>
      
                        </Box>

                        <Box>
                            
                            <Button size="md" variant="solid" action="primary" isDisabled={false} isFocusVisible={false} color= >
                                 <ButtonText>Add </ButtonText>
                            </Button>
                        
                        </Box>
            </Box>

            <Text>Não possui conta? cadastre-se</Text>

        </LinearGradient>
    );
}

export default SignIn;