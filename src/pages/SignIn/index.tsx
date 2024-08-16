import { Button, ButtonText, HStack, InputField, InputIcon, InputSlot, Text, View } from "@gluestack-ui/themed";
import { Box } from '@gluestack-ui/themed';
import { Input } from '@gluestack-ui/themed';
import { Eye, EyeOff, Lock, User } from "lucide-react-native";
import React, { useState } from "react";
import { Keyboard, KeyboardAvoidingView, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import DropShadow from "react-native-drop-shadow";
import LinearGradient from "react-native-linear-gradient";


function SignIn(): JSX.Element {
    const [showPassword, setShowPassword] = useState(false);

    const handleState = () => {
        setShowPassword(prevState => !prevState);
    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <LinearGradient colors={["#e30613", "#9a1915", "#681413"]} style={{ flex: 1 }}>
                <Box flex={1} ml={22} mr={22} mt={230}>
                    <Box width={304} alignItems="flex-start">
                        <Box marginBottom={50} alignItems="flex-start">
                            <Text size="4xl" fontWeight="$bold" color="$white" fontFamily="">Login</Text>
                        </Box>

                        <Box marginBottom={15} w={380}>
                            <Input variant="underlined" size="md" borderColor="$white" style={{borderBottomColor: '#ffffff'}} width="90%" marginBottom={30} gap={10}>
                                <InputSlot pl="$3">
                                    <InputIcon as={User} color="$white" />
                                </InputSlot>
                                <InputField color={"$white"} placeholder='Digite seu email' placeholderTextColor={"#fff"}/>
                            </Input>

                            <Box>
                                <Input variant="underlined" size="md" borderColor="$white" width="90%" gap={10} style={{borderBottomColor: '#ffffff'}}>
                                    <InputSlot pl="$3">
                                        <InputIcon as={Lock} color="$white"/>
                                    </InputSlot>
                                    <InputField 
                                        type={showPassword ? "text" : "password"} 
                                        placeholder='Digite sua senha'
                                        placeholderTextColor={"#fff"}
                                        style={{ paddingRight: 40, color: '#ffffff' }} 
                                    />
                                </Input>
                                <TouchableOpacity 
                                    onPress={handleState} 
                                    style={{
                                        position: 'absolute',
                                        right: 10,
                                        top: '50%',
                                        transform: [{ translateY: -15 }],
                                        justifyContent: 'center',
                                        paddingHorizontal: 30
                                    }}
                                >
                                    <InputIcon as={showPassword ? Eye : EyeOff} color="#fff"/>
                                </TouchableOpacity>
                            </Box>
                        </Box>

                        <Box width="90%" alignItems="flex-end" marginBottom={40} ml={80}>
                            <TouchableOpacity>
                                <Text underline={true} color="$white" fontSize={"$xs"}>Esqueci minha senha</Text>
                            </TouchableOpacity>
                        </Box>

                        <Box width="100%" ml={30} mr={22}>
                            <TouchableOpacity>
                                <DropShadow style={{
                                    shadowColor: "#000",
                                    shadowOffset: { width: 2, height: 5 },
                                    shadowOpacity: 0.7,
                                    shadowRadius: 5
                                }}>
                                    <Box height={45} bgColor="#9A1915" alignItems="center" justifyContent="center" borderRadius={10}>
                                        <Text color="$white">Login</Text>
                                    </Box>
                                </DropShadow>
                            </TouchableOpacity>
                        </Box>
                    </Box>


                    <Box bottom={20} width="100%" alignItems="center" marginTop={300}>
                        <HStack>
                            <Text color="$white">Não possui conta?</Text>
                            <TouchableOpacity> 
                                <Text color="$white" underline={true}> cadastre-se</Text>
                            </TouchableOpacity>
                        </HStack>
                    </Box>
                </Box>

        </LinearGradient>
        </TouchableWithoutFeedback>
    );
}

export default SignIn;
