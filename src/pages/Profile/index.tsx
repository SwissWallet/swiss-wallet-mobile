import HeaderWithoutPoints from "../../components/HeaderWithoutPoints";
import { Box, HStack, Input, InputField, ScrollView, Text, View } from "@gluestack-ui/themed";
import { useSelector } from "react-redux";

function Profile(): JSX.Element {

    const user = useSelector((state: any) => state.user.value);
    const birth = user.user.birthDate.split('/');
    const age = String(new Date().getFullYear() - birth[2]);
    console.log(age);

    return (
        <ScrollView flex={1} showsVerticalScrollIndicator={false}>
            <View>
                <HeaderWithoutPoints />
                <Box ml={22} mr={22}>

                    <Box>
                        <Text color="#000" fontWeight="bold" fontSize={32} marginTop={40} >Perfil</Text>
                        <Text color="#000" mt={5}>Informações do usuário</Text>
                    </Box>

                    <Box>
                        <Text fontWeight="$bold" color="#000" fontSize={17} mt={39}>Nome completo</Text>
                        <Input mt={7} bgColor="#C6C6C6" opacity={0.36} borderRadius={8} height={42} $focus-borderColor="#C6C6C6" isDisabled>
                            <InputField color="#000" fontWeight="bold" value={user.user.name} />
                        </Input>

                        <Text fontWeight="$bold" color="#000" fontSize={17} mt={39}>Email</Text>
                        <Input mt={7} bgColor="#C6C6C6" opacity={0.36} borderRadius={8} height={42} $focus-borderColor="#C6C6C6" isDisabled>
                            <InputField color="#000" fontWeight="bold" value={user.user.username} />
                        </Input>

                    </Box>

                    <HStack alignItems="center" justifyContent="space-between" mb={50}>

                        <Box>
                            <Text fontWeight="$bold" color="#000" fontSize={17} mt={39}>CPF</Text>
                            <Input mt={7} bgColor="#C6C6C6" opacity={0.36} borderRadius={8} height={42} $focus-borderColor="#C6C6C6" width={160} mr={15} isDisabled>
                                <InputField color="#000" fontWeight="bold" value={user.user.cpf} />
                            </Input>
                        </Box>

                        <Box>
                            <Text fontWeight="$bold" color="#000" fontSize={17} mt={39}>Idade</Text>
                            <Input mt={7} bgColor="#C6C6C6" opacity={0.36} borderRadius={8} height={42} $focus-borderColor="#C6C6C6" width={130} isDisabled>
                                <InputField color="#000" fontWeight="bold" value={age} />
                            </Input>
                        </Box>
                    </HStack>
                </Box>
            </View>
        </ScrollView>
    )
}

export default Profile;