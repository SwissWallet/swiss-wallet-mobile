import React, { useEffect, useState } from "react";
import { View, Box, Text, Input, HStack, ScrollView } from "@gluestack-ui/themed";
import HeaderWithoutPoints from "../../components/HeaderWithoutPoints";
import Title from "../../components/Title";
import { InputField } from "@gluestack-ui/themed";
import { ActivityIndicator, Alert, Keyboard, Modal, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import DropShadow from "react-native-drop-shadow";
import api from "../../service/api";
import { useDispatch, useSelector } from "react-redux";
import { user as userUpdate } from "../../redux/reducers/user";





function ChangeAdress(): JSX.Element {

    const user = useSelector((state: any) => state.user.value);

    const dispatch = useDispatch();

    const [cep, setCep] = useState(user.address.zipCode);
    const [number, setNumber] = useState(String(user.address.number));

    const [city, setCity] = useState("")
    const [uf, setUf] = useState("");
    const [logradouro, setLogradouro] = useState("");

    const [loading, setLoading] = useState(false);


    const handleLocation = (text: string) => {
        setLoading(true);
        setCep(text);
        fetch(`https://viacep.com.br/ws/${text}/json/`)
            .then(res => res.json())
            .then(json => {
                setCity(json.localidade);
                setLogradouro(json.logradouro);
                setUf(json.uf);
                setLoading(false);
            })
            .catch(err => console.log(err)); 4
    }

    useEffect(() => {
        if (cep.length >= 8) {
            setCep(cep.slice(0, 8));
        }
        if (cep.length === 8) {
            handleLocation(cep)
        }
    }, [cep]);


    async function validationInputs() {

        if (cep === '' || city === '' || uf === '' || logradouro === '' || number === '') {
            return Alert.alert('Todos os campos devem ser preenchidos');
        } else if (cep.length < 8 || cep.length > 8) {
            return Alert.alert("O cep deve ter 8 digitos")
        } else {
            setLoading(true);
            registerNewAdress();
        }

    }

    async function registerNewAdress() {

        const response = await api.put('users/address', {
            zipCode: cep,
            street: logradouro,
            city: city,
            number: number,
            uf: uf
        })
            .then((json) => {
                console.log(json.data);
                updateAddress();
                setLoading(false);
                return Alert.alert("Endereço alterado com sucesso!")

            }).catch((error) => {
                setLoading(false);
                console.log(error);
                return Alert.alert("Algo inesperado aconteceu!")

            })
    }

    // atualiza o contexto global, para quando o endereço atualizar, o dado ser atualizado para o usuário também
    async function updateAddress() {
        const response = await api.get('users/current')
            .then((json) => {
                dispatch(userUpdate(json.data));
            })
            .catch(err => {
                console.log(err + " erro ao trocar o endereço");
            })
    }

    return (
        <ScrollView flex={1} showsVerticalScrollIndicator={false}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View>
                    <HeaderWithoutPoints />

                    <Title name="Alterar endereço"></Title>

                    <Box ml={22} mr={22}>

                        <Text fontWeight="$bold" color="#000" fontSize={17} mt={20}>CEP</Text>
                        <Input mt={7} bgColor="#C6C6C6" opacity={0.36} borderRadius={8} height={42} $focus-borderColor="#C6C6C6" >
                            <InputField color="#000" fontWeight="bold" onChangeText={(text) => setCep(text)} value={cep} keyboardType="numeric" />
                        </Input>

                        <HStack alignItems="center" justifyContent="space-between">
                            <Box>
                                <Text fontWeight="$bold" color="#000" fontSize={17} mt={30}>Cidade</Text>
                                <Input isDisabled mt={7} bgColor="#C6C6C6" opacity={0.36} borderRadius={8} height={42} $focus-borderColor="#C6C6C6" width={180}>
                                    <InputField color="#000" fontWeight="bold" value={city} />
                                </Input>
                            </Box>

                            <Box>
                                <Text fontWeight="$bold" color="#000" fontSize={17} mt={30}>UF</Text>
                                <Input isDisabled mt={7} bgColor="#C6C6C6" opacity={0.36} borderRadius={8} height={42} $focus-borderColor="#C6C6C6" width={110}>
                                    <InputField color="#000" fontWeight="bold" value={uf} />
                                </Input>
                            </Box>
                        </HStack>


                        <Text fontWeight="$bold" color="#000" fontSize={17} mt={20}>Logradouro</Text>
                        <Input isDisabled mt={7} bgColor="#C6C6C6" opacity={0.36} borderRadius={8} height={42} $focus-borderColor="#C6C6C6" >
                            <InputField color="#000" fontWeight="bold" value={logradouro} />
                        </Input>

                        <Text fontWeight="$bold" color="#000" fontSize={17} mt={20}>Número</Text>
                        <Input mt={7} bgColor="#C6C6C6" opacity={0.36} borderRadius={8} height={42} $focus-borderColor="#C6C6C6">
                            <InputField color="#000" fontWeight="bold" onChangeText={(text) => setNumber(text)} value={number} />
                        </Input>

                    </Box>

                    <Box>
                        <TouchableOpacity onPress={validationInputs}>
                            <DropShadow style={{ shadowColor: '#000', shadowOffset: { width: 4, height: 5 }, shadowRadius: 2, shadowOpacity: 0.5 }}>
                                <Box ml={22} mr={22} bgColor="#9A1915" mt={45} alignItems="center" justifyContent="center" height={45} borderRadius={10} mb={20}>
                                    <Text color="#fff" fontWeight="$bold" accessible accessibilityLabel="Confirmar, botão">Confirmar</Text>
                                </Box>
                            </DropShadow>
                        </TouchableOpacity>
                    </Box>


                    <Modal transparent visible={loading}>
                        <View flex={1} justifyContent="center" alignItems="center">
                            <ActivityIndicator size="large" color="#000" />
                        </View>
                    </Modal>
                </View>
            </TouchableWithoutFeedback>
        </ScrollView>
    )
}

export default ChangeAdress;