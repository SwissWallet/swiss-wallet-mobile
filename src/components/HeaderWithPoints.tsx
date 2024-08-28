import React, { useState } from "react";
import { Box, Divider, HStack, Icon, Text, View } from "@gluestack-ui/themed";
import LinearGradient from "react-native-linear-gradient";
import { Bell, ChevronRight, Eye, Settings, User } from "lucide-react-native";
import { TouchableOpacity } from "react-native";
import DropShadow from "react-native-drop-shadow";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

function HeaderWithPoints():JSX.Element {

    const navigation = useNavigation();

    const [visible, setVisible] = useState('****');
    
    const user = useSelector((state:any) => state.user.value);
    
    const [pointsCurrently, setPointsCurrently] = useState(user.account.value); 
    
    const handlePoints = () => {
        if (visible == '****') setVisible(pointsCurrently);
        else setVisible('****');
    }

    return(
        <LinearGradient colors={['#E30613', '#9A1915']}>
            <View height={162}>
            
                <Box mt={23} ml={22} mr={22}>
                    
                    <HStack justifyContent="space-between">
                        
                        <Box flexDirection="row">
                            
                            <TouchableOpacity onPress={() => navigation.navigate('Profile' as never)}>
                                <Icon as={User} size="xl" color="#fff"/>
                            </TouchableOpacity>

                            <Text color="#fff" ml={6} >
                                Olá {user.user.name}
                            </Text>
                                
                        </Box>

                        <Box flexDirection="row" gap={10} alignItems="center">
                            
                            <TouchableOpacity>
                                <Icon as={Bell} color="#fff" size="lg"/>
                            </TouchableOpacity>
                            
                            <TouchableOpacity onPress={() => navigation.navigate('Settings' as never)}>
                                <Icon as={Settings} color="#fff" size="xl"/>
                            </TouchableOpacity>
                        </Box>

                    </HStack>
                    
                    <Divider mt={5} bgColor="#fff" opacity={0.9}/>


                    <DropShadow style={{shadowColor: '#000', shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.5, shadowRadius: 4}}>
                        
                        <Box bg="#fff" height={98} mt={46} mb={25} borderRadius={10}>

                            <Box ml={23} mt={19} mr={23}>
                                
                                <HStack justifyContent="space-between" mb={2}>
                                    <Text fontWeight="$medium" color="#000">
                                        Saldo
                                    </Text>

                                    <TouchableOpacity>
                                        <HStack alignItems="center">
                                            <Text fontWeight="$medium" color="#000">
                                                Ver extrato
                                            </Text>
                                            <Icon as={ChevronRight}/>
                                        </HStack>
                                    </TouchableOpacity>
                                </HStack>

                                <HStack justifyContent="space-between" alignItems="center">
                                    <Text fontSize={22} color="#000" fontWeight="$extrabold" >
                                        Pontos {visible}
                                    </Text>

                                    <TouchableOpacity onPress={handlePoints}>
                                        <Icon as={Eye} color="#000" size="xl"/> 
                                    </TouchableOpacity>
                                </HStack>

                            </Box>

                        </Box>
                    
                    </DropShadow>

                </Box>
            
            </View>
        </LinearGradient>
    );
}

export default HeaderWithPoints;