import React from "react";
import { Text, View } from "@gluestack-ui/themed";
import HeaderWithPoints from "../../components/HeaderWithPoints";
import Titlle from "../../components/Title";
import { Box } from "@gluestack-ui/themed";
import DropShadow from "react-native-drop-shadow";
import TitleWithoutMargin from "../../components/TitleWithoutMargin";
import { TouchableOpacity } from "react-native";

function Benefits():JSX.Element{
    return(
        <View>
            <HeaderWithPoints/>

            <Titlle name="Beneficios"/>
            <Text ml={22} width={300}>Confira a lista de beneficios de assinantes da AAPM</Text>


            <DropShadow style={{shadowColor: '#000', shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.5, shadowRadius: 4}}>

                <Box mr={22} ml={22} borderRadius={10} bg="#fff" mt={15}>

                    <TitleWithoutMargin name="Beneficio VT"/>
                    <Text ml={22} mt={5} mr={22} mb={15}>Beneficio no qual a AAPM ajuda o aluno que não possui condições de se dirigir ao senai, de forma que ele não precise pagar para percorrer o caminho de casa até o curso.</Text>
                        
                    <TouchableOpacity>
                        <Box justifyContent="center" alignItems="center" mb={10}>
                            <Box w={200} h={35} bgColor="#C40601" alignItems="center" justifyContent="center" borderRadius={5}>
                                <Text color="#fff">Solicitar beneficio</Text>
                            </Box>
                        </Box>
			        </TouchableOpacity>
                </Box>
            </DropShadow>

        </View>
    );
}

export default Benefits;