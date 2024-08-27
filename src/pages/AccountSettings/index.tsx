import React from "react";
import { View,Box,Text,Input,InputField } from "@gluestack-ui/themed";
import HeaderWithoutPoints from "../../components/HeaderWithoutPoints";
import Titlle from "../../components/Title";
import { TouchableOpacity } from "react-native";
import { Bold } from "lucide-react-native";
import DropShadow from "react-native-drop-shadow";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";



function AccountSettings():JSX.Element{
    const navigation= useNavigation();

    const user = useSelector((state:any) => state.user.value);

    return(
        <View>
            <Box>
            <HeaderWithoutPoints />
                <Text color="#000" fontWeight="bold" fontSize={32} marginTop={40}  marginLeft={30}>Conta</Text>
                <Text color="#000" mt={5}  marginLeft={30}>Informações da conta</Text>
            </Box>

            <Box>
                <Text fontWeight="$bold" color="#000" fontSize={17}  marginLeft={30} mt={39}>Nome</Text>
                <Input mt={7}  marginLeft={30} bgColor="#C6C6C6" opacity={0.36} borderRadius={8} height={42} $focus-borderColor="#C6C6C6" width={365} isDisabled>
                                <InputField color="#000" fontWeight="bold" value={user.user.name}/>
                            </Input>
<Text fontWeight="$bold" color="#000" fontSize={17}  marginLeft={30} mt={28}>E-mail</Text>

<Input mt={7}  marginLeft={30} bgColor="#C6C6C6" opacity={0.36} borderRadius={8} height={42} $focus-borderColor="#C6C6C6" width={365} isDisabled>
                                <InputField color="#000" fontWeight="bold" value={user.user.username}/>
                            </Input>



            </Box>
            <Box>

            <DropShadow 
                style={{shadowColor: '#000', shadowOffset: {width: 4, height: 5}, shadowRadius: 2, shadowOpacity: 0.5}}>
                <TouchableOpacity onPress={()=>navigation.navigate("ChangingPassword" as never)}>
                    <Box ml={22} mr={22} bgColor="#9A1915" mt={45} alignItems="center" justifyContent="center" height={45} borderRadius={10} width={365}>
                                    <Text color="#fff" fontWeight="$bold">
                                        Alterar senha
                                    </Text>
                                </Box>
                    
                </TouchableOpacity>
            </DropShadow>

            <DropShadow 
                style={{shadowColor: '#000', shadowOffset: {width: 4, height: 5}, shadowRadius: 2, shadowOpacity: 0.5}}>
            <TouchableOpacity onPress={()=>navigation.navigate("ChangeAdress" as never)}>
                <Box ml={22} mr={22} bgColor="#9A1915" mt={35} alignItems="center" justifyContent="center" height={45} borderRadius={10} width={365}>
                                <Text color="#fff" fontWeight="$bold">
                                    Alterar endereço 
                                </Text>
                            </Box>
                </TouchableOpacity>
            </DropShadow>
            </Box>
        </View>
        
       
    )
}



export default AccountSettings;