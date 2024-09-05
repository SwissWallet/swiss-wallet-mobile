//@ts-nocheck
import React from "react";
import { Center, Heading, HStack, Icon, Text, View } from "@gluestack-ui/themed";
import LinearGradient from "react-native-linear-gradient";
import { Box } from "@gluestack-ui/themed";
import { FlatList, TouchableOpacity } from "react-native";
import { ArrowLeftCircle, Bell, ChevronDown, ChevronUp, Settings } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import DropShadow from "react-native-drop-shadow";

function Extract():JSX.Element {

    const navigate = useNavigation();

    const user = useSelector((state:any) => state.user.value);
    console.log(user.extracts);

    return(
        <View>
            <LinearGradient colors={['#E30513', '#9A1915']}>
                
                <View height={162}>
            
                <Box mt={25} ml={22} mr={22}>

                    <HStack justifyContent="space-between" alignItems="center">

                        <TouchableOpacity onPress={() => navigate.goBack()}>
                            <Icon as={ArrowLeftCircle} color="$white" size="30"/>
                        </TouchableOpacity>

                        <Box flexDirection="row" gap={10} alignItems="center">
                            
                                <TouchableOpacity>
                                    <Icon as={Bell} color="$white" size="lg"/>
                                </TouchableOpacity>


                                <TouchableOpacity onPress={() => navigate.navigate('Settings' as never)}>
                                    <Icon as={Settings} color="$white" size="xl"/>
                                </TouchableOpacity>
                        </Box>
                    </HStack>

                    <Heading color="#fff" fontSize={32} mt={35}>
                        Extrato
                    </Heading>

                    </Box>
                </View>

            </LinearGradient>
            
            {
                user.extracts.length == 0 ? <Text textAlign="center" color="#000" fontWeight={"$bold"} mt={30} fontSize={25}>Não há extratos.</Text> : 
                <FlatList 
                    data={user.extracts}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => <Card card={item}/>}
                    showsVerticalScrollIndicator={false}
                    inverted
                /> 
            }

        </View>
    )
}

type props = {
    card:object
}

function Card({card}:props):JSX.Element{

    return(
        <DropShadow style={{shadowColor: '#000', shadowOffset: {width: 5, height: 5}, shadowOpacity: 0.5, shadowRadius: 2, flex: 1, paddingBottom: 10}}>
            <Box bgColor="#c6c6c6" w="90%" ml={22} mr={22} height={60} mt={20} borderRadius={10} opacity={0.7}>
                <HStack justifyContent="space-between" mr={22} ml={22} mt={16} alignItems="center">


                    {card.type === "DEPOSIT" ? <ChevronUp color="green"/> : <ChevronDown color="red"/>}

                    <Text color="#000" fontWeight="$bold">
                        {card.value} pontos
                    </Text>
                    
                    <Text color="#000" fontWeight="$medium">
                        {card.date}
                    </Text>
                </HStack>
            </Box>
        </DropShadow>
    );
}

export default Extract;