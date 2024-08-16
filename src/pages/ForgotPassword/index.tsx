import { Box, Button, ButtonText, Center, HStack, Icon, Input, InputField, Text, View, } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { Bold, CircleArrowLeft } from "lucide-react-native";

import React from "react";
import { TouchableOpacity } from "react-native";

function ForgotPassword():JSX.Element{
    const navigator=useNavigation();
    return(
        <View >

            <Box bgColor="#E30613" height={180}>
                <TouchableOpacity onPress={() => navigator.goBack()}> 
                <Icon as={CircleArrowLeft} size="40" color="white" margin ={20}/>
                </TouchableOpacity>
                <Center >
                    <Text
                    color="white" 
                    fontSize={35}
                    fontWeight={"$bold"}
                    margin={5}
                    >
                    Esqueci a senha</Text>
                </Center>
               
            </Box >

            <Box marginBottom={7} borderRadius={20} bgColor="#fff" h="$full" mt={-20}>
                
               <Text mt={10} ml={20} marginTop={190} mb={5} color="black" fontWeight={"$bold"}>Nova senha</Text> 
            <Input
                variant="outline"
                size="md"
                ml={20}
                mr={30}
                bgColor="#C6C6C6"
                opacity={0.99}
                mt={4}
                mb={20}
                borderColor="#C6C6C6"
                height={40}
                >
                <InputField  />
                </Input>

                <Text mt={10} ml={20}  mb={5} color="black" fontWeight={"$bold"} >Confirmar senha</Text>
                <Input
                variant="outline"
                size="md"
                ml={20}
                mr={30}
                bgColor="#C6C6C6"
                opacity={0.99}
                mt={4}
                mb={30}
                borderColor="#C6C6C6"
                height={40}
                >
                <InputField  />
                </Input>

                <Center>
            <TouchableOpacity>
            <Box
            bgColor="#9A1915"
            borderRadius={15}
            height={45}
            justifyContent="center" 
            >
 
            <Text color="white"  ml={146} mr={147} fontWeight={"$bold"}>Confirmar</Text>
            </Box>
            </TouchableOpacity>  

            <HStack mt={198} >
                <Text fontWeight= "$bold" >
                    Já possui uma conta?
                </Text>
                <TouchableOpacity onPress={() => navigator.navigate('SignIn' as never)}>
                    <Text underline fontWeight= "$bold" > Faça Login</Text>
                </TouchableOpacity>
            </HStack>
            

              </Center>
            </Box>

        </View>
        
    );
}

export default ForgotPassword;