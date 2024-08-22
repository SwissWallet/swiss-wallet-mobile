import { Box, Input, InputField, Text, View } from "@gluestack-ui/themed";
import HeaderWithoutPoints from "../../components/HeaderWithoutPoints";
import Titlle from "../../components/Titlle";
import { Keyboard, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import DropShadow from "react-native-drop-shadow";

function ChangingPassword(){
    return(
        <View>

            <HeaderWithoutPoints/>

            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}> 
            

                <Box ml={30} mr={30} mt={40}>

                    <Titlle name="Alterar Senha" />

                    <Box mb={80}>

                        <Text mt={20} color="$black" fontWeight={"$medium"}>Senha atual</Text>
                        <Input bgColor="#C6C6C6" opacity={0.5} mt={3} mb={10} borderRadius={10} borderColor="#C6C6C6">
                            <InputField type="password" color="$black"/>
                        </Input>

                        <Text mt={20} color="$black" fontWeight={"$medium"} >Nova senha</Text>
                        <Input bgColor="#C6C6C6" opacity={0.5} mt={3} mb={10} borderRadius={10} borderColor="#C6C6C6">
                            <InputField type="password" color="$black"/>
                        </Input>

                        <Text mt={20} color="$black" fontWeight={"$medium"}>Confirmar senha</Text>
                        <Input bgColor="#C6C6C6" opacity={0.5} mt={3} mb={10} borderRadius={10} borderColor="#C6C6C6">
                            <InputField type="password" color="$black" />
                        </Input>

                    </Box>


                    <Box>
                        <TouchableOpacity>
                            <DropShadow  style={{shadowColor: "#000", shadowOffset: { width: 1, height: 3 }, shadowOpacity: 0.5, shadowRadius: 3}}>
                                    <Box borderRadius={10} bgColor="#9A1915" alignItems="center" justifyContent="center" height={45}>
                                        <Text color="$white">Confirmar</Text>
                                    </Box>
                            </DropShadow>
                        </TouchableOpacity>
                    </Box>

                </Box>
            </TouchableWithoutFeedback>
        </View>
    )
}

export default ChangingPassword;