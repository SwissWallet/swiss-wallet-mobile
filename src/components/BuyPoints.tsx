import { Box, HStack, Input, InputField, KeyboardAvoidingView, Text, View } from "@gluestack-ui/themed";
import { TouchableOpacity } from "react-native";

function BuyPointsModal(): JSX.Element {
    return (
        <KeyboardAvoidingView behavior="position">
            <View>
                <Box bgColor="#FFFFFF" mr={30} ml={30} borderRadius={30} justifyContent="center" alignItems="center" mb={40} mt={40}>


                    <Text fontSize={32} color="#000" fontWeight={"$semibold"} mt={30}>Compre Pontos</Text>

                    <Box flexDirection="column" mt={30}>
                        <Input mr={25} ml={25} bgColor="#C6C6C6" borderRadius={8}>
                            <InputField
                                color={"#000"}
                                // placeholder='Digite a quantidade de pontos' 
                                placeholderTextColor={"#000"}
                            />
                        </Input>
                        <Text mt={5}>Insira a quantidade de pontos que deseja</Text>
                    </Box>

                    <HStack mt={20} gap={20}>

                        <TouchableOpacity>
                            <Box w={75} h={33} borderColor="#000" borderWidth={1} alignItems="center" justifyContent="center" borderRadius={5}>
                                <Text fontSize={15}>Débito</Text>
                            </Box>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Box w={75} h={33} borderColor="#000" borderWidth={1} alignItems="center" justifyContent="center" borderRadius={5}>
                                <Text fontSize={15}>Crédito</Text>
                            </Box>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Box w={75} h={33} borderColor="#000" borderWidth={1} alignItems="center" justifyContent="center" borderRadius={5}>
                                <Text fontSize={15}>Pix</Text>
                            </Box>
                        </TouchableOpacity>

                    </HStack>


                    <TouchableOpacity>
                        <Box justifyContent="center" alignItems="center" bgColor="#C40601" borderRadius={10} mr={10} ml={10} mt={20} mb={30} width={300} padding={5}>
                            <Text fontSize={24} color="#fff">Pagar</Text>
                        </Box>
                    </TouchableOpacity>


                </Box>

            </View>
        </KeyboardAvoidingView>
    )
}

export default BuyPointsModal;