import React, { useState } from "react";
import { View,Box,Text,Input, HStack, TextInput} from "@gluestack-ui/themed";
import HeaderWithoutPoints from "../../components/HeaderWithoutPoints";
import Title from "../../components/Title";
import { InputField } from "@gluestack-ui/themed";
import { TouchableOpacity } from "react-native";
import DropShadow from "react-native-drop-shadow";






function ChangeAdress():JSX.Element{
    return(
        <View>     
            <HeaderWithoutPoints />
                <Title name="Alterar endereço"></Title>

                <Box>

                <Text fontWeight="$bold" color="#000" fontSize={17}  marginLeft={30} mt={20}>CEP</Text>
                <Input   mt={7}  marginLeft={30} bgColor="#C6C6C6" opacity={0.36} borderRadius={8} height={42} $focus-borderColor="#C6C6C6" width={365}>
                                <InputField color="#000" fontWeight="bold" />
                            </Input>    
                    <HStack alignItems="center" >
                        <Box>
                <Text fontWeight="$bold" color="#000" fontSize={17}  marginLeft={30} mt={30}>Cidade</Text>
                <Input isDisabled mt={7}  marginLeft={30} bgColor="#C6C6C6" opacity={0.36} borderRadius={8} height={42} $focus-borderColor="#C6C6C6" width={180}>
                                <InputField color="#000" fontWeight="bold" />
                            </Input>
                            </Box>
                            <Box>
                            <Text fontWeight="$bold" color="#000" fontSize={17}  marginLeft={30} mt={30}>UF</Text>
                <Input  isDisabled mt={7}  marginLeft={30} bgColor="#C6C6C6" opacity={0.36} borderRadius={8} height={42} $focus-borderColor="#C6C6C6" width={150}>
                                <InputField color="#000" fontWeight="bold" />
                            </Input>
                            </Box>
                            </HStack>


                            <Text fontWeight="$bold" color="#000" fontSize={17}  marginLeft={30} mt={20}>Logradouro</Text>
                <Input isDisabled mt={7}  marginLeft={30} bgColor="#C6C6C6" opacity={0.36} borderRadius={8} height={42} $focus-borderColor="#C6C6C6" width={365}>
                                <InputField color="#000" fontWeight="bold" />
                            </Input>

                            <Text fontWeight="$bold" color="#000" fontSize={17}  marginLeft={30} mt={20}>Número</Text>
                <Input mt={7}  marginLeft={30} bgColor="#C6C6C6" opacity={0.36} borderRadius={8} height={42} $focus-borderColor="#C6C6C6" width={365}>
                                <InputField color="#000" fontWeight="bold" />
                            </Input>

                            
                </Box>

                <Box>
                <DropShadow 
                style={{shadowColor: '#000', shadowOffset: {width: 4, height: 5}, shadowRadius: 2, shadowOpacity: 0.5}}>
                <TouchableOpacity>
                    <Box ml={22} mr={22} bgColor="#9A1915" mt={45} alignItems="center" justifyContent="center" height={45} borderRadius={10} width={365}>
                                    <Text color="#fff" fontWeight="$bold">
                                        Confirmar
                                    </Text>
                                </Box>
                    
                </TouchableOpacity>
            </DropShadow>
            </Box>
        </View>
    )
}

export default ChangeAdress;