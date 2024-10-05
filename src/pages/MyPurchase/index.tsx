import HeaderWithPoints from "../../components/HeaderWithPoints";
import { useNavigation } from "@react-navigation/native";
import { FlatList, ScrollView, Text, View } from "@gluestack-ui/themed";
import Titlle from "../../components/Title";
import DropBox from "../../components/DropsBoxPurchase";
import api from "../../service/api";
import { useEffect, useState } from "react";

function MyPurchase(): JSX.Element{

    const navigation = useNavigation();
    const [products, setProducts] = useState();



    async function teste(){

        const response = await api.get('order/carts/current')
        .then((json) => {
            // console.log(json.data[0]);
            setProducts(json.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    useEffect(() =>{
        teste();
    }, [])

    return(
        
        <ScrollView>

            <View flex={1}>

                <HeaderWithPoints/>

                <Titlle name="Minhas Compras"></Titlle>
                
                <FlatList 
                    data={products}
                    keyExtractor={(item:any) => item.id}
                    renderItem={(item:any) => <DropBox purchase={item}/>}
                    scrollEnabled={false}
                    />


            </View>
        </ScrollView>


    )
}

export default MyPurchase;