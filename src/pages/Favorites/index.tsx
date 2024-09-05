import { View } from "@gluestack-ui/themed";
import React from "react";
import HeaderWithoutPoints from "../../components/HeaderWithoutPoints";
import Titlle from "../../components/Title";

function Favorite():JSX.Element {
    return(
        <View>
            <HeaderWithoutPoints />
            <Titlle name="Favoritos"/>
        </View>
    );
}

export default Favorite;