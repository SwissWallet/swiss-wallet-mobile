//@ts-nocheck
import React from "react";
import { Box, Center, HStack, Icon, Text, View } from "@gluestack-ui/themed";
import HeaderWithoutPoints from "../../components/HeaderWithoutPoints";
import Titlle from "../../components/Title";
import DropShadow from "react-native-drop-shadow";
import { Alert, TouchableOpacity } from "react-native";
import { HelpCircle, IdCard, LucideMessageSquareWarning, User } from "lucide-react-native";
import { Divider } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isLoged } from "../../redux/reducers/userLoged";
import { user } from "../../redux/reducers/user";
import api from "../../service/api";

function Settings():JSX.Element{

    const navigation = useNavigation();
    const dispatch = useDispatch();

    async function handleSigUp() {
        await AsyncStorage.clear()
        .then(() => {
            dispatch(isLoged(false));
            dispatch(user({}));
        })
        .catch(er => console.log(er));
    }

    async function handelDeleteAccount() {
        await api.delete('users')
        .then(async(json) => {
            await AsyncStorage.clear()
            .then(() => {
                dispatch(isLoged(false));
                dispatch(user({}));
            });
        })
        .catch((err) => {
            console.log(err);
            return Alert.alert('Algo inesperado aconteceu', 'Conta não apagada');
        })
    }

    return(
        <View>
            <HeaderWithoutPoints />
            <Titlle name="Configurações da Conta"/>

            <DropShadow style={{shadowColor: '#000', shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.5, shadowRadius: 4}}>
                <Center mt={20}>
                    <Box bgColor="#fff" height={350} width={260} borderRadius={10}>
                        
                        <Box ml={22} mt={20} mr={22}>
                        
                            <HStack space="sm" mb={5}>
                                <TouchableOpacity>
                                    <Icon as={HelpCircle} size="xl"/>
                                </TouchableOpacity>
                                <Text color="#000" fontWeight="$bold">
                                    Ajuda
                                </Text>
                            </HStack>
                            
                            <Divider bgColor="#000" mb={5}/>

                            <HStack space="sm" mb={5} mt={10}>
                                <TouchableOpacity style={{flexDirection: 'row', gap: 6, alignItems: 'center'}} onPress={() => navigation.navigate('AccountSettings' as never)}>
                                    <Icon as={IdCard} size={"26"}/>
                                <Text color="#000" fontWeight="$bold">
                                    Configurações da conta
                                </Text>
                                </TouchableOpacity>
                            </HStack>

                            <HStack space="sm" mb={5} mt={10}>
                                <TouchableOpacity style={{flexDirection: 'row', gap: 6, alignItems: 'center'}}>
                                    <Icon as={User} size={"26"}/>
                                <Text color="#000" fontWeight="$bold">
                                    Termos e Politicas de Privacidade
                                </Text>
                                </TouchableOpacity>
                            </HStack>

                            <HStack space="sm" mb={5} mt={10}>
                                <TouchableOpacity style={{flexDirection: 'row', gap: 6, alignItems: 'center'}}>
                                    <Icon as={LucideMessageSquareWarning} size={"26"}/>
                                <Text color="#000" fontWeight="$bold">
                                    Relatar problema
                                </Text>
                                </TouchableOpacity>
                            </HStack>

                            <Divider bgColor="#000" mb={5}/>

                            <Center>
                                <Text mt={10} color="#000" fontWeight="bold">
                                    AAPM
                                </Text>
                                <Text mt={5}>
                                    Apoie na gestão da escola no alcance de suas metas e promoção a integração escola-comunidade.
                                </Text>
                            </Center>
                        </Box>
                    </Box>
                </Center>
            </DropShadow>

            <Box ml={22} mr={22} mt={60}>
                <DropShadow style={{shadowColor: "#000", shadowOffset:{width: 1, height: 4}, shadowOpacity: 0.5, shadowRadius: 2}}>
                    <TouchableOpacity onPress={handelDeleteAccount}>
                        <Box bgColor="#fff" borderColor="#E30613" borderWidth={1} borderRadius={5} mb={20} height={45}>
                            <Text height={40} color="#E30613" fontWeight="$bold" textAlign="center" textAlignVertical="center">
                                Apagar Conta
                            </Text>
                        </Box>
                    </TouchableOpacity>
                </DropShadow>

                <DropShadow style={{shadowColor: "#000", shadowOffset:{width: 1, height: 4}, shadowOpacity: 0.5, shadowRadius: 2}}>
                    <TouchableOpacity onPress={handleSigUp}>
                        <Box bgColor="#9A1915" borderRadius={5} height={45}>
                            <Text height={40} color="#fff" fontWeight="$bold" textAlign="center" textAlignVertical="center">
                                Sair
                            </Text>
                        </Box>
                    </TouchableOpacity>
                </DropShadow>
            </Box>

        </View>
    );
}

export default Settings;