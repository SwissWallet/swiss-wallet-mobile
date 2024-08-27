// @ts-nocheck
import { View, Text, Box, Center, Heading, Icon, Input, InputField, InputIcon, InputSlot } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeftCircle, EyeIcon, EyeOff } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Keyboard, Modal, ScrollView, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { cpf as validator} from "cpf-cnpj-validator";
import api from "../../service/api";

function SignUp(): JSX.Element {

    const navigation = useNavigation();

    const [cep, setCep] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [logradouro, setLogradouro] = useState('');
    const [localidade, setLocalidade] = useState('');
    const [uf, setUf] = useState('');
    const [nome, setNome] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [numero, setNumero] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState(''); 
    const [cpf, setCpf] = useState('');
    const [loading, setLoading] = useState(false);
    const birthDate = dataNascimento.split('/');
    const age = String(new Date().getFullYear() - birthDate[2]); 
    
    const handleState = () => {
        setShowPassword(!showPassword);
    }    
    
    const handleLocation = (text:string) => {
        setLoading(true);
        setCep(text);
        fetch(`https://viacep.com.br/ws/${text}/json/`)
        .then(res => res.json())
        .then(json => {
            setLocalidade(json.localidade);
            setLogradouro(json.logradouro);
            setUf(json.uf);
            setLoading(false);
        });
    }

    useEffect(() => {
        if (cep.length === 8) handleLocation(cep);
    }, [cep]);

    const handleRegister = () => {
        if (nome === '' || dataNascimento === '' || email === '' || cpf === '' || telefone === '' || cep === '' || localidade === '' || uf === '' || logradouro === '' || numero === '' || senha === '' || confirmarSenha === '') {
            return Alert.alert('Todos os camopos devem ser preenchidos');
        }
        else if(cep.length < 8 || cep.length > 8){
            return Alert.alert("O cep deve ter 8 digitos")
        }
        else if (senha != confirmarSenha) {
            return Alert.alert('As senhas devem ser iguais');
        }
        else if (!validator.isValid(cpf)) {
            return Alert.alert('Insira um cpf válido');
        }
        else if (String(birthDate[2]) == String(new Date().getFullYear())) {
            return Alert.alert("O ano de nascimento não deve ser igual ao atual")
        }
        else {
            register();
        }
            
    }

    async function register() {
        const response = await api.post('users', {
            "user":{
                username: email,
                password: senha,
                name: nome,
                cpf: cpf,
                birthDate: dataNascimento,
                phone: telefone
            },
            address:{
                zipCode: cep,
                street: logradouro,
                city: localidade,
                number: numero,
                uf: uf
            }
        })
        .then((json) => {
            console.log(json.status);
            if (json.status === 201) {
                Alert.alert('Cadastro realizado');
                navigation.navigate('SignIn');
            }
        })
        .catch((err) => {
            console.log(err.response.status);
            console.log(err.reponse.errors);
            if(err.response.status === 409) {
                return Alert.alert('Cadastro não realizado', 'usuário já existente');
            }
            else if (err.response.status === 422) {
                return Alert.alert('Email inválido', 'Insira um email válido');
            }
        })
    }


    return(
        <ScrollView showsVerticalScrollIndicator={false}>
            <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
                <View flex={1} bgColor="#E30613">

                    <Box>

                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Box mt={27} ml={25} mb={18}>
                                <Icon as={ArrowLeftCircle} color="#fff" size={"40"} />
                            </Box>
                        </TouchableOpacity>

                        <Center mb={29} >
                            <Heading color="#fff" fontSize={32}>
                                Cadastro
                            </Heading>
                        </Center>

                    </Box>

                    <Box bgColor="#fff" height="$full" borderTopRightRadius={15} borderTopLeftRadius={15}>
                        
                        <Box ml={22} mr={22}>
                            <Text mt={20} mb={10} fontWeight="$bold" color="#000" fontSize={17}>
                                Nome 
                            </Text>

                            <Input bgColor="#C6C6C6" opacity={0.36} borderRadius={8} height={42} $focus-borderColor="#C6C6C6">
                                <InputField color="#000" fontWeight="bold" onChangeText={(text) => setNome(text)}/>
                            </Input>
                        </Box>
                        
                        <Box ml={22} mr={22}>
                            <Text mt={20} mb={10} fontWeight="$bold" color="#000" fontSize={17}>
                                Data de nascimento
                            </Text>

                            <Input bgColor="#C6C6C6" opacity={0.36} borderRadius={8} height={42} $focus-borderColor="#C6C6C6">
                                <InputField color="#000" fontWeight="bold" onChangeText={(text) => setDataNascimento(text)}/>
                            </Input>
                        </Box>
                        
                        <Box ml={22} mr={22}>
                            <Text mt={20} mb={10} fontWeight="$bold" color="#000" fontSize={17}>
                                Email
                            </Text>

                            <Input bgColor="#C6C6C6" opacity={0.36} borderRadius={8} height={42} $focus-borderColor="#C6C6C6">
                                <InputField color="#000" fontWeight="bold" onChangeText={(text) => setEmail(text)}/>
                            </Input>
                        </Box>
                        
                        <Box ml={22} mr={22}>
                            <Text mt={20} mb={10} fontWeight="$bold" color="#000" fontSize={17}>
                                CPF
                            </Text>

                            <Input bgColor="#C6C6C6" opacity={0.36} borderRadius={8} height={42} $focus-borderColor="#C6C6C6">
                                <InputField color="#000" fontWeight="bold" onChangeText={text => setCpf(text)} keyboardType="number-pad"/>
                            </Input>
                        </Box>

                        <Box ml={22} mr={22}>
                            <Text mt={20} mb={10} fontWeight="$bold" color="#000" fontSize={17}>
                                Telefone
                            </Text>

                            <Input bgColor="#C6C6C6" opacity={0.36} borderRadius={8} height={42} $focus-borderColor="#C6C6C6">
                                <InputField color="#000" fontWeight="bold" onChangeText={(text) => setTelefone(text)} keyboardType="number-pad" />
                            </Input>
                        </Box>
                        
                        <Box ml={22} mr={22}>
                            <Text mt={20} mb={10} fontWeight="$bold" color="#000" fontSize={17}>
                                CEP
                            </Text>

                            <Input bgColor="#C6C6C6" opacity={0.36} borderRadius={8} height={42} $focus-borderColor="#C6C6C6">
                                <InputField color="#000" fontWeight="bold" onChangeText={(text) => setCep(text)} />
                            </Input>
                        </Box>
                        
                        <Box ml={22} mr={22} flexDirection="row" justifyContent="space-between">
                            <Box>
                                <Text mt={20} mb={10} fontWeight="$bold" color="#000" fontSize={17}>
                                    Cidade
                                </Text>

                                <Input bgColor="#C6C6C6" opacity={0.36} borderRadius={8} height={42} $focus-borderColor="#C6C6C6" width={145} isDisabled={true}>
                                    <InputField color="#000" fontWeight="bold" value={localidade}/>
                                </Input>
                            </Box>
                            
                            <Box>
                                <Text mt={20} mb={10} fontWeight="$bold" color="#000" fontSize={17}>
                                    UF
                                </Text>

                                <Input bgColor="#C6C6C6" opacity={0.36} borderRadius={8} height={42} $focus-borderColor="#C6C6C6" width={145} isDisabled={true}>
                                    <InputField color="#000" fontWeight="bold" value={uf}/>
                                </Input>
                            </Box>
                        </Box>

                        <Box ml={22} mr={22}>
                            <Text mt={20} mb={10} fontWeight="$bold" color="#000" fontSize={17}>
                                Logradouro
                            </Text>

                            <Input bgColor="#C6C6C6" opacity={0.36} borderRadius={8} height={42} $focus-borderColor="#C6C6C6" isDisabled={true}>
                                <InputField color="#000" fontWeight="bold" value={logradouro}/>
                            </Input>
                        </Box>
                        
                        <Box ml={22} mr={22}>
                            <Text mt={20} mb={10} fontWeight="$bold" color="#000" fontSize={17}>
                                Número
                            </Text>

                            <Input bgColor="#C6C6C6" opacity={0.36} borderRadius={8} height={42} $focus-borderColor="#C6C6C6">
                                <InputField color="#000" fontWeight="bold" onChangeText={(text) => setNumero(text)}/>
                            </Input>
                        </Box>
                        
                        <Box ml={22} mr={22}>
                            <Text mt={20} mb={10} fontWeight="$bold" color="#000" fontSize={17}>
                                Criar senha
                            </Text>

                            <Input bgColor="#C6C6C6" opacity={0.36} borderRadius={8} height={42} $focus-borderColor="#C6C6C6">
                                <InputField color="#000" fontWeight="bold" type={showPassword ? "text" : "password"} onChangeText={(text) => setSenha(text)}/>

                                <InputSlot onPress={handleState}>
                                    <InputIcon as={showPassword ? EyeIcon : EyeOff} color="#000" size="xl" mr={15}/>
                                </InputSlot>
                            </Input>
                        </Box>

                        <Box ml={22} mr={22}>
                            <Text mt={20} mb={10} fontWeight="$bold" color="#000" fontSize={17}>
                                Confirmar senha
                            </Text>

                            <Input bgColor="#C6C6C6" opacity={0.36} borderRadius={8} height={42} $focus-borderColor="#C6C6C6">
                                <InputField color="#000" fontWeight="bold" type={showPassword ? "text" : "password"} onChangeText={(text) => setConfirmarSenha(text)}/>

                                <InputSlot onPress={handleState}>
                                    <InputIcon as={showPassword ? EyeIcon : EyeOff} color="#000" size="xl" mr={15}/>
                                </InputSlot>
                            </Input>
                        </Box>
                        

                        <TouchableOpacity onPress={handleRegister}>
                            <Box ml={22} mr={22} bgColor="#9A1915" mt={35} alignItems="center" justifyContent="center" height={45} borderRadius={20}>
                                <Text color="#fff" fontWeight="$bold">
                                    Cadastrar
                                </Text>
                            </Box>
                        </TouchableOpacity>

                        <Box flexDirection="row" gap={10} mt={50} mb={20} alignSelf="center">
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
                
                </View>
            </TouchableWithoutFeedback>
        </ScrollView>
    );
}

export default SignUp;