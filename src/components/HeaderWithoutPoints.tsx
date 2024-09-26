import { Text, View } from "@gluestack-ui/themed";
import { Box, Divider, HStack, Icon } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeftCircle, Bell, Settings, User} from "lucide-react-native";
import { TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useSelector, UseSelector } from "react-redux";

function HeaderWithoutPoints():JSX.Element{

    const navigate = useNavigation();
    const user = useSelector((state:any) => state.user.value);
    const name = user.user.name.split(' ')
    
    return(
        <LinearGradient colors={['#E30513', '#9A1915']}>
           
            <View height={162}>
           
                <Box mt={25} ml={22} mr={22}>

                    <HStack justifyContent="space-between" alignItems="center">

                        <TouchableOpacity onPress={() => navigate.goBack()}>
                            <Icon as={ArrowLeftCircle} color="$white" size="30" accessible accessibilityLabel="Icone voltar, botão"/>
                        </TouchableOpacity>

                        <Box flexDirection="row" gap={10} alignItems="center">
                            
                                <TouchableOpacity>
                                    <Icon as={Bell} color="$white" size="lg" accessible accessibilityLabel="Icone notificações"/>
                                </TouchableOpacity>


                                <TouchableOpacity onPress={() => navigate.navigate('Settings' as never)}>
                                    <Icon as={Settings} color="$white" size="xl" accessible accessibilityLabel="Icone configurações, botão"/>
                                </TouchableOpacity>
                        
                        </Box>
                    </HStack>


                     <Box mt={19}>

                        <HStack mb={5} gap={5} alignItems="center">

                            <TouchableOpacity onPress={() => navigate.navigate('Profile' as never)}>
                                <Icon as={User} color="$white" size="30" accessible accessibilityLabel="Icone pessoa, botão"/>
                            </TouchableOpacity>


                            <Box alignItems="flex-start" flexDirection="column">

                                <Text color="$white">
                                        Olá {name[0] + (name[1] ? " " + name[1] : "")}
                                </Text>

                                <Text color="$white">
                                    Seu perfil 
                                </Text>
                                
                            </Box>
                        </HStack>

                        <Divider bgColor="$white" opacity={0.9}/>

                    </Box>
           
                </Box>
            </View>
        </LinearGradient>
    )
}
export default HeaderWithoutPoints;