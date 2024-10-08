//@ts-nocheck
import { Button, ButtonText, Divider, HStack, InputField, InputIcon, InputSlot, ScrollView, set, Text, View } from "@gluestack-ui/themed";
import { Box } from '@gluestack-ui/themed';
import { Input } from '@gluestack-ui/themed';
import { useNavigation } from "@react-navigation/native";
import { Eye, EyeOff, Lock, User } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Alert, Keyboard, KeyboardAvoidingView, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import DropShadow from "react-native-drop-shadow";
import LinearGradient from "react-native-linear-gradient";
import api from "../../service/api";
import {loading} from "../../redux/reducers/loading";
import {isLoged} from "../../redux/reducers/userLoged";
import {user} from "../../redux/reducers/user";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from '@react-native-firebase/messaging';
import setupNotifications from "../../util/Notifications";


let tokenN;
function SignIn(): JSX.Element {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState(false);
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const [marginTopBehavior, setMarginTopBehavior] = useState(230);

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
          setMarginTopBehavior('10%');
        });
        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
          setMarginTopBehavior(230);
        });
    
        return () => {
          showSubscription.remove();
          hideSubscription.remove();
        };
    }, []);

    const handleState = () => {
        setShowPassword(prevState => !prevState);
    };

    async function LoginUser() {
        try{
            if (!email || !password) {
                Alert.alert("Erro", "Por favor, preencha o email e a senha.");
                return;
            }
            else {
                login();
            }
            
        }catch(Erro){
            Alert.alert("Ocorreu algum erro no login")
        }
    }

    async function login() {
        const response = await api.post('auth/mobile', {
            username: email,
            password: password,
            token: tokenN
        })
        .then(async(json) => {
            try {    
                await AsyncStorage.setItem('@token', json.data.token);
                
                dispatch(loading(true));
                loadStorage();
           
            } catch (error) {
                console.log(error);
                dispatch(loading(false));
            }

        })
        .catch((err) => {
            console.log(err.response.status);
            if(err.response.status === 400) {
                return Alert.alert('Erro no login', 'Credencial inválida');
            }
            else if (err.response.status === 422) {
                return Alert.alert('Erro', 'Algo inesperado aconteceu');
            }
            else {
                return Alert.alert('Erro', 'Algo inesperado aconteceu');
            }
        })
    }

    useEffect(() => {
        setupNotifications();
        getToken();
        loadStorage();
    }, []);

    async function getToken() {
        await messaging().getToken().then((json) => tokenN = json);
    }

    async function loadStorage() {
        const token = await AsyncStorage.getItem('@token');

        if (token) {
            dispatch(loading(true));
            const response = await api.get('users/current', {
                headers: {
                    'Authorization': `Bearer ${token}` 
                }
            })
            .then(async(json) => {
                api.defaults.headers['Authorization'] = `Bearer ${token}`;
                dispatch(user(json.data));
                dispatch(isLoged(true));
                dispatch(loading(false));
            })
            .catch(async (er) => {
                dispatch(loading(false));
                dispatch(user({}));
                await AsyncStorage.clear();
            })
        }
    }

    return (
        <ScrollView flex={1} bgColor="#681413" showsVerticalScrollIndicator={false}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <LinearGradient colors={["#e30613", "#9a1915", "#681413"]} style={{ flex: 1 }}>
                        <Box flex={1} ml={25} mr={25} mt={marginTopBehavior}>
                            <Box alignItems="flex-start" >
                                <Box marginBottom={50} alignItems="flex-start">
                                    <Text size="4xl" fontWeight="$bold" color="$white" fontFamily="" accessible accessibilityLabel="Login">Login</Text>
                                </Box>

                                <Box marginBottom={15} w={'100%'}>
                                    <Input variant="underlined" size="md" borderColor="$white" style={{borderBottomColor: '#ffffff'}} marginBottom={30} gap={10}>
                                        <InputSlot pl="$3">
                                            <InputIcon as={User} color="$white" size="24" accessible accessibilityLabel="Icone pessoa"/>
                                        </InputSlot>
                                        <InputField 
                                        color={"$white"}
                                        placeholder='Digite seu email' 
                                        placeholderTextColor={"#fff"} 
                                        value={email} 
                                        onChangeText={(text) => setEmail(text)}/>
                                    </Input>

                                    <Box>
                                        <Input variant="underlined" size="md" borderColor="$white" gap={10} style={{borderBottomColor: '#ffffff'}}>
                                            <InputSlot pl="$3">
                                                <InputIcon as={Lock} color="$white" size="23" accessible accessibilityLabel="Icone cadeado"/>
                                            </InputSlot>
                                            <InputField 
                                                type={showPassword ? "text" : "password"} 
                                                placeholder='Digite sua senha'
                                                placeholderTextColor={"#fff"}
                                                style={{ paddingRight: 40, color: '#ffffff' }} 
                                                value={password}
                                                onChangeText={(text) => setPassword(text)}
                                            />
                                            <InputSlot>
                                                <TouchableOpacity onPress={handleState} >
                                                    <InputIcon as={showPassword ? Eye : EyeOff} color="#fff" size="23" accessible accessibilityLabel="Icone olho"/>
                                                </TouchableOpacity>
                                            </InputSlot>
                                        </Input>
                                    
                                    </Box>
                                </Box>

                                <Box marginBottom={40} alignSelf="flex-end">
                                    <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword' as never)}>
                                        <Text underline={true} color="$white" fontSize={15} accessible accessibilityLabel="Esqueci minha senha botão">Esqueci minha senha</Text>
                                    </TouchableOpacity>
                                </Box>

                                <Box width="100%" mb={20}>
                                    <TouchableOpacity onPress={LoginUser}>
                                        <DropShadow style={{
                                            shadowColor: "#000",
                                            shadowOffset: { width: 2, height: 5 },
                                            shadowOpacity: 0.7,
                                            shadowRadius: 5
                                        }}>
                                            <Box height={45} bgColor="#9A1915" alignItems="center" justifyContent="center" borderRadius={10}>
                                                <Text color="$white" accessible accessibilityLabel="login botão">Login</Text>
                                            </Box>
                                        </DropShadow>
                                    </TouchableOpacity>
                                </Box>
                            </Box>


                            <DropShadow style={{shadowColor: "#000", shadowOffset:{width: 1, height: 4}, shadowOpacity: 0.5, shadowRadius: 2}}>
                                <TouchableOpacity onPress={() => navigation.navigate('SignUp' as never)}>
                                    <Box bgColor="#fff" borderColor="#E30613" borderWidth={1} borderRadius={10} mb={20} height={45}>
                                        <Text height={40} color="#E30613" fontWeight="$bold" textAlign="center" textAlignVertical="center" accessible accessibilityLabel="Criar conta botão">
                                            Criar Conta
                                        </Text>
                                    </Box>
                                </TouchableOpacity>
                            </DropShadow>
                        </Box>
                </LinearGradient>
            </TouchableWithoutFeedback>
        </ScrollView>
    );
}

export default SignIn;
