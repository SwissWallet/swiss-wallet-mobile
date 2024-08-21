//@ts-nocheck
import { Box, Button, ButtonText, Center, Heading, HStack, Icon, Input, InputField, InputIcon, InputSlot, Text, Toast, ToastTitle, View, } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { ArrowLeftCircle, Bold, CircleArrowLeft, EyeIcon, EyeOff, Lock } from "lucide-react-native";

import React, { useState } from "react";
import { ActivityIndicator, Alert, Keyboard, Modal, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import api from "../../service/api";

function ForgotPassword():JSX.Element{
    const navigation = useNavigation();
    
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [visibleModal, setVisibleModal] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [code, setCode] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [displayMessage, setDisplayMessage] = useState('')
    
    const handleState = () => {
        setShowPassword(!showPassword);
    }
    

    const handleConfirm = () => {
        if (email === '') return Alert.alert('Email', 'O campo email deve ser preenchido');
        else {
            setLoading(true);
            generateCode();
        }
    }

    async function generateCode() {
        const response = await api.post(`users/recover-password?username=${email}`)
        .then((res) => {
            sendEmail(res.data)
        })
        .catch((err) => {
            setLoading(false);
            console.log(err.response.status)
            if(err.response.status === 404) {
                return Alert.alert("Recuperar senha", "Usuário não encontrado");
            }
            
            
        })
    }

    async function sendEmail(code:string) {
        const reponse = await axios.post('https://sendmail-api-hggx.onrender.com/send/text', {
            to: email,
            subject: "Código para redefinir a senha",
            text: `Seu código para redefinir a senha ${code}`
        })
        .then((json) => {
            setLoading(false);
            setVisibleModal(true);
            console.log(json.data);
        })
        .catch((err) => {
            setLoading(false);
            console.log(err);
        })
    }

    async function handleChangePassowrd() {
        if (newPassword === '' || code === '') return Alert.alert('Campos vazios', "Os campos devem ser preenchidos");
        
        const response = await api.put('users/recover-password', {
            username: email,
            newPassword: newPassword,
            verificationCode: code
        })
        .then((json) => {
            navigation.goBack();
            return Alert.alert("Senha alterada", "Senha atualizada com sucesso");
        })
        .catch((err) => {
            if (err.response.status === 400) {
                return Alert.alert("Código", "O código informado está inválido");
            }
        })
    }

    setTimeout(() => {
        setDisplayMessage('none');
    }, 10000);
    return(
        <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
                <View flex={1} bgColor="#E30613">

                    <Box>

                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Box mt={27} ml={25} mb={18}>
                                <Icon as={ArrowLeftCircle} color="#fff" size={"40"} />
                            </Box>
                        </TouchableOpacity>

                        <Center mb={29} >
                            <Heading color="#fff" fontSize={30}>
                                Esqueci a senha
                            </Heading>
                        </Center>

                    </Box>

                    <Box bgColor="#fff" height="$full" borderTopRightRadius={15} borderTopLeftRadius={15} justifyContent="center" alignItems="center">
                                
                        <Box ml={22} mr={22}>
                            <Text mt={20} mb={10} fontWeight="$bold" color="#000" fontSize={17}>
                                Informe o email
                            </Text>

                            <Input bgColor="#C6C6C6" opacity={0.36} borderRadius={8} height={42} $focus-borderColor="#C6C6C6" width={365}>
                                <InputField color="#000" fontWeight="bold" onChangeText={(text) => setEmail(text)}/>
                            </Input>
                        </Box>
                        

                        <TouchableOpacity onPress={handleConfirm}>
                            <Box ml={22} mr={22} bgColor="#9A1915" mt={35} alignItems="center" justifyContent="center" height={45} borderRadius={20} width={365}>
                                <Text color="#fff" fontWeight="$bold">
                                    Confirmar
                                </Text>
                            </Box>
                        </TouchableOpacity>

                        <Box flexDirection="row" gap={10} mt={290} alignSelf="center">
                            <Text color="#000" fontWeight="bold">
                                Já possui conta?
                            </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('SignIn' as never)}>
                                <Text underline color="#000" fontWeight="bold">
                                    Faça o login
                                </Text>
                            </TouchableOpacity>
                        </Box>

                    </Box>

                    <Modal transparent visible={loading}>
                        <View flex={1} justifyContent="center" alignItems="center">
                            <ActivityIndicator size="large" color="#000"/>
                        </View>
                    </Modal>

                    <Modal visible={visibleModal} animationType="slide">
                        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                            <View bgColor="#E30613" flex={1}>

                                <Toast display={displayMessage}>
                                    <ToastTitle> 
                                        Código enviado para o email
                                    </ToastTitle>
                                </Toast>

                                <Box >
                                    <TouchableOpacity onPress={() => setVisibleModal(!visibleModal)} style={{width: 50}}>
                                        <Box mt={27} ml={25} mb={18}>
                                            <Icon as={ArrowLeftCircle} color="#fff" size={"40"} />
                                        </Box>
                                    </TouchableOpacity>

                                    <Center mb={29} >
                                        <Heading color="#fff" fontSize={32}>
                                            Esqueci a senha
                                        </Heading>
                                    </Center>

                                </Box>

                                
                                <View justifyContent="center" alignItems="center" flex={1} borderTopRightRadius={20} bgColor="#fff" borderTopLeftRadius={20}> 
                                    
                                    <Box ml={22} mr={22}>
                                        <Text mt={20} mb={10} fontWeight="$bold" color="#000" fontSize={17}>
                                            Nova senha
                                        </Text>

                                        <Input bgColor="#C6C6C6" opacity={0.36} borderRadius={8} height={42} $focus-borderColor="#C6C6C6" width={365}>
                                            <InputSlot mr={10} ml={5}>
                                                <InputIcon as={Lock} color="#000" size="xl"/>
                                            </InputSlot>
                                    
                                            <InputField placeholder="Digite sua senha"  opacity={0.6} color="#000" 
                                                type={showPassword ? "text" : "password"}
                                                onChangeText={(text) => setNewPassword(text)} 
                                            />
                                    
                                            <InputSlot mr={10} onPress={handleState}>
                                                <InputIcon as={showPassword ? EyeIcon : EyeOff} color="#000" size="xl"/>
                                            </InputSlot>
                                        </Input>
                                    </Box>

                                    <Box ml={22} mr={22}>
                                        <Text mt={20} mb={10} fontWeight="$bold" color="#000" fontSize={17}>
                                            Código de verificação
                                        </Text>

                                        <Input bgColor="#C6C6C6" opacity={0.36} borderRadius={8} height={42} $focus-borderColor="#C6C6C6" width={365}>
                                            <InputField color="#000" fontWeight="bold" onChangeText={(text) => setCode(text)}/>
                                        </Input>
                                    </Box>

                                    <TouchableOpacity onPress={handleChangePassowrd}>
                                        <Box ml={22} mr={22} bgColor="#9A1915" mt={35} mb={30} alignItems="center" justifyContent="center" height={45} borderRadius={20} width={365}>
                                            <Text color="#fff" fontWeight="$bold">
                                                Confirmar
                                            </Text>
                                        </Box>
                                    </TouchableOpacity>
                                    
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>

                </View>
            </TouchableWithoutFeedback>
        
    );
}

export default ForgotPassword;