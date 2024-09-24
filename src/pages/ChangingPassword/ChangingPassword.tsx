//@ts-nocheck
import { Box, Input, InputField, Text, View } from "@gluestack-ui/themed";
import HeaderWithoutPoints from "../../components/HeaderWithoutPoints";
import Titlle from "../../components/Title";
import { ActivityIndicator, Alert, Keyboard, TouchableOpacity, TouchableWithoutFeedback, Modal } from "react-native";
import DropShadow from "react-native-drop-shadow";
import React, { useState } from "react";
import api from "../../service/api";
import { current } from "@reduxjs/toolkit";
import { useNavigation } from "@react-navigation/native";


function ChangingPassword():JSX.Element{

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigation();

    async function ChangingPassword(){
        
        if(newPassword != confirmPassword){
            Alert.alert("As senhas devem ser iguais!")
            return;
        }
        
        if(newPassword.length < 6 && confirmPassword.length < 6 ){
            Alert.alert("A senha deve ter no minimo 6 digitos!")
            return;
        }
        setLoading(true);
        ChangePassword();
    }

    async function ChangePassword() {
        
        const response = await api.put("users/password", {
            currentPassword:oldPassword,
            newPassword:newPassword,
            confirmPassword:confirmPassword
        })
        .then((json) => {
            setLoading(false);
            console.log(json.data);
            return Alert.alert("Senha alterada com sucesso!")
        }).catch((error) => {
            setLoading(false);
            console.log(error);
            if(error.response.status === 400){
                Alert.alert("Senha atual errada!")
            }
            else if (error.response.status === 422) {
                return Alert.alert('Erro', 'Algo inesperado aconteceu');
            }
        })

        

    }


    return(
        <View>

            <HeaderWithoutPoints/>

            <Titlle name="Alterar Senha" />
            
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}> 
            

                <Box ml={22} mr={22} mt={10}>


                    <Box mb={30}>

                        <Text mt={20} color="$black" fontWeight={"$medium"}>Senha atual</Text>
                        <Input bgColor="#C6C6C6" opacity={0.5} mt={3} mb={10} borderRadius={10} borderColor="#C6C6C6">
                            <InputField type="password" color="$black" onChangeText={(text) => setOldPassword(text)} accessible accessibilityLabel="Digite a senha atual"/>
                        </Input>

                        <Text mt={20} color="$black" fontWeight={"$medium"} >Nova senha</Text>
                        <Input bgColor="#C6C6C6" opacity={0.5} mt={3} mb={10} borderRadius={10} borderColor="#C6C6C6" >
                            <InputField type="password" color="$black" onChangeText={(text) => setNewPassword(text)} accessible accessibilityLabel="Digite a nova senha"/>
                        </Input>

                        <Text mt={20} color="$black" fontWeight={"$medium"}>Confirmar senha</Text>
                        <Input bgColor="#C6C6C6" opacity={0.5} mt={3} mb={10} borderRadius={10} borderColor="#C6C6C6" >
                            <InputField type="password" color="$black" onChangeText={(text) => setConfirmPassword(text)} accessible accessibilityLabel="Confirme a nova senha"/>
                        </Input>

                    </Box>


                    <Box>
                        <TouchableOpacity onPress={ChangingPassword}>
                            <DropShadow  style={{shadowColor: "#000", shadowOffset: { width: 1, height: 3 }, shadowOpacity: 0.5, shadowRadius: 3}}>
                                    <Box borderRadius={10} bgColor="#9A1915" alignItems="center" justifyContent="center" height={45}>
                                        <Text color="$white" accessible accessibilityLabel="Confirmar, botão">Confirmar</Text>
                                    </Box>
                            </DropShadow>
                        </TouchableOpacity>
                    </Box>

                    <Modal transparent visible={loading} accesibility accessibilityState={loading} accessibilityValue={"Carregando"}>
                            <View flex={1} justifyContent="center" alignItems="center">
                                <ActivityIndicator size="large" color="#000"/>
                            </View>
                    </Modal>
                </Box>

            </TouchableWithoutFeedback>
        </View>
    )
}

export default ChangingPassword;