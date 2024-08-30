import HeaderWithoutPoints from "../../components/HeaderWithoutPoints";
import { Box, HStack, Input, InputField, Text, View } from "@gluestack-ui/themed";
import { useSelector } from "react-redux";

function Profile(): JSX.Element{

    const user = useSelector((state:any) => state.user.value);


    return(
        <View>
             <HeaderWithoutPoints />
             <Box>
                <Text color="#000" fontWeight="bold" fontSize={32} marginTop={40}  marginLeft={30}>Perfil</Text>
                <Text color="#000" mt={5}  marginLeft={30}>Informações do usuário</Text>
            </Box> 
 
            <Box>
                <Text fontWeight="$bold" color="#000" fontSize={17}  marginLeft={30} mt={39}>Nome completo</Text>
                <Input mt={7}  marginLeft={30} bgColor="#C6C6C6" opacity={0.36} borderRadius={8} height={42} $focus-borderColor="#C6C6C6" width={365} isDisabled>
                    <InputField color="#000" fontWeight="bold" value={user.user.name}/>
                </Input>

                <Text fontWeight="$bold" color="#000" fontSize={17}  marginLeft={30} mt={39}>Email</Text>
                <Input mt={7}  marginLeft={30} bgColor="#C6C6C6" opacity={0.36} borderRadius={8} height={42} $focus-borderColor="#C6C6C6" width={365} isDisabled>
                    <InputField color="#000" fontWeight="bold" value={user.user.username}/>
                </Input>

            </Box>

            <HStack alignItems="center">

                    <Box>
                        <Text fontWeight="$bold" color="#000" fontSize={17}  marginLeft={30} mt={39}>CPF</Text>
                        <Input mt={7}  marginLeft={30} bgColor="#C6C6C6" opacity={0.36} borderRadius={8} height={42} $focus-borderColor="#C6C6C6" width={200} isDisabled>
                            <InputField color="#000" fontWeight="bold" value={user.user.cpf}/>
                        </Input>
                    </Box>

                    <Box>
                        <Text fontWeight="$bold" color="#000" fontSize={17}  marginLeft={30} mt={39}>Idade</Text>
                        <Input mt={7}  marginLeft={30} bgColor="#C6C6C6" opacity={0.36} borderRadius={8} height={42} $focus-borderColor="#C6C6C6" width={130} isDisabled>
                            <InputField color="#000" fontWeight="bold" value={user.user.birthDate}/>
                        </Input>
                    </Box>
            </HStack>  

         </View>
    )
}

export default Profile;