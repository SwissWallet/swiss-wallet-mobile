import React, { useEffect, useState } from "react";
import { Box, FlatList, ScrollView, View } from "@gluestack-ui/themed";
import HeaderWithPoints from "../../components/HeaderWithPoints";
import Titlle from "../../components/Title";
import api from "../../service/api";
import DropShadow from "react-native-drop-shadow";
import Order from "../../components/Order";
import { ActivityIndicator } from "react-native";
import { useIsFocused } from "@react-navigation/native";

function Shopping():JSX.Element{

    const [order, setOrder] = useState([]);
    const [loading, setLoading] = useState(true);
    const focused = useIsFocused();
    
    useEffect(() => {
            
        async function loadOrders() {
            const response = await api.get('orders/current')
            .then((json) => {
                setOrder(json.data);
                setLoading(false);
            })
            .catch(err => console.log(err));
        }
        
        loadOrders();
            
    }, [focused]);

    if(loading) {
        return(
            <View justifyContent="center" alignItems="center" flex={1}>
                <ActivityIndicator color="#000" size="large"/>
            </View>
        )
    }
    
    return(
        <ScrollView showsVerticalScrollIndicator={false}>
            <View>
                
                <HeaderWithPoints/>
                <Titlle name="Meus Pedidos"/>

                <DropShadow style={{shadowColor: '#000', shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.5, shadowRadius: 4}}>

                    <Box mt={10}>
                        <FlatList 
                            data={order}
                            keyExtractor={(item:any) => item.id}
                            renderItem={({item}:any) => <Order order={item}/>}
                            scrollEnabled={false}
                        />
                    </Box>                    

                </DropShadow>
            </View>
        </ScrollView>
    );
}

export default Shopping;