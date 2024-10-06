import HeaderWithPoints from "../../components/HeaderWithPoints";
import { useNavigation } from "@react-navigation/native";
import { Box, FlatList, RefreshControl, ScrollView, Text, View } from "@gluestack-ui/themed";
import Titlle from "../../components/Title";
import DropBox from "../../components/DropsBoxPurchase";
import api from "../../service/api";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import reloadApp from "../../util/ReloadApp";
import { useDispatch, useSelector } from "react-redux";

function MyPurchase(): JSX.Element {

    const navigation = useNavigation();
    const [products, setProducts] = useState();
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const reload = useSelector((state:any) => state.reload.value)

    async function loadCarts() {
        setLoading(true);
        const response = await api.get('order/carts/current')
            .then((json) => {
                // console.log(json.data[0]);
                setProducts(json.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            })
    }

    useEffect(() => {
        loadCarts();
    }, [reload]);

    if (loading || reload) {
        return (
            <View>
                <HeaderWithPoints />
                
                <Titlle name="Minhas Compras" />
                
                <Box mt={20}>
                    <ActivityIndicator color="#000" size="large" />
                </Box>
            </View>
        );
    }

    return (

        <ScrollView showsVerticalScrollIndicator={false} refreshControl={
            <RefreshControl onRefresh={() => reloadApp(dispatch)} refreshing={reload}/>
        }>

            <View flex={1}>

                <HeaderWithPoints />

                <Titlle name="Minhas Compras"></Titlle>

                <FlatList
                    data={products}
                    keyExtractor={(item: any) => item.id}
                    renderItem={(item: any) => <DropBox purchase={item} />}
                    scrollEnabled={false}
                />


            </View>
        </ScrollView>


    )
}

export default MyPurchase;